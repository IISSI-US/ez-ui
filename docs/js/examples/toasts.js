"use strict";

import { ezToast } from "../../ez-ui/js/toast.js";

function main() {
  document.getElementById("toast-info").addEventListener("click", function () {
    ezToast("El mercado cierra el viernes a las 21:00.");
  });

  document.getElementById("toast-success").addEventListener("click", function () {
    ezToast("Puja registrada.", "success");
  });

  // Con duración 0, la notificación sigue abierta hasta que se cierra a mano
  document.getElementById("toast-error").addEventListener("click", function () {
    ezToast("No se ha podido registrar la puja.", "error", 0);
  });
}

document.addEventListener("DOMContentLoaded", main);
