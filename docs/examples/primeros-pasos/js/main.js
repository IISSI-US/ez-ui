"use strict";

import { ezNavbar } from "../ez-ui/js/navbar.js";
import { ezThemeToggle } from "../ez-ui/js/theme.js";

function main() {
  // La barra ya está en el HTML: aquí solo se le añade el menú plegable
  ezNavbar(document.querySelector(".ez-navbar"));

  // El botón de la luna y el sol cambia el tema y lo recuerda
  ezThemeToggle(document.getElementById("theme-toggle"));
}

document.addEventListener("DOMContentLoaded", main);
