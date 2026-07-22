# CLAUDE.md — Contexto del proyecto para agentes

Guía de contexto para cualquier agente que trabaje en este repo. Leer antes de modificar.

## Qué es esto

Sitio web del **Complejo El Abuelo**, cabañas y departamentos en **Camet Norte,
Santa Clara del Mar** (Buenos Aires, Argentina), a dos cuadras del mar. Cliente:
**Gabriel Sosa**. (Ojo: el brief inicial decía "Chapadmalal" por error; la
ubicación real es Camet Norte / Santa Clara del Mar — Calle Quintana 722/706.)

Objetivos del cliente:
1. Tener presencia web para **derivar** a la gente que llega desde otros canales
   (redes, WhatsApp) y que vean fotos y detalles.
2. Facilitar el **contacto** (todo deriva a WhatsApp; no hay motor de reservas).
3. Un espacio de **promociones que el dueño administra solo** (panel `/admin`).

El sitio son 2 complejos: **Complejo 1** (cabañas Abuelo 1 y 2) y **Complejo 2**
(cabañas Abuelo 3, 4 y 5), más Galería, Promociones y Contacto.

## Decisiones tomadas (no revertir sin consultar)

- **JavaScript + JSX, NO TypeScript.** El cliente/dev prefiere JSX porque lo
  entiende mejor. No introducir `.ts`/`.tsx` ni tipos.
- **Todo el contacto va a WhatsApp.** No hay backend de reservas ni envío de mail.
  Formularios y CTAs arman un mensaje y abren `wa.me` (ver `src/lib/whatsapp.js`).
- **Reservas = widget de fechas → WhatsApp** (no channel manager).
- **Promos autogestionables vía Supabase.** El panel `/admin` permite CRUD con
  login. Sin credenciales de Supabase, el sitio usa promos de ejemplo (seed) y el
  admin muestra instrucciones de configuración.
- **Idioma: español rioplatense** (voseo: "escribinos", "reservá", "consultá").
- **Deploy previsto: Vercel** (hay `vercel.json` con rewrite SPA y `<Analytics />`).

## Stack

React 19 · Vite 6 · Tailwind CSS v4 (plugin Vite, sin PostCSS) · react-router-dom v7
· @supabase/supabase-js · @vercel/analytics.

## Sistema de diseño

Definido en `src/index.css` dentro de `@theme` (Tailwind v4 genera las utilidades
automáticamente, ej. `bg-turquesa`, `text-coral`). **No usar valores arbitrarios
para los colores del sistema.** Paleta = guía de estilo oficial del cliente
(`claude-info/Colores.jpeg`).

| Token | Valor | Uso |
|---|---|---|
| `turquesa` / `turquesa-light` / `turquesa-dark` | `#008cbb` / `#67b0bf` / `#006f95` | Primario (mar): nav activa, badges, acentos |
| `profundo` / `profundo-light` | `#0c4a5b` / `#14607a` | Teal profundo (derivado): footer, banners, secciones dark |
| `arena` / `arena-soft` / `arena-dark` / `sand` | `#f7f2eb` / `#fffdf8` / `#e6c79b` / `#f2d7b6` | Fondo cálido, tarjetas, bordes, bandas |
| `coral` / `coral-dark` / `coral-light` | `#f26e50` / `#d9522f` / `#f2a285` | CTA principal (atardecer), promos |
| `marron` | `#745f46` | Acento cálido (madera) |
| `texto` / `texto-soft` | `#45403a` / `#615e5e` | Texto principal / secundario |

