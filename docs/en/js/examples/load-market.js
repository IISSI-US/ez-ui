"use strict";

import { ezLoading } from "../../../ez-ui/js/loading.js";

// Simulates a request to the API, which takes a second and a half to respond
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

  // While the response arrives, the list shows the loading indicator
  let players = await ezLoading(list, getMarketPlayers());

  for (let player of players) {
    let item = document.createElement("li");
    item.textContent = player;
    list.append(item);
  }
}

document.addEventListener("DOMContentLoaded", main);
