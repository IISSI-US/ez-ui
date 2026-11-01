/** Notificación no bloqueante; el texto se inserta de forma segura. */
export function ezToast(message, { type = "info", duration = 4000 } = {}) {
  const allowed = ["info", "success", "error"];
  if (!allowed.includes(type)) throw new TypeError("Tipo de toast desconocido");
  let region = document.querySelector("#ez-toast-region");
  if (!region) {
    region = document.createElement("div");
    region.id = "ez-toast-region";
    region.className = "ez-toast-region";
    region.setAttribute("aria-label", "Notificaciones");
    document.body.append(region);
  }
  const toast = document.createElement("div");
  toast.className = "ez-toast ez-toast--" + type;
  toast.setAttribute("role", type === "error" ? "alert" : "status");
  const text = document.createElement("span");
  text.textContent = String(message);
  const close = document.createElement("button");
  close.type = "button";
  close.className = "ez-toast__close";
  close.textContent = "×";
  close.setAttribute("aria-label", "Cerrar notificación");
  toast.append(text, close);
  region.append(toast);
  let timer;
  const dismiss = () => { clearTimeout(timer); toast.remove(); };
  close.addEventListener("click", dismiss);
  if (duration > 0) timer = setTimeout(dismiss, duration);
  return dismiss;
}
