"use strict";

import { exampleRenderer } from "./renderers/examples.js";

async function main() {
  exampleRenderer.addCodeToAll();
  await showFiles();
}

// Muestra el código de los ficheros del proyecto de ejemplo (data-file): se leen de
// examples/primeros-pasos/, así que lo que se ve es lo que hace funcionar el ejemplo
async function showFiles() {
  for (let element of document.querySelectorAll("[data-file]")) {
    let response = await fetch(element.dataset.file);

    if (!response.ok) {
      console.error(`No se ha podido cargar ${element.dataset.file} (${response.status})`);
      continue;
    }

    let codeBlock = exampleRenderer.asCodeBlock(await response.text());
    codeBlock.classList.add("doc-code--alone");
    element.replaceWith(codeBlock);
  }
}

document.addEventListener("DOMContentLoaded", main);
