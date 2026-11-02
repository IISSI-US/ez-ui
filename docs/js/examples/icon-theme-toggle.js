"use strict";

import { ezThemeToggle } from "../../ez-ui/js/theme.js";

function main() {
  ezThemeToggle(document.getElementById("icon-theme-toggle"));
}

document.addEventListener("DOMContentLoaded", main);
