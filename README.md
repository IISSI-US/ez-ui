# ez-ui

Biblioteca CSS educativa para interfaces web sencillas de IISSI-2. **Propuesta inicial**, todavía no integrada en Gallery.

## Objetivos

- HTML semántico y capacidades nativas del navegador.
- Estilos base para elementos comunes y clases `ez-*` para componentes y variantes.
- CSS estándar sin compilación ni dependencias.
- Separación entre presentación, renderizadores, validadores y API REST.

## Probar

Abre `index.html` en el navegador. Incluye galería responsive, botones, formularios, mensajes y selector de tema claro/oscuro.

## Uso

```html
<link rel="stylesheet" href="css/ez-ui.css">
```

## Convenciones

- Componentes: `.ez-card`, `.ez-gallery`, `.ez-button`, `.ez-alert`.
- Elementos: `.ez-card__body`.
- Variantes: `.ez-button--secondary`, `.ez-alert--error`.
- Variables: `--ez-primary`, `--ez-space-4`.
- Los IDs y nombres funcionales no llevan obligatoriamente el prefijo.

El tema oscuro se activa con `data-ez-theme="dark"` en `html`.

## Archivos

- `css/tokens.css`: tokens y temas.
- `css/base.css`: HTML nativo.
- `css/components.css`: layout y componentes.
- `css/forms.css`: formularios y estados.
- `css/ez-ui.css`: punto de entrada.
- `index.html`: catálogo visual.

Prototipo para evaluar estética y API CSS. No se ha modificado Gallery ni ningún otro repositorio.

## Componentes interactivos (módulos ES)

No hay dependencias de terceros ni framework JS. Se importan solo los módulos necesarios:

```js
import { ezConfirm } from "./js/dialog.js";
import { ezToast } from "./js/toast.js";
import { ezThemeToggle } from "./js/theme-toggle.js";

ezThemeToggle(document.querySelector("#theme-toggle"));
const accepted = await ezConfirm(document.querySelector("#confirm-dialog"));
if (accepted) ezToast("Operación confirmada", { type: "success" });
```

- **Diálogo:** se apoya en `<dialog>`, `showModal()` y `<form method="dialog">`; devuelve `Promise<boolean>`. No ejecuta operaciones de negocio.
- **Toast:** crea una notificación en el DOM con `textContent` (no interpreta HTML), se cierra con botón o automáticamente. Opciones: `type: "info" | "success" | "error"` y `duration` en ms; `duration: 0` evita el cierre automático. Devuelve una función para cerrarla.
- **Tema:** alterna `data-ez-theme`, sincroniza `aria-pressed` y guarda la preferencia en `localStorage`, si está disponible.

El catálogo `index.html` demuestra los tres componentes. Para probar los módulos ES, servir la carpeta con un servidor HTTP local (por ejemplo `python3 -m http.server 8000`), en lugar de abrirla mediante `file://`.

Los componentes no llaman a la API REST ni contienen reglas de negocio.
