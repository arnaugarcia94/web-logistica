# Convenciones del portal

## Alcance
- Portal informativo independiente de logística. Sin blog ni orientación comercial inicialmente.
- Mantener las rutas y la jerarquía aprobadas en el Excel. Los contenidos iniciales requieren revisión editorial.
- No añadir referencias comerciales automáticas ni promociones de ClickAndCargo.
- Trabajar exclusivamente en este repositorio. No publicar, hacer push ni desplegar sin aprobación explícita.

## Desarrollo
- Astro con salida estática, TypeScript estricto y CSS nativo. No incorporar frameworks de cliente sin necesidad justificada.
- Mantener cero JavaScript de cliente mientras la funcionalidad pueda resolverse con HTML/CSS.
- Componentes en `src/components`, marco HTML en `src/layouts`, plantillas en `src/templates`.
- `src/data/pages.json` es la fuente de páginas y navegación. No duplicar rutas manualmente.
- IDs estables, slugs completos sin barras inicial/final y relaciones por `parentId`. Ver `docs/arquitectura-datos.md`.
- Verificar IDs, URLs, padres y ciclos al importar datos. No generar HTML arbitrario desde Excel.
- Preservar Git y el contenido original del README.

## Contenido y SEO
- Español, tono claro y descriptivo. Contenido provisional identificado; no inventar fuentes, autorías ni fechas.
- Un H1 por página, jerarquía H2/H3 coherente, title y description propios, canonical absoluto y enlaces internos válidos.
- Rutas en minúsculas con guiones, barra final y jerarquía coherente con el padre.
- Breadcrumbs y navegación contextual derivados del JSON.
- Mantener `status: draft` en los contenidos iniciales y `SITE_INDEXABLE=false` durante la preparación.
- Antes de indexar: dominio real en SITE_URL, arquitectura aprobada, revisión editorial y `status: published` solo en páginas completas; después activar SITE_INDEXABLE.
- Sitemap automático de rutas generadas. No inventar lastmod, prioridades ni datos estructurados sin evidencia.

## Calidad
- Diseño responsive, landmarks semánticos, navegación por teclado, foco visible y contraste legible.
- Ejecutar `npm run build` tras cambios relevantes y corregir errores antes de entregar.
- Comprobar que se generan las rutas de la arquitectura y la página de inicio, sin enlaces rotos ni scripts de cliente innecesarios.
- No crear tests que dupliquen cambios triviales. Verificar de forma proporcionada navegación y salida estática.
