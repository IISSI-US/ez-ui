# Web de documentación de ez-ui

La web de [ez-ui](../README.md): https://iissi-us.github.io/ez-ui/. No forma parte de la biblioteca (que es la raíz del repositorio): no se copia a los proyectos.

## Estructura

```
index.html y las demás *.html         las páginas, una por apartado del menú
header.html, footer.html              cabecera y pie comunes
css/site.css                          estilos propios de la web (prefijo doc-)
js/                                   controladores, renderizador de ejemplos y utilidades
examples/                             ejemplos que necesitan una página aparte;
                                      primeros-pasos/, un proyecto completo
images/soccer/                        imágenes SVG propias de los ejemplos
icons.svg, LICENSE-lucide.txt         iconos de la web, de Lucide (ez-ui no trae iconos)
favicon.svg
serve.js                              servidor local (no se publica)
README.md                             este fichero (no se publica)
```

Las páginas enlazan la biblioteca como `ez-ui/css/ez-ui.css`, igual que un proyecto: al publicar (y en `serve.js`), la biblioteca se copia en `/ez-ui/` del sitio, y también en `examples/primeros-pasos/ez-ui/`, para que el proyecto de ejemplo sea igual que el de un alumno. Por eso la web no se ve bien con otro servidor, como Live Server: no tiene la biblioteca donde la buscan las páginas. La página de inicio monta un primer proyecto completo en unos minutos; las demás son la referencia de cada parte de ez-ui (cada pieza, con un ejemplo y su HTML), sin explicar cómo organizar una aplicación con ella. La web usa ez-ui sin modificarla: lo suyo va en `css/site.css`, con el prefijo `doc-`.

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

```bash
node docs/serve.js
```

y abrir http://127.0.0.1:8081/. Sirve la web y la biblioteca como GitHub Pages (la web en la raíz y la biblioteca en `/ez-ui/`) y sin caché. Node, sin dependencias.

## Pruebas

Las pruebas de la biblioteca y de la web están en un repositorio privado aparte, `IISSI-US/ez-ui-tests`, para que no se publiquen. Cada push al repositorio las lanza (`.github/workflows/pruebas.yml`) y el resultado aparece en el commit. Como un push a `main` publica la web, se pasan antes en local (ver su README).

## Publicación

GitHub Pages publica con un flujo de Actions (`.github/workflows/publicar.yml`): en cada push a `main` monta el sitio con `docs/` en la raíz (sin `serve.js` ni este README) y la biblioteca en `/ez-ui/`, y lo despliega. El repositorio es privado, pero la web es pública: **un push a `main` actualiza la web**. Las rutas son relativas para que funcione bajo `/ez-ui/`.

## Versiones

Los alumnos descargan la biblioteca de la web, porque el repositorio es privado: `publicar.yml` pone en `/downloads/` un `ez-ui-X.Y.Z.zip` por cada etiqueta `vX.Y.Z`, con una carpeta `ez-ui/` (`css/`, `js/`, `fonts/` con sus licencias OFL, y `VERSION.txt`). Para publicar una versión:

1. Esperar al ✔ de las pruebas en el commit de `main` que se va a publicar. Si una etiqueta apunta a un commit sin ✔, su ZIP no se publica (aparece un aviso en Actions).
2. Crear la etiqueta y subirla: `git tag v1.1.0 && git push origin v1.1.0`. Publica la web con el ZIP nuevo.
3. Cambiar el enlace de descarga de `index.html` a la versión nueva.

Cada publicación vuelve a hacer todos los ZIP desde sus etiquetas con `git archive`, que da siempre el mismo fichero: los cambios de `main` no alteran una versión ya publicada, y todas se conservan mientras exista su etiqueta. Por eso una etiqueta publicada no se mueve ni se borra (los laboratorios enlazan su versión): un cambio, por pequeño que sea, es una versión nueva. Versiones: X cuando algo deja de funcionar igual, Y cuando se añade algo, Z para correcciones.

## Licencias

Las de la biblioteca (las fuentes) están en el [README de la biblioteca](../README.md). Los iconos de la web son de [Lucide](https://lucide.dev), licencia ISC (`LICENSE-lucide.txt`). Las imágenes de los ejemplos son propias.
