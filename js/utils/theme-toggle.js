"use strict";

// Conecta el botón de la cabecera con el tema y guarda la preferencia. El tema
// guardado ya lo aplica theme-init.js al cargar la página
const STORAGE_KEY = "ez-ui-theme";

function themeToggle(button) {
  applyTheme(button, document.documentElement.dataset.ezTheme ?? "light");

  button.addEventListener("click", function () {
    let nextTheme = "dark";
    if (document.documentElement.dataset.ezTheme === "dark") {
      nextTheme = "light";
    }
    applyTheme(button, nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // El tema ya está aplicado, aunque no se pueda guardar la preferencia
    }
  });
}

// Pone el tema en <html> y el texto del botón, que ofrece el otro tema
function applyTheme(button, theme) {
  document.documentElement.dataset.ezTheme = theme;
  button.setAttribute("aria-pressed", String(theme === "dark"));

  if (theme === "dark") {
    button.textContent = "Modo claro";
  } else {
    button.textContent = "Modo oscuro";
  }
}

export { themeToggle };
