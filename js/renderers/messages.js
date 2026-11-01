"use strict";

// Muestra mensajes en el <div id="errors"> de la vista, como alertas de ez-ui. Tiene
// la misma interfaz que el messageRenderer de la plantilla de Silence de los labs.
const messageRenderer = {
    // Un error; con el error de una petición fallida (catch (err)), se añade su motivo
    showErrorMessage: function (message, err) {
        let reason = err?.response?.data?.error ?? err?.message;
        if (reason) {
            message = `${message}: ${reason}`;
        }
        showMessageAsAlert(message, "ez-alert--error");
    },

    showSuccessMessage: function (message) {
        showMessageAsAlert(message, "ez-alert--success");
    },

    showInfoMessage: function (message) {
        showMessageAsAlert(message, "");
    },
};

function showMessageAsAlert(message, variant) {
    let errorsDiv = document.getElementById("errors");

    if (errorsDiv === null) {
        console.error(`Falta un <div id="errors"> en la vista para mostrar: ${message}`);
        return;
    }

    let alert = document.createElement("div");
    alert.className = `ez-alert ${variant}`;
    // role="alert" hace que un lector de pantalla anuncie el mensaje al aparecer
    alert.setAttribute("role", "alert");
    // textContent muestra el mensaje como texto, sin interpretarlo como HTML
    alert.textContent = message;
    errorsDiv.append(alert);
}

export { messageRenderer };
