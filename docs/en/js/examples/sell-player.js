"use strict";

import { ezConfirm } from "../../../ez-ui/js/dialog.js";
import { ezToast } from "../../../ez-ui/js/toast.js";

function main() {
  let sellButton = document.getElementById("sell-button");
  sellButton.addEventListener("click", sellPlayer);
}

async function sellPlayer() {
  // ezConfirm opens the dialog and waits until the user closes it
  let dialog = document.getElementById("sell-dialog");
  let confirmed = await ezConfirm(dialog);

  if (confirmed) {
    ezToast("Mario Gil sold for €400,000.", "success");
  } else {
    ezToast("Sale cancelled.");
  }
}

document.addEventListener("DOMContentLoaded", main);
