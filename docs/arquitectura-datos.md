# Arquitectura de datos provisional

`src/data/pages.json` contiene siete registros de ejemplo; no es la arquitectura SEO definitiva. La ruta catch-all genera una página por registro, incluida la home con slug vacío.

| Campo | Uso |
| --- | --- |
| id | Identificador único estable, independiente de la URL |
| slug | Ruta completa relativa, sin barras inicial/final; vacío para home |
| parentId | ID del padre; null en home |
| type | home, hub, subvertical o informativa |
| title | H1 y etiqueta de navegación |
| seoTitle | Título SEO de la página |
| description | Introducción, meta description y Open Graph |
| order | Orden de navegación entre hermanos |
| status | draft o published; draft emite noindex |
| sections | Lista de objetos con heading y paragraphs (texto plano) |

## Incorporación posterior del Excel

1. Conservar el Excel original como fuente de referencia y acordar el mapa de columnas a estos campos.
2. Revisar arquitectura y URLs antes de transformar las filas. No inferir padres a partir de palabras clave sin revisión.
3. Convertir las filas aprobadas a JSON UTF-8. Mantener IDs estables y registrar redirecciones si se cambian URLs ya publicadas.
4. Revisar duplicados, padres, ciclos, caracteres, titles, descriptions y contenido vacío. `src/lib/content.ts` valida la integridad básica durante el build.
5. Sustituir las muestras solo tras aprobación; ejecutar build y revisar sitemap, enlaces y navegación.

No hay importador de Excel todavía: faltan el archivo y su formato real. Las secciones se renderizan como texto escapado, no como HTML procedente de celdas.
