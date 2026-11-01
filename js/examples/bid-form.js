"use strict";

import { bidValidator } from "../validators/bids.js";
import { messageRenderer } from "../renderers/messages.js";

function main() {
    let form = document.getElementById("bid-form");
    form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
    // Sin esto, el navegador enviaría el formulario y recargaría la página
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let errors = bidValidator.validateBid(formData);

    // Se borran los mensajes del envío anterior, para que no se acumulen
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    if (errors.length > 0) {
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        let amount = Number(formData.get("amount")).toLocaleString("es-ES");
        messageRenderer.showSuccessMessage(`Puja de ${amount} € registrada.`);
    }
}

document.addEventListener("DOMContentLoaded", main);
