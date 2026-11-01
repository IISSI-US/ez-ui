"use strict";

import { highlight } from "../utils/highlight.js";

// Muestra debajo de cada ejemplo el HTML con el que está hecho. El ejemplo se
// escribe una sola vez en la página, así que el código mostrado siempre coincide.
const exampleRenderer = {
  // Añade el código a todos los ejemplos (.doc-example) de la página. Un ejemplo
  // escrito en un <template> no se muestra (el navegador no pinta su contenido):
  // se sustituye por su código
  addCodeToAll: function () {
    let examples = document.querySelectorAll(".doc-example");

    for (let example of examples) {
      // data-code, para lo que no puede ir dentro de un <template>, como la
      // etiqueta <html>, que el navegador descarta
      let html = example.dataset.code ?? example.innerHTML;
      let codeBlock = exampleRenderer.asCodeBlock(html);

      if (example.tagName === "TEMPLATE") {
        codeBlock.classList.add("doc-code--alone");
        example.replaceWith(codeBlock);
      } else {
        example.after(codeBlock);
      }
    }
  },

  // Crea el bloque de código, con un botón para copiarlo
  asCodeBlock: function (html) {
    let code = wrapLongLines(removeIndentation(writeBooleanAttributes(html)));

    let block = document.createElement("div");
    block.className = "doc-code";

    let pre = document.createElement("pre");
    let codeElement = document.createElement("code");
    // El código coloreado, como texto: highlight no interpreta el HTML
    codeElement.append(highlight(code));
    pre.append(codeElement);

    let copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "ez-button ez-button--secondary doc-code__copy";
    copyButton.textContent = "Copiar";
    copyButton.addEventListener("click", async function () {
      await navigator.clipboard.writeText(code);
      copyButton.textContent = "Copiado";
    });

    block.append(copyButton, pre);
    return block;
  },
};

// innerHTML escribe los atributos booleanos con un valor vacío (disabled=""); se
// muestran como se escriben (disabled). alt="" no es booleano y se deja
function writeBooleanAttributes(html) {
  return html.replace(/ (disabled|required|checked|selected|readonly|multiple|hidden|open|autofocus|novalidate)=""/g, " $1");
}

// Parte las líneas de más de 80 caracteres, para que el código se lea sin
// desplazarse a los lados. innerHTML escribe cada etiqueta en una sola línea
function wrapLongLines(code) {
  return code.split("\n").flatMap((line) => wrapLine(line, 80)).join("\n");
}

function wrapLine(line, max) {
  if (line.length <= max) {
    return [line];
  }

  let indent = line.match(/^\s*/)[0];
  let text = line.trim();

  // Un elemento con contenido (<p>…</p>): apertura, contenido y cierre, cada uno
  // en su línea
  let element = text.match(/^(<([a-z][\w-]*)[^>]*>)(.+)(<\/\2>)$/);
  if (element) {
    return [
      ...wrapLine(indent + element[1], max),
      ...wrapLine(indent + "    " + element[3], max),
      indent + element[4],
    ];
  }

  // Texto seguido de un elemento («72 puntos <span>…</span>»): cada uno en su línea
  let mixed = text.match(/^([^<]+?)\s+(<.+)$/);
  if (mixed) {
    return [indent + mixed[1], ...wrapLine(indent + mixed[2], max)];
  }

  // Una etiqueta con varios atributos: uno por línea, alineados con el primero
  let tag = text.match(/^<([a-z][\w-]*)\s+(.*?)(\/?)>$/);
  if (tag) {
    let attributes = tag[2].match(/[^\s=]+(="[^"]*")?/g);
    if (attributes.length > 1) {
      let padding = indent + " ".repeat(tag[1].length + 2);
      let lines = [`${indent}<${tag[1]} ${attributes[0]}`];
      for (let attribute of attributes.slice(1)) {
        lines.push(padding + attribute);
      }
      lines[lines.length - 1] += tag[3] + ">";
      return lines;
    }
  }

  return [line];
}

// Quita las líneas vacías del principio y del final, y la sangría que comparten
// todas las líneas (la del ejemplo dentro de la página)
function removeIndentation(text) {
  let lines = text.split("\n");

  while (lines.length > 0 && lines[0].trim() === "") {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  let indents = lines.filter((line) => line.trim() !== "").map((line) => line.search(/\S/));
  let minIndent = Math.min(...indents);

  return lines.map((line) => line.slice(minIndent)).join("\n");
}

export { exampleRenderer };
