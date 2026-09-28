// Firebase sync layer for "Can I Buy This Album?".
//
// Data lives under albumGame in the shared Drawing Games realtime
// database:
//
//   albumGame/responses/{itemId}/{playerKey} = { name, answer, ts }
//   albumGame/players/{playerKey}            = { name, count }
//
// An item's "bucket" isn't stored anywhere explicit -- it's derived on
// the fly from how many responses/{itemId} entries exist, and whether
// this player is one of them. See pickItem() in script.js.

let db = null
let myPlayerKey = null
let responsesCache = {}
let playersListenerAttached = false

function initSync() {
	db = firebase.database()
	return firebase.auth().signInAnonymously().then(function () {
		return new Promise(function (resolve) {
			let unsub = firebase.auth().onAuthStateChanged(function (user) {
				if (user) {
					unsub()
					resolve(user.uid)
				}
			})
		})
	})
}

function slugifyName(name) {
	let slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
	return slug || "player"
}

function setPlayerKey(name) {
	myPlayerKey = slugifyName(name)
	return myPlayerKey
}

// Keeps a live local copy of every response so pickItem() can work
// synchronously without a round-trip every time the button is clicked.
function listenResponses() {
	db.ref("albumGame/responses").on("value", function (snap) {
		responsesCache = snap.val() || {}
	})
}

function listenPlayers(onChange) {
	if (playersListenerAttached) return
	playersListenerAttached = true
	db.ref("albumGame/players").on("value", function (snap) {
		onChange(snap.val() || {})
	})
}

// Records this player's answer for itemId, and bumps their running
// total. Fails loudly (returns a rejected promise) rather than
// silently dropping an answer -- callers should surface the error.
// Resolves with the player's new total count, straight from the
// transaction's committed snapshot, so callers can tell immediately
// whether this answer just moved them up the scoreboard.
function recordAnswer(itemId, answer, displayName) {
	let ts = firebase.database.ServerValue.TIMESTAMP
	let writeResponse = db.ref("albumGame/responses/" + itemId + "/" + myPlayerKey).set({
		name: displayName,
		answer: answer,
		ts: ts
	})
	let bumpCount = db.ref("albumGame/players/" + myPlayerKey).transaction(function (current) {
		return {
			name: displayName,
			count: ((current && current.count) || 0) + 1
		}
	})
	return Promise.all([writeResponse, bumpCount]).then(function (results) {
		let txResult = results[1]
		return txResult.snapshot.val().count
	})
}
