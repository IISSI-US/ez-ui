"use strict";

import { ezLoading } from "../../ez-ui/js/loading.js";

// Simula una petición a la API, que tarda un segundo y medio en responder
function getMarketPlayers() {
  let players = ["Lucía Romero", "Hugo Serrano", "Irene Campos", "Nora Iglesias"];
  return new Promise(function (resolve) {
    setTimeout(() => resolve(players), 1500);
  });
}

function main() {
  let loadButton = document.getElementById("load-button");
  loadButton.addEventListener("click", loadMarket);
}

async function loadMarket() {
  let list = document.getElementById("market-list");
  list.innerHTML = "";

  // Mientras llega la respuesta, la lista muestra el indicador de carga
  let players = await ezLoading(list, getMarketPlayers());

  for (let player of players) {
    let item = document.createElement("li");
    item.textContent = player;
    list.append(item);
  }
}

document.addEventListener("DOMContentLoaded", main);
