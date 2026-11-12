"use strict";

import { ezToast } from "../../../ez-ui/js/toast.js";

function main() {
  document.getElementById("toast-info").addEventListener("click", function () {
    ezToast("The transfer market closes on Friday at 21:00.");
  });

  document.getElementById("toast-success").addEventListener("click", function () {
    ezToast("Bid placed.", "success");
  });

  document.getElementById("toast-warning").addEventListener("click", function () {
    ezToast("The transfer market closes in one hour.", "warning");
  });

  // With duration 0, the notification stays open until it is closed by hand
  document.getElementById("toast-error").addEventListener("click", function () {
    ezToast("The bid could not be placed.", "error", 0);
  });
}

document.addEventListener("DOMContentLoaded", main);
