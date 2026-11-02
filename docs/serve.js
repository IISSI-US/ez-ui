// Sirve en local la web de ez-ui como la publica GitHub Pages: la web (docs/) en la raíz
// y la biblioteca (la raíz del repositorio) en /ez-ui/, donde la enlazan las páginas,
// igual que un proyecto; también en el proyecto de ejemplo de Primeros pasos
// (/examples/primeros-pasos/ez-ui/). Sin caché, para ver cada cambio al recargar.
//
//   node docs/serve.js [puerto]      (por defecto, 8081) y abrir http://127.0.0.1:8081/
//
// Node, sin dependencias. Los módulos ES y fetch no funcionan abriendo los ficheros con
// file://: hace falta un servidor.

"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = Number(process.argv[2] ?? 8081);
const DOCS = __dirname;
const LIBRARY = path.join(__dirname, "..");

// Lo que es la biblioteca en la raíz del repositorio (lo demás no se sirve en /ez-ui/)
const LIBRARY_FILES = ["css", "js", "fonts", "icons.svg", "LICENSE-lucide.txt"];

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

// El fichero de una ruta: …/ez-ui/… de la biblioteca y lo demás de la web. null si la
// ruta no es de ninguna de las dos
function resolve(urlPath) {
  const library = urlPath.indexOf("/ez-ui/");
  if (library !== -1) {
    const relative = urlPath.slice(library + "/ez-ui/".length);
    const first = relative.split("/")[0];
    return LIBRARY_FILES.includes(first) ? path.join(LIBRARY, relative) : null;
  }
  return path.join(DOCS, urlPath);
}

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  let file = resolve(urlPath);

  if (file === null || !file.startsWith(LIBRARY)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No existe " + urlPath);
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }
  if (!fs.existsSync(file)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No existe " + urlPath);
    return;
  }

  response.writeHead(200, {
    "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(file).pipe(response);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Web de ez-ui en http://127.0.0.1:${PORT}/ (Ctrl+C para parar)`);
});
