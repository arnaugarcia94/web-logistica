# web-logistica
Portal informativo sobre logística y cadena de suministro

## Portal Astro

Portal estático independiente, sin blog ni funcionalidades comerciales. La página de inicio enlaza las 13 verticales de la arquitectura SEO. El sitio genera 231 páginas: inicio, 13 verticales, 46 subverticales y 171 categorías informativas.

### Desarrollo en GitHub Codespaces

```bash
npm ci
npm run dev -- --host 0.0.0.0
```

En la pestaña **Ports / Puertos** de Codespaces, abre el puerto **4321** mediante **Open in Browser / Abrir en el navegador**. Si no aparece automáticamente, añádelo con **Forward a Port / Reenviar un puerto**. Mantén la visibilidad privada. Para detener el servidor, pulsa Ctrl+C.

Para comprobar la versión estática:

```bash
npm run build
npm run preview -- --host 0.0.0.0
```

Abre el puerto que indique Astro (por defecto 4321). `dist/` contiene la salida estática y no se versiona.

### Organización

- `src/data/pages.json`: 231 registros y sus metadatos SEO.
- `src/lib/content.ts`: tipos, consultas de navegación y validación básica de jerarquía.
- `src/pages/[...slug].astro`: rutas limpias generadas desde el JSON.
- `src/pages/robots.txt.ts`: robots y referencia al sitemap.
- `src/layouts/BaseLayout.astro`: HTML común y metadatos SEO.
- `src/components/`: header, footer, breadcrumbs, navegación contextual y tarjetas.
- `src/templates/`: home, hub, subvertical y página informativa.
- `src/styles/global.css`: diseño responsive, sin JavaScript de cliente.
- `public/favicon.svg`: icono local.
- `astro.config.mjs`: salida estática, barras finales y sitemap.
- `docs/arquitectura-datos.md`: contrato de datos y reglas de importación del Excel.
- `AGENTS.md`: convenciones de desarrollo, contenido y SEO.

### Dominio e indexación

Copia `.env.example` a `.env` si necesitas configurar el entorno. `SITE_URL` define el dominio usado por canonical, Open Graph y sitemap; en Netlify se usa la variable `URL` del proyecto cuando `SITE_URL` está vacía. Sin URL de sitio, la compilación local omite canónicas y sitemap.

Todas las páginas tienen `status: draft` y emiten `noindex, follow`. Para indexar una página deben cumplirse ambas condiciones: contenido revisado con `status: published` y `SITE_INDEXABLE=true`. `robots.txt` permite el rastreo para que los motores puedan leer `noindex`; el sitemap enumera las 231 rutas cuando hay una URL de sitio configurada. Revisar esta política antes del lanzamiento.

El proyecto usa la [integración oficial de sitemap de Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/). La subida del código a GitHub no despliega la web; Netlify permite activar el despliegue automático al vincular el repositorio.

## Despliegue en Netlify

Importa `arnaugarcia94/web-logistica` desde GitHub y selecciona la rama `main`.
`netlify.toml` configura Node 24, `npm run build` y el directorio `dist`.
No se necesita adaptador de servidor: el portal es estático.

La URL canónica se resuelve en este orden: `SITE_URL` explícita, `SITE_URL` del archivo .env, variable `URL` de Netlify.
Netlify proporciona `URL` durante la compilación. Si añades un dominio propio, revisa la URL y vuelve a desplegar; puedes fijarla con `SITE_URL` en Netlify.
Se mantiene `SITE_INDEXABLE=false` y el estado `draft` de todas las páginas.
Los commits posteriores en `main` podrán activar nuevos despliegues una vez vinculado el proyecto.
