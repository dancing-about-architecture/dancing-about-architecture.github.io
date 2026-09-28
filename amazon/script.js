// "Can I Buy This Album?" -- game logic.
//
// The point of the game: this site's Amazon links are ~20 years old.
// Clicking "Try to buy a record" opens a random one in a new tab while
// this page asks whether the album cover shown actually turned out to
// be buyable there. Answers get recorded in Firebase (see sync.js) so
// we can eventually tell, per link, whether it still works -- and with
// two independent answers per link, spot-check any disagreements.

let GAME_DATA = []
let displayName = null
let currentItem = null
let lastPlayers = {}

let nameStorageKey = "albumGamePlayerName"

// Surpass-celebration overlay: pauses its own countdown while this tab
// isn't visible, since the player is expected to be off on the Amazon
// tab that "Try to buy a record" just opened.
let surpassTimer = null
let surpassStart = null
let surpassRemaining = 0
let surpassVisible = false

function loadGameData() {
	return fetch("game-data.json").then(function (res) {
		return res.json()
	}).then(function (data) {
		GAME_DATA = data
	})
}

function showScreen(name) {
	let screens = ["nameScreen", "mainScreen", "questionScreen", "doneScreen"]
	for (let i = 0; i < screens.length; i++) {
		document.getElementById(screens[i]).classList.toggle("hidden", screens[i] !== name)
	}
	document.getElementById("scoreboard").classList.toggle("hidden", name === "nameScreen" || name === "questionScreen")
}

// An item's bucket isn't stored anywhere -- it's derived here from how
// many responses it already has, and whether one of them is mine:
//   - no responses yet            -> first-round pool
//   - one response, not mine      -> second-round pool (only shown to
//                                     people who haven't answered it)
//   - one response, mine          -> skipped (waiting on someone else)
//   - two responses               -> done, skipped for everyone
function pickItem() {
	let unanswered = []
	let secondRound = []
	for (let i = 0; i < GAME_DATA.length; i++) {
		let item = GAME_DATA[i]
		let responses = responsesCache[item.id]
		if (!responses) {
			unanswered.push(item)
			continue
		}
		let keys = Object.keys(responses)
		if (keys.length >= 2) continue
		if (keys.indexOf(myPlayerKey) !== -1) continue
		secondRound.push(item)
	}
	let pool = unanswered.length ? unanswered : secondRound
	if (!pool.length) return null
	return pool[Math.floor(Math.random() * pool.length)]
}

function sortedKeys(players) {
	return Object.keys(players).sort(function (a, b) {
		return (players[b].count || 0) - (players[a].count || 0)
	})
}

// Figures out who (if anyone) this player just leapfrogged: the person
// now sitting directly behind them on the scoreboard, but who used to
// rank at or above them before this update.
function checkSurpass(prevPlayers, newPlayers, myKey) {
	let prevKeys = sortedKeys(prevPlayers)
	let newKeys = sortedKeys(newPlayers)
	let prevIdx = prevKeys.indexOf(myKey)
	if (prevIdx === -1) prevIdx = prevKeys.length
	let newIdx = newKeys.indexOf(myKey)
	if (newIdx === -1) return null
	let belowKey = newKeys[newIdx + 1]
	if (!belowKey) return null
	// A tie doesn't count -- only celebrate once we're strictly ahead by
	// at least one point, not just resting at the same count.
	let myCount = newPlayers[myKey].count || 0
	let belowCount = newPlayers[belowKey].count || 0
	if (myCount <= belowCount) return null
	let belowPrevIdx = prevKeys.indexOf(belowKey)
	if (belowPrevIdx !== -1 && belowPrevIdx < prevIdx) {
		return newPlayers[belowKey].name
	}
	return null
}

function runSurpassCountdown() {
	clearSurpassTimer()
	if (document.hidden) return
	surpassStart = Date.now()
	surpassTimer = setTimeout(function () {
		hideSurpassOverlay()
	}, surpassRemaining)
}

function pauseSurpassCountdown() {
	if (!surpassTimer) return
	let elapsed = Date.now() - surpassStart
	surpassRemaining = Math.max(0, surpassRemaining - elapsed)
	clearSurpassTimer()
}

function clearSurpassTimer() {
	if (surpassTimer) {
		clearTimeout(surpassTimer)
		surpassTimer = null
	}
}

function showSurpassOverlay(passedName) {
	document.getElementById("surpassName").textContent = passedName
	document.getElementById("surpassScreen").classList.add("show")
	surpassVisible = true
	surpassRemaining = 3000
	runSurpassCountdown()
}

function hideSurpassOverlay() {
	clearSurpassTimer()
	surpassVisible = false
	document.getElementById("surpassScreen").classList.remove("show")
}

