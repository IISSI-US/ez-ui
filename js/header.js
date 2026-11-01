"use strict";

import { ezThemeToggle } from "./utils/theme-toggle.js";

function main() {
    // El botón de la cabecera cambia entre el tema claro y el oscuro
    ezThemeToggle(document.getElementById("theme-toggle"));
    markCurrentPage();
}

// Marca el enlace de la página actual para que se vea dónde se está
function markCurrentPage() {
    let currentPage = window.location.pathname.split("/").pop() || "index.html";
    let links = document.querySelectorAll(".ez-navbar__links a");

    for (let link of links) {
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    }
}

document.addEventListener("DOMContentLoaded", main);
