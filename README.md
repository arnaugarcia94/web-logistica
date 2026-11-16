# web-logistica
Portal informativo sobre logística y cadena de suministro

## Fase 1 · Base Astro

Portal estático independiente, sin blog ni funcionalidades comerciales. Siete páginas de ejemplo, con estructura y contenido provisionales; no representan la futura arquitectura SEO de unas 230 páginas.

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

- `src/data/pages.json`: siete registros provisionales y sus metadatos.
- `src/lib/content.ts`: tipos, consultas de navegación y validación básica de jerarquía.
- `src/pages/[...slug].astro`: rutas limpias generadas desde el JSON.
- `src/pages/robots.txt.ts`: robots y referencia al sitemap.
- `src/layouts/BaseLayout.astro`: HTML común y metadatos SEO.
- `src/components/`: header, footer, breadcrumbs, navegación contextual y tarjetas.
- `src/templates/`: home, hub, subvertical y página informativa.
- `src/styles/global.css`: diseño responsive, sin JavaScript de cliente.
- `public/favicon.svg`: icono local.
- `astro.config.mjs`: salida estática, barras finales y sitemap.
- `docs/arquitectura-datos.md`: contrato de datos y futura incorporación del Excel.
- `AGENTS.md`: convenciones de desarrollo, contenido y SEO.

### Las siete páginas

1. `/`
2. `/transporte/`
3. `/almacenaje/`
4. `/transporte/maritimo/`
5. `/almacenaje/operaciones/`
6. `/transporte/maritimo/que-es-un-contenedor/`
7. `/almacenaje/operaciones/que-es-el-picking/`

### Dominio e indexación

Copia `.env.example` a `.env` si necesitas configurar el entorno. `SITE_URL` define el dominio usado por canonical, Open Graph y sitemap; por defecto se usa `https://example.com` como marcador. Antes de cualquier publicación hay que sustituirlo por el dominio definitivo y volver a compilar.

Todas las muestras tienen `status: draft` y emiten `noindex, follow`. Para indexar una página deben cumplirse ambas condiciones: contenido revisado con `status: published` y `SITE_INDEXABLE=true`. `robots.txt` permite el rastreo para que los motores puedan leer `noindex`; el sitemap incluye las siete rutas de muestra para verificar la integración. Revisar esta política antes del lanzamiento.

El proyecto usa la [integración oficial de sitemap de Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/). La subida del código a GitHub no despliega la web; Netlify permite activar el despliegue automático al vincular el repositorio.

## Despliegue en Netlify

Importa `arnaugarcia94/web-logistica` desde GitHub y selecciona la rama `main`.
`netlify.toml` configura Node 24, `npm run build` y el directorio `dist`.
No se necesita adaptador de servidor: el portal es estático.

La URL canónica se resuelve en este orden: `SITE_URL` explícita, `SITE_URL` del archivo .env, variable `URL` de Netlify y marcador local `https://example.com`.
Netlify proporciona `URL` durante la compilación. Si añades un dominio propio, revisa la URL y vuelve a desplegar; puedes fijarla con `SITE_URL` en Netlify.
Se mantiene `SITE_INDEXABLE=false` y el estado `draft` de las siete muestras.
Los commits posteriores en `main` podrán activar nuevos despliegues una vez vinculado el proyecto.
