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
