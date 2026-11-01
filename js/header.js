"use strict";

import { include } from "./utils/include.js";
import { ezNavbar } from "../ez-ui/js/navbar.js";
import { ezThemeToggle } from "../ez-ui/js/theme.js";

async function main() {
  // La cabecera común se carga en #page-header; hasta que llega, sus elementos no existen
  await include("header.html", "#page-header");
  // El pie común, igual en todas las páginas
  await include("footer.html", "#page-footer");

  // En una pantalla estrecha, los enlaces se pliegan bajo el botón «Menú»
  ezNavbar(document.querySelector("#page-header .ez-navbar"));

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
