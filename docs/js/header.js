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
  linkOtherLanguage();
}

// Cada página en español y su versión en inglés (en/)
const PAGES = {
  "index.html": "index.html",
  "elementos.html": "elements.html",
  "maquetacion.html": "layout.html",
  "componentes.html": "components.html",
  "formularios.html": "forms.html",
  "javascript.html": "javascript.html",
  "personalizacion.html": "customization.html",
};

// La bandera del otro idioma lleva a la misma página en ese idioma
function linkOtherLanguage() {
  let currentPage = window.location.pathname.split("/").pop() || "index.html";
  let english = document.documentElement.lang === "en";
  let otherPage = english
    ? Object.keys(PAGES).find((page) => PAGES[page] === currentPage) ?? "index.html"
    : PAGES[currentPage] ?? "index.html";
  let otherLink = document.querySelector(english ? "[data-lang=es]" : "[data-lang=en]");
  if (otherLink) {
    otherLink.href = (english ? "../" : "en/") + otherPage + window.location.hash;
  }
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
