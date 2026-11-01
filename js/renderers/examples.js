"use strict";

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

    // Muestra el contenido de un fichero de la web (el JavaScript de un ejemplo):
    // cada <template class="doc-source" data-file="js/examples/…"> se sustituye por
    // el código del fichero, así que lo que se ve es lo que se ejecuta
    addSourceToAll: async function () {
        let sources = document.querySelectorAll(".doc-source");

        for (let source of sources) {
            let response = await fetch(source.dataset.file);
            let code = await response.text();
            let codeBlock = exampleRenderer.asCodeBlock(code);
            codeBlock.classList.add("doc-code--alone");
            source.replaceWith(codeBlock);
        }
    },

    // Crea el bloque de código, con un botón para copiarlo
    asCodeBlock: function (html) {
        let code = removeIndentation(writeBooleanAttributes(html));

        let block = document.createElement("div");
        block.className = "doc-code";

        let pre = document.createElement("pre");
        let codeElement = document.createElement("code");
        // textContent muestra el HTML como texto, sin interpretarlo
        codeElement.textContent = code;
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
