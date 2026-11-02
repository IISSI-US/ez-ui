"use strict";

import { exampleRenderer } from "./renderers/examples.js";

function main() {
  exampleRenderer.addCodeToAll();
}

document.addEventListener("DOMContentLoaded", main);
