"use strict";

import { ezThemeToggle } from "../../ez-ui/js/theme.js";

function main() {
  ezThemeToggle(document.getElementById("theme-button"));
}

document.addEventListener("DOMContentLoaded", main);