**Tipografía:** `font-script` = **Kaushan Script** (wordmark del logo, pincel de la
marca), `font-display` = **Fraunces** (títulos h1–h4; es un stand-in web de "Finesse
Roman", la fuente de marca que NO está en Google Fonts), `font-sans` = **Nunito**
(cuerpo). El logo está en `src/components/Logo.jsx` (techo + número opcional 1/2 +
wordmark script).

**Utilidades propias:** `.grain` (textura de grano vía `::before`, requiere padre
`relative`), `.animate-rise` (aparición con subida, usar con `animationDelay` para
reveals escalonados), `.animate-floaty`, `.text-balance`.

## Rutas (`src/App.jsx`)

| Ruta | Página |
|---|---|
| `/` | `HomePage` — hero carrusel + widget reserva + complejos + promos + testimonios + CTA |
| `/complejo-1` | `ComplejoPage numero={1}` |
| `/complejo-2` | `ComplejoPage numero={2}` |
| `/galeria` | `GaleriaPage` — filtros + lightbox |
| `/promociones` | `PromocionesPage` — lee promos (Supabase o seed) |
| `/contacto` | `ContactoPage` — formulario inteligente → WhatsApp + mapa |
| `/admin` | `AdminPage` — login Supabase + CRUD de promos |
| `*` | `NotFound` |

El menú se define en `src/data/nav.js`. `ScrollToTop` resetea el scroll al navegar.
El `WhatsAppFAB` se muestra en todas las rutas menos `/admin`.

## Capa de datos (`src/data/`) — TODO EL CONTENIDO EDITABLE VIVE ACÁ

- `site.js` — WhatsApp, email, dirección, redes, Google Maps. **Datos reales.**
- `units.js` — `COMPLEJO_1` / `COMPLEJO_2`: cabañas con nombre, capacidad, `detalles[]`, `img`, `gallery[]`, `video?`. Datos reales.
- `services.js` — `incluye[]` / `noIncluye[]` por complejo.
- `gallery.js` — items con `src`, `full`, `alt`, `cat` + categorías del filtro.
- `testimonials.js` — reseñas (todavía de ejemplo — reemplazar por reales de Google).
- `promos.js` — `PROMOS_SEED` (solo fallback; hoy Supabase está activo y las promos las carga el dueño en `/admin`).
- `nav.js` — navegación.
- `images.js` — helper `img('carpeta/archivo.jpg')` que arma URLs públicas del bucket
  `images` de Supabase Storage + `esVideo(url)`. Las fotos/videos reales viven en
  Supabase (carpetas `Abuelo 1` … `Abuelo 5`). Ya NO se usa Unsplash.

## Cómo hacer cambios frecuentes

- **Cambiar el número de WhatsApp / datos de contacto:** `src/data/site.js`.
  Todo el resto lo consume desde ahí.
- **Agregar/editar una cabaña:** editar `COMPLEJO_1`/`COMPLEJO_2` en `units.js`
  (agregar un objeto al array `units`). Se refleja solo en la página del complejo,
  en los selects del widget de reserva y del formulario de contacto.
- **Cambiar fotos:** las fotos viven en el bucket `images` de Supabase Storage
  (carpetas `Abuelo N`). Se referencian con `img('Abuelo 1/archivo.jpg')` en
  `units.js` / `gallery.js` / `promos.js`. Para agregar/cambiar una foto: subirla al
  bucket (público) y usar `img('<carpeta>/<archivo>')`. Los videos `.mp4` se detectan
  con `esVideo()` y se muestran en el lightbox / miniaturas de `UnitCard`.
- **Promos:** el sitio público lee vía `src/lib/promosService.js`
  (`listPromosPublicas`, solo `activa=true`). El admin usa `listPromosAdmin` +
  `crearPromo`/`actualizarPromo`/`borrarPromo`. Estructura de la tabla `promociones`
  y setup de Supabase: ver README.
- **Mensajes de WhatsApp:** `src/lib/whatsapp.js` (`waLink`, `waUnidad`, `waReserva`).

## Convenciones

- Componentes en `src/components`, páginas en `src/pages`, un archivo por componente.
- Íconos SVG inline en `src/components/icons.jsx` (sin librería de íconos).
- Textos y comentarios en español.
- Preferir tokens de Tailwind del `@theme` sobre valores arbitrarios.

## Estado actual / pendientes

- **Datos reales cargados**: ubicación, contacto, unidades (Abuelo 1–5), servicios,
  fotos y videos desde Supabase Storage. Paleta y tipografía según guía del cliente.
- **Supabase configurado** (`.env` presente, gitignoreado): la tabla `promociones`
  ya existe y el bucket `images` es **público**. El panel `/admin` levanta el login.
  Falta que el dueño cree su usuario admin en Supabase → Authentication (si aún no).
- **Credenciales**: `.env` usa la *publishable key* (`sb_publishable_…`) en
  `VITE_SUPABASE_ANON_KEY`. El `SUPABASE_SECRET_KEY` / `DATABASE_URL` / access keys de
  S3 están en `.env` pero **no** se usan en el front (nunca prefijar con `VITE_`).
- **Testimonios** siguen siendo de ejemplo → reemplazar por reseñas reales.
- Falta la foto `og:image` real (1200×630) en `/public/og-image.jpg`.
- El bundle JS incluye `@supabase/supabase-js` en todas las páginas (~147 kB gzip).
  Si se busca optimizar, considerar lazy-load de Supabase / de `AdminPage`.
- `npm run build` pasa OK. No hay tests automatizados.
