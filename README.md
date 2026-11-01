# ez-ui

Biblioteca CSS educativa para interfaces web sencillas de IISSI-2. **Propuesta inicial**, todavía no integrada en Gallery.

## Objetivos

- HTML semántico y capacidades nativas del navegador.
- Estilos base para elementos comunes y clases `ez-*` para componentes y variantes.
- CSS estándar sin compilación ni dependencias.
- Separación entre presentación, renderizadores, validadores y API REST.

## Probar

Sirve la carpeta por HTTP y abre `index.html` en el navegador (instrucciones al final). Incluye navegación lateral, tarjetas, galería responsive, botones, formularios, mensajes, extractos de código y selector de tema claro/oscuro.

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
- `css/catalog.css`: estilos exclusivos del catálogo de ejemplos.
- `js/catalog.js`: conexión de los controles de demostración.
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

## HTML como ejemplo para el alumnado

El elemento se elige por el significado del contenido; las clases `ez-*` solo definen su presentación.

- `header`, `nav` y `main` identifican la cabecera, la navegación y el contenido principal. Los enlaces de navegación se agrupan en una lista.
- `section` agrupa un tema con su encabezado; `article` representa una tarjeta con contenido independiente. Los títulos siguen la jerarquía `h1`, `h2`, `h3`.
- Las imágenes usan `img` con `alt`. Usa `alt=""` si son meramente decorativas. Añade `figure` y `figcaption` cuando haya una leyenda asociada.
- Los enlaces navegan; los botones ejecutan acciones. El diálogo usa `dialog` y un formulario con `method="dialog"`.
- Cada control tiene un `label` asociado. Las instrucciones adicionales se vinculan mediante `aria-describedby`; `required` y `minlength` aprovechan la validación nativa.
- Los mensajes estáticos son párrafos. Reserva `role="status"` para novedades dinámicas y `role="alert"` para avisos urgentes.
- `div` es adecuado para agrupar contenido por necesidades de presentación, como la rejilla o el cuerpo de una tarjeta. No se sustituye automáticamente por `section` o `article`.

Por ejemplo, la misma clase de tarjeta se aplica a un elemento con significado propio:

```html
<article class="ez-card">
  <img class="ez-card__image" src="images/abstract-one.svg"
       alt="Ilustración abstracta azul y verde" width="400" height="300">
  <div class="ez-card__body">
    <h3>Fotografía uno</h3>
    <p>Descripción de la fotografía.</p>
    <a href="fotografia.html">Ver fotografía</a>
  </div>
</article>
```

El nivel del encabezado depende de dónde se incluya la tarjeta; aquí se presupone una sección con `h2`.

## Publicación en GitHub Pages

Catálogo: https://iissi-us.github.io/ez-ui/

GitHub Pages publica la raíz de la rama `main`. Al subir cambios a esa rama, GitHub actualiza el catálogo automáticamente. No hace falta compilar ni instalar dependencias. Los enlaces y las rutas de los recursos son relativos para funcionar bajo `/ez-ui/`.

Las fotografías de demostración se descargan de Unsplash y se sirven desde `images/` para no depender de peticiones externas al visitar el catálogo:

- Montaña: recurso `photo-1464822759023-fed622ff2c3b` de images.unsplash.com.
- Cala: recurso `photo-1510414842594-a61c69b5ae57` de images.unsplash.com.
- Bosque: recurso `photo-1448375240586-882707db888b` de images.unsplash.com.
- Costa: recurso `photo-1519046904884-53103b34b206` de images.unsplash.com.
