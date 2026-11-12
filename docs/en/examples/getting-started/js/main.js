"use strict";

import { ezNavbar } from "../ez-ui/js/navbar.js";
import { ezThemeToggle } from "../ez-ui/js/theme.js";

function main() {
  // The bar is already in the HTML: here only its collapsible menu is added
  ezNavbar(document.querySelector(".ez-navbar"));

  // The theme button switches the theme and remembers it
  ezThemeToggle(document.getElementById("theme-toggle"));
}

document.addEventListener("DOMContentLoaded", main);
