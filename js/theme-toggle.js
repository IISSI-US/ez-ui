/** Activa tema claro/oscuro y recuerda la elección del usuario. */
export function ezThemeToggle(button, { storageKey = "ez-ui-theme" } = {}) {
  if (!(button instanceof HTMLButtonElement)) {
    throw new TypeError("ezThemeToggle espera un <button>");
  }
  const root = document.documentElement;
  let stored = null;
  try { stored = localStorage.getItem(storageKey); } catch { /* almacenamiento no disponible */ }
  const initial = stored === "dark" || stored === "light" ? stored : root.dataset.ezTheme || "light";
  function apply(theme) {
    root.dataset.ezTheme = theme;
    const dark = theme === "dark";
    button.setAttribute("aria-pressed", String(dark));
    button.textContent = dark ? "Modo claro" : "Modo oscuro";
  }
  apply(initial);
  button.addEventListener("click", () => {
    const next = root.dataset.ezTheme === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(storageKey, next); } catch { /* almacenamiento no disponible */ }
  });
}
