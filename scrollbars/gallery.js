/* Plain live examples for the CSS reference. */
(function () {
  var root = document.getElementById('examples');
  var legacyStyles = document.createElement('style');
  document.head.appendChild(legacyStyles);
  window.scrollbarExamples.forEach(function (example) {
    var sample = document.createElement('section');
    sample.className = 'sample';
    sample.id = example.property.replace(/^--/, '');
    sample.dataset.property = example.property;
    var heading = document.createElement('h3');
    heading.textContent = example.property + ': ' + example.value + ';';
    sample.appendChild(heading);
    var pair = document.createElement('div');
    pair.className = 'pair';
    var values = ['Before', 'After'];
    if (example.modes.indexOf('dot') !== -1) values.push('dot');
    values.forEach(function (label, index) {
      var variant = document.createElement('div');
      variant.className = 'variant ' + (index ? 'after' : 'before');
      var caption = document.createElement('p');
      caption.className = 'label';
      caption.textContent = label;
      var pane = document.createElement('div');
      pane.className = 'pane';
      pane.tabIndex = 0;
      pane.setAttribute('role', 'region');
      pane.setAttribute('aria-label', example.property + ': ' + label);
      var declarations = Object.assign({}, example.support);
      if (index) declarations[example.property] = index === 2 ? 'dot' : example.value;
      Object.keys(declarations).forEach(function (name) {
        // IE properties must stay in raw text; modern CSSOM discards them.
        if (name.indexOf('--ie-scrollbar-') === 0) pane.style.setProperty(name, declarations[name]);
        else if (name.indexOf('--ie-') === 0) variant.style.setProperty(name, declarations[name]);
      });
      var legacy = Object.keys(declarations).filter(function (name) { return name.indexOf('scrollbar-') === 0; });
      if (legacy.length) {
        legacyStyles.textContent += '#' + sample.id + ' .after .pane {' + legacy.map(function (name) { return name + ':' + declarations[name]; }).join(';') + '}\n';
      }
      if (example.modes.indexOf('border') !== -1) pane.style.border = '6px solid #888';
      if (example.modes.indexOf('short') !== -1) {
        pane.style.height = '76px';
        pane.style.overflowX = 'hidden';
      }
      var content = document.createElement('div');
      content.className = 'content';
      if (example.modes.indexOf('short') !== -1) content.style.width = 'auto';
      for (var line = 0; line < 24; line++) {
        var p = document.createElement('p');
        p.textContent = 'Scrolling content.';
        content.appendChild(p);
      }
      pane.appendChild(content);
      variant.appendChild(caption);
      variant.appendChild(pane);
      pair.appendChild(variant);
    });
    sample.appendChild(pair);
    var context = document.createElement('p');
    context.className = 'context';
    context.textContent = example.context || 'Only the named property changes.';
    sample.appendChild(context);
    var details = document.createElement('details');
    var summary = document.createElement('summary');
    summary.textContent = 'CSS';
    var code = document.createElement('pre');
    code.textContent = Object.keys(example.support).map(function (name) { return name + ': ' + example.support[name] + ';'; }).concat(example.property + ': ' + example.value + ';').join('\n');
    details.appendChild(summary);
    details.appendChild(code);
    sample.appendChild(details);
    root.appendChild(sample);
  });
  // This alias supplies the colour of an already-flat track.
  // Set up that state in both panes; the ordinary way to request it is
  // scrollbar-track-color, shown in its own example above.
  window.addEventListener('load', function () {
    var sample = document.getElementById('ie-track');
    function prepareFlatTracks() {
      var bars = sample.querySelectorAll('.ie-scrollbar');
      if (!bars.length) { requestAnimationFrame(prepareFlatTracks); return; }
      bars.forEach(function (bar) { bar.classList.add('ie-scrollbar--track-custom'); });
    }
    prepareFlatTracks();
  });
})();
