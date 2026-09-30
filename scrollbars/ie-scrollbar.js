// IE-style scrollbars. Standalone script.

(function (global) {
  "use strict";

  // Styles
  var SCROLLBAR_CSS = [
    ".ie-scrollbar-host {",
    "  scrollbar-width: none;",
    "  -ms-overflow-style: none;",
    "}",
    ".ie-scrollbar-host::-webkit-scrollbar {",
    "  display: none;",
    "}",
    ":root {",
    "  --ie-face: #C0C0C0;",
    "  --ie-3dlight: #C0C0C0;",
    "  --ie-highlight: #FFFFFF;",
    "  --ie-shadow: #808080;",
    "  --ie-darkshadow: #000000;",
    "  --ie-arrow: #000000;",
    "  --ie-track: #C0C0C0;",
    "}",
    ".ie-scrollbar {",
    "  --ie-button-face: var(--ie-face);",
    "  --ie-button-3dlight: var(--ie-3dlight);",
    "  --ie-button-highlight: var(--ie-highlight);",
    "  --ie-button-shadow: var(--ie-shadow);",
    "  --ie-button-darkshadow: var(--ie-darkshadow);",
    "  --ie-button-arrow: var(--ie-arrow);",
    "  --ie-face-texture-image: var(--ie-scrollbar-thumb-background-image, none);",
    "  --ie-face-texture-position: var(--ie-scrollbar-thumb-background-position, 50% 50%);",
    "  --ie-face-texture-size: var(--ie-scrollbar-thumb-background-size, auto);",
    "  --ie-face-texture-repeat: var(--ie-scrollbar-thumb-background-repeat, repeat);",
    "}",
    ".ie-scrollbar {",
    "  --ie-track-dither-a: var(--ie-scrollbar-track-dither-a-color, var(--ie-face));",
    "  --ie-track-dither-b: var(--ie-scrollbar-track-dither-b-color, var(--ie-highlight));",
    "  --ie-track-cell: 1px;",
    "  position: absolute;",
    "  top: calc(var(--ie-scrollbar-border-inset, 0px) * var(--ie-scrollbar-border-inset-corners, 1));",
    "  right: var(--ie-scrollbar-border-inset, 0px);",
    "  width: var(--ie-scrollbar-size, 16px);",
    "  bottom: calc(var(--ie-scrollbar-border-inset, 0px) * var(--ie-scrollbar-border-inset-corners, 1));",
    "  display: flex;",
    "  flex-direction: column;",
    "  user-select: none;",
    "  font-size: 0;",
    "  z-index: 0;",
    "  background-color: var(--ie-track-dither-b);",
    "}",
    ".ie-scrollbar--track-custom {",
    "  background-color: var(--ie-track);",
    "}",
    ".ie-scrollbar::before {",
    "  content: \"\";",
    "  position: absolute;",
    "  inset: 0;",
    "  z-index: -1;",
    "  background-color: var(--ie-track-dither-a);",
    "  -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR4nGP4////fwYY+P///38AR8oH+fD/YdQAAAAASUVORK5CYII=\");",
    "  mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR4nGP4////fwYY+P///38AR8oH+fD/YdQAAAAASUVORK5CYII=\");",
    "  -webkit-mask-size: calc(var(--ie-track-cell) * 2) calc(var(--ie-track-cell) * 2);",
    "  mask-size: calc(var(--ie-track-cell) * 2) calc(var(--ie-track-cell) * 2);",
    "  -webkit-mask-repeat: repeat;",
    "  mask-repeat: repeat;",
    "  image-rendering: -moz-crisp-edges;",
    "  image-rendering: crisp-edges;",
    "  image-rendering: pixelated;",
    "}",
    ".ie-scrollbar--track-custom::before {",
    "  display: none;",
    "}",
    ".ie-scrollbar--window {",
    "  position: fixed;",
    "}",
    ".ie-scrollbar--horizontal {",
    "  top: auto;",
    "  right: calc(var(--ie-scrollbar-border-inset, 0px) * var(--ie-scrollbar-border-inset-corners, 1));",
    "  left: calc(var(--ie-scrollbar-border-inset, 0px) * var(--ie-scrollbar-border-inset-corners, 1));",
    "  bottom: var(--ie-scrollbar-border-inset, 0px);",
    "  width: auto;",
    "  height: var(--ie-scrollbar-size, 16px);",
    "  flex-direction: row;",
    "}",
    ".ie-scrollbar--with-corner.ie-scrollbar--horizontal {",
    "  right: calc(var(--ie-scrollbar-size, 16px) + var(--ie-scrollbar-border-inset, 0px));",
    "}",
    ".ie-scrollbar--with-corner:not(.ie-scrollbar--horizontal) {",
    "  bottom: calc(var(--ie-scrollbar-size, 16px) + var(--ie-scrollbar-border-inset, 0px));",
    "}",
    ".ie-scrollbar__corner {",
    "  position: absolute;",
    "  right: var(--ie-scrollbar-border-inset, 0px);",
    "  bottom: var(--ie-scrollbar-border-inset, 0px);",
    "  width: var(--ie-scrollbar-size, 16px);",
    "  height: var(--ie-scrollbar-size, 16px);",
    "  background: var(--ie-face);",
    "}",
    ".ie-scrollbar__corner--window {",
    "  position: fixed;",
    "}",
    ".ie-scrollbar__button--up,",
    ".ie-scrollbar__button--left {",
    "  --ie-button-face: var(--ie-scrollbar-button-start-face-color, var(--ie-face));",
    "  --ie-button-3dlight: var(--ie-scrollbar-button-start-3dlight-color, var(--ie-3dlight));",
    "  --ie-button-highlight: var(--ie-scrollbar-button-start-highlight-color, var(--ie-highlight));",
    "  --ie-button-shadow: var(--ie-scrollbar-button-start-shadow-color, var(--ie-shadow));",
    "  --ie-button-darkshadow: var(--ie-scrollbar-button-start-darkshadow-color, var(--ie-darkshadow));",
    "  --ie-button-arrow: var(--ie-scrollbar-arrow-start-color, var(--ie-arrow));",
    "  --ie-scrollbar-button-current-size: var(--ie-scrollbar-button-start-size, var(--ie-scrollbar-size, 16px));",
    "  align-self: var(--ie-scrollbar-button-start-align, flex-end);",
    "  --ie-glyph-image: var(--ie-scrollbar-glyph-start-image, none);",
    "  --ie-glyph-shape: var(--ie-scrollbar-glyph-start-shape, triangle);",
    "  --ie-glyph-size: var(--ie-scrollbar-glyph-start-size, contain);",
    "  --ie-glyph-offset-x: var(--ie-scrollbar-glyph-start-offset-x, 0px);",
    "  --ie-glyph-offset-y: var(--ie-scrollbar-glyph-start-offset-y, 0px);",
    "  --ie-glyph-center-triangle: var(--ie-scrollbar-glyph-start-center-triangle, 0);",
    "  --ie-face-texture-image: var(--ie-scrollbar-button-start-background-image, none);",
    "  --ie-face-texture-position: var(--ie-scrollbar-button-start-background-position, 50% 50%);",
    "  --ie-face-texture-size: var(--ie-scrollbar-button-start-background-size, auto);",
    "  --ie-face-texture-repeat: var(--ie-scrollbar-button-start-background-repeat, repeat);",
    "}",
    ".ie-scrollbar__button--down,",
    ".ie-scrollbar__button--right {",
    "  --ie-button-face: var(--ie-scrollbar-button-end-face-color, var(--ie-face));",
    "  --ie-button-3dlight: var(--ie-scrollbar-button-end-3dlight-color, var(--ie-3dlight));",
    "  --ie-button-highlight: var(--ie-scrollbar-button-end-highlight-color, var(--ie-highlight));",
    "  --ie-button-shadow: var(--ie-scrollbar-button-end-shadow-color, var(--ie-shadow));",
    "  --ie-button-darkshadow: var(--ie-scrollbar-button-end-darkshadow-color, var(--ie-darkshadow));",
    "  --ie-button-arrow: var(--ie-scrollbar-arrow-end-color, var(--ie-arrow));",
    "  --ie-scrollbar-button-current-size: var(--ie-scrollbar-button-end-size, var(--ie-scrollbar-size, 16px));",
    "  align-self: var(--ie-scrollbar-button-end-align, flex-end);",
    "  --ie-glyph-image: var(--ie-scrollbar-glyph-end-image, none);",
    "  --ie-glyph-shape: var(--ie-scrollbar-glyph-end-shape, triangle);",
    "  --ie-glyph-size: var(--ie-scrollbar-glyph-end-size, contain);",
    "  --ie-glyph-offset-x: var(--ie-scrollbar-glyph-end-offset-x, 0px);",
    "  --ie-glyph-offset-y: var(--ie-scrollbar-glyph-end-offset-y, 0px);",
    "  --ie-glyph-center-triangle: var(--ie-scrollbar-glyph-end-center-triangle, 0);",
    "  --ie-face-texture-image: var(--ie-scrollbar-button-end-background-image, none);",
    "  --ie-face-texture-position: var(--ie-scrollbar-button-end-background-position, 50% 50%);",
    "  --ie-face-texture-size: var(--ie-scrollbar-button-end-background-size, auto);",
    "  --ie-face-texture-repeat: var(--ie-scrollbar-button-end-background-repeat, repeat);",
    "}",
    ".ie-scrollbar__button--up.ie-scrollbar__button--disabled,",
    ".ie-scrollbar__button--left.ie-scrollbar__button--disabled {",
    "  --ie-button-arrow: var(--ie-scrollbar-arrow-disabled-color, var(--ie-scrollbar-arrow-start-color, var(--ie-arrow)));",
    "}",
    ".ie-scrollbar__button--down.ie-scrollbar__button--disabled,",
    ".ie-scrollbar__button--right.ie-scrollbar__button--disabled {",
    "  --ie-button-arrow: var(--ie-scrollbar-arrow-disabled-color, var(--ie-scrollbar-arrow-end-color, var(--ie-arrow)));",
    "}",
    ".ie-scrollbar__button--custom-glyph .ie-scrollbar__arrow {",
    "  display: none;",
    "}",
    ".ie-scrollbar__button--custom-glyph .ie-scrollbar__face {",
    "  background-image: var(--ie-glyph-image), var(--ie-face-texture-image);",
    "  background-repeat: no-repeat, var(--ie-face-texture-repeat);",
    "  background-size: var(--ie-glyph-size), var(--ie-face-texture-size);",
    "  background-position: calc(50% + var(--ie-glyph-offset-x)) calc(50% + var(--ie-glyph-offset-y)), var(--ie-face-texture-position);",
    "}",
    ".ie-scrollbar__button {",
    "  flex: 0 0 var(--ie-scrollbar-button-current-size, 16px);",
    "  width: var(--ie-scrollbar-button-current-size, 16px);",
    "  height: var(--ie-scrollbar-button-current-size, 16px);",
    "  box-sizing: border-box;",
    "}",
    ".ie-scrollbar__bevel-outer,",
    ".ie-scrollbar__bevel-inner {",
    "  width: 100%;",
    "  height: 100%;",
    "  box-sizing: border-box;",
    "  border-style: solid;",
    "}",
    ".ie-scrollbar__bevel-outer {",
    "  border-top-width: var(--ie-scrollbar-bevel-outer-light-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-left-width: var(--ie-scrollbar-bevel-outer-light-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-right-width: var(--ie-scrollbar-bevel-outer-dark-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-bottom-width: var(--ie-scrollbar-bevel-outer-dark-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-top-color: var(--ie-button-3dlight);",
    "  border-left-color: var(--ie-button-3dlight);",
    "  border-right-color: var(--ie-button-darkshadow);",
    "  border-bottom-color: var(--ie-button-darkshadow);",
    "  --ie-bevel-top: var(--ie-button-3dlight);",
    "  --ie-bevel-left: var(--ie-button-3dlight);",
    "  --ie-bevel-right: var(--ie-button-darkshadow);",
    "  --ie-bevel-bottom: var(--ie-button-darkshadow);",
    "}",
    ".ie-scrollbar__bevel-inner {",
    "  border-top-width: var(--ie-scrollbar-bevel-inner-light-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-left-width: var(--ie-scrollbar-bevel-inner-light-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-right-width: var(--ie-scrollbar-bevel-inner-dark-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-bottom-width: var(--ie-scrollbar-bevel-inner-dark-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-top-color: var(--ie-button-highlight);",
    "  border-left-color: var(--ie-button-highlight);",
    "  border-right-color: var(--ie-button-shadow);",
    "  border-bottom-color: var(--ie-button-shadow);",
    "  --ie-bevel-top: var(--ie-button-highlight);",
    "  --ie-bevel-left: var(--ie-button-highlight);",
    "  --ie-bevel-right: var(--ie-button-shadow);",
    "  --ie-bevel-bottom: var(--ie-button-shadow);",
    "}",
    ".ie-scrollbar__button--pressed .ie-scrollbar__bevel-outer {",
    "  border-top-color: var(--ie-button-darkshadow);",
    "  border-left-color: var(--ie-button-darkshadow);",
    "  border-right-color: var(--ie-button-3dlight);",
    "  border-bottom-color: var(--ie-button-3dlight);",
    "  --ie-bevel-top: var(--ie-button-darkshadow);",
    "  --ie-bevel-left: var(--ie-button-darkshadow);",
    "  --ie-bevel-right: var(--ie-button-3dlight);",
    "  --ie-bevel-bottom: var(--ie-button-3dlight);",
    "}",
    ".ie-scrollbar__button--pressed .ie-scrollbar__bevel-inner {",
    "  border-top-color: var(--ie-button-shadow);",
    "  border-left-color: var(--ie-button-shadow);",
    "  border-right-color: var(--ie-button-highlight);",
    "  border-bottom-color: var(--ie-button-highlight);",
    "  --ie-bevel-top: var(--ie-button-shadow);",
    "  --ie-bevel-left: var(--ie-button-shadow);",
    "  --ie-bevel-right: var(--ie-button-highlight);",
    "  --ie-bevel-bottom: var(--ie-button-highlight);",
    "}",
    ".ie-scrollbar__button--pressed .ie-scrollbar__arrow {",
    "  transform: translate(calc(var(--ie-glyph-offset-x, 0px) + 1px), calc(var(--ie-glyph-offset-y, 0px) + 1px));",
    "}",
    ".ie-scrollbar__button--pressed.ie-scrollbar__button--no-pressed-invert .ie-scrollbar__bevel-outer {",
    "  border-top-color: var(--ie-button-3dlight);",
    "  border-left-color: var(--ie-button-3dlight);",
    "  border-right-color: var(--ie-button-darkshadow);",
    "  border-bottom-color: var(--ie-button-darkshadow);",
    "  --ie-bevel-top: var(--ie-button-3dlight);",
    "  --ie-bevel-left: var(--ie-button-3dlight);",
    "  --ie-bevel-right: var(--ie-button-darkshadow);",
    "  --ie-bevel-bottom: var(--ie-button-darkshadow);",
    "}",
    ".ie-scrollbar__button--pressed.ie-scrollbar__button--no-pressed-invert .ie-scrollbar__bevel-inner {",
    "  border-top-color: var(--ie-button-highlight);",
    "  border-left-color: var(--ie-button-highlight);",
    "  border-right-color: var(--ie-button-shadow);",
    "  border-bottom-color: var(--ie-button-shadow);",
    "  --ie-bevel-top: var(--ie-button-highlight);",
    "  --ie-bevel-left: var(--ie-button-highlight);",
    "  --ie-bevel-right: var(--ie-button-shadow);",
    "  --ie-bevel-bottom: var(--ie-button-shadow);",
    "}",
    ".ie-scrollbar__button--pressed.ie-scrollbar__button--no-pressed-invert .ie-scrollbar__arrow {",
    "  transform: translate(var(--ie-glyph-offset-x, 0px), var(--ie-glyph-offset-y, 0px));",
    "}",
    ".ie-scrollbar__thumb--pressed .ie-scrollbar__bevel-outer {",
    "  border-top-color: var(--ie-button-darkshadow);",
    "  border-left-color: var(--ie-button-darkshadow);",
    "  border-right-color: var(--ie-button-3dlight);",
    "  border-bottom-color: var(--ie-button-3dlight);",
    "  --ie-bevel-top: var(--ie-button-darkshadow);",
    "  --ie-bevel-left: var(--ie-button-darkshadow);",
    "  --ie-bevel-right: var(--ie-button-3dlight);",
    "  --ie-bevel-bottom: var(--ie-button-3dlight);",
    "}",
    ".ie-scrollbar__thumb--pressed .ie-scrollbar__bevel-inner {",
    "  border-top-color: var(--ie-button-shadow);",
    "  border-left-color: var(--ie-button-shadow);",
    "  border-right-color: var(--ie-button-highlight);",
    "  border-bottom-color: var(--ie-button-highlight);",
    "  --ie-bevel-top: var(--ie-button-shadow);",
    "  --ie-bevel-left: var(--ie-button-shadow);",
    "  --ie-bevel-right: var(--ie-button-highlight);",
    "  --ie-bevel-bottom: var(--ie-button-highlight);",
    "}",
    ".ie-scrollbar--blocky .ie-scrollbar__bevel-outer {",
    "  --ie-bevel-light-w: var(--ie-scrollbar-bevel-outer-light-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  --ie-bevel-dark-w: var(--ie-scrollbar-bevel-outer-dark-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-top-width: 0;",
    "  border-left-width: 0;",
    "  border-right-width: 0;",
    "  border-bottom-width: 0;",
    "  padding-top: var(--ie-bevel-light-w);",
    "  padding-left: var(--ie-bevel-light-w);",
    "  padding-right: var(--ie-bevel-dark-w);",
    "  padding-bottom: var(--ie-bevel-dark-w);",
    "  box-shadow:",
    "    inset 0 calc(var(--ie-bevel-dark-w) * -1) 0 0 var(--ie-bevel-bottom),",
    "    inset calc(var(--ie-bevel-dark-w) * -1) 0 0 0 var(--ie-bevel-right),",
    "    inset var(--ie-bevel-light-w) 0 0 0 var(--ie-bevel-left),",
    "    inset 0 var(--ie-bevel-light-w) 0 0 var(--ie-bevel-top);",
    "}",
    ".ie-scrollbar--blocky .ie-scrollbar__bevel-inner {",
    "  --ie-bevel-light-w: var(--ie-scrollbar-bevel-inner-light-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  --ie-bevel-dark-w: var(--ie-scrollbar-bevel-inner-dark-width, var(--ie-scrollbar-bevel-width, 1px));",
    "  border-top-width: 0;",
    "  border-left-width: 0;",
    "  border-right-width: 0;",
    "  border-bottom-width: 0;",
    "  padding-top: var(--ie-bevel-light-w);",
    "  padding-left: var(--ie-bevel-light-w);",
    "  padding-right: var(--ie-bevel-dark-w);",
    "  padding-bottom: var(--ie-bevel-dark-w);",
    "  box-shadow:",
    "    inset 0 calc(var(--ie-bevel-dark-w) * -1) 0 0 var(--ie-bevel-bottom),",
    "    inset calc(var(--ie-bevel-dark-w) * -1) 0 0 0 var(--ie-bevel-right),",
    "    inset var(--ie-bevel-light-w) 0 0 0 var(--ie-bevel-left),",
    "    inset 0 var(--ie-bevel-light-w) 0 0 var(--ie-bevel-top);",
    "}",
    ".ie-scrollbar__face {",
    "  width: 100%;",
    "  height: 100%;",
    "  background-color: var(--ie-button-face);",
    "  background-image: var(--ie-face-texture-image);",
    "  background-position: var(--ie-face-texture-position);",
    "  background-size: var(--ie-face-texture-size);",
    "  background-repeat: var(--ie-face-texture-repeat);",
    "  display: flex;",
    "  align-items: center;",
    "  justify-content: flex-start;",
    "}",
    ".ie-scrollbar__arrow {",
    "  display: block;",
    "  width: 7px;",
    "  height: 4px;",
    "  margin-left: 2.499px;",
    "  transform: translate(var(--ie-glyph-offset-x, 0px), var(--ie-glyph-offset-y, 0px));",
    "}",
    ".ie-scrollbar__arrow--left,",
    ".ie-scrollbar__arrow--right {",
    "  width: 4px;",
    "  height: 7px;",
    "  margin-left: 4px;",
    "  margin-top: 0;",
    "}",
    ".ie-scrollbar__track {",
    "  position: relative;",
    "  flex: 1 1 auto;",
    "  overflow: hidden;",
    "  background-color: var(--ie-track-dither-b);",
    "}",
    ".ie-scrollbar__track::before {",
    "  content: \"\";",
    "  position: absolute;",
    "  inset: 0;",
    "  background-color: var(--ie-track-dither-a);",
    "  -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR4nGP4////fwYY+P///38AR8oH+fD/YdQAAAAASUVORK5CYII=\");",
    "  mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR4nGP4////fwYY+P///38AR8oH+fD/YdQAAAAASUVORK5CYII=\");",
    "  -webkit-mask-size: calc(var(--ie-track-cell) * 2) calc(var(--ie-track-cell) * 2);",
    "  mask-size: calc(var(--ie-track-cell) * 2) calc(var(--ie-track-cell) * 2);",
    "  -webkit-mask-repeat: repeat;",
    "  mask-repeat: repeat;",
    "  image-rendering: -moz-crisp-edges;",
    "  image-rendering: crisp-edges;",
    "  image-rendering: pixelated;",
    "}",
    ".ie-scrollbar--track-custom .ie-scrollbar__track {",
    "  background-color: var(--ie-track);",
    "}",
    ".ie-scrollbar--track-custom .ie-scrollbar__track::before {",
    "  display: none;",
    "}",
    ".ie-scrollbar--track-textured .ie-scrollbar__track {",
    "  background-image: var(--ie-scrollbar-track-background-image, none);",
    "  background-position: var(--ie-scrollbar-track-background-position, 50% 50%);",
    "  background-size: var(--ie-scrollbar-track-background-size, auto);",
    "  background-repeat: var(--ie-scrollbar-track-background-repeat, repeat);",
    "}",
    ".ie-scrollbar--track-textured .ie-scrollbar__track::before {",
    "  display: none;",
    "}",
    ".ie-scrollbar__thumb {",
    "  position: absolute;",
    "  left: 0;",
    "  width: var(--ie-scrollbar-size, 16px);",
    "  min-height: var(--ie-scrollbar-min-thumb-size, 32px);",
    "  box-sizing: border-box;",
    "}",
    ".ie-scrollbar--horizontal .ie-scrollbar__thumb {",
    "  left: auto;",
    "  top: 0;",
    "  width: auto;",
    "  height: var(--ie-scrollbar-size, 16px);",
    "  min-width: var(--ie-scrollbar-min-thumb-size, 32px);",
    "  min-height: 0;",
    "}",
    ".ie-scrollbar--small-track-half .ie-scrollbar__thumb {",
    "  min-height: 0;",
    "  min-width: 0;",
    "}"
  ].join("\n");

  function ensureStylesheet(doc) {
    if (doc.querySelector("style[data-ie-scrollbar-injected]")) return;
    var style = doc.createElement("style");
    style.setAttribute("data-ie-scrollbar-injected", "");
    style.setAttribute("data-ie-scrollbar-internal", "");
    style.textContent = SCROLLBAR_CSS;
    (doc.head || doc.documentElement).appendChild(style);
  }

  // Scrollbar component. Use the target's document/window for iframe support.

  var SCROLLBAR_SIZE = 16;
  // Keep thumbs distinct from 16px buttons.
  var MIN_THUMB_SIZE = 32;
  // Short-track sizing is a project convention.
  var SMALL_TRACK_THRESHOLD = 64;
  var SMALL_TRACK_THUMB_FRACTION = 0.5;
  var LINE_STEP = 20;
  var ARROW_REPEAT_DELAY = 400;
  var ARROW_REPEAT_INTERVAL = 40;

  var COLOR_PROPS = {
    face: "--ie-face",
    threeDLight: "--ie-3dlight",
    highlight: "--ie-highlight",
    shadow: "--ie-shadow",
    darkShadow: "--ie-darkshadow",
    arrow: "--ie-arrow",
    track: "--ie-track"
  };

  var SVG_NS = "http://www.w3.org/2000/svg";

  // Extension properties
  var EXTENSION_PROPS = [
    "--ie-scrollbar-arrow-start-color",
    "--ie-scrollbar-arrow-end-color",
    "--ie-scrollbar-arrow-disabled-color",
    "--ie-scrollbar-button-start-face-color",
    "--ie-scrollbar-button-start-3dlight-color",
    "--ie-scrollbar-button-start-highlight-color",
    "--ie-scrollbar-button-start-shadow-color",
    "--ie-scrollbar-button-start-darkshadow-color",
    "--ie-scrollbar-button-end-face-color",
    "--ie-scrollbar-button-end-3dlight-color",
    "--ie-scrollbar-button-end-highlight-color",
    "--ie-scrollbar-button-end-shadow-color",
    "--ie-scrollbar-button-end-darkshadow-color",
    "--ie-scrollbar-button-start-size",
    "--ie-scrollbar-button-end-size",
    "--ie-scrollbar-button-start-align",
    "--ie-scrollbar-button-end-align",
    "--ie-scrollbar-track-dither-a-color",
    "--ie-scrollbar-track-dither-b-color",
    "--ie-scrollbar-track-dither-1px",
    "--ie-scrollbar-bevel-width",
    "--ie-scrollbar-bevel-outer-light-width",
    "--ie-scrollbar-bevel-outer-dark-width",
    "--ie-scrollbar-bevel-inner-light-width",
    "--ie-scrollbar-bevel-inner-dark-width",
    "--ie-scrollbar-border-inset",
    "--ie-scrollbar-border-inset-corners",
    "--ie-scrollbar-glyph-start-shape",
    "--ie-scrollbar-glyph-end-shape",
    "--ie-scrollbar-glyph-start-image",
    "--ie-scrollbar-glyph-end-image",
    "--ie-scrollbar-glyph-start-size",
    "--ie-scrollbar-glyph-end-size",
    "--ie-scrollbar-glyph-start-offset-x",
    "--ie-scrollbar-glyph-start-offset-y",
    "--ie-scrollbar-glyph-end-offset-x",
    "--ie-scrollbar-glyph-end-offset-y",
    "--ie-scrollbar-glyph-start-center-triangle",
    "--ie-scrollbar-glyph-end-center-triangle",
    "--ie-scrollbar-button-start-background-image",
    "--ie-scrollbar-button-start-background-position",
    "--ie-scrollbar-button-start-background-size",
    "--ie-scrollbar-button-start-background-repeat",
    "--ie-scrollbar-button-end-background-image",
    "--ie-scrollbar-button-end-background-position",
    "--ie-scrollbar-button-end-background-size",
    "--ie-scrollbar-button-end-background-repeat",
    "--ie-scrollbar-thumb-background-image",
    "--ie-scrollbar-thumb-background-position",
    "--ie-scrollbar-thumb-background-size",
    "--ie-scrollbar-thumb-background-repeat",
    "--ie-scrollbar-track-background-image",
    "--ie-scrollbar-track-background-position",
    "--ie-scrollbar-track-background-size",
    "--ie-scrollbar-track-background-repeat",
    "--ie-scrollbar-size",
    "--ie-scrollbar-min-thumb-size",
    "--ie-scrollbar-small-track-half-thumb",
    "--ie-scrollbar-blocky",
    "--ie-scrollbar-smooth",
    "--ie-scrollbar-pressed-invert",
    "--ie-scrollbar-thumb-pressed-invert"
  ];

  // Unset values must not overwrite shared wrapper styles.
  function copyExtensionProperties(win, target, wrapper) {
    var computed = win.getComputedStyle(target);
    EXTENSION_PROPS.forEach(function (name) {
      var value = computed.getPropertyValue(name).trim();
      if (value) wrapper.style.setProperty(name, value);
    });
  }

  // The bar is a sibling; target cursors need copying to the wrapper.
  function copyTargetCursor(win, target, wrapper) {
    var cursor = win.getComputedStyle(target).cursor;
    if (cursor) wrapper.style.cursor = cursor;
  }

  // Write back the inset to keep CSS and gutter sizing in sync.
  // Both axes share this value; asymmetric borders need an explicit inset.
  function resolveBorderInsetPx(win, cssTarget, target, vertical) {
    var raw = win.getComputedStyle(cssTarget).getPropertyValue("--ie-scrollbar-border-inset").trim();
    var px;
    if (raw) {
      px = parseFloat(raw);
      if (isNaN(px)) px = 0;
    } else {
      var borderProp = vertical ? "borderRightWidth" : "borderBottomWidth";
      px = parseFloat(win.getComputedStyle(target)[borderProp]) || 0;
    }
    cssTarget.style.setProperty("--ie-scrollbar-border-inset", px + "px");
    return px;
  }

  function resolveScrollbarSizePx(win, el) {
    var px = parseFloat(win.getComputedStyle(el).getPropertyValue("--ie-scrollbar-size"));
    return px > 0 ? px : SCROLLBAR_SIZE;
  }

  function resolveMinThumbSizePx(win, el) {
    var px = parseFloat(win.getComputedStyle(el).getPropertyValue("--ie-scrollbar-min-thumb-size"));
    return px > 0 ? px : MIN_THUMB_SIZE;
  }

  function smallTrackHalfThumbRequested(win, el) {
    if (!el || !el.isConnected) return false;
    return win.getComputedStyle(el).getPropertyValue("--ie-scrollbar-small-track-half-thumb").trim() === "1";
  }

  // Base-color derivation. Approximation; not measured IE behavior.
  function lightenChannel(c, t) {
    return c + (255 - c) * t;
  }
  function darkenChannel(c, t) {
    return c * (1 - t);
  }
  function rgbString(r, g, b) {
    return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
  }

  function luma(rgb) {
    return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  }

  // Lighten only the glyph on dark bases.
  var ARROW_DARK_LUMA_THRESHOLD = 64;

  function arrowColorFor(rgb) {
    if (luma(rgb) >= ARROW_DARK_LUMA_THRESHOLD) {
      return rgbString(
        darkenChannel(rgb.r, 0.85),
        darkenChannel(rgb.g, 0.85),
        darkenChannel(rgb.b, 0.85)
      );
    }
    return rgbString(
      lightenChannel(rgb.r, 0.5),
      lightenChannel(rgb.g, 0.5),
      lightenChannel(rgb.b, 0.5)
    );
  }

  function parseColorToRgb(doc, colorStr) {
    var probe = doc.createElement("div");
    probe.style.display = "none";
    probe.style.color = colorStr;
    if (!probe.style.color) return null;
    var parent = doc.body || doc.documentElement;
    parent.appendChild(probe);
    var win = doc.defaultView || doc.parentWindow || global;
    var computed = win.getComputedStyle(probe).color;
    parent.removeChild(probe);
    var m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(computed);
    if (!m) return null;
    return { r: parseFloat(m[1]), g: parseFloat(m[2]), b: parseFloat(m[3]) };
  }

  function deriveColorsFromBase(rgb) {
    return {
      face: rgbString(rgb.r, rgb.g, rgb.b),
      threeDLight: rgbString(rgb.r, rgb.g, rgb.b),
      highlight: rgbString(
        lightenChannel(rgb.r, 0.7),
        lightenChannel(rgb.g, 0.7),
        lightenChannel(rgb.b, 0.7)
      ),
      shadow: rgbString(
        darkenChannel(rgb.r, 0.35),
        darkenChannel(rgb.g, 0.35),
        darkenChannel(rgb.b, 0.35)
      ),
      darkShadow: rgbString(
        darkenChannel(rgb.r, 0.85),
        darkenChannel(rgb.g, 0.85),
        darkenChannel(rgb.b, 0.85)
      ),
      arrow: arrowColorFor(rgb)
    };
  }

  // Share wrappers and corners to avoid duplicate gutters.
  var scrollbarGroups = new WeakMap();

  // Restore only owned styles; preserve page edits and !important.
  function saveInlineProperties(el, names) {
    return names.map(function (name) {
      return [name, el.style.getPropertyValue(name), el.style.getPropertyPriority(name)];
    });
  }

  function restoreInlineProperties(el, saved) {
    (saved || []).forEach(function (property) {
      if (property[1]) el.style.setProperty(property[0], property[1], property[2]);
      else el.style.removeProperty(property[0]);
    });
  }

  function updateCorner(group, doc, windowMode) {
    var both = !!(group.vertical && group.horizontal);
    if (both && !group.corner) {
      var corner = doc.createElement("div");
      corner.className = "ie-scrollbar__corner" + (windowMode ? " ie-scrollbar__corner--window" : "");
      corner.setAttribute("data-ie-scrollbar-internal", "");
      group.parent.appendChild(corner);
      group.corner = corner;
    } else if (!both && group.corner) {
      group.corner.remove();
      group.corner = null;
    }
    if (group.vertical) group.vertical.el.classList.toggle("ie-scrollbar--with-corner", both);
    if (group.horizontal) group.horizontal.el.classList.toggle("ie-scrollbar--with-corner", both);
  }

  // Use device-pixel steps; blocky mode keeps the 1x glyph.
  function arrowRowCount(win, blocky) {
    var dpr = blocky ? 1 : (win.devicePixelRatio || 1);
    return Math.max(4, Math.round(4 * dpr));
  }

  // Blocky mode deliberately leaves track dither alone.
  function blockyRequested(win, el) {
    if (!el || !el.isConnected) return false;
    return win.getComputedStyle(el).getPropertyValue("--ie-scrollbar-blocky").trim() === "1";
  }

  // Smooth and blocky are independent flags.
  function smoothRequested(win, el) {
    if (!el || !el.isConnected) return false;
    return win.getComputedStyle(el).getPropertyValue("--ie-scrollbar-smooth").trim() === "1";
  }

  function trackDither1pxRequested(win, el) {
    if (!el || !el.isConnected) return false;
    return win.getComputedStyle(el).getPropertyValue("--ie-scrollbar-track-dither-1px").trim() === "1";
  }

  // Win32 thumbs stay flat by default; inversion is opt-in.
  function thumbPressedInvertRequested(win, thumb) {
    if (!thumb || !thumb.isConnected) return false;
    return win.getComputedStyle(thumb).getPropertyValue("--ie-scrollbar-thumb-pressed-invert").trim() === "invert";
  }

  var activeArrowGlyphs = [];

  function buttonScale(entry) {
    if (!entry.button || !entry.button.isConnected) return 1;
    var raw = entry.win
      .getComputedStyle(entry.button)
      .getPropertyValue("--ie-scrollbar-button-current-size")
      .trim();
    var px = parseFloat(raw);
    // Scale against the original 16px size, not the configured size.
    return px > 0 ? px / SCROLLBAR_SIZE : 1;
  }

  function customGlyphImageSet(entry) {
    if (!entry.button || !entry.button.isConnected) return false;
    var raw = entry.win.getComputedStyle(entry.button).getPropertyValue("--ie-glyph-image").trim();
    return !!raw && raw !== "none";
  }

  function glyphShape(entry) {
    if (!entry.button || !entry.button.isConnected) return "triangle";
    var raw = entry.win.getComputedStyle(entry.button).getPropertyValue("--ie-glyph-shape").trim();
    return raw === "square" || raw === "dot" ? raw : "triangle";
  }

  function centerTriangleRequested(entry) {
    if (!entry.button || !entry.button.isConnected) return false;
    return entry.win.getComputedStyle(entry.button).getPropertyValue("--ie-glyph-center-triangle").trim() === "1";
  }

  function renderArrowGlyph(entry) {
    var direction = entry.direction;
    var vertical = direction === "up" || direction === "down";
    var svg = entry.svg;
    var rows = arrowRowCount(entry.win, blockyRequested(entry.win, entry.button));
    var smooth = smoothRequested(entry.win, entry.button);
    var base = rows * 2 - 1;
    var scale = buttonScale(entry);
    var shape = glyphShape(entry);

    if (entry.button) {
      entry.button.classList.toggle("ie-scrollbar__button--custom-glyph", customGlyphImageSet(entry));
    }

    var isSquareFamily = shape === "square" || shape === "dot";
    var S = 4;
    var footprintW = isSquareFamily ? S : (vertical ? 7 : 4);
    var footprintH = isSquareFamily ? S : (vertical ? 4 : 7);
    // Preserve the measured triangle bias unless centering is requested.
    var centerTriangle = !isSquareFamily && centerTriangleRequested(entry);
    var marginLeftBase = isSquareFamily
      ? (12 - S) / 2
      : centerTriangle
        ? (12 - footprintW) / 2
        : (vertical ? 2.499 : 4);

    // Explicit dimensions keep the SVG footprint independent of DPR.
    svg.setAttribute("width", String(footprintW));
    svg.setAttribute("height", String(footprintH));
    svg.setAttribute(
      "viewBox",
      isSquareFamily ? "0 0 " + S + " " + S : (vertical ? ("0 0 " + base + " " + rows) : ("0 0 " + rows + " " + base))
    );

    // Inline dimensions must override the default arrow CSS.
    svg.style.width = footprintW * scale + "px";
    svg.style.height = footprintH * scale + "px";
    svg.style.marginLeft = marginLeftBase * scale + "px";
    svg.style.marginTop = "0";
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    if (shape === "square") {
      var square = entry.doc.createElementNS(SVG_NS, "rect");
      square.setAttribute("x", 0);
      square.setAttribute("y", 0);
      square.setAttribute("width", S);
      square.setAttribute("height", S);
      square.setAttribute("shape-rendering", smooth ? "auto" : "crispEdges");
      square.style.fill = "var(--ie-button-arrow)";
      svg.appendChild(square);
    } else if (shape === "dot") {
      // Let circles anti-alias.
      var dot = entry.doc.createElementNS(SVG_NS, "circle");
      dot.setAttribute("cx", S / 2);
      dot.setAttribute("cy", S / 2);
      dot.setAttribute("r", S / 2);
      dot.style.fill = "var(--ie-button-arrow)";
      svg.appendChild(dot);
    } else {
      for (var i = 0; i < rows; i++) {
        var width = 2 * i + 1;
        var offset = rows - 1 - i;
        var x, y, w, h;

        switch (direction) {
          case "up":
            x = offset; y = i; w = width; h = 1;
            break;
          case "down":
            x = offset; y = rows - 1 - i; w = width; h = 1;
            break;
          case "left":
            x = i; y = offset; w = 1; h = width;
            break;
          case "right":
            x = rows - 1 - i; y = offset; w = 1; h = width;
            break;
        }

        var rect = entry.doc.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", w);
        rect.setAttribute("height", h);
        rect.setAttribute("shape-rendering", smooth ? "auto" : "crispEdges");
        rect.style.fill = "var(--ie-button-arrow)";
        svg.appendChild(rect);
      }
    }
  }

  // Whole device-pixel cells keep dither crisp at fractional DPR.
  function trackCellSizePx(win, fixed1px) {
    var dpr = win.devicePixelRatio || 1;
    if (fixed1px) return 1 / dpr;
    var wholeDevicePx = Math.max(1, Math.floor(dpr));
    return wholeDevicePx / dpr;
  }

  var activeScrollbarEls = [];

  function trackImageSet(entry) {
    if (!entry.el.isConnected) return false;
    var raw = entry.win.getComputedStyle(entry.el).getPropertyValue("--ie-scrollbar-track-background-image").trim();
    return !!raw && raw !== "none";
  }

  function renderTrackCell(entry) {
    var blocky = blockyRequested(entry.win, entry.el);
    var fixed1px = trackDither1pxRequested(entry.win, entry.el);
    entry.el.style.setProperty("--ie-track-cell", trackCellSizePx(entry.win, fixed1px) + "px");
    entry.el.classList.toggle("ie-scrollbar--track-textured", trackImageSet(entry));
    entry.el.classList.toggle("ie-scrollbar--blocky", blocky);
  }

  // Re-arm the resolution query after each DPR change.
  function watchDevicePixelRatio() {
    function attach() {
      var mql = global.matchMedia("(resolution: " + global.devicePixelRatio + "dppx)");
      function onChange() {
        mql.removeEventListener("change", onChange);
        activeArrowGlyphs.forEach(renderArrowGlyph);
        activeScrollbarEls.forEach(renderTrackCell);
        attach();
      }
      mql.addEventListener("change", onChange);
    }
    attach();
  }
  watchDevicePixelRatio();

  function makeArrowGlyph(doc, win, direction, registry, button) {
    var svg = doc.createElementNS(SVG_NS, "svg");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("class", "ie-scrollbar__arrow ie-scrollbar__arrow--" + direction);

    var entry = { svg: svg, direction: direction, doc: doc, win: win, button: button };
    renderArrowGlyph(entry);
    activeArrowGlyphs.push(entry);
    registry.push(entry);

    return svg;
  }

  function makeButton(doc, win, direction, arrowDirection, registry) {
    var button = doc.createElement("div");
    button.className = "ie-scrollbar__button ie-scrollbar__button--" + direction;

    var outer = doc.createElement("div");
    outer.className = "ie-scrollbar__bevel-outer";
    var inner = doc.createElement("div");
    inner.className = "ie-scrollbar__bevel-inner";
    var face = doc.createElement("div");
    face.className = "ie-scrollbar__face";

    face.appendChild(makeArrowGlyph(doc, win, arrowDirection, registry, button));
    inner.appendChild(face);
    outer.appendChild(inner);
    button.appendChild(outer);

    return button;
  }

  function makeThumb(doc) {
    var thumb = doc.createElement("div");
    thumb.className = "ie-scrollbar__thumb";

    var outer = doc.createElement("div");
    outer.className = "ie-scrollbar__bevel-outer";
    var inner = doc.createElement("div");
    inner.className = "ie-scrollbar__bevel-inner";
    var face = doc.createElement("div");
    face.className = "ie-scrollbar__face";

    inner.appendChild(face);
    outer.appendChild(inner);
    thumb.appendChild(outer);

    return thumb;
  }

  function IEScrollbar(target, options) {
    this.windowMode = !!(options && options.window);
    this.doc = (options && options.doc) || (target && target.ownerDocument) || document;
    this.win = this.doc.defaultView || this.doc.parentWindow || global;
    this.target = this.windowMode ? (this.doc.scrollingElement || this.doc.documentElement) : target;
    this.orientation = (options && options.orientation) || "vertical";
    // Failed mounts must restore native scrolling.
    try {
      ensureStylesheet(this.doc);
      this._build();
      this._bind();
      if (options && options.baseColor) {
        this.setBaseColor(options.baseColor);
      }
      if (options && options.colors) {
        this.setColors(options.colors);
      }
      this.update();
    } catch (e) {
      this._failedInit = true;
      try {
        this.destroy();
      } catch (destroyError) {
        // Preserve the initialization error if teardown also throws.
      }
      throw e;
    }
  }

  IEScrollbar.prototype.setColors = function (colors) {
    var self = this;
    var colorTarget = this.wrapper || (this.windowMode ? this.doc.body : this.el);
    Object.keys(colors || {}).forEach(function (key) {
      var prop = COLOR_PROPS[key];
      if (!prop) return;
      colorTarget.style.setProperty(prop, colors[key]);
    });
    if (colors && colors.track) {
      self.el.classList.add("ie-scrollbar--track-custom");
    }
  };

  IEScrollbar.prototype.setBaseColor = function (baseColor) {
    var rgb = parseColorToRgb(this.doc, baseColor);
    if (!rgb) return;
    this.setColors(deriveColorsFromBase(rgb));
  };

  function buildBarContents(doc, win, el, vertical, arrowGlyphs) {
    var buttonStart = makeButton(doc, win, vertical ? "up" : "left", vertical ? "up" : "left", arrowGlyphs);
    var buttonEnd = makeButton(doc, win, vertical ? "down" : "right", vertical ? "down" : "right", arrowGlyphs);
    var track = doc.createElement("div");
    track.className = "ie-scrollbar__track";
    var thumb = makeThumb(doc);
    track.appendChild(thumb);

    el.appendChild(buttonStart);
    el.appendChild(track);
    el.appendChild(buttonEnd);

    return { arrowGlyphs: arrowGlyphs, buttonStart: buttonStart, buttonEnd: buttonEnd, track: track, thumb: thumb };
  }

  IEScrollbar.prototype._buildWindow = function () {
    var vertical = this.orientation === "vertical";
    var doc = this.doc;
    var win = this.win;
    var docEl = doc.documentElement;
    var body = doc.body;

    var group = scrollbarGroups.get(doc);
    var isFirstMount = !group;
    if (!group) {
      group = {
        parent: body, vertical: null, horizontal: null, corner: null,
        htmlHadHost: docEl.classList.contains("ie-scrollbar-host"),
        bodyHadHost: body.classList.contains("ie-scrollbar-host"),
        savedInset: saveInlineProperties(body, ["--ie-scrollbar-border-inset"])
      };
      scrollbarGroups.set(doc, group);
    }

    this._group = group;

    // Reserve the native gutter on body to avoid page reflow.
    var marginProp = vertical ? "marginRight" : "marginBottom";
    this._savedGutter = saveInlineProperties(body, [vertical ? "margin-right" : "margin-bottom"]);
    var existingMargin = parseFloat(win.getComputedStyle(body)[marginProp]) || 0;
    var borderInsetPx = resolveBorderInsetPx(win, body, body, vertical);
    var scrollbarSizePx = resolveScrollbarSizePx(win, body);
    body.style[marginProp] = (existingMargin + scrollbarSizePx + borderInsetPx) + "px";

    var el = doc.createElement("div");
    el.className = "ie-scrollbar ie-scrollbar--window" + (vertical ? "" : " ie-scrollbar--horizontal");
    el.setAttribute("data-ie-scrollbar-internal", "");

    this.el = el;
    var parts = buildBarContents(doc, win, el, vertical, this.arrowGlyphs = []);
    this.arrowGlyphs = parts.arrowGlyphs;
    this.buttonStart = parts.buttonStart;
    this.buttonEnd = parts.buttonEnd;
    this.track = parts.track;
    this.thumb = parts.thumb;

    body.appendChild(el);
    this.wrapper = null;
    this.el = el;

    // Resolve glyph styles after connecting buttons to the document.
    parts.arrowGlyphs.forEach(renderArrowGlyph);

    // Hide native bars only after a successful build.
    if (isFirstMount) {
      docEl.classList.add("ie-scrollbar-host");
      body.classList.add("ie-scrollbar-host");
    }

    group[vertical ? "vertical" : "horizontal"] = this;
    this._group = group;
    updateCorner(group, doc, true);

    this._activeScrollbarEntry = { el: el, win: win };
    renderTrackCell(this._activeScrollbarEntry);
    activeScrollbarEls.push(this._activeScrollbarEntry);
  };

  IEScrollbar.prototype._build = function () {
    if (this.windowMode) {
      this._buildWindow();
      return;
    }

    var vertical = this.orientation === "vertical";
    var target = this.target;
    var doc = this.doc;
    var win = this.win;

    var group = scrollbarGroups.get(target);
    var wrapper;
    var isFirstMount = !group;

    if (group) {
      wrapper = group.parent;
      this.wrapper = wrapper;
      this._group = group;
    } else {
      // Keep the bar outside the target so it cannot scroll with the content.
      var rect = target.getBoundingClientRect();
      var targetStyle = win.getComputedStyle(target);

      wrapper = doc.createElement("div");
      wrapper.className = "ie-scrollbar-wrapper";
      wrapper.style.position = "relative";
      wrapper.style.display = targetStyle.display === "inline" ? "inline-block" : "block";
      wrapper.style.width = rect.width + "px";
      wrapper.style.height = rect.height + "px";
      // Move margins to the wrapper to preserve layout.
      wrapper.style.marginTop = targetStyle.marginTop;
      wrapper.style.marginRight = targetStyle.marginRight;
      wrapper.style.marginBottom = targetStyle.marginBottom;
      wrapper.style.marginLeft = targetStyle.marginLeft;

      // The wrapper must inherit flex/grid participation.
      var parentDisplay = win.getComputedStyle(target.parentNode).display;
      if (parentDisplay === "flex" || parentDisplay === "inline-flex") {
        wrapper.style.flexGrow = targetStyle.flexGrow;
        wrapper.style.flexShrink = targetStyle.flexShrink;
        wrapper.style.flexBasis = targetStyle.flexBasis;
        wrapper.style.alignSelf = targetStyle.alignSelf;
        wrapper.style.order = targetStyle.order;
      } else if (parentDisplay === "grid" || parentDisplay === "inline-grid") {
        wrapper.style.gridColumnStart = targetStyle.gridColumnStart;
        wrapper.style.gridColumnEnd = targetStyle.gridColumnEnd;
        wrapper.style.gridRowStart = targetStyle.gridRowStart;
        wrapper.style.gridRowEnd = targetStyle.gridRowEnd;
        wrapper.style.justifySelf = targetStyle.justifySelf;
        wrapper.style.alignSelf = targetStyle.alignSelf;
        wrapper.style.order = targetStyle.order;
      }
      // Computed margins freeze auto-margin alignment at mount time.

      group = {
        parent: wrapper, vertical: null, horizontal: null, corner: null,
        savedStyle: saveInlineProperties(target, [
          "position", "top", "left", "width", "height", "box-sizing",
          "margin-top", "margin-right", "margin-bottom", "margin-left"
        ]),
        hadHost: target.classList.contains("ie-scrollbar-host"),
        addedTabIndex: !target.hasAttribute("tabindex")
      };
      this.wrapper = wrapper;
      this._group = group;
      scrollbarGroups.set(target, group);
      target.parentNode.insertBefore(wrapper, target);
      wrapper.appendChild(target);

      // Defer hiding the native bar until the build succeeds.
      target.style.position = "absolute";
      target.style.top = "0";
      target.style.left = "0";
      target.style.width = "100%";
      target.style.height = "100%";
      target.style.margin = "0";
      // Border-box keeps reserved gutters inside the wrapper.
      target.style.boxSizing = "border-box";

      // Keyboard scrolling requires a focusable target.
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "0");
      }

    }

    copyExtensionProperties(win, target, wrapper);
    copyTargetCursor(win, target, wrapper);

    // Reserve the inset as extra padding to avoid covering content.
    var borderInsetPx = resolveBorderInsetPx(win, wrapper, target, vertical);
    var scrollbarSizePx = resolveScrollbarSizePx(win, wrapper);

    this._savedGutter = saveInlineProperties(target, [vertical ? "padding-right" : "padding-bottom"]);
    target.style[vertical ? "paddingRight" : "paddingBottom"] = (scrollbarSizePx + borderInsetPx) + "px";

    var el = doc.createElement("div");
    el.className = "ie-scrollbar" + (vertical ? "" : " ie-scrollbar--horizontal");
    el.setAttribute("data-ie-scrollbar-internal", "");

    this.el = el;
    var parts = buildBarContents(doc, win, el, vertical, this.arrowGlyphs = []);
    this.arrowGlyphs = parts.arrowGlyphs;
    this.buttonStart = parts.buttonStart;
    this.buttonEnd = parts.buttonEnd;
    this.track = parts.track;
    this.thumb = parts.thumb;

    wrapper.appendChild(el);
    this.wrapper = wrapper;
    this.el = el;

    // Connected buttons are required for computed glyph sizing.
    parts.arrowGlyphs.forEach(renderArrowGlyph);

    // Hide the native bar only after the first successful mount.
    if (isFirstMount) target.classList.add("ie-scrollbar-host");

    group[vertical ? "vertical" : "horizontal"] = this;
    this._group = group;
    updateCorner(group, doc, false);

    this._activeScrollbarEntry = { el: el, win: win };
    renderTrackCell(this._activeScrollbarEntry);
    activeScrollbarEls.push(this._activeScrollbarEntry);
  };

  IEScrollbar.prototype._lineStep = function (sign) {
    var vertical = this.orientation === "vertical";
    var prop = vertical ? "scrollTop" : "scrollLeft";
    this.target[prop] += sign * LINE_STEP;
  };

  IEScrollbar.prototype._pageStep = function (sign) {
    var vertical = this.orientation === "vertical";
    var prop = vertical ? "scrollTop" : "scrollLeft";
    var size = vertical ? this.target.clientHeight : this.target.clientWidth;
    this.target[prop] += sign * size;
  };

  IEScrollbar.prototype._startRepeat = function (sign) {
    var self = this;
    this._stopRepeat();
    this._lineStep(sign);
    this._repeatTimeout = this.win.setTimeout(function () {
      self._repeatInterval = self.win.setInterval(function () {
        self._lineStep(sign);
      }, ARROW_REPEAT_INTERVAL);
    }, ARROW_REPEAT_DELAY);
  };

  IEScrollbar.prototype._stopRepeat = function () {
    this.win.clearTimeout(this._repeatTimeout);
    this.win.clearInterval(this._repeatInterval);
    this._repeatTimeout = null;
    this._repeatInterval = null;
  };

  IEScrollbar.prototype._setPressed = function (button) {
    if (this._pressedButton) this._pressedButton.classList.remove("ie-scrollbar__button--pressed");
    this._pressedButton = button || null;
    if (button) {
      button.classList.add("ie-scrollbar__button--pressed");
      var noInvert = this.win.getComputedStyle(button).getPropertyValue("--ie-scrollbar-pressed-invert").trim() === "none";
      button.classList.toggle("ie-scrollbar__button--no-pressed-invert", noInvert);
    }
  };

  // RTL scrollLeft uses [-range, 0]; thumb and drag math need these bounds.
  IEScrollbar.prototype._scrollBounds = function (vertical, scrollRange) {
    if (vertical) return { min: 0, max: scrollRange };
    var isRTL = this.win.getComputedStyle(this.target).direction === "rtl";
    return isRTL ? { min: -scrollRange, max: 0 } : { min: 0, max: scrollRange };
  };

  IEScrollbar.prototype._bind = function () {
    var self = this;
    var vertical = this.orientation === "vertical";
    var win = this.win;

    this._listeners = [];
    function listen(target, type, handler) {
      target.addEventListener(type, handler);
      self._listeners.push([target, type, handler]);
    }

    // Document scroll events belong to the instance's window.
    listen(this.windowMode ? win : this.target, "scroll", function () {
      self.update();
    });

    listen(this.buttonStart, "pointerdown", function (e) {
      e.preventDefault();
      self._setPressed(self.buttonStart);
      self._startRepeat(-1);
    });
    listen(this.buttonEnd, "pointerdown", function (e) {
      e.preventDefault();
      self._setPressed(self.buttonEnd);
      self._startRepeat(1);
    });
    function releasePress() {
      self._stopRepeat();
      self._setPressed(null);
    }
    listen(win, "pointerup", releasePress);
    listen(win, "pointercancel", releasePress);
    listen(win, "blur", releasePress);

    listen(this.track, "pointerdown", function (e) {
      if (e.target !== self.track) return;
      var rect = self.track.getBoundingClientRect();
      var clickPos = vertical ? e.clientY - rect.top : e.clientX - rect.left;
      var thumbStart = vertical ? self.thumb.offsetTop : self.thumb.offsetLeft;
      self._pageStep(clickPos < thumbStart ? -1 : 1);
    });

    listen(this.thumb, "pointerdown", function (e) {
      e.preventDefault();
      if (self._endDrag) self._endDrag();
      if (thumbPressedInvertRequested(win, self.thumb)) self.thumb.classList.add("ie-scrollbar__thumb--pressed");
      var startPointer = vertical ? e.clientY : e.clientX;
      var startScroll = vertical ? self.target.scrollTop : self.target.scrollLeft;
      var trackSize = vertical ? self.track.clientHeight : self.track.clientWidth;
      var thumbSize = vertical ? self.thumb.offsetHeight : self.thumb.offsetWidth;
      var scrollRange = vertical
        ? self.target.scrollHeight - self.target.clientHeight
        : self.target.scrollWidth - self.target.clientWidth;
      var bounds = self._scrollBounds(vertical, scrollRange);
      var trackRange = trackSize - thumbSize;

      function onMove(moveEvent) {
        if (trackRange <= 0 || scrollRange <= 0) return;
        var pointer = vertical ? moveEvent.clientY : moveEvent.clientX;
        var delta = pointer - startPointer;
        var scrollDelta = (delta / trackRange) * scrollRange;
        var next = startScroll + scrollDelta;
        next = Math.max(bounds.min, Math.min(bounds.max, next));
        self.target[vertical ? "scrollTop" : "scrollLeft"] = next;
      }

      function onUp() {
        self.thumb.classList.remove("ie-scrollbar__thumb--pressed");
        win.removeEventListener("pointermove", onMove);
        win.removeEventListener("pointerup", onUp);
        win.removeEventListener("pointercancel", onUp);
        win.removeEventListener("blur", onUp);
        self._endDrag = null;
      }

      self._endDrag = onUp;
      win.addEventListener("pointermove", onMove);
      win.addEventListener("pointerup", onUp);
      win.addEventListener("pointercancel", onUp);
      win.addEventListener("blur", onUp);
    });
  };

  IEScrollbar.prototype.update = function () {
    var vertical = this.orientation === "vertical";
    var target = this.target;

    var trackSize = vertical ? this.track.clientHeight : this.track.clientWidth;
    var contentSize = vertical ? target.scrollHeight : target.scrollWidth;
    var viewportSize = vertical ? target.clientHeight : target.clientWidth;
    var scrollPos = vertical ? target.scrollTop : target.scrollLeft;
    var scrollRange = contentSize - viewportSize;

    var minThumbSizePx = resolveMinThumbSizePx(this.win, this.el);
    var halfThumbActive = smallTrackHalfThumbRequested(this.win, this.el) && trackSize < SMALL_TRACK_THRESHOLD;
    var thumbSize = halfThumbActive
      ? trackSize * SMALL_TRACK_THUMB_FRACTION
      : Math.min(trackSize, Math.max(minThumbSizePx, trackSize * (viewportSize / contentSize)));
    // Disable the CSS minimum too, or it clamps the short-track thumb.
    this.el.classList.toggle("ie-scrollbar--small-track-half", halfThumbActive);
    var bounds = this._scrollBounds(vertical, scrollRange);
    var thumbPos = scrollRange > 0 ? (trackSize - thumbSize) * ((scrollPos - bounds.min) / (bounds.max - bounds.min)) : 0;

    this.buttonStart.classList.toggle("ie-scrollbar__button--disabled", scrollPos <= bounds.min);
    this.buttonEnd.classList.toggle("ie-scrollbar__button--disabled", scrollPos >= bounds.max);

    if (vertical) {
      this.thumb.style.height = thumbSize + "px";
      this.thumb.style.top = thumbPos + "px";
    } else {
      this.thumb.style.width = thumbSize + "px";
      this.thumb.style.left = thumbPos + "px";
    }
  };

  // Must tolerate partial construction for failed-mount cleanup.
  IEScrollbar.prototype.destroy = function () {
    if (this._destroyed) return;
    this._destroyed = true;
    this._stopRepeat();
    this._setPressed(null);
    if (this._endDrag) this._endDrag();
    (this._listeners || []).forEach(function (listener) {
      listener[0].removeEventListener(listener[1], listener[2]);
    });
    this._listeners = [];
    if (this.el) this.el.remove();
    var vertical = this.orientation === "vertical";
    var target = this.target;
    var wrapper = this.wrapper;
    var group = this._group;

    (this.arrowGlyphs || []).forEach(function (entry) {
      var index = activeArrowGlyphs.indexOf(entry);
      if (index !== -1) activeArrowGlyphs.splice(index, 1);
    });
    var elIndex = activeScrollbarEls.indexOf(this._activeScrollbarEntry);
    if (elIndex !== -1) activeScrollbarEls.splice(elIndex, 1);

    if (this.windowMode) {
      var body = this.doc.body;
      restoreInlineProperties(body, this._savedGutter);

      if (group) {
        group[vertical ? "vertical" : "horizontal"] = null;
        updateCorner(group, this.doc, true);
        // Shared document state stays until the last axis unmounts.
        if (!group.vertical && !group.horizontal) {
          scrollbarGroups.delete(this.doc);
          if (!group.htmlHadHost) this.doc.documentElement.classList.remove("ie-scrollbar-host");
          if (!group.bodyHadHost) body.classList.remove("ie-scrollbar-host");
          restoreInlineProperties(body, group.savedInset);
        }
      }
      return;
    }

    restoreInlineProperties(target, this._savedGutter);

    if (!group) return;
    group[vertical ? "vertical" : "horizontal"] = null;
    updateCorner(group, this.doc, false);

    // Unwrap only after the last axis unmounts.
    if (group.vertical || group.horizontal) return;

    scrollbarGroups.delete(target);
    if (target.parentNode === wrapper) {
      if (wrapper.parentNode) wrapper.parentNode.insertBefore(target, wrapper);
      else wrapper.removeChild(target);
    }
    wrapper.remove();

    if (!group.hadHost) target.classList.remove("ie-scrollbar-host");
    restoreInlineProperties(target, group.savedStyle);
    if (group.addedTabIndex && target.getAttribute("tabindex") === "0") target.removeAttribute("tabindex");
  };

  global.IEScrollbar = IEScrollbar;

  // Legacy CSS resolution
  // Read raw CSS; CSSOM can discard legacy scrollbar properties.

  var PROPERTY_MAP = {
    "scrollbar-face-color": "face",
    "scrollbar-3dlight-color": "threeDLight",
    "scrollbar-highlight-color": "highlight",
    "scrollbar-shadow-color": "shadow",
    "scrollbar-darkshadow-color": "darkShadow",
    "scrollbar-arrow-color": "arrow",
    "scrollbar-track-color": "track"
  };

  // Selector specificity: [inline, id, class, type]

  function compareSpecificity(a, b) {
    for (var i = 0; i < 4; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  }

  // Split only top-level commas; pseudo-class arguments stay intact.
  function splitTopLevelCommas(text) {
    var parts = [];
    var depth = 0;
    var start = 0;
    var quote = null;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch === "\\") { i++; continue; }
      if (quote) {
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'") { quote = ch; continue; }
      if (ch === "(" || ch === "[") depth++;
      else if (ch === ")" || ch === "]") depth--;
      else if (ch === "," && depth === 0) {
        parts.push(text.slice(start, i));
        start = i + 1;
      }
    }
    parts.push(text.slice(start));
    return parts;
  }

  function extractFunctionalPseudos(selector, counts) {
    var re = /:(not|is|has|where)\(/gi;
    var result = "";
    var lastIndex = 0;
    var match;

    while ((match = re.exec(selector))) {
      var name = match[1].toLowerCase();
      var parenStart = re.lastIndex - 1;
      var depth = 1;
      var j = parenStart + 1;
      while (j < selector.length && depth > 0) {
        if (selector[j] === "(") depth++;
        else if (selector[j] === ")") depth--;
        j++;
      }
      var inner = selector.slice(parenStart + 1, j - 1);
      result += selector.slice(lastIndex, match.index);

      if (name !== "where") {
        var best = [0, 0, 0, 0];
        splitTopLevelCommas(inner).forEach(function (arg) {
          var argCounts = specificity(arg.trim());
          if (compareSpecificity(argCounts, best) > 0) best = argCounts;
        });
        counts[1] += best[1];
        counts[2] += best[2];
        counts[3] += best[3];
      }

      lastIndex = j;
      re.lastIndex = j;
    }
    result += selector.slice(lastIndex);
    return result;
  }

  var LEGACY_PSEUDO_ELEMENTS = ["before", "after", "first-line", "first-letter"];

  function specificity(selectorText) {
    var counts = [0, 0, 0, 0];
    var s = selectorText.replace(/\[(?:[^\]"'\\]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\]/g, function () {
      counts[2]++;
      return "";
    });
    s = extractFunctionalPseudos(s, counts);

    var idMatches = s.match(/#[-\w\\]+/g) || [];
    counts[1] += idMatches.length;
    s = s.replace(/#[-\w\\]+/g, "");

    var classMatches = s.match(/\.[-\w\\]+/g) || [];
    counts[2] += classMatches.length;
    s = s.replace(/\.[-\w\\]+/g, "");

    var pseudoElementMatches = s.match(/::[-\w]+/g) || [];
    counts[3] += pseudoElementMatches.length;
    s = s.replace(/::[-\w]+/g, "");

    var pseudoClassMatches = s.match(/:[-\w]+/g) || [];
    pseudoClassMatches.forEach(function (p) {
      var name = p.slice(1).toLowerCase();
      if (LEGACY_PSEUDO_ELEMENTS.indexOf(name) !== -1) {
        counts[3] += 1;
      } else {
        counts[2] += 1;
      }
    });
    s = s.replace(/:[-\w]+/g, "");

    var typeMatches = s.match(/[a-zA-Z][-\w]*/g) || [];
    counts[3] += typeMatches.length;

    return counts;
  }

  // Declaration parsing

  function stripComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, "");
  }

  function parseDeclarations(body) {
    var result = {};
    body.split(";").forEach(function (decl) {
      var colon = decl.indexOf(":");
      if (colon === -1) return;
      var prop = decl.slice(0, colon).trim().toLowerCase();
      var value = decl.slice(colon + 1).trim();
      if (!value) return;
      if (prop === "scrollbar-base-color") return;
      var key = PROPERTY_MAP[prop];
      if (key) result[key] = value;
    });
    return result;
  }

  // CSS text to rules. Only @media blocks are evaluated.
  function extractRules(cssText, rules, win) {
    var text = stripComments(cssText);
    var i = 0;
    var len = text.length;

    while (i < len) {
      var brace = text.indexOf("{", i);
      if (brace === -1) break;
      var header = text.slice(i, brace).trim();
      var depth = 1;
      var j = brace + 1;
      while (j < len && depth > 0) {
        if (text[j] === "{") depth++;
        else if (text[j] === "}") depth--;
        j++;
      }
      var inner = text.slice(brace + 1, j - 1);

      if (header.charAt(0) === "@") {
        var atMatch = /^@media\s+(.+)$/i.exec(header);
        if (atMatch) {
          var matches = false;
          try {
            matches = win.matchMedia(atMatch[1]).matches;
          } catch (e) {
            matches = false;
          }
          if (matches) extractRules(inner, rules, win);
        }
      } else if (header) {
        var declarations = parseDeclarations(inner);
        if (Object.keys(declarations).length) {
          var selectors = splitTopLevelCommas(header).map(function (sel) { return sel.trim(); }).filter(Boolean);
          rules.push({ selectors: selectors, declarations: declarations });
        }
      }

      i = j;
    }
  }

  // Stylesheet loading
  function parseImportStatement(statement) {
    var m = /^@import\s+(?:url\(\s*(['"]?)([^'")]*)\1\s*\)|(['"])([^'"]*)\3)\s*(.*)$/i.exec(statement);
    if (!m) return null;
    var url = m[2] !== undefined ? m[2] : m[4];
    if (!url) return null;
    return { url: url, media: (m[5] || "").trim() };
  }

  function ingestStylesheetURL(url, baseURL, media, rules, seenURLs, done, win) {
    var resolvedURL;
    try {
      resolvedURL = new URL(url, baseURL).href;
    } catch (e) {
      done();
      return;
    }

    if (seenURLs[resolvedURL]) {
      done();
      return;
    }
    seenURLs[resolvedURL] = true;

    if (media) {
      var matches = false;
      try {
        matches = win.matchMedia(media).matches;
      } catch (e) {
        matches = false;
      }
      if (!matches) {
        done();
        return;
      }
    }

    var sameOrigin;
    try {
      sameOrigin = new URL(resolvedURL).origin === global.location.origin;
    } catch (e) {
      sameOrigin = false;
    }
    if (!sameOrigin) {
      done();
      return;
    }

    global.fetch(resolvedURL)
      .then(function (res) { return res.text(); })
      .then(function (text) { scanStylesheet(text, resolvedURL, rules, seenURLs, done, win); })
      .catch(function () { done(); });
  }

  // Await imports in source order to preserve the cascade.
  function scanStylesheet(cssText, baseURL, rules, seenURLs, onDone, win) {
    var text = stripComments(cssText);
    var len = text.length;
    var i = 0;

    function step() {
      while (true) {
        while (i < len && /\s/.test(text.charAt(i))) i++;
        if (i >= len) { onDone(); return; }

        var braceIndex = text.indexOf("{", i);
        var semiIndex = text.indexOf(";", i);

        if (semiIndex !== -1 && (braceIndex === -1 || semiIndex < braceIndex)) {
          var statement = text.slice(i, semiIndex).trim();
          i = semiIndex + 1;
          var imp = /^@import\b/i.test(statement) ? parseImportStatement(statement) : null;
          if (imp) {
            ingestStylesheetURL(imp.url, baseURL, imp.media, rules, seenURLs, step, win);
            return;
          }
          continue;
        }

        if (braceIndex === -1) { onDone(); return; }

        var header = text.slice(i, braceIndex).trim();
        var depth = 1;
        var j = braceIndex + 1;
        while (j < len && depth > 0) {
          if (text.charAt(j) === "{") depth++;
          else if (text.charAt(j) === "}") depth--;
          j++;
        }
        var inner = text.slice(braceIndex + 1, j - 1);
        i = j;

        if (header.charAt(0) === "@") {
          var atMatch = /^@media\s+(.+)$/i.exec(header);
          if (atMatch) {
            var mediaMatches = false;
            try {
              mediaMatches = win.matchMedia(atMatch[1]).matches;
            } catch (e) {
              mediaMatches = false;
            }
            if (mediaMatches) extractRules(inner, rules, win);
          }
        } else if (header) {
          var declarations = parseDeclarations(inner);
          if (Object.keys(declarations).length) {
            var selectors = splitTopLevelCommas(header).map(function (sel) { return sel.trim(); }).filter(Boolean);
            rules.push({ selectors: selectors, declarations: declarations });
          }
        }

      }
    }

    step();
  }

  // Discovery + resolution

  // Cache per document so iframe rules stay separate.
  var cachedRulesByDoc = new WeakMap();

  // Discovery. Resolve colors only after the callback.
  function discover(callback, doc) {
    doc = doc || global.document;
    var win = doc.defaultView || doc.parentWindow || global;
    var sources = Array.prototype.slice.call(doc.querySelectorAll('style, link[rel~="stylesheet"]'));
    var seenURLs = Object.create(null);
    var results = new Array(sources.length);
    var pending = sources.length;

    if (!pending) {
      finish();
      return;
    }

    sources.forEach(function (node, idx) {
      var localRules = [];
      function done() {
        results[idx] = localRules;
        pending--;
        if (pending === 0) finish();
      }

      if (node.tagName === "STYLE") {
        scanStylesheet(node.textContent || "", doc.baseURI, localRules, seenURLs, done, win);
      } else {
        var href = node.getAttribute("href");
        if (href) {
          ingestStylesheetURL(href, doc.baseURI, "", localRules, seenURLs, done, win);
        } else {
          done();
        }
      }
    });

    function finish() {
      var rules = [];
      results.forEach(function (localRules) {
        if (localRules) rules = rules.concat(localRules);
      });
      rules.forEach(function (rule, index) {
        rule.order = index;
        rule.specificities = rule.selectors.map(specificity);
      });
      cachedRulesByDoc.set(doc, rules);
      callback();
    }
  }

  function isPageWideMatch(selector, doc) {
    return matchesSelector(doc.documentElement, selector) || matchesSelector(doc.body, selector);
  }

  function matchesSelector(el, selector) {
    try {
      return el.matches(selector);
    } catch (e) {
      return false;
    }
  }

  function mergeByCascade(entries) {
    var sorted = entries.slice().sort(function (a, b) {
      var cmp = compareSpecificity(a.specificity, b.specificity);
      if (cmp !== 0) return cmp;
      return a.order - b.order;
    });
    var result = {};
    sorted.forEach(function (entry) {
      Object.keys(entry.declarations).forEach(function (key) {
        result[key] = entry.declarations[key];
      });
    });
    return result;
  }

  // Element declarations win; page-wide rules fill unset properties.
  function resolveColors(target) {
    var doc = target.ownerDocument;
    var cachedRules = cachedRulesByDoc.get(doc);
    if (!cachedRules) {
      throw new Error("IEScrollbarLegacy.resolve() called before discover() completed for this element's document");
    }

    var pageWideEntries = [];
    var elementEntries = [];

    cachedRules.forEach(function (rule) {
      rule.selectors.forEach(function (selector, index) {
        var sourceOrder = rule.order;
        if (isPageWideMatch(selector, doc)) {
          pageWideEntries.push({
            declarations: rule.declarations,
            specificity: rule.specificities[index],
            order: sourceOrder
          });
        }
        if (matchesSelector(target, selector)) {
          elementEntries.push({
            declarations: rule.declarations,
            specificity: rule.specificities[index],
            order: sourceOrder
          });
        }
      });
    });

    var inlineStyle = target.getAttribute("style");
    if (inlineStyle) {
      elementEntries.push({
        declarations: parseDeclarations(inlineStyle),
        specificity: [1, 0, 0, 0],
        order: Infinity
      });
    }

    var pageWide = mergeByCascade(pageWideEntries);
    var elementSpecific = mergeByCascade(elementEntries);

    var resolved = {};
    Object.keys(pageWide).forEach(function (key) { resolved[key] = pageWide[key]; });
    Object.keys(elementSpecific).forEach(function (key) { resolved[key] = elementSpecific[key]; });
    return resolved;
  }

  global.IEScrollbarLegacy = {
    discover: discover,
    resolveColors: resolveColors,
    _specificity: specificity
  };

  // Automatic mounting

  function isStylesheetNode(node) {
    return node.nodeType === 1 && (node.tagName === "STYLE" || node.tagName === "LINK");
  }

  function createScope(doc, win) {
    var mountedElements = new Map();
    var windowInstances = { vertical: null, horizontal: null };
    var windowObserved = false;
    var legacyReady = false;
    var disposed = false;
    var rescanScheduled = false;
    var legacyDirty = false;
    var mo = null;
    var onWinResize = null;
    var iframeScopes = new Map();
    var loadBoundIframes = new Map();

    var resizeObserver = typeof win.ResizeObserver !== "undefined"
      ? new win.ResizeObserver(function (entries) {
          scheduleRescan(false, entries.map(function (entry) { return entry.target; }));
        })
      : null;

    // Candidate detection

    function isInternal(el) {
      return !!(el.closest && el.closest("[data-ie-scrollbar-internal]"));
    }

    function isOverflowingVertically(el, cs) {
      if (cs.overflowY !== "auto" && cs.overflowY !== "scroll") return false;
      // Allow 1px slack for subpixel rounding.
      return el.scrollHeight - el.clientHeight > 1;
    }

    function isOverflowingHorizontally(el, cs) {
      if (cs.overflowX !== "auto" && cs.overflowX !== "scroll") return false;
      return el.scrollWidth - el.clientWidth > 1;
    }

    function isRendered(el) {
      return el.offsetParent !== null || win.getComputedStyle(el).position === "fixed";
    }

    function isScanCandidate(el) {
      if (el === doc.documentElement || el === doc.body) return false;
      if (el.tagName === "IFRAME") return false;
      if (isInternal(el)) return false;
      return true;
    }

    function windowShouldScrollVertically() {
      var htmlOverflow = win.getComputedStyle(doc.documentElement).overflowY;
      var bodyOverflow = win.getComputedStyle(doc.body).overflowY;
      if (htmlOverflow === "hidden" || bodyOverflow === "hidden") return false;
      var scrollEl = doc.scrollingElement || doc.documentElement;
      return scrollEl.scrollHeight - scrollEl.clientHeight > 1;
    }

    function windowShouldScrollHorizontally() {
      var htmlOverflow = win.getComputedStyle(doc.documentElement).overflowX;
      var bodyOverflow = win.getComputedStyle(doc.body).overflowX;
      if (htmlOverflow === "hidden" || bodyOverflow === "hidden") return false;
      var scrollEl = doc.scrollingElement || doc.documentElement;
      return scrollEl.scrollWidth - scrollEl.clientWidth > 1;
    }

    // Mount / unmount

    function applyColors(bar, colorTarget) {
      if (!legacyReady) return;
      bar.setColors(resolveColors(colorTarget));
    }

    // Remember failed mounts to avoid endless retries.
    var failedMounts = new WeakMap();
    function hasFailed(el, orientation) {
      var f = failedMounts.get(el);
      return !!(f && f[orientation]);
    }
    function markFailed(el, orientation, error) {
      var f = failedMounts.get(el);
      if (!f) { f = {}; failedMounts.set(el, f); }
      f[orientation] = true;
      if (global.console && global.console.error) {
        global.console.error("ie-scrollbar: failed to mount " + orientation + " scrollbar on", el, error);
      }
    }
    function forgetFailure(el) {
      failedMounts.delete(el);
    }

    function tryMount(el, orientation) {
      if (hasFailed(el, orientation)) return null;
      try {
        return new IEScrollbar(el, { orientation: orientation });
      } catch (e) {
        markFailed(el, orientation, e);
        return null;
      }
    }

    function syncElement(el) {
      var rendered = isRendered(el);
      var computed = rendered ? win.getComputedStyle(el) : null;
      var wantVertical = rendered && isOverflowingVertically(el, computed) && !hasFailed(el, "vertical");
      var wantHorizontal = rendered && isOverflowingHorizontally(el, computed) && !hasFailed(el, "horizontal");
      var entry = mountedElements.get(el);

      if (!wantVertical && !wantHorizontal) {
        if (entry) unmountElement(el, entry);
        return;
      }

      if (!entry) {
        entry = { vertical: null, horizontal: null };
        mountedElements.set(el, entry);
        if (resizeObserver) resizeObserver.observe(el);
      }

      if (wantVertical && !entry.vertical) {
        entry.vertical = tryMount(el, "vertical");
        if (entry.vertical) applyColors(entry.vertical, el);
      } else if (!wantVertical && entry.vertical) {
        entry.vertical.destroy();
        entry.vertical = null;
      } else if (entry.vertical) {
        applyColors(entry.vertical, el);
        entry.vertical.update();
      }

      if (wantHorizontal && !entry.horizontal) {
        entry.horizontal = tryMount(el, "horizontal");
        if (entry.horizontal) applyColors(entry.horizontal, el);
      } else if (!wantHorizontal && entry.horizontal) {
        entry.horizontal.destroy();
        entry.horizontal = null;
      } else if (entry.horizontal) {
        applyColors(entry.horizontal, el);
        entry.horizontal.update();
      }

      // Do not call unmountElement here: it clears the retry guard.
      if (!entry.vertical && !entry.horizontal) {
        if (resizeObserver) resizeObserver.unobserve(el);
        mountedElements.delete(el);
      }
    }

    function unmountElement(el, entry) {
      entry = entry || mountedElements.get(el);
      if (!entry) return;
      if (resizeObserver) resizeObserver.unobserve(el);
      if (entry.vertical) entry.vertical.destroy();
      if (entry.horizontal) entry.horizontal.destroy();
      mountedElements.delete(el);
      forgetFailure(el);
    }

    function ensureWindowObserved() {
      if (!windowObserved && resizeObserver) {
        resizeObserver.observe(doc.documentElement);
        windowObserved = true;
      }
    }

    function maybeUnobserveWindow() {
      if (windowObserved && !windowInstances.vertical && !windowInstances.horizontal && resizeObserver) {
        resizeObserver.unobserve(doc.documentElement);
        windowObserved = false;
      }
    }

    function syncWindowOrientation(orientation, want) {
      var current = windowInstances[orientation];
      if (want && !current) {
        ensureWindowObserved();
        current = new IEScrollbar(null, { orientation: orientation, window: true, doc: doc });
        windowInstances[orientation] = current;
        applyColors(current, doc.documentElement);
      } else if (!want && current) {
        current.destroy();
        windowInstances[orientation] = null;
        maybeUnobserveWindow();
        return;
      }
      if (windowInstances[orientation]) {
        applyColors(windowInstances[orientation], doc.documentElement);
        windowInstances[orientation].update();
      }
    }

    function updateWindowScrollbar() {
      syncWindowOrientation("vertical", windowShouldScrollVertically());
      syncWindowOrientation("horizontal", windowShouldScrollHorizontally());
    }

    // Same-origin iframe recursion

    // Cross-origin access can throw or return null.
    function getAccessibleContentDocument(iframe) {
      try {
        return iframe.contentDocument || null;
      } catch (e) {
        return null;
      }
    }

    function ensureLoadListener(iframe) {
      if (loadBoundIframes.has(iframe)) return;
      var onLoad = function () { if (!disposed) handleIframe(iframe); };
      loadBoundIframes.set(iframe, onLoad);
      // Iframe navigation needs a load listener; parent mutations miss it.
      iframe.addEventListener("load", onLoad);
    }

    function handleIframe(iframe) {
      var contentDoc = getAccessibleContentDocument(iframe);
      var existing = iframeScopes.get(iframe);

      if (!contentDoc || !contentDoc.documentElement) {
        if (existing) {
          existing.scope.dispose();
          iframeScopes.delete(iframe);
        }
        return;
      }

      var contentWin = contentDoc.defaultView;

      // Defer to an iframe's own auto-mounter to avoid duplicate scopes.
      var selfManaging = !!(contentWin && contentWin.IEScrollbarAuto);

      if (selfManaging || !contentWin) {
        if (existing) {
          existing.scope.dispose();
          iframeScopes.delete(iframe);
        }
        ensureLoadListener(iframe);
        return;
      }

      if (existing && existing.doc === contentDoc) {
        ensureLoadListener(iframe);
        return;
      }

      if (existing) {
        existing.scope.dispose();
      }

      ensureStylesheet(contentDoc);
      var childScope = createScope(contentDoc, contentWin);
      iframeScopes.set(iframe, { scope: childScope, doc: contentDoc });
      childScope.init();
      ensureLoadListener(iframe);
    }

    function scanIframes() {
      var iframes = doc.querySelectorAll("iframe");
      var seen = new Set();
      for (var i = 0; i < iframes.length; i++) {
        seen.add(iframes[i]);
        handleIframe(iframes[i]);
      }
      loadBoundIframes.forEach(function (handler, iframe) {
        if (!seen.has(iframe)) {
          iframe.removeEventListener("load", handler);
          loadBoundIframes.delete(iframe);
        }
      });
      iframeScopes.forEach(function (entry, iframe) {
        if (!seen.has(iframe)) {
          entry.scope.dispose();
          iframeScopes.delete(iframe);
        }
      });
    }

    // Rescan

    // Scoped scans include ancestors; cleanup always checks all mounts.
    function rescan(mutatedRoots) {
      if (disposed || !doc.body) return;
      updateWindowScrollbar();

      if (mutatedRoots) {
        var visited = new Set();
        var scannedRoots = new Set();
        for (var r = 0; r < mutatedRoots.length; r++) {
          var root = mutatedRoots[r];
          if (root.nodeType !== 1 || scannedRoots.has(root) || !doc.documentElement.contains(root)) continue;
          scannedRoots.add(root);
          for (var ancestor = root; ancestor; ancestor = ancestor.parentElement) {
            if (!visited.has(ancestor)) {
              visited.add(ancestor);
              if (isScanCandidate(ancestor)) syncElement(ancestor);
            }
          }
          var descendants = root.querySelectorAll("*");
          for (var i = 0; i < descendants.length; i++) {
            var el = descendants[i];
            if (visited.has(el)) continue;
            visited.add(el);
            if (isScanCandidate(el)) syncElement(el);
          }
        }
      } else {
        var all = doc.querySelectorAll("*");
        for (var j = 0; j < all.length; j++) {
          if (isScanCandidate(all[j])) syncElement(all[j]);
        }
      }

      // Removal cleanup is independent of scan scope.
      mountedElements.forEach(function (entry, el) {
        if (!doc.body.contains(el)) unmountElement(el, entry);
      });

      scanIframes();
    }

    // Scheduling

    var pendingRoots = [];
    var pendingFullRescan = false;

    function scheduleRescan(styleMayHaveChanged, roots) {
      if (disposed) return;
      if (styleMayHaveChanged) legacyDirty = true;
      if (roots) {
        if (!pendingFullRescan) {
          for (var i = 0; i < roots.length; i++) pendingRoots.push(roots[i]);
        }
      } else {
        pendingFullRescan = true;
      }
      if (rescanScheduled) return;
      rescanScheduled = true;
      // Use a timer; rAF stalls in hidden tabs.
      win.setTimeout(function () {
        rescanScheduled = false;
        if (disposed) return;
        var thisRescanRoots = pendingFullRescan ? null : pendingRoots;
        pendingRoots = [];
        pendingFullRescan = false;
        if (legacyDirty) {
          legacyDirty = false;
          discover(function () {
            legacyReady = true;
            // CSS changes require a full scan.
            rescan(null);
          }, doc);
        } else {
          rescan(thisRescanRoots);
        }
      });
    }

    // Observers

    function watchForChanges() {
      mo = new win.MutationObserver(function (mutations) {
        var relevant = false;
        var styleChanged = false;
        var roots = [];

        mutations.forEach(function (m) {
          // Ignore our mutations to prevent rescan loops.
          if (isInternal(m.target) || (m.target.nodeType === 1 && m.target.hasAttribute && m.target.hasAttribute("data-ie-scrollbar-internal"))) {
            return;
          }
          relevant = true;

          if (m.type === "childList") {
            if (m.target.nodeType === 1) roots.push(m.target);
            // Setting style.textContent triggers childList, not characterData.
            if (m.target.nodeType === 1 && m.target.tagName === "STYLE") {
              styleChanged = true;
            }
            for (var i = 0; i < m.addedNodes.length && !styleChanged; i++) {
              if (isStylesheetNode(m.addedNodes[i])) styleChanged = true;
            }
            for (var j = 0; j < m.removedNodes.length && !styleChanged; j++) {
              if (isStylesheetNode(m.removedNodes[j])) styleChanged = true;
            }
          } else if (m.type === "characterData") {
            var parent = m.target.parentNode;
            if (parent && parent.tagName === "STYLE") styleChanged = true;
            if (parent && parent.nodeType === 1) roots.push(parent);
          } else if (m.type === "attributes") {
            if (m.target.tagName === "LINK" && m.attributeName === "href") styleChanged = true;
            if (m.target.nodeType === 1) roots.push(m.target);
          }
        });

        if (relevant) scheduleRescan(styleChanged, roots.length ? roots : null);
      });

      mo.observe(doc.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "href"],
        characterData: true
      });

      onWinResize = function () { scheduleRescan(false); };
      win.addEventListener("resize", onWinResize);
    }

    function dispose() {
      if (disposed) return;
      disposed = true;
      if (mo) mo.disconnect();
      if (onWinResize) win.removeEventListener("resize", onWinResize);
      if (resizeObserver) resizeObserver.disconnect();
      mountedElements.forEach(function (entry) {
        if (entry.vertical) entry.vertical.destroy();
        if (entry.horizontal) entry.horizontal.destroy();
      });
      mountedElements.clear();
      if (windowInstances.vertical) {
        windowInstances.vertical.destroy();
        windowInstances.vertical = null;
      }
      if (windowInstances.horizontal) {
        windowInstances.horizontal.destroy();
        windowInstances.horizontal = null;
      }
      windowObserved = false;
      iframeScopes.forEach(function (entry) { entry.scope.dispose(); });
      iframeScopes.clear();
      loadBoundIframes.forEach(function (handler, iframe) {
        iframe.removeEventListener("load", handler);
      });
      loadBoundIframes.clear();
    }

    function init() {
      watchForChanges();
      scheduleRescan(true);
    }

    return {
      init: init,
      rescan: function () { scheduleRescan(false); },
      dispose: dispose,
      _debugState: function () {
        return {
          mounted: Array.from(mountedElements.entries()).map(function (pair) {
            var el = pair[0], entry = pair[1];
            var axes = [];
            if (entry.vertical) axes.push("vertical");
            if (entry.horizontal) axes.push("horizontal");
            return (el.id || el.tagName) + ":" + axes.join("+");
          }),
          window: {
            vertical: !!windowInstances.vertical,
            horizontal: !!windowInstances.horizontal
          },
          legacyReady: legacyReady,
          rescanScheduled: rescanScheduled,
          legacyDirty: legacyDirty,
          iframeScopes: iframeScopes.size
        };
      }
    };
  }

  // Init

  ensureStylesheet(document);
  var topScope = createScope(document, global);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", topScope.init);
  } else {
    topScope.init();
  }

  global.IEScrollbarAuto = {
    rescan: topScope.rescan,
    _debugState: topScope._debugState
  };

})(window);
