# ez-ui

Hoja de estilos sencilla para las prácticas de IISSI-2 (Universidad de Sevilla), en lugar de Bootstrap: HTML semántico, CSS que se puede leer entero y unos pocos componentes con JavaScript, sin dependencias ni compilación.

Documentación y ejemplos: https://iissi-us.github.io/ez-ui/

## Por qué

Bootstrap resuelve muchos problemas que no tiene una práctica de la asignatura, y a cambio obliga a aprender su sistema de clases, su rejilla y su JavaScript. ez-ui usa lo que ya se explica en clase (variables CSS, Flexbox, Grid, selectores, elementos nativos como `<dialog>`) y cabe en unas 800 líneas, comentadas para que se entiendan. Está pensada para explicarse entera en 2 a 4 horas de clase.

## Ficheros

```
css/
├── ez-ui.css         punto de entrada: importa las demás en orden
├── fonts.css         @font-face de las fuentes incluidas
├── tokens.css        variables (colores, fuentes, espacios) y tema oscuro
├── base.css          elementos HTML, incluidas las tablas
├── layout.css        contenedor, dos columnas, desplazamiento y galería
├── components.css    icono, navbar, tarjeta, avatar, botón, alerta y etiqueta
├── forms.css         controles de formulario y ayudas
└── interactive.css   diálogo, botón de tema, notificación e indicador de carga
js/
├── navbar.js         ezNavbar(barra): menú plegable en pantallas estrechas
├── theme.js          ezThemeToggle(botón): tema claro y oscuro, guardado
├── theme-init.js     aplica el tema guardado (script clásico, en el <head>)
├── dialog.js         ezConfirm(dialog)
├── toast.js          ezToast(mensaje, tipo, duración)
└── loading.js        ezLoading(elemento, promesa)
fonts/                Source Sans 3 y JetBrains Mono (WOFF2, licencia OFL)
icons.svg             iconos de Lucide (licencia ISC)
LICENSE-lucide.txt
docs/                 la web de documentación (no forma parte de la biblioteca; ver docs/README.md)
```

## Uso

La biblioteca son `css/`, `js/`, `fonts/`, `icons.svg` y `LICENSE-lucide.txt`. Se descarga de la web como un ZIP por versión (https://iissi-us.github.io/ez-ui/downloads/ez-ui-X.Y.Z.zip, enlazado en la página de inicio), con todo dentro de una carpeta `ez-ui/` y su versión en `ez-ui/VERSION.txt`. Esa carpeta se pone en la raíz del proyecto, sin modificarla, y se enlaza la hoja principal en el `<head>` de cada vista:

```html
<link rel="stylesheet" href="ez-ui/css/ez-ui.css">
```

Con el botón de tema, delante de la hoja, el script que aplica el tema guardado antes de pintar la página:

```html
<script src="ez-ui/js/theme-init.js"></script>
```

Los iconos, con `<use>` y su nombre:

```html
<svg class="ez-icon" aria-hidden="true">
    <use href="ez-ui/icons.svg#trophy"></use>
</svg>
```

Los componentes con JavaScript son módulos que se importan donde se usen:

```js
import { ezNavbar } from "./ez-ui/js/navbar.js";
import { ezThemeToggle } from "./ez-ui/js/theme.js";
import { ezConfirm } from "./ez-ui/js/dialog.js";
import { ezToast } from "./ez-ui/js/toast.js";
import { ezLoading } from "./ez-ui/js/loading.js";
```

## Convenciones

- Clases con el prefijo `ez-` y la convención BEM: componente (`.ez-card`), parte (`.ez-card__body`) y variante (`.ez-button--danger`).
- Variables con el prefijo `--ez-` (`--ez-primary`, `--ez-space-4`). Cambiarlas cambia toda la biblioteca, también dentro de un elemento concreto.
- Tema oscuro: `data-ez-theme="dark"` en `<html>`. Solo cambia los valores de las variables; el botón de tema (`ezThemeToggle`) lo pone y lo recuerda.
- Para ampliar ez-ui en un proyecto, una hoja propia enlazada después de la biblioteca, que use sus variables y otro prefijo. La biblioteca no se modifica.
- Código en inglés; comentarios y textos en español.
- Sin selectores que dependan de la ausencia de clases: un elemento tiene el estilo de un componente solo si lleva su clase.

## Licencias

Las fuentes tienen licencia SIL Open Font License (`fonts/OFL-*.txt`), y los iconos, de [Lucide](https://lucide.dev), licencia ISC (`LICENSE-lucide.txt`).

## Pruebas y publicación

La web de documentación, cómo probarla en local, las pruebas y cómo se publica están en [docs/README.md](docs/README.md).
