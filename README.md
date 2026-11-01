# ez-ui

Hoja de estilos sencilla para las prácticas de IISSI-2 (Universidad de Sevilla), en lugar de Bootstrap: HTML semántico, CSS que se puede leer entero y unos pocos componentes con JavaScript, sin dependencias ni compilación.

Documentación y ejemplos: https://iissi-us.github.io/ez-ui/

## Por qué

Bootstrap resuelve muchos problemas que no tiene una práctica de la asignatura, y a cambio obliga a aprender su sistema de clases, su rejilla y su JavaScript. ez-ui usa lo que ya se explica en clase (variables CSS, Flexbox, Grid, selectores, elementos nativos como `<dialog>`) y cabe en unas 800 líneas, comentadas para que se entiendan. Está pensada para explicarse entera en 2 a 4 horas de clase.

## Estructura

```
ez-ui/              la biblioteca: lo único que se copia al proyecto
├── css/
│   ├── ez-ui.css         punto de entrada: importa las demás en orden
│   ├── fonts.css         @font-face de las fuentes incluidas
│   ├── tokens.css        variables (colores, fuentes, espacios) y tema oscuro
│   ├── base.css          elementos HTML sin clases, incluidas las tablas
│   ├── layout.css        contenedor, galería y dos columnas
│   ├── components.css    navbar, tarjeta, avatar, botón, alerta y etiqueta
│   ├── forms.css         controles de formulario y ayudas
│   └── interactive.css   diálogo, notificación e indicador de carga
├── js/
│   ├── navbar.js         ezNavbar(barra): menú plegable en pantallas estrechas
│   ├── dialog.js         ezConfirm(dialog)
│   ├── toast.js          ezToast(mensaje, tipo, duración)
│   └── loading.js        ezLoading(elemento, promesa)
├── fonts/            Source Sans 3 y JetBrains Mono (WOFF2, licencia OFL)
├── icons.svg         iconos de Lucide (licencia ISC): <svg class="ez-icon"><use href="ez-ui/icons.svg#nombre">
└── LICENSE-lucide.txt

index.html, fundamentos.html, maquetacion.html, componentes.html,
formularios.html, javascript.html     la web de documentación
header.html, css/site.css, js/        la web: cabecera, estilos y su JavaScript
images/soccer/                        imágenes SVG propias de los ejemplos
```

La web dice qué ofrece ez-ui (cada pieza, con un ejemplo y su HTML), no cómo organizar una aplicación con ella. Usa ez-ui sin modificarla: lo suyo va en `css/site.css`, con el prefijo `doc-`.

## Uso

Se copia la carpeta `ez-ui/` al proyecto y se enlaza su hoja principal en el `<head>` de cada vista:

```html
<link rel="stylesheet" href="ez-ui/css/ez-ui.css">
```

Los componentes con JavaScript son módulos que se importan donde se usen:

```js
import { ezNavbar } from "./ez-ui/js/navbar.js";
import { ezConfirm } from "./ez-ui/js/dialog.js";
import { ezToast } from "./ez-ui/js/toast.js";
import { ezLoading } from "./ez-ui/js/loading.js";
```

## Convenciones

- Clases con el prefijo `ez-` y la convención BEM: componente (`.ez-card`), parte (`.ez-card__body`) y variante (`.ez-button--danger`).
- Variables con el prefijo `--ez-` (`--ez-primary`, `--ez-space-4`). Cambiarlas cambia toda la biblioteca, también dentro de un elemento concreto.
- Tema oscuro: `data-ez-theme="dark"` en `<html>`. Solo cambia los valores de las variables.
- Para ampliar ez-ui en un proyecto, una hoja propia enlazada después de la biblioteca, que use sus variables y otro prefijo. La biblioteca no se modifica.
- Código en inglés; comentarios y textos en español.
- Sin selectores que dependan de la ausencia de clases: un elemento tiene el estilo de un componente solo si lleva su clase.

## HTML semántico en los ejemplos

El elemento se elige por el significado del contenido; las clases `ez-*` solo definen su presentación.

- `header`, `nav` y `main` identifican la cabecera, la navegación y el contenido principal. Los enlaces de navegación van en una lista.
- `section` agrupa un tema con su encabezado; `article`, un contenido independiente, como una tarjeta. Los títulos siguen la jerarquía `h1`, `h2`, `h3`.
- Las imágenes llevan `alt`, vacío (`alt=""`) si el texto de al lado ya dice lo mismo.
- Los enlaces navegan; los botones ejecutan acciones, con su `type`.
- Cada control tiene su `label` (`for` igual al `id` del control); las ayudas se enlazan con `aria-describedby`.
- `aria-invalid` en un campo erróneo; `aria-busy` mientras se carga un contenido.

## Ejemplos: el Trofeo ez-Soccer

Los ejemplos son de una liga de fútbol inventada entre escuelas y facultades de la universidad. Equipos, jugadores, escudos, camisetas y avatares son inventados; las imágenes son SVG propios, sin derechos de terceros.

## Probar en local

Los módulos ES y `fetch` no funcionan abriendo los ficheros con `file://`: hay que servir la carpeta con un servidor HTTP, por ejemplo:

```bash
python3 -m http.server 8081
```

y abrir http://127.0.0.1:8081/.

## Publicación

GitHub Pages publica la raíz de la rama `main` (el repositorio es privado, pero la web es pública): **un push a `main` actualiza la web**. No hace falta compilar; `.nojekyll` evita que GitHub procese la carpeta con Jekyll. Las rutas son relativas para que funcione bajo `/ez-ui/`.

## Licencias

Las fuentes tienen licencia SIL Open Font License (`ez-ui/fonts/OFL-*.txt`), y los iconos, de [Lucide](https://lucide.dev), licencia ISC (`ez-ui/LICENSE-lucide.txt`).
