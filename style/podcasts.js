/* Copy the feed address for podcast readers. */
(function () {
  var button = document.getElementById('copy-rss-feed');
  var status = document.getElementById('copy-rss-status');
  if (!button || !status) return;
  var reset;
  function paintStatus() {
    if (window.DAA_BITMAP_TEXT && status.textContent) {
      window.DAA_BITMAP_TEXT.render(status, status.textContent);
    }
  }
  window.addEventListener('bitmaptextready', paintStatus);
  function showStatus(message, duration) {
    status.textContent = message;
    status.hidden = false;
    paintStatus();
    reset = setTimeout(function () { status.hidden = true; }, duration);
  }
  button.addEventListener('click', async function () {
    clearTimeout(reset);
    try {
      await navigator.clipboard.writeText(button.textContent.trim());
      showStatus('Copied to clipboard', 2500);
    } catch (error) {
      var range = document.createRange();
      range.selectNodeContents(button);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      showStatus('Select and copy this address.', 5000);
    }
  });
}());

/* Build the narrow layout from the desktop list so both views share links. */
(function () {
  document.querySelectorAll('.podcast-list').forEach(function (desktop) {

    var covers = desktop.querySelectorAll('a:has(img[src*="album%20covers"])');
    var podcasts = desktop.querySelectorAll('a[href$=".mp3"]');
    var artists = desktop.querySelectorAll('.podcast-artist');
    var tracks = desktop.querySelectorAll('.podcast-tracklist a');
    if (!covers.length || [podcasts, artists, tracks].some(function (items) {
      return items.length !== covers.length;
    })) return;

    function copyLink(source, label) {
      var link = source.cloneNode(true);
      link.removeAttribute('style');
      link.removeAttribute('onmouseover');
      link.removeAttribute('onmouseout');
      var img = link.querySelector('img');
      if (img) {
        img.removeAttribute('name');
        img.alt = label;
      }
      return link;
    }

    var list = document.createElement('div');
    list.className = 'podcast-mobile-list';
    covers.forEach(function (cover, index) {
      var artist = artists[index].textContent.trim();
      var entry = document.createElement('section');
      entry.className = 'podcast-mobile-entry';
      var heading = document.createElement('h2');
      heading.textContent = artist;
      entry.appendChild(heading);
      entry.appendChild(copyLink(cover, artist + ' album — read the journal entry'));
      var podcast = copyLink(podcasts[index], 'Listen to the ' + artist + ' podcast');
      podcast.className = 'podcast-mobile-listen';
      entry.appendChild(podcast);
      entry.appendChild(copyLink(tracks[index]));
      list.appendChild(entry);
      list.appendChild(document.createElement('hr'));
    });
    desktop.classList.add('podcast-desktop-table');
    desktop.insertAdjacentElement('afterend', list);
  });
}());
