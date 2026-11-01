"use strict";

/**
 * Inserta un fichero HTML (p. ej., la cabecera común) dentro del elemento `selector`:
 *     await include("header.html", "#page-header");
 * Es asíncrona: fetch pide el fichero sin bloquear la página, y await espera a que
 * llegue antes de seguir (por ejemplo, antes de buscar los botones de la cabecera).
 */
async function include(htmlFile, selector) {
    let response = await fetch(htmlFile);

    if (!response.ok) {
        console.error(`No se ha podido cargar ${htmlFile} (${response.status})`);
        return;
    }

    document.querySelector(selector).innerHTML = await response.text();
}

export { include };
