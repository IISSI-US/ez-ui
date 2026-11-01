"use strict";

// Precio de salida del jugador y saldo del mánager
const MIN_BID = 1200000;
const BALANCE = 1500000;

const bidValidator = {
    // Devuelve la lista de errores de una puja (vacía si es correcta)
    validateBid: function (formData) {
        let errors = [];

        let amount = formData.get("amount");
        let comment = formData.get("comment");

        if (amount === "") {
            errors.push("Escribe la cantidad que quieres pujar.");
        } else if (Number(amount) < MIN_BID) {
            errors.push("La puja mínima es el precio de salida: 1.200.000 €.");
        } else if (Number(amount) > BALANCE) {
            errors.push("No tienes saldo suficiente: tu saldo es de 1.500.000 €.");
        }

        if (comment.length > 100) {
            errors.push("El comentario no puede tener más de 100 caracteres.");
        }

        return errors;
    },
};

export { bidValidator };
