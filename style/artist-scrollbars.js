/* Secret alphabox palettes. Each row is artist | private nickname | face |
   track | arrow | finish | edges | optional start face | optional end face.
   Nothing is saved between page visits.
   solid/check use classic IE colors; wash adds a quiet thumb gradient.
   Faces mostly use sampled cover colors. Tracks use cover colors or lighter
   related tints, with explicit dark-track exceptions in the luminance audit.
   Character palettes and requested artist treatments remain individual.
   Non-bevel edges use only the four original IE edge colors. */
(function () {
  'use strict';
  var recipes = `
abba|Arrival gold|edb806|ffffff|253324|solid|rim
adamson|Taxi-meter brass|eae089|302424|2c1d20|solid|bevel
air|Pocket calculator amber|f0ae72|fff2de|380c0b|check|flush
alesini|Marco Polo moss|767f46|94ae64|1f2324|solid|line
alpert|Tangerine and whipped-cream olive|637c28|ffcc88|ffcc88|solid|bevel
anderson|Carousel brass|535087|af98ac|ffffff|solid|bevel
armatrading|Walk-under-ladders red|cc5750|ffffff|030102|solid|line
arnold|Cattle-call sage|d4b78b|f2e9d5|27252a|solid|bevel
art|Noise-mask yellow|fcf94c|ffffff|926d64|solid|frame
beach|Surfboard blue|588eaa|fefefe|102739|check|bevel
beatles|Submarine yellow|e2d33c|ded2ac|2f2627|solid|rim
beck|Broken-radio green|6abc4d|d6e5e0|6c222f|solid|rim
blondie|Heart-of-glass silver|f9f8f4|ffffff|0d0e12|solid|line
boston|Spaceship copper|9e463c|c08780|050402|solid|frame
bowie|Space-oddity teal|44766b|067994|ffffff|solid|frame
bowwow|Pirate jungle green|a2bc97|e4ebd9|0a0106|solid|bevel
brook|Infinite-guitar sea glass|98a496|bcc4bb|292c3b|wash|flush|b5bdb3
brown|Guit-steel lacquer|954e2e|faeed4|faeed4|solid|bevel
buggles|Video-radio mustard|f5e8c5|fffcf9|784439|solid|frame
byrne|Big-suit chalk blue|97b8d9|f7f4ef|72514c|solid|line
cadell|Angel-for-breakfast blue|7b8fa7|c1dce3|08090e|solid|bevel
california|Interlocking guitar blue|597fae|afd5e0|000000|check|bevel
carlos|Switched-on ivory|907e70|cdbaa9|1d0f0e|solid|frame
cars|Candy-apple trim|af8d68|f7fcf8|fdfff7|solid|rim
childs|House-of-hope slate|505e5f|ffffff|ffffff|solid|bevel
cibo|Viva tomato|e78844|ffffff|0b0b0b|solid|frame
cline|Jukebox rosewood|b89a8f|f7ebdf|19171a|solid|bevel
cocteau|Garlands graphite|686e7c|9a9da6|ffffff|wash|line
coldcut|Sampler-board green|898266|aabf94|030102|check|frame
cole|Pedal-steel chartreuse|a0bb54|d8e5ae|000000|solid|bevel
combustible|Lounge cherrywood|b69572|d0baa3|211114|solid|bevel
cruise|Floating-in-the-night ink|44585a|bac9c5|eef1e6|wash|flush
darling|Cello midnight blue|315a76|6c96ae|ffffff|solid|bevel
dead|Incense amber|d4c08b|f3e8cb|040605|solid|bevel
deee-lite|Groove grape|a991b3|ebe4d6|36283f|check|rim
deep|Forest canopy|5a8941|faf3e9|1d3021|solid|bevel
dela|Daisy-age mauve|bfa1bc|f0ecd7|462c44|check|rim
devo|Are we not men control panel|5a8b37|fae900|1d2914|solid|frame|c54032|356bc4
djshadow|Record-crate cardboard|75775f|a09577|242321|solid|flush
dolby|Laboratory dial brass|8f6e5b|a09da4|d7d3c7|check|rim
eagles|Saddle leather and parchment|a77c50|e8d9bc|38291e|solid|bevel
eckert|Opera brass plate|3c434d|eeeced|eeeced|solid|bevel
electric|Chamber parchment|e5dcbb|f3eed0|14080c|solid|rim
elliott|Cartoon cel orange|cfa889|fafbf6|443933|solid|bevel
emergency|Broadcast signal green|3d3f4b|81828a|c9b695|check|frame
enigma|Monastery copper|653b6b|7e75a4|ffffff|solid|rim
eno-b|Airport map paper|a5ad76|fffeef|000000|solid|flush
eno-r|Voice-of-the-piano stone|d9ceba|fffdf5|23221d|wash|flush
enya|Moonlit silver|1d1d1d|dbdbdb|dbdbdb|solid|flush
esquivel|Space-age plum|9e8b9e|e4e0d4|312632|solid|rim
eurythmics|Sweet-dream silver|a8a8a8|ffffff|000000|solid|line
everly|Malt-shop ivory|cfd0ca|f8f8f8|212322|solid|bevel
fantomas|Suspense-celluloid amber|dadfc8|e9ecde|091113|solid|frame
fatboy|Record-shelf wood|c6914d|c9b986|231f1e|solid|rim
fats|Comet red oxide|ac2f11|8f8079|f2f2f2|solid|line
foetus|Red incision|c5292c|fefefe|fefefe|solid|frame
forest|Psychedelic bark|d9b64e|e6d08c|293036|check|line
fountains|Lawn-sprinkler red brick|994f4e|f3e0d1|f3e0d1|solid|line
fripp|Tape-loop fog|9685b2|ffffff|ffffff|wash|flush
gabriel|Sledgehammer cyan|0896be|f9f7e0|0d0f04|solid|rim
gasparyan|Duduk apricot wood|817e6f|adaba1|000000|solid|bevel
hagen|Cabaret plum|ad829a|ebded8|382632|solid|frame
haircut|Favourite-shirt khaki|351a21|f5d6d3|f5d6d3|solid|bevel
hapa|Island cane|bb9952|fcfafb|37230b|solid|bevel
harmonic|Overtone sunrise|b08745|aeaeae|000000|solid|bevel
harris|Silver-thread charcoal|a6a6a8|f5f6f8|0d1017|solid|bevel
hitmen|Private-eye sea green|107065|fefefe|fefefe|solid|rim
icehouse|Australian terracotta|c4794f|c4b2b2|000000|press-blue|line
isaak|Wicked-game sea glass|b7c0bf|edf4ed|2e2f27|solid|bevel
isbitz|Blue Gardenia linen|9394c2|efebe8|2f2071|solid|bevel
jackson-j|Steppin-out streetlight|3e64a2|ffffff|ffffff|solid|bevel
jackson-m|Moonwalk pearl|d3d4c6|e3e4d2|0e1213|solid|rim
japan|Polaroid amber|c4b29e|ffffff|0d0c0a|solid|line
jarre|Oxygene instrument panel|e89722|ecc793|000000|solid|frame
jude|Confessional bottle green|a0bc96|e5ddca|1e2726|solid|bevel
king|Discipline steel|7e98a7|b8ccd5|2e353b|solid|bevel
kraftwerk|Radio-activity chassis|f3f3f3|000000|000000|check|frame
landscape|Einstein's brass telescope|fbf9ec|ffffff|2f261d|solid|rim
lang|Ingenue sepia|b29255|f8f3ed|502f26|solid|bevel
lanterna|Lantern-paper cream|928c8e|ffffff|212121|solid|flush
lastyle|Rave flyer white|f7f7f7|ffffff|000000|solid|frame
lonesome|Roadside pie crust|927263|eddccc|2b2e35|solid|bevel
lovich|Lucky-number tea|d4d2bd|ffffff|261d18|solid|bevel
low|Amp-valve frost|8db1bf|d0e2ec|0c0d11|wash|flush
lucky|Honky-tonk gold|bcb3a4|fdeecd|000000|solid|bevel
manhattan|Art-deco scarlet trim|d73240|ffffff|ffffff|solid|bevel
marley|Sunshine dub gold|cea93f|fae5ad|a7141c|solid|bevel
martha|Echo-beach coral|f65d4b|fdfeff|801618|solid|rim
massive|Mezzanine graphite|44433f|fefefe|ffffff|solid|flush
material|Dub bass copper|b66961|c09489|040406|solid|line
mc900|Truth in industrial grey|645e68|978f9a|f1eee4|check|frame
mcferrin|Don't-worry green room|636363|fdfdfd|000000|solid|flush
mclaren|Buffalo-gal brickwork|955e49|e1634c|1a1a10|solid|rim
mills|Barbershop shellac|d1c6ce|fbf8fa|44397d|solid|bevel
ministry|Industrial moss|718176|f2cd02|1b1813|check|frame
mitchell|Blue river|00195f|6384ad|6384ad|solid|bevel
morricone|Pocket-watch ochre|d59b13|ffffff|1c0f07|solid|bevel
naked|Film-noir newsprint|908583|ada3a1|2a2220|solid|frame
negativland|Inverted Windows chrome|3f3f3f|3f3f3f|ffffff|negative|negative
nine|Oxidized nail|b55c9e|8f9ec9|070d0d|solid|line
numan|Android amber display|956b45|b49265|141311|solid|line
nylons|Bowling-shirt red trim|d0d0d0|ffffff|000000|solid|flush
oingo|Skeleton-party green|38a758|7db787|1a1011|solid|rim
orbison|Jukebox blue velvet|136aba|4aa2d0|d6ddd5|solid|bevel
orchestral|Enola-Gay dial green|aef4d0|d6fae8|62484b|solid|line
penguin|Cafe table blue|98aed3|d4dbee|000000|solid|flush
perrey|Moog plum|b6a0b5|eae4d5|3f2c40|check|rim
pink|Dark Side prism|010101|80817b|ffffff|prism|line
polonsky|Pocket-rocket copper|e29f84|f3e8ec|091416|solid|bevel
public|Alarm-clock gold|e1c15c|ecd795|00020e|solid|frame
quasi|Field-study mint|53ada1|d8eee7|000000|solid|bevel
queen|Crown ivory|ac9c8c|ffffff|000000|solid|rim
radiohead|OK-computer frost|99bacd|ffffff|000000|check|line
ramones|Leather-jacket trim|748386|c0c4b6|000000|solid|rim
redbone|Maple-moustache varnish|aba76a|c7d3c9|41383b|solid|bevel
roches|Kitchen-table linen|b9b4ae|fcfef9|211c16|solid|bevel
roxy|Avalon champagne|f1d4a8|f6e4c9|36312d|solid|line
severed|Tape-splice lead|a4a4a4|f5f5f5|090909|check|frame
shaggs|School-gym olive|ded4a3|fffef4|110d0a|solid|bevel
siberry|Bird-song sea glass|6e8686|bbc7c4|312725|solid|bevel
smith|Hayfield sepia|ad6946|c48b56|000000|solid|bevel
SPK|Factory enamel green|9eb388|c0ceb2|192324|check|line
stalling|Animation-cel parchment|bcab91|fffeeb|000000|solid|bevel
summer|Hot-stuff rosewood|cc7860|ddb39b|040507|solid|bevel
sylvian|Porcelain sepia|c9b59c|fdfaf5|715b43|wash|bevel
synergy|Sequencer flight console|f5c86b|153246|153246|wash|orbit
talking|Nude chrome|c69d86|f3e7dc|402b24|solid|rim
third|Baseball-glove tan|bd945e|d6c496|394f5c|solid|bevel
this|Ghostly newsprint|7d8570|dbd2b3|000104|solid|flush
tipsy|Cocktail olive and plum|aa97a7|e5e4cf|352b34|solid|rim
tomtom|Genius-of-love garden|737f69|ffffff|ffffff|check|rim
trees|Phantom-orchard amber|615b3b|889673|ffffff|solid|line
u2|Joshua-tree road dust|969895|fefefe|030504|solid|bevel
ultravox|Vienna marble|747071|ffffff|ffffff|solid|flush
underworld|Born-slippy photocopy|dedede|ffffff|020305|check|frame
united|Flying-saucer mustard|2e2c2d|c6935a|d4c5ae|solid|line
vangelis|Replicant rain on brass|d4ad68|2f425c|8dcbd7|mist
velvet|Banana peel|132322|ddd8d2|ddd8d2|solid|bevel
visage|Fade-to-grey pewter|858e9d|d6d6cc|020202|solid|rim
waits|Whiskey-bar nicotine|e3c587|faf8ee|030d0c|solid|bevel
warnes|Raincoat-blue lining|a0a0a0|ffffff|141414|solid|bevel
welch|Appalachian silver|bfbfbf|f5f5f5|000000|solid|bevel
whitman|Yodelling postcard straw|e8cd8a|fffbee|121413|solid|bevel
wilbrandt|Harpsichord bottle blue|98bcd2|bcd3e2|050414|solid|line
winston|December snow|46616a|b1ced4|ffffff|wash|bevel
worrell|Mothership plum|ab96bb|e9e3d6|3c2e48|solid|rim
xtc|Garden-of-senses green|292728|717075|9c9794|solid|bevel
yello|Original Yello demo|ffcc00|2b1a4d|1a1a1a|solid|demo
ymo|Yellow-magic console|757670|d5d4d2|ffffff|check|line
zappa|Cosmik grape|b79fc1|e9e3d5|402c4a|solid|bevel
`;
  var palettes = Object.create(null);
  recipes.trim().split('\n').forEach(function (row) {
    var cells = row.split('|');
    palettes[cells[0].toLowerCase()] = cells.slice(1);
  });

  function artist(url) {
    var match = url.pathname.match(/\/pages\/([^/]+)\.html$/i);
    if (!match) return '';
    var slug = match[1].toLowerCase();
    // Keep digits belonging to artist names (U2 and MC 900 Foot Jesus).
    if (palettes[slug]) return slug;
    if (slug === 'u22') return 'u2';
    return slug.replace(/\d+$/, '');
  }

  var paletteStyle;

  function mix(color, other, amount) {
    return '#' + [1, 3, 5].map(function (offset) {
      var a = parseInt(color.slice(offset, offset + 2), 16);
      var b = parseInt(other.slice(offset, offset + 2), 16);
      return Math.round(a + (b - a) * amount).toString(16).padStart(2, '0');
    }).join('');
  }

  function reveal(palette) {
    var face = '#' + palette[1], track = '#' + palette[2], ink = '#' + palette[3];
    var finish = palette[4];
    var properties = {
      '--ie-face': face,
      '--ie-3dlight': mix(face, '#ffffff', 0.28),
      '--ie-highlight': mix(face, '#ffffff', 0.72),
      '--ie-shadow': mix(face, '#000000', 0.38),
      '--ie-darkshadow': mix(face, '#000000', 0.68),
      '--ie-arrow': ink,
      '--ie-track': track,
      // Matching check colors give a flat track without changing the library's
      // track mode. The checked palettes use a small luminance difference.
      '--ie-scrollbar-track-dither-a-color': track,
      '--ie-scrollbar-track-dither-b-color': finish === 'check' ? mix(track, face, 0.3) : track,
      '--ie-scrollbar-thumb-background-image': finish === 'wash'
        ? 'linear-gradient(160deg, ' + mix(face, '#ffffff', 0.28) + ', ' + face + ' 75%)' : 'none',
      '--ie-scrollbar-thumb-background-size': 'auto'
    };
    var edges = palette[5];
    if (edges === 'frame' || edges === 'rim') {
      properties['--ie-3dlight'] = ink;
      properties['--ie-darkshadow'] = ink;
      properties['--ie-highlight'] = edges === 'frame' ? ink : track;
      properties['--ie-shadow'] = properties['--ie-highlight'];
    } else if (edges === 'line' || edges === 'flush') {
      properties['--ie-3dlight'] = edges === 'line' ? ink : face;
      properties['--ie-darkshadow'] = properties['--ie-3dlight'];
      properties['--ie-highlight'] = face;
      properties['--ie-shadow'] = face;
    }
    if (edges === 'orbit') {
      properties['--ie-3dlight'] = ink;
      properties['--ie-darkshadow'] = ink;
      properties['--ie-highlight'] = '#92becd';
      properties['--ie-shadow'] = '#92becd';
    }
    // Directional faces let DEVO split red/blue and Brook match just the
    // top button to the start of its thumb gradient.
    if (palette[6]) {
      ['start', 'end'].forEach(function (direction, index) {
        if (!palette[6 + index]) return;
        var buttonFace = '#' + palette[6 + index];
        var prefix = '--ie-scrollbar-button-' + direction + '-';
        properties[prefix + 'face-color'] = buttonFace;
        properties[prefix + '3dlight-color'] = edges === 'flush' ? buttonFace : '#222222';
        properties[prefix + 'highlight-color'] = buttonFace;
        properties[prefix + 'shadow-color'] = buttonFace;
        properties[prefix + 'darkshadow-color'] = edges === 'flush' ? buttonFace : '#222222';
        if (edges !== 'flush') properties['--ie-scrollbar-arrow-' + direction + '-color'] = '#ffffff';
      });
    }
    // Exact original IE declarations from the user's chosen Yello demo.
    if (edges === 'demo') {
      properties['--ie-3dlight'] = '#fff2b3';
      properties['--ie-highlight'] = '#ffffff';
      properties['--ie-shadow'] = '#997a00';
      properties['--ie-darkshadow'] = '#4d3d00';
    }
    // Preserve the Vangelis palette, bevels, checks, and gradient exactly.
    if (finish === 'mist') {
      properties['--ie-3dlight'] = face;
      properties['--ie-highlight'] = ink;
      properties['--ie-shadow'] = track;
      properties['--ie-darkshadow'] = track;
      properties['--ie-arrow'] = track;
      properties['--ie-scrollbar-track-dither-b-color'] = face;
      properties['--ie-scrollbar-thumb-background-image'] =
        'linear-gradient(160deg, ' + ink + '66, transparent 65%)';
    }
    // RGB complements of every default Windows/IE color, including checks.
    if (finish === 'negative') {
      properties['--ie-3dlight'] = '#3f3f3f';
      properties['--ie-highlight'] = '#000000';
      properties['--ie-shadow'] = '#7f7f7f';
      properties['--ie-darkshadow'] = '#ffffff';
      properties['--ie-scrollbar-track-dither-a-color'] = '#3f3f3f';
      properties['--ie-scrollbar-track-dither-b-color'] = '#000000';
    }
    if (finish === 'prism') {
      // Five spectrum colors sampled from the Dark Side cover's light beam.
      // Keep the buttons plain black; the rainbow crosses only the thumb.
      properties['--ie-scrollbar-thumb-background-image'] =
        'linear-gradient(165deg, transparent 0 36%, #e13426 36% 40%, ' +
        '#f16d23 40% 44%, #ffed00 44% 48%, #1cac4d 48% 52%, ' +
        '#28a6bf 52% 56%, transparent 56%)';
    }
    if (finish === 'press-blue') {
      // The thumb press class is enabled by this documented drag setting.
      properties['--ie-scrollbar-thumb-pressed-invert'] = 'invert';
    }
    if (!paletteStyle) {
      paletteStyle = document.createElement('style');
      document.head.appendChild(paletteStyle);
    }
    // Scope public properties directly to the rendered bars as well as the
    // root. This updates already-mounted bars even when extensions were copied
    // onto a wrapper at mount time, and also covers future bars and the corner.
    var legacy = {
      'scrollbar-face-color': properties['--ie-face'],
      'scrollbar-3dlight-color': properties['--ie-3dlight'],
      'scrollbar-highlight-color': properties['--ie-highlight'],
      'scrollbar-shadow-color': properties['--ie-shadow'],
      'scrollbar-darkshadow-color': properties['--ie-darkshadow'],
      'scrollbar-arrow-color': properties['--ie-arrow']
    };
    // IE's track-color switches off its checkerboard. Leave that declaration
    // out for the checked palettes and for Vangelis's original checked track.
    if (finish !== 'check' && finish !== 'mist' && finish !== 'negative') {
      legacy['scrollbar-track-color'] = track;
    }
    paletteStyle.textContent = 'body {' + Object.keys(legacy).map(function (property) {
      return property + ':' + legacy[property] + ';';
    }).join('') + '} :root, .ie-scrollbar, .ie-scrollbar__corner {' +
      Object.keys(properties).map(function (property) {
        return property + ':' + properties[property] + ';';
      }).join('') + '}';
    if (finish === 'press-blue') {
      // Actual blue sampled from the Trojan Blue cover. State classes are
      // maintained by the scrollbar's pointer handlers and cleared on release.
      paletteStyle.textContent +=
        '.ie-scrollbar__thumb--pressed .ie-scrollbar__face,' +
        '.ie-scrollbar__button--pressed .ie-scrollbar__face {background-color:#71afe0;}' +
        '.ie-scrollbar__thumb--pressed .ie-scrollbar__bevel-inner,' +
        '.ie-scrollbar__button--pressed .ie-scrollbar__bevel-inner {border-color:#71afe0;}';
    }
  }

  document.addEventListener('change', function (event) {
    var picker = event.target;
    if (!picker.matches || !picker.matches('select') ||
        !picker.closest('div[id$="list"], .alphabet-touch-pickers')) return;
    if (!picker.value || picker.value === '#') return;
    var destination;
    try { destination = new URL(picker.value, document.baseURI); }
    catch (_) { return; }
    var current = new URL(window.location.href);
    var key = artist(current);
    if (!palettes[key] || destination.origin !== current.origin || artist(destination) !== key) return;

    // Capture before GoLive's inline onchange or the touch picker's forwarding
    // handler: stay on this album, preserving scroll position and playback.
    event.stopImmediatePropagation();
    reveal(palettes[key]);
    picker.selectedIndex = 0;
  }, true);
})();
