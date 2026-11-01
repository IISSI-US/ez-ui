"use strict";

/**
 * Inserta un fichero HTML (p. ej., la cabecera común) dentro del elemento `selector`.
 * Se usa desde un script clásico (no un módulo), como en los laboratorios:
 *     <div id="page-header"></div>
 *     <script>include("header.html", "#page-header");</script>
 *
 * La petición es síncrona a propósito: cuando se ejecutan los módulos de la vista
 * (que se ejecutan después), la cabecera ya está en la página.
 */
function include(htmlFile, selector) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", htmlFile, false);
    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            document.querySelector(selector).innerHTML += xhr.responseText;
        } else {
            console.error(htmlFile + " no existe");
        }
    });
    xhr.send();
}

window.include = include;
