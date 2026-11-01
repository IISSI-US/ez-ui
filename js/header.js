"use strict";

import { include } from "./utils/include.js";
import { themeToggle } from "./utils/theme-toggle.js";
import { ezNavbar } from "../ez-ui/js/navbar.js";

async function main() {
  // La cabecera común se carga en #page-header; hasta que llega, sus elementos no existen
  await include("header.html", "#page-header");

  // En una pantalla estrecha, los enlaces se pliegan bajo el botón «Menú»
  ezNavbar(document.querySelector("#page-header .ez-navbar"));

  // El botón de la cabecera cambia entre el tema claro y el oscuro
  themeToggle(document.getElementById("theme-toggle"));
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
