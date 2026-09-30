/* CSS examples. These values also appear in CSS.md. */
window.scrollbarExamples = [
  {
    "property": "scrollbar-face-color",
    "default": "`#C0C0C0`",
    "description": "Button and thumb fill.",
    "group": "IE properties",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "scrollbar-3dlight-color",
    "default": "`#C0C0C0`",
    "description": "Outer top and left bevel.",
    "group": "IE properties",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "scrollbar-highlight-color",
    "default": "`#FFFFFF`",
    "description": "Inner top and left bevel.",
    "group": "IE properties",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "scrollbar-shadow-color",
    "default": "`#808080`",
    "description": "Inner bottom and right bevel.",
    "group": "IE properties",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "scrollbar-darkshadow-color",
    "default": "`#000000`",
    "description": "Outer bottom and right bevel.",
    "group": "IE properties",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "scrollbar-arrow-color",
    "default": "`#000000`",
    "description": "Arrow colour.",
    "group": "IE properties",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "scrollbar-track-color",
    "default": "`#C0C0C0`",
    "description": "Track fill; replaces the checkerboard.",
    "group": "IE properties",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "scrollbar-base-color",
    "default": "Ignored",
    "description": "Recognised but ignored by this script. Set the individual colours instead.",
    "group": "IE properties",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": "Ignored: both samples stay grey."
  },
  {
    "property": "--ie-face",
    "default": "`#C0C0C0`",
    "description": "Button and thumb fill; corner fill; first track dither colour.",
    "group": "Palette",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-3dlight",
    "default": "`#C0C0C0`",
    "description": "Outer top/left bevel.",
    "group": "Palette",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-highlight",
    "default": "`#FFFFFF`",
    "description": "Inner top/left bevel; second track dither colour.",
    "group": "Palette",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-shadow",
    "default": "`#808080`",
    "description": "Inner bottom/right bevel.",
    "group": "Palette",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-darkshadow",
    "default": "`#000000`",
    "description": "Outer bottom/right bevel.",
    "group": "Palette",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-arrow",
    "default": "`#000000`",
    "description": "Arrow glyph fill.",
    "group": "Palette",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-track",
    "default": "`#C0C0C0`",
    "description": "Fill for a custom flat track; this value alone does not turn off dithering.",
    "group": "Palette",
    "value": "#d02060",
    "support": {},
    "modes": [
      "flat"
    ],
    "context": "A custom flat track. This alias alone does not enable flat-track mode."
  },
  {
    "property": "--ie-scrollbar-size",
    "default": "`16px`",
    "description": "Bar thickness and default square button size.",
    "group": "Geometry and flags",
    "value": "32px",
    "support": {
      "--ie-scrollbar-size": "16px"
    },
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-min-thumb-size",
    "default": "`32px`",
    "description": "Minimum thumb length, limited by available track space.",
    "group": "Geometry and flags",
    "value": "72px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-border-inset",
    "default": "Auto",
    "description": "Inset from the edge, detected from the right/bottom border. Set explicitly for asymmetric borders.",
    "group": "Geometry and flags",
    "value": "0px",
    "support": {
      "--ie-scrollbar-border-inset": "6px"
    },
    "modes": [
      "border"
    ],
    "context": "A 6px border; before uses an explicit 6px inset."
  },
  {
    "property": "--ie-scrollbar-border-inset-corners",
    "default": "`1`",
    "description": "Multiply the inset at the bar ends: `0` extends it to the corners; `1` keeps the inset.",
    "group": "Geometry and flags",
    "value": "0",
    "support": {
      "--ie-scrollbar-border-inset": "6px"
    },
    "modes": [
      "border"
    ],
    "context": "A 6px border and explicit 6px inset; only the ends change."
  },
  {
    "property": "--ie-scrollbar-small-track-half-thumb",
    "default": "`0`",
    "description": "`1`: use a half-track thumb when the track is shorter than 64px.",
    "group": "Geometry and flags",
    "value": "1",
    "support": {
      "--ie-scrollbar-size": "16px"
    },
    "modes": [
      "short"
    ],
    "context": "A 76px-tall pane; track shorter than 64px."
  },
  {
    "property": "--ie-scrollbar-blocky",
    "default": "`0`",
    "description": "`1`: square bevel corners and four-row triangle glyphs at every device pixel ratio. Does not change the track pattern.",
    "group": "Geometry and flags",
    "value": "1",
    "support": {},
    "modes": [],
    "context": "Rendered at 1.5 device pixels per CSS pixel."
  },
  {
    "property": "--ie-scrollbar-smooth",
    "default": "`0`",
    "description": "`1`: allow triangle/square glyph antialiasing. Dot glyphs are always antialiased. Does not enable smooth scrolling.",
    "group": "Geometry and flags",
    "value": "1",
    "support": {},
    "modes": [],
    "context": "Rendered at 1.5 device pixels per CSS pixel."
  },
  {
    "property": "--ie-scrollbar-track-dither-1px",
    "default": "`0`",
    "description": "`1`: use 1-device-pixel checkerboard cells. Default: floor(DPR) device pixels, at least one. The difference appears at DPR 2 and above.",
    "group": "Geometry and flags",
    "value": "1",
    "support": {},
    "modes": [],
    "context": "Rendered at 2.5 device pixels per CSS pixel."
  },
  {
    "property": "--ie-scrollbar-pressed-invert",
    "default": "`invert`",
    "description": "`none`: keep button bevels and glyph position unchanged while pressed. Other values use the pressed bevel and 1px glyph shift.",
    "group": "Geometry and flags",
    "value": "none",
    "support": {},
    "modes": [
      "button-pressed"
    ],
    "context": "Hold an arrow button to compare pressed bevels."
  },
  {
    "property": "--ie-scrollbar-thumb-pressed-invert",
    "default": "`none`",
    "description": "`invert`: invert the thumb bevel while dragging.",
    "group": "Geometry and flags",
    "value": "invert",
    "support": {},
    "modes": [
      "thumb-pressed"
    ],
    "context": "Hold a thumb to compare pressed bevels."
  },
  {
    "property": "--ie-scrollbar-bevel-width",
    "default": "`1px`",
    "description": "Fallback width for all four bevel edges.",
    "group": "Bevels and track",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-bevel-outer-light-width",
    "default": "Bevel width",
    "description": "Width of outer top/left edges.",
    "group": "Bevels and track",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-bevel-outer-dark-width",
    "default": "Bevel width",
    "description": "Width of outer bottom/right edges.",
    "group": "Bevels and track",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-bevel-inner-light-width",
    "default": "Bevel width",
    "description": "Width of inner top/left edges.",
    "group": "Bevels and track",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-bevel-inner-dark-width",
    "default": "Bevel width",
    "description": "Width of inner bottom/right edges.",
    "group": "Bevels and track",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-track-dither-a-color",
    "default": "`--ie-face`",
    "description": "Colour of checkerboard cell a.",
    "group": "Bevels and track",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-track-dither-b-color",
    "default": "`--ie-highlight`",
    "description": "Colour of checkerboard cell b.",
    "group": "Bevels and track",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-start-face-color",
    "default": "`--ie-face`",
    "description": "Start button fill.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-start-3dlight-color",
    "default": "`--ie-3dlight`",
    "description": "Start button bevel colour.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-start-highlight-color",
    "default": "`--ie-highlight`",
    "description": "Start button bevel colour.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-start-shadow-color",
    "default": "`--ie-shadow`",
    "description": "Start button bevel colour.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-start-darkshadow-color",
    "default": "`--ie-darkshadow`",
    "description": "Start button bevel colour.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-arrow-start-color",
    "default": "`--ie-arrow`",
    "description": "Start glyph fill.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-start-size",
    "default": "Bar size",
    "description": "Square button dimensions; glyph scales with this size.",
    "group": "Buttons",
    "value": "24px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-start-align",
    "default": "`flex-end`",
    "description": "Cross-axis alignment: `flex-start`, `center`, or `flex-end`. Useful for buttons narrower than the bar.",
    "group": "Buttons",
    "value": "flex-start",
    "support": {
      "--ie-scrollbar-button-start-size": "16px"
    },
    "modes": [],
    "context": "16px buttons inside a 32px bar."
  },
  {
    "property": "--ie-scrollbar-button-end-face-color",
    "default": "`--ie-face`",
    "description": "End button fill.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-end-3dlight-color",
    "default": "`--ie-3dlight`",
    "description": "End button bevel colour.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-end-highlight-color",
    "default": "`--ie-highlight`",
    "description": "End button bevel colour.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-end-shadow-color",
    "default": "`--ie-shadow`",
    "description": "End button bevel colour.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-end-darkshadow-color",
    "default": "`--ie-darkshadow`",
    "description": "End button bevel colour.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-arrow-end-color",
    "default": "`--ie-arrow`",
    "description": "End glyph fill.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-end-size",
    "default": "Bar size",
    "description": "Square button dimensions; glyph scales with this size.",
    "group": "Buttons",
    "value": "24px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-end-align",
    "default": "`flex-end`",
    "description": "Cross-axis alignment: `flex-start`, `center`, or `flex-end`. Useful for buttons narrower than the bar.",
    "group": "Buttons",
    "value": "flex-start",
    "support": {
      "--ie-scrollbar-button-end-size": "16px"
    },
    "modes": [],
    "context": "16px buttons inside a 32px bar."
  },
  {
    "property": "--ie-scrollbar-arrow-disabled-color",
    "default": "Direction arrow colour",
    "description": "Glyph fill when that direction has reached its scroll limit.",
    "group": "Buttons",
    "value": "#d02060",
    "support": {},
    "modes": [
      "disabled"
    ],
    "context": "At the top: the start arrow is disabled."
  },
  {
    "property": "--ie-scrollbar-glyph-start-shape",
    "default": "`triangle`",
    "description": "`triangle`, `square`, or `dot`; other values use triangle.",
    "group": "Glyphs",
    "value": "square",
    "support": {},
    "modes": [
      "dot"
    ],
    "context": "The extra sample shows dot; triangle is the default."
  },
  {
    "property": "--ie-scrollbar-glyph-start-image",
    "default": "`none`",
    "description": "CSS image (for example `url(...)`); replaces the built-in glyph.",
    "group": "Glyphs",
    "value": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/star.svg')",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-glyph-start-size",
    "default": "`contain`",
    "description": "Custom image background size; does not resize built-in glyphs.",
    "group": "Glyphs",
    "value": "10px 10px",
    "support": {
      "--ie-scrollbar-glyph-start-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/star.svg')"
    },
    "modes": [],
    "context": "Using a custom star image."
  },
  {
    "property": "--ie-scrollbar-glyph-start-offset-x",
    "default": "`0px`",
    "description": "Horizontal glyph offset.",
    "group": "Glyphs",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-glyph-start-offset-y",
    "default": "`0px`",
    "description": "Vertical glyph offset.",
    "group": "Glyphs",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-glyph-start-center-triangle",
    "default": "`0`",
    "description": "`1`: center the triangle precisely. The original bias is tiny; the result may look unchanged.",
    "group": "Glyphs",
    "value": "1",
    "support": {},
    "modes": [],
    "context": "Removes a 0.001px bias at the original button size; usually looks unchanged."
  },
  {
    "property": "--ie-scrollbar-glyph-end-shape",
    "default": "`triangle`",
    "description": "`triangle`, `square`, or `dot`; other values use triangle.",
    "group": "Glyphs",
    "value": "square",
    "support": {},
    "modes": [
      "dot"
    ],
    "context": "The extra sample shows dot; triangle is the default."
  },
  {
    "property": "--ie-scrollbar-glyph-end-image",
    "default": "`none`",
    "description": "CSS image (for example `url(...)`); replaces the built-in glyph.",
    "group": "Glyphs",
    "value": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/star.svg')",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-glyph-end-size",
    "default": "`contain`",
    "description": "Custom image background size; does not resize built-in glyphs.",
    "group": "Glyphs",
    "value": "10px 10px",
    "support": {
      "--ie-scrollbar-glyph-end-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/star.svg')"
    },
    "modes": [],
    "context": "Using a custom star image."
  },
  {
    "property": "--ie-scrollbar-glyph-end-offset-x",
    "default": "`0px`",
    "description": "Horizontal glyph offset.",
    "group": "Glyphs",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-glyph-end-offset-y",
    "default": "`0px`",
    "description": "Vertical glyph offset.",
    "group": "Glyphs",
    "value": "3px",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-glyph-end-center-triangle",
    "default": "`0`",
    "description": "`1`: center the triangle precisely. The original bias is tiny; the result may look unchanged.",
    "group": "Glyphs",
    "value": "1",
    "support": {},
    "modes": [],
    "context": "Removes a 0.001px bias at the original button size; usually looks unchanged."
  },
  {
    "property": "--ie-scrollbar-button-start-background-image",
    "default": "`none`",
    "description": "CSS image or gradient.",
    "group": "Textures",
    "value": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-start-background-position",
    "default": "`50% 50%`",
    "description": "CSS background position.",
    "group": "Textures",
    "value": "left top",
    "support": {
      "--ie-scrollbar-button-start-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
      "--ie-scrollbar-button-start-background-size": "10px 10px",
      "--ie-scrollbar-button-start-background-repeat": "no-repeat"
    },
    "modes": [],
    "context": "A 10px texture, without tiling."
  },
  {
    "property": "--ie-scrollbar-button-start-background-size",
    "default": "`auto`",
    "description": "CSS background size.",
    "group": "Textures",
    "value": "16px 16px",
    "support": {
      "--ie-scrollbar-button-start-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')"
    },
    "modes": [],
    "context": "Using the same 8px texture."
  },
  {
    "property": "--ie-scrollbar-button-start-background-repeat",
    "default": "`repeat`",
    "description": "CSS background repeat.",
    "group": "Textures",
    "value": "no-repeat",
    "support": {
      "--ie-scrollbar-button-start-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
      "--ie-scrollbar-button-start-background-size": "10px 10px"
    },
    "modes": [],
    "context": "A 10px texture."
  },
  {
    "property": "--ie-scrollbar-button-end-background-image",
    "default": "`none`",
    "description": "CSS image or gradient.",
    "group": "Textures",
    "value": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-button-end-background-position",
    "default": "`50% 50%`",
    "description": "CSS background position.",
    "group": "Textures",
    "value": "left top",
    "support": {
      "--ie-scrollbar-button-end-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
      "--ie-scrollbar-button-end-background-size": "10px 10px",
      "--ie-scrollbar-button-end-background-repeat": "no-repeat"
    },
    "modes": [],
    "context": "A 10px texture, without tiling."
  },
  {
    "property": "--ie-scrollbar-button-end-background-size",
    "default": "`auto`",
    "description": "CSS background size.",
    "group": "Textures",
    "value": "16px 16px",
    "support": {
      "--ie-scrollbar-button-end-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')"
    },
    "modes": [],
    "context": "Using the same 8px texture."
  },
  {
    "property": "--ie-scrollbar-button-end-background-repeat",
    "default": "`repeat`",
    "description": "CSS background repeat.",
    "group": "Textures",
    "value": "no-repeat",
    "support": {
      "--ie-scrollbar-button-end-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
      "--ie-scrollbar-button-end-background-size": "10px 10px"
    },
    "modes": [],
    "context": "A 10px texture."
  },
  {
    "property": "--ie-scrollbar-thumb-background-image",
    "default": "`none`",
    "description": "CSS image or gradient.",
    "group": "Textures",
    "value": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-thumb-background-position",
    "default": "`50% 50%`",
    "description": "CSS background position.",
    "group": "Textures",
    "value": "left top",
    "support": {
      "--ie-scrollbar-thumb-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
      "--ie-scrollbar-thumb-background-size": "10px 10px",
      "--ie-scrollbar-thumb-background-repeat": "no-repeat"
    },
    "modes": [],
    "context": "A 10px texture, without tiling."
  },
  {
    "property": "--ie-scrollbar-thumb-background-size",
    "default": "`auto`",
    "description": "CSS background size.",
    "group": "Textures",
    "value": "16px 16px",
    "support": {
      "--ie-scrollbar-thumb-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')"
    },
    "modes": [],
    "context": "Using the same 8px texture."
  },
  {
    "property": "--ie-scrollbar-thumb-background-repeat",
    "default": "`repeat`",
    "description": "CSS background repeat.",
    "group": "Textures",
    "value": "no-repeat",
    "support": {
      "--ie-scrollbar-thumb-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
      "--ie-scrollbar-thumb-background-size": "10px 10px"
    },
    "modes": [],
    "context": "A 10px texture."
  },
  {
    "property": "--ie-scrollbar-track-background-image",
    "default": "`none`",
    "description": "CSS image or gradient.",
    "group": "Textures",
    "value": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
    "support": {},
    "modes": [],
    "context": ""
  },
  {
    "property": "--ie-scrollbar-track-background-position",
    "default": "`50% 50%`",
    "description": "CSS background position.",
    "group": "Textures",
    "value": "left top",
    "support": {
      "--ie-scrollbar-track-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
      "--ie-scrollbar-track-background-size": "10px 10px",
      "--ie-scrollbar-track-background-repeat": "no-repeat"
    },
    "modes": [],
    "context": "A 10px texture, without tiling."
  },
  {
    "property": "--ie-scrollbar-track-background-size",
    "default": "`auto`",
    "description": "CSS background size.",
    "group": "Textures",
    "value": "16px 16px",
    "support": {
      "--ie-scrollbar-track-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')"
    },
    "modes": [],
    "context": "Using the same 8px texture."
  },
  {
    "property": "--ie-scrollbar-track-background-repeat",
    "default": "`repeat`",
    "description": "CSS background repeat.",
    "group": "Textures",
    "value": "no-repeat",
    "support": {
      "--ie-scrollbar-track-background-image": "url('https://raw.githubusercontent.com/dancing-about-architecture/IE-Scrollbars/main/examples/assets/checks.svg')",
      "--ie-scrollbar-track-background-size": "10px 10px"
    },
    "modes": [],
    "context": "A 10px texture."
  }
];
