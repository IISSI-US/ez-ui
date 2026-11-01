"use strict";

import { ezConfirm } from "../../ez-ui/js/dialog.js";
import { ezToast } from "../../ez-ui/js/toast.js";

function main() {
  let sellButton = document.getElementById("sell-button");
  sellButton.addEventListener("click", sellPlayer);
}

async function sellPlayer() {
  // ezConfirm abre el diálogo y espera a que el usuario lo cierre
  let dialog = document.getElementById("sell-dialog");
  let confirmed = await ezConfirm(dialog);

  if (confirmed) {
    ezToast("Mario Gil vendido por 400.000 €.", "success");
  } else {
    ezToast("Venta cancelada.");
  }
}

document.addEventListener("DOMContentLoaded", main);
