// Este módulo conecta los componentes con los controles del catálogo.
import { ezConfirm } from "./dialog.js";
import { ezToast } from "./toast.js";
import { ezThemeToggle } from "./theme-toggle.js";

ezThemeToggle(document.querySelector("#theme-toggle"));

function showPrimaryExample() {
  ezToast("Este es el botón primario.");
}

function showSecondaryExample() {
  ezToast("Este es el botón secundario.");
}

function showSuccessMessage() {
  ezToast("Fotografía guardada correctamente.", { type: "success" });
}

async function confirmDeletion() {
  const dialog = document.querySelector("#demo-dialog");
  const confirmed = await ezConfirm(dialog);

  if (confirmed) {
    ezToast("Acción confirmada (sin borrar datos).", { type: "success" });
  } else {
    ezToast("Acción cancelada.");
  }
}

function submitForm(event) {
  // La validación HTML se ejecuta antes del evento submit.
  event.preventDefault();
  const feedback = document.querySelector("#form-feedback");
  feedback.textContent = "Formulario válido. Demostración: no se envían datos.";
  showSuccessMessage();
}

function resetFeedback() {
  document.querySelector("#form-feedback").textContent = "";
}

document.querySelector("#demo-primary").addEventListener("click", showPrimaryExample);
document.querySelector("#demo-secondary").addEventListener("click", showSecondaryExample);
document.querySelector("#demo-toast-button").addEventListener("click", showSuccessMessage);
document.querySelector("#demo-dialog-button").addEventListener("click", confirmDeletion);
document.querySelector("#demo-form").addEventListener("submit", submitForm);
document.querySelector("#demo-form").addEventListener("reset", resetFeedback);

// El enlace activo sigue el destino del menú, también al usar Atrás y Adelante.
function updateNavigation() {
  let currentSection = window.location.hash;
  if (!currentSection || currentSection === "#contenido") {
    currentSection = "#inicio";
  }

  const links = document.querySelectorAll(".catalog-sidebar a");
  for (const link of links) {
    if (link.getAttribute("href") === currentSection) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

window.addEventListener("hashchange", updateNavigation);
updateNavigation();
