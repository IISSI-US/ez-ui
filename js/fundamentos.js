"use strict";

import { exampleRenderer } from "./renderers/examples.js";

function main() {
    exampleRenderer.addCodeToAll();
    exampleRenderer.addSourceToAll();
}

document.addEventListener("DOMContentLoaded", main);
