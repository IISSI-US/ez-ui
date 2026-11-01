/** Abre un <dialog> nativo. Devuelve la elección cuando se cierra. */
export function ezConfirm(dialog) {
  if (!(dialog instanceof HTMLDialogElement)) {
    throw new TypeError("ezConfirm espera un elemento <dialog>");
  }
  if (dialog.open) return Promise.reject(new Error("El diálogo ya está abierto"));
  return new Promise((resolve) => {
    dialog.addEventListener("close", () => resolve(dialog.returnValue === "confirm"), { once: true });
    dialog.returnValue = "";
    dialog.showModal();
  });
}
