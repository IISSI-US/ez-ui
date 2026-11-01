/** Conecta un botón con el selector de tema y recuerda la preferencia. */
export function ezThemeToggle(button, options = {}) {
  if (!(button instanceof HTMLButtonElement)) {
    throw new TypeError("ezThemeToggle espera un <button>");
  }

  let storageKey = options.storageKey;
  if (storageKey === undefined) {
    storageKey = "ez-ui-theme";
  }

  const htmlElement = document.documentElement;

  function applyTheme(theme) {
    htmlElement.dataset.ezTheme = theme;

    const isDarkTheme = theme === "dark";
    button.setAttribute("aria-pressed", String(isDarkTheme));

    if (isDarkTheme) {
      button.textContent = "Modo claro";
    } else {
      button.textContent = "Modo oscuro";
    }
  }

  // Si no hay preferencia guardada, usamos el tema indicado en el HTML.
  let initialTheme = htmlElement.dataset.ezTheme;
  if (!initialTheme) {
    initialTheme = "light";
  }

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    }
  } catch {
    // El navegador puede bloquear el almacenamiento. El selector sigue funcionando.
  }

  applyTheme(initialTheme);

  function toggleTheme() {
    let nextTheme = "dark";
    if (htmlElement.dataset.ezTheme === "dark") {
      nextTheme = "light";
    }

    applyTheme(nextTheme);

    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // El tema ya está aplicado, aunque no se pueda guardar la preferencia.
    }
  }

  button.addEventListener("click", toggleTheme);
}
