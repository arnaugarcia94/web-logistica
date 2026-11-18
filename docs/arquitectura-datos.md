# Arquitectura de datos

`src/data/pages.json` contiene la home y las 230 filas de la pestaña Arquitectura del Excel entregado. La pestaña adicional de artículos queda fuera del portal. La ruta catch-all genera una página por registro, incluida la home con slug vacío.

| Campo | Uso |
| --- | --- |
| id | Identificador único estable, independiente de la URL |
| slug | Ruta completa relativa, sin barras inicial/final; vacío para home |
| parentId | ID del padre; null en home |
| type | home, hub, subvertical o informativa |
| title | Nombre de la hoja y etiqueta de navegación |
| heading | H1 diferenciado cuando el nombre se repite entre una subvertical y su guía |
| keyword | Keyword principal de la hoja |
| seoTitle | Título SEO de la página |
| description | Introducción, meta description y Open Graph |
| order | Orden de navegación entre hermanos |
| status | draft o published; draft emite noindex |
| sections | Lista de objetos con heading y paragraphs (texto plano) |

## Actualizaciones de la arquitectura

1. Conservar el Excel original como fuente de referencia. El ID y la URL de la hoja identifican cada página y la URL inmediatamente superior determina su padre.
2. Revisar arquitectura y URLs antes de transformar las filas. No inferir padres a partir de palabras clave sin revisión.
3. Convertir las filas aprobadas a JSON UTF-8. Mantener IDs estables y registrar redirecciones si se cambian URLs ya publicadas.
4. Revisar duplicados, padres, ciclos, caracteres, titles, descriptions y contenido vacío. `src/lib/content.ts` valida la integridad básica durante el build.
5. Después de cada actualización, ejecutar el build y revisar sitemap, enlaces y navegación.

Las secciones se renderizan como texto escapado, no como HTML procedente de celdas.
