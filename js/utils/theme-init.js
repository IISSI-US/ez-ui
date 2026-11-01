"use strict";

// Aplica el tema guardado antes de que se pinte la página. Es un script clásico (no un
// módulo) en el <head>: se ejecuta en cuanto el navegador lo lee. Los módulos se
// ejecutan después de leer toda la página, y con uno se vería un instante el tema claro.
try {
  let savedTheme = localStorage.getItem("ez-ui-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    document.documentElement.dataset.ezTheme = savedTheme;
  }
} catch {
  // Si el navegador bloquea el almacenamiento, se queda el tema por defecto
}
