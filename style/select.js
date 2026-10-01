/* Progressive enhancement for the GoLive alphabox. Preserve its selects and
   dispatch real change events so navigation and artist-scrollbars still work.
   Visual reference: https://github.com/grassmunk/Chicago95
   Labels render as hard bitmap pixels on canvas from the 100/150/200
   hand-drawn strikes (see bitmap-glyphs.js), swapped by scaling like the
   cursors; the boxes likewise hold their size under browser zoom and
   step through whole-number multiples of the available strikes. Real text
   stays alongside in
   .w95-sr-only spans so screen readers, find-in-page, and copy/paste
   keep working. One shared popup, with keyboard and touch support. */
(function () {
  'use strict';
  var active, popup, menu, rows = [], pairs = [], index = 0, sequence = 0, search = '', searchTimer;
  // Button content width minus arrow and label padding: 185 - 2*2 - 2*1 - 17 - 2*2.
  // Kept in 100-strike pixels; paintCanvas converts it to the active strike.
  var LABEL_WIDTH = 158;
  var bitmapMessages = new Map();

  /* DPR includes desktop page zoom and display scaling. visualViewport.scale
     only measures pinch zoom, so it cannot detect Ctrl+/browser-menu zoom.
     Match the available strikes to physical pixels, even on first load at a
     non-default zoom. Pinch zoom remains a native magnification gesture. */
  function currentScale() {
    var dpr = window.devicePixelRatio;
    if (!(dpr > 0) || !isFinite(dpr)) dpr = 1;
    // Every whole-number multiple of a drawn strike is safe: 100, 150,
    // 200, 300, 400, 450, etc. Hold the previous size between those steps.
    var q = Math.max(1, Math.floor(dpr + 0.000001),
      1.5 * Math.floor((dpr + 0.000001) / 1.5));
    var strike = q % 2 === 0 ? '200' : q % 1.5 === 0 ? '150' : '100';
    return { q: q, e: q / dpr, s: strike, d: dpr };
  }

  var zoomState = currentScale();

  function elementZoom() {
    return zoomState.e === 1 ? '' : String(zoomState.e);
  }

  function applyElementZoom() {
    var z = elementZoom();
    pairs.forEach(function (pair) { pair.button.style.zoom = z; });
    if (popup) popup.style.zoom = z;
    bitmapMessages.forEach(function (text, parent) { parent.style.zoom = z; });
  }

  /* Zoom or density changed: re-counter the boxes; only a size-band or
     strike change needs re-layout and repaint (within a band the canvas
     backing is untouched — same strike, same local units). */
  function recheckScaling() {
    var next = currentScale(), prev = zoomState;
    if (next.q === prev.q && next.s === prev.s && next.e === prev.e) return;
    zoomState = next;
    applyElementZoom();
    if (next.q !== prev.q || next.s !== prev.s) {
      repaintAll();
    }
    position();
    schedulePixelAlignment();
  }

  function strikeData() {
    if (typeof window === 'undefined' || !window.DAA_BITMAP_GLYPHS) return null;
    var all = window.DAA_BITMAP_GLYPHS;
    return all[zoomState.s] || all['100'] || null;
  }

  function bitmapGlyphs() {
    var data = strikeData();
    return data ? data.glyphs || null : null;
  }

  function canBitmap(text) {
    var glyphs = bitmapGlyphs();
    if (!glyphs) return false;
    for (var i = 0; i < text.length; i++) {
      if (!glyphs[text.charCodeAt(i)]) return false;
    }
    return true;
  }

  function textWidth(text, glyphs) {
    var width = 0;
    for (var i = 0; i < text.length; i++) width += glyphs[text.charCodeAt(i)].dw;
    return width;
  }

  function paintCanvas(canvas, text, fg, bg, maxWidth) {
    var data = strikeData(), glyphs = data.glyphs;
    var scale = data.scale / 100;
    var height = data.ascent + data.descent;
    var limit = maxWidth * scale;
    if (maxWidth && textWidth(text, glyphs) > limit) {
      while (text.length > 1 && textWidth(text + '...', glyphs) > limit) {
        text = text.slice(0, -1);
      }
      text = text + '...';
    }
    // A background-only guard pixel keeps the image boundary's coverage
    // antialiasing away from glyphs when CSS layout rounds fractional sizes.
    canvas.width = Math.max(1, textWidth(text, glyphs)) + 2;
    canvas.height = height + 2;
    // Backing store is strike pixels; the CSS box stays at 100 size.
    canvas.style.width = (canvas.width / scale) + 'px';
    canvas.style.height = (canvas.height / scale) + 'px';
    canvas.style.margin = (-1 / scale) + 'px';
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fg;
    var x = 0, i, row, b;
    for (i = 0; i < text.length; i++) {
      var g = glyphs[text.charCodeAt(i)];
      if (g.r) {
        for (row = 0; row < g.r.length; row++) {
          var value = parseInt(g.r[row], 16), bits = g.r[row].length * 4;
          var y = data.ascent - 1 - (g.y + g.h - 1 - row);
          for (b = 0; b < g.w; b++) {
            if ((value >> (bits - 1 - b)) & 1) ctx.fillRect(x + g.x + b + 1, y + 1, 1, 1);
          }
        }
      }
      x += g.dw;
    }
  }

  /* Render text as hard pixels, keeping the real string in a screen-reader
     span. Falls back to plain visible text when a glyph is undrawn or the
     data/canvas is unavailable, so nothing ever renders as boxes. */
  function renderText(parent, text, fg, bg, maxWidth) {
    parent.textContent = '';
    var canvas = canBitmap(text) && document.createElement('canvas');
    if (!canvas || !canvas.getContext) { parent.textContent = text; return; }
    canvas.className = 'w95-bitmap';
    canvas.setAttribute('aria-hidden', 'true');
    var hidden = document.createElement('span');
    hidden.className = 'w95-sr-only';
    hidden.textContent = text;
    parent.appendChild(canvas);
    parent.appendChild(hidden);
    paintCanvas(canvas, text, fg, bg, maxWidth);
    schedulePixelAlignment();
  }

  // Flex centering and fractional anchors can place otherwise 1:1 bitmaps
  // between screen pixels. Correct layout rounding as well as their origins.
  // A small bias into the target pixel avoids floating-point underflow in
  // the compositor; the background guard keeps edge coverage off the glyphs.
  var alignmentFrame = 0;
  function schedulePixelAlignment() {
    if (alignmentFrame) return;
    alignmentFrame = requestAnimationFrame(function () {
      alignmentFrame = 0;
      var canvases = Array.from(document.querySelectorAll('.w95-bitmap'));
      canvases.forEach(function (canvas) { canvas.style.transform = ''; });
      var offsets = canvases.map(function (canvas) {
        var rect = canvas.getBoundingClientRect(), d = zoomState.d;
        var strike = strikeData();
        var multiple = strike ? zoomState.q / (strike.scale / 100) : 1;
        return [((Math.round(rect.left * d) + 0.125) / d - rect.left) / zoomState.e,
          ((Math.round(rect.top * d) + 0.125) / d - rect.top) / zoomState.e,
          rect.width ? canvas.width * multiple / d / rect.width : 1,
          rect.height ? canvas.height * multiple / d / rect.height : 1];
      });
      canvases.forEach(function (canvas, i) {
        canvas.style.transform = 'translate(' + offsets[i][0] + 'px,' + offsets[i][1] +
          'px) scale(' + offsets[i][2] + ',' + offsets[i][3] + ')';
      });
    });
  }

  function opaqueBg(color) {
    return (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') ? '#fff' : color;
  }

  /* Colors always come from computed CSS so canvas and stylesheet agree. */
  function paintLabel(button, source) {
    var label = button.querySelector('.w95-select-label');
    if (!label) return;
    var style = getComputedStyle(label);
    renderText(label, source.options[source.selectedIndex].text,
      style.color, opaqueBg(style.backgroundColor), LABEL_WIDTH);
  }

  function paintRow(row) {
    var style = getComputedStyle(row);
    renderText(row, row.w95Text, style.color, opaqueBg(style.backgroundColor), 0);
  }

  /* The active strike or its integer multiplier changed: repaint labels. */
  function repaintAll() {
    pairs.forEach(function (pair) { paintLabel(pair.button, pair.source); });
    if (active) rows.forEach(paintRow);
    bitmapMessages.forEach(paintMessage);
  }

  // Small site popups share the exact same strikes and zoom handling.
  function paintMessage(text, parent) {
    parent.style.zoom = elementZoom();
    var style = getComputedStyle(parent);
    renderText(parent, text, style.color, opaqueBg(style.backgroundColor), 0);
  }
  window.DAA_BITMAP_TEXT = {
    render: function (parent, text) {
      bitmapMessages.set(parent, text);
      paintMessage(text, parent);
    }
  };
  window.dispatchEvent(new Event('bitmaptextready'));

  function close(restoreFocus) {
    if (!active) return;
    var button = active.button;
    button.setAttribute('aria-expanded', 'false');
    button.removeAttribute('aria-activedescendant');
    popup.remove();
    active = null;
    if (restoreFocus) button.focus({ preventScroll: true });
  }

  function highlight(next) {
    if (!active || !rows.length) return;
    next = Math.max(0, Math.min(rows.length - 1, next));
    var prev = index;
    index = next;
    rows.forEach(function (row, i) { row.setAttribute('aria-selected', String(i === index)); });
    paintRow(rows[index]);
    if (prev !== index && rows[prev]) paintRow(rows[prev]);
    active.button.setAttribute('aria-activedescendant', rows[index].id);
    rows[index].scrollIntoView({ block: 'nearest' });
  }

  function commit() {
    if (!active || active.source.options[index].disabled) return;
    var source = active.source;
    source.selectedIndex = index;
    close(true);
    if (!source.value || source.value === '#') return;
    source.dispatchEvent(new Event('change', { bubbles: true }));
    // The artist easter egg resets selectedIndex during the capture phase.
    paintLabel(source.w95Button, source);
  }

  function position() {
    if (!active) return;
    var rect = active.button.getBoundingClientRect();
    if (!rect.width || !rect.height || getComputedStyle(active.button).visibility === 'hidden') {
      close(false);
      return;
    }
    var viewport = window.visualViewport;
    var left = viewport ? viewport.offsetLeft : 0;
    var top = viewport ? viewport.offsetTop : 0;
    var width = viewport ? viewport.width : window.innerWidth;
    var height = viewport ? viewport.height : window.innerHeight;
    var below = top + height - rect.bottom - 4;
    var above = rect.top - top - 4;
    // Style sizes are element-local base units; compare against the
    // viewport in the same units by dividing out the element zoom.
    var q = zoomState.e;
    var desired = Math.min(rows.length * 17 + 4, 240);
    var upwards = below < desired * q && above > below;
    popup.style.height = Math.max(21, Math.min(desired, upwards ? above / q : below / q)) + 'px';
    popup.style.width = Math.min(Math.max(185, rect.width / q), (width - 8) / q) + 'px';
    var popupWidth = popup.getBoundingClientRect().width;
    var popupHeight = popup.getBoundingClientRect().height;
    var x = Math.max(left + 4, Math.min(rect.left, left + width - popupWidth - 4));
    var y = upwards ? rect.top - popupHeight : rect.bottom;
    // Fixed offsets also live inside the element's CSS zoom.
    popup.style.left = (Math.round(x * zoomState.d) / zoomState.d / q) + 'px';
    popup.style.top = (Math.round(y * zoomState.d) / zoomState.d / q) + 'px';
    schedulePixelAlignment();
  }

  function open(button, source) {
    if (active && active.button === button) { close(false); return; }
    close(false);
    search = '';
    active = { button: button, source: source };
    // Keep the fixed anchor outside the scrolling element: IE Scrollbars
    // wraps scroll hosts, and that wrapper must stay inside our popup.
    popup = document.createElement('div');
    popup.className = 'w95-select-popup';
    menu = document.createElement('div');
    menu.className = 'w95-select-menu';
    menu.id = button.getAttribute('aria-controls');
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', button.getAttribute('aria-label'));
    rows = Array.from(source.options).map(function (option, i) {
      var row = document.createElement('div');
      row.className = 'w95-select-option';
      row.id = menu.id + '-option-' + i;
      row.setAttribute('role', 'option');
      row.setAttribute('aria-disabled', String(option.disabled));
      row.w95Text = option.text;
      row.addEventListener('pointermove', function () { if (!option.disabled) highlight(i); });
      row.addEventListener('click', function () { highlight(i); commit(); });
      menu.appendChild(row);
      return row;
    });
    // Retain focus on the combobox, including when clicking its list.
    menu.addEventListener('pointerdown', function (event) { event.preventDefault(); });
    popup.appendChild(menu);
    document.body.appendChild(popup);
    popup.style.zoom = elementZoom();
    rows.forEach(paintRow);
    button.setAttribute('aria-expanded', 'true');
    button.focus({ preventScroll: true });
    position();
    highlight(Math.max(0, source.selectedIndex));
  }

  function configure(button, source) {
    button.type = 'button';
    button.setAttribute('role', 'combobox');
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'w95-select-list-' + (++sequence));
    button.setAttribute('aria-label', 'Artists beginning with ' + source.options[0].text.trim());
    button.addEventListener('click', function () { open(button, source); });
    // The label inverts on keyboard focus; repaint once styles have settled.
    button.addEventListener('focus', function () {
      requestAnimationFrame(function () { paintLabel(button, source); });
    });
    button.addEventListener('blur', function () { paintLabel(button, source); });
    button.addEventListener('keydown', function (event) {
      var key = event.key;
      if (key === 'Tab') { close(false); return; }
      if (key === 'Escape') { close(true); event.preventDefault(); return; }
      if (key === 'Enter' || key === ' ' || key === 'ArrowDown' || key === 'ArrowUp' ||
          key === 'Home' || key === 'End' || key === 'PageDown' || key === 'PageUp') {
        event.preventDefault();
        if (!active || active.button !== button) { open(button, source); return; }
        if (key === 'Enter' || key === ' ' || (event.altKey && key === 'ArrowUp')) { commit(); return; }
        var next = key === 'Home' ? 0 : key === 'End' ? rows.length - 1 :
          index + (key === 'ArrowUp' ? -1 : key === 'PageUp' ? -8 : key === 'PageDown' ? 8 : 1);
        var direction = next < index ? -1 : 1;
        while (source.options[next] && source.options[next].disabled) next += direction;
        if (source.options[next]) highlight(next);
      } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        if (!active || active.button !== button) open(button, source);
        clearTimeout(searchTimer);
        search += key.toLowerCase();
        var prefix = Array.from(search).every(function (char) { return char === search[0]; }) ? search[0] : search;
        for (var step = 1; step <= rows.length; step++) {
          var candidate = (index + step) % rows.length;
          if (!source.options[candidate].disabled && rows[candidate].textContent.trim().toLowerCase().startsWith(prefix)) {
            highlight(candidate); break;
          }
        }
        searchTimer = setTimeout(function () { search = ''; }, 700);
      }
    });
  }

  function enhanceTouchPickers() {
    // Keep real selects over the letters on phones/tablets so a direct tap
    // opens the OS picker. Width only controls the artwork layout: a narrow
    // desktop window should still use our custom dropdowns.
    var nativePickers = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    // The GoLive touch layer positions its direct children. Keep its geometry
    // properties on our replacement buttons and use the original event path.
    document.querySelectorAll('.alphabet-touch-pickers > select').forEach(function (picker) {
      // Pickers created after init may inherit the hidden source's class.
      picker.classList.remove('w95-select-source');
      if (nativePickers) return;
      var source = document.querySelector('#' + picker.alphabetLetter.toLowerCase() + 'list select');
      if (!source || !source.w95Button) return;
      var button = document.createElement('button');
      button.className = 'w95-select-touch';
      button.style.cssText = picker.style.cssText;
      button.alphabetLetter = picker.alphabetLetter;
      button.desktopStyle = picker.desktopStyle;
      configure(button, source);
      picker.replaceWith(button);
    });
  }

  function init() {
    document.querySelectorAll('div[id$="list"] select').forEach(function (source) {
      if (!/^[a-z]list$/.test(source.closest('div[id]').id) || source.multiple) return;
      var button = document.createElement('button');
      button.className = 'w95-select';
      var label = document.createElement('span');
      label.className = 'w95-select-label';
      var arrow = document.createElement('span');
      arrow.className = 'w95-select-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      button.append(label, arrow);
      configure(button, source);
      source.w95Button = button;
      pairs.push({ button: button, source: source });
      button.style.zoom = elementZoom();
      source.insertAdjacentElement('afterend', button);
      paintLabel(button, source);
      source.classList.add('w95-select-source');
      source.closest('form').classList.add('w95-select-form');
      source.addEventListener('change', function () { paintLabel(button, source); });
    });
    enhanceTouchPickers();
    document.addEventListener('pointerdown', function (event) {
      if (active && !popup.contains(event.target) && !active.button.contains(event.target)) close(false);
    });
    document.addEventListener('focusin', function (event) {
      if (active && event.target !== active.button && !popup.contains(event.target)) close(false);
    });
    window.addEventListener('resize', function () { position(); schedulePixelAlignment(); });
    window.addEventListener('scroll', function (event) {
      if (active && !popup.contains(event.target)) position();
      schedulePixelAlignment();
    }, true);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', position);
      window.visualViewport.addEventListener('scroll', position);
    }
    // GoLive can hide a letter's field when a different letter is clicked.
    var observer = new MutationObserver(position);
    document.querySelectorAll('div[id$="list"]').forEach(function (layer) {
      if (/^[a-z]list$/.test(layer.id)) observer.observe(layer, { attributes: true, attributeFilter: ['style'] });
    });
  }
  // Watch the exact current DPR, then re-arm after every change. Threshold
  // queries alone miss changes such as 120% -> 140% within the same strike.
  var densityQuery;
  function watchDensity() {
    if (!window.matchMedia) return;
    if (densityQuery) {
      if (densityQuery.removeEventListener) densityQuery.removeEventListener('change', densityChanged);
      else if (densityQuery.removeListener) densityQuery.removeListener(densityChanged);
    }
    densityQuery = window.matchMedia('(resolution: ' + zoomState.d + 'dppx)');
    if (densityQuery.addEventListener) densityQuery.addEventListener('change', densityChanged);
    else if (densityQuery.addListener) densityQuery.addListener(densityChanged);
  }
  function densityChanged() {
    recheckScaling();
    watchDensity();
  }
  watchDensity();
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', recheckScaling);
  }
  window.addEventListener('resize', recheckScaling);
  window.addEventListener('pageshow', densityChanged);
  document.addEventListener('alphabetpickersready', enhanceTouchPickers);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
