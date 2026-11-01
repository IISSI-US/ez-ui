"use strict";

// Colorea el código de los ejemplos (HTML, CSS o JavaScript). Devuelve un fragmento
// con un <span class="tok-…"> por cada trozo que se colorea; el texto se añade con
// textContent, así que nunca se interpreta como HTML.

// Cada lenguaje es una expresión regular con un grupo con nombre por tipo de trozo;
// el nombre del grupo es la clase del <span> (tok-tag, tok-attr…), en css/site.css
const LANGUAGES = {
    html: /(?<comment><!--[\s\S]*?-->)|(?<punct><\/?)(?<tag>[a-zA-Z][\w-]*)|(?<attr>[\w:-]+)(?==)|(?<string>"[^"]*")|(?<punct2>\/?>)/g,
    css: /(?<comment>\/\*[\s\S]*?\*\/)|(?<property>^\s*[\w-]+)(?=\s*:)|(?<variable>--[\w-]+)|(?<string>"[^"]*")|(?<number>#[0-9a-fA-F]{3,8}\b|-?\b\d*\.?\d+(?:rem|em|px|vh|vw|fr|deg|s|%)?)/gm,
    js: /(?<comment>\/\/.*)|(?<string>"[^"]*"|`[^`]*`)|(?<keyword>\b(?:import|from|export|let|const|await|async|function|return|if|else|for|of|new|true|false)\b)|(?<number>\b\d+\b)/g,
};

// El lenguaje de un fragmento de código, por cómo empieza
function detectLanguage(code) {
    let start = code.trimStart();
    if (start.startsWith("<")) {
        return "html";
    }
    if (/^(import|let|const|await|function)\b/m.test(start)) {
        return "js";
    }
    return "css";
}

function highlight(code) {
    let fragment = document.createDocumentFragment();
    let regex = LANGUAGES[detectLanguage(code)];
    let position = 0;

    for (let match of code.matchAll(regex)) {
        // El texto sin colorear que hay antes de este trozo
        fragment.append(code.slice(position, match.index));

        for (let [name, text] of Object.entries(match.groups)) {
            if (text !== undefined) {
                let span = document.createElement("span");
                // punct2 es el mismo tipo que punct (dos grupos no pueden llamarse igual)
                span.className = "tok-" + name.replace(/\d$/, "");
                span.textContent = text;
                fragment.append(span);
            }
        }
        position = match.index + match[0].length;
    }

    fragment.append(code.slice(position));
    return fragment;
}

export { highlight };
