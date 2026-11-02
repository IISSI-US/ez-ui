# Distribución versionada de ez-ui

La biblioteca se distribuye desde GitHub Pages como `downloads/ez-ui-X.Y.Z.zip`. El repositorio permanece privado. **No hay descarga pública nueva hasta crear un tag y desplegar Pages.**

## Publicar una versión

1. Integrar y probar los cambios en `main` (incluida la suite externa, que se ejecuta en su workflow).
2. Crear un tag inmutable `vX.Y.Z` apuntando al commit probado y publicarlo.
3. El workflow `zip.yml` genera el ZIP desde el tag y lo conserva en la rama técnica `pages-downloads`.
4. Ejecutar `Publicar` desde Actions (workflow_dispatch) para incorporar todas las versiones conservadas a Pages. Los siguientes pushes a `main` también las incorporan.

URL esperada tras el despliegue: `https://iissi-us.github.io/ez-ui/downloads/ez-ui-X.Y.Z.zip`. Verificar HTTP 200 sin iniciar sesión y abrir el ZIP antes de enlazar una versión en la documentación. **No se ha publicado ni verificado aún ninguna versión.**

El ZIP contiene una carpeta `ez-ui/` con `css/`, `js/`, `fonts/`, `icons.svg`, `LICENSE-lucide.txt` y `VERSION`. Se incluyen las licencias OFL de `fonts/`; no se incluyen `docs/`, pruebas ni workflows. Las rutas relativas de las fuentes permanecen intactas.

Para instalarlo, descomprime `ez-ui/` junto a `index.html`, enlaza `ez-ui/css/ez-ui.css` y, si usas el tema, carga `ez-ui/js/theme-init.js` en el head e importa los módulos JS desde un script `type="module"`. Usa un servidor HTTP local (por ejemplo Live Server), no `file://`.

Consulta `ez-ui/VERSION` para conocer la versión instalada. Para actualizar, sustituye la carpeta `ez-ui/` completa, conservando fuera de ella tus hojas CSS y JS.

Las versiones antiguas se conservan indefinidamente en `pages-downloads`. No reutilices un tag para publicar contenido distinto; incrementa la versión. La rama de descargas no es el código fuente del sitio ni debe fusionarse en `main`.

## Comprobaciones pendientes

- Ejecutar el workflow con un tag real, revisar el artefacto y comprobar acceso anónimo.
- Probar CSS, fuentes WOFF2, iconos, navbar y tema en un proyecto descomprimido.
- Comprobar la suite externa antes de crear el tag; este workflow no la ejecuta directamente.
