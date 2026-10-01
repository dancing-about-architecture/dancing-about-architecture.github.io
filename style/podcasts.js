/* Copy the feed address for podcast readers. */
(function () {
  var button = document.getElementById('copy-rss-feed');
  var status = document.getElementById('copy-rss-status');
  if (!button || !status) return;
  var reset;
  button.addEventListener('click', async function () {
    clearTimeout(reset);
    try {
      await navigator.clipboard.writeText(button.textContent.trim());
      status.textContent = 'Copied to clipboard';
      status.hidden = false;
      reset = setTimeout(function () { status.hidden = true; }, 2500);
    } catch (error) {
      var range = document.createRange();
      range.selectNodeContents(button);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Select and copy this address.';
      status.hidden = false;
      reset = setTimeout(function () { status.hidden = true; }, 5000);
    }
  });
}());

/* Build the narrow layout from the original tables so both views share links. */
(function () {
  document.querySelectorAll('table[width="699"], table[width="698"]').forEach(function (table) {

    var covers = table.querySelectorAll('a:has(img[src*="album%20covers"])');
    var podcasts = table.querySelectorAll('a[href$=".mp3"]');
    var artists = table.querySelectorAll('font[size="6"]');
    var tracks = table.querySelectorAll('a[href*="podcast%20track%20lists"]');
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
    table.classList.add('podcast-desktop-table');
    table.insertAdjacentElement('afterend', list);
  });
}());