document.addEventListener("visibilitychange", function () {
	if (!surpassVisible) return
	if (document.hidden) {
		pauseSurpassCountdown()
	} else {
		runSurpassCountdown()
	}
})

function tryToBuyRecord() {
	let item = pickItem()
	if (!item) {
		showScreen("doneScreen")
		return
	}
	currentItem = item
	window.open(item.url, "_blank")
	let img = document.getElementById("questionCover")
	img.src = item.cover
	img.alt = ""
	showScreen("questionScreen")
}

function answer(value) {
	let item = currentItem
	if (!item) return
	document.getElementById("yesButton").disabled = true
	document.getElementById("noButton").disabled = true
	let prevPlayers = lastPlayers
	recordAnswer(item.id, value, displayName).then(function (newCount) {
		currentItem = null
		document.getElementById("yesButton").disabled = false
		document.getElementById("noButton").disabled = false
		showScreen("mainScreen")

		let newPlayers = Object.assign({}, prevPlayers)
		newPlayers[myPlayerKey] = { name: displayName, count: newCount }
		let passedName = checkSurpass(prevPlayers, newPlayers, myPlayerKey)
		if (passedName) showSurpassOverlay(passedName)
	}).catch(function (err) {
		document.getElementById("yesButton").disabled = false
		document.getElementById("noButton").disabled = false
		alert("Couldn't save that answer, try again: " + err.message)
	})
}

function renderScoreboard(players) {
	let names = Object.keys(players)
	names.sort(function (a, b) {
		return (players[b].count || 0) - (players[a].count || 0)
	})
	let max = 0
	for (let i = 0; i < names.length; i++) {
		max = Math.max(max, players[names[i]].count || 0)
	}
	let bars = document.getElementById("bars")
	bars.innerHTML = ""
	for (let i = 0; i < names.length; i++) {
		let key = names[i]
		let p = players[key]
		let count = p.count || 0
		let pct = max > 0 ? Math.round((count / max) * 100) : 0

		let row = document.createElement("div")
		row.className = "bar-row"

		let label = document.createElement("div")
		label.className = "bar-label"
		let nameSpan = document.createElement("span")
		nameSpan.textContent = p.name
		if (key === myPlayerKey) nameSpan.className = "me"
		let countSpan = document.createElement("span")
		countSpan.textContent = count
		label.appendChild(nameSpan)
		label.appendChild(countSpan)

		let track = document.createElement("div")
		track.className = "bar-track"
		let fill = document.createElement("div")
		fill.className = "bar-fill"
		fill.style.width = pct + "%"
		track.appendChild(fill)

		row.appendChild(label)
		row.appendChild(track)
		bars.appendChild(row)
	}
}

function updateGreeting(players) {
	if (!displayName) return
	let el = document.getElementById("greeting")
	if (!players[myPlayerKey]) {
		el.textContent = "Hi, " + displayName + "!"
		return
	}
	let keys = sortedKeys(players)
	let idx = keys.indexOf(myPlayerKey)
	if (idx === 0) {
		el.textContent = "Hi, " + displayName + ", or should I say handsomest family member?"
	} else {
		let aheadName = players[keys[idx - 1]].name
		el.textContent = "Hi, " + displayName + ", you're looking handsome, almost as handsome as " + aheadName + "."
	}
}

function startAsPlayer(name) {
	displayName = name
	setPlayerKey(name)
	updateGreeting(lastPlayers)
	showScreen("mainScreen")
}

function submitName() {
	let input = document.getElementById("nameInput")
	let name = input.value.trim()
	if (!name) return
	localStorage.setItem(nameStorageKey, name)
	startAsPlayer(name)
}

window.addEventListener("DOMContentLoaded", function () {
	document.getElementById("nameSubmit").addEventListener("click", submitName)
	document.getElementById("nameInput").addEventListener("keyup", function (e) {
		if (e.key === "Enter") submitName()
	})
	document.getElementById("tryButton").addEventListener("click", tryToBuyRecord)
	document.getElementById("yesButton").addEventListener("click", function () { answer("yes") })
	document.getElementById("noButton").addEventListener("click", function () { answer("no") })

	Promise.all([loadGameData(), initSync()]).then(function () {
		listenResponses()
		listenPlayers(function (players) {
			lastPlayers = players
			renderScoreboard(players)
			updateGreeting(players)
		})

		let savedName = localStorage.getItem(nameStorageKey)
		if (savedName) {
			startAsPlayer(savedName)
		} else {
			showScreen("nameScreen")
		}
	}).catch(function (err) {
		alert("Couldn't connect: " + err.message)
	})
})
