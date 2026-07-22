# CLAUDE.md — Contexto del proyecto para agentes

Guía de contexto para cualquier agente que trabaje en este repo. Leer antes de modificar.

## Qué es esto

Sitio web del **Complejo El Abuelo**, un complejo de cabañas en **Chapadmalal**
(costa atlántica, Buenos Aires, Argentina). Cliente: **Gabriel Sosa**.

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
tipo `bg-[#2f97b8]` para los colores del sistema.**

| Token | Uso |
|---|---|
| `turquesa` / `turquesa-light` / `turquesa-dark` | Primario (mar): nav activa, badges, acentos |
| `profundo` / `profundo-light` | Teal oscuro: footer, banners, secciones dark |
| `arena` / `arena-soft` / `arena-dark` | Fondo cálido, tarjetas, bordes |
| `coral` / `coral-dark` / `coral-light` | CTA principal (atardecer), promos |
| `texto` / `texto-soft` | Texto principal / secundario |

**Tipografía:** `font-display` = **Fraunces** (serif, para títulos h1–h4, ya aplicado
en `@layer base`), `font-sans` = **Nunito** (cuerpo, por defecto en `body`).

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

- `site.js` — WhatsApp, email, dirección, redes, Google Maps. **Tiene placeholders (TODO).**
- `units.js` — `COMPLEJO_1` / `COMPLEJO_2`: cabañas con nombre, capacidad, descripción, `detalles[]`, `img`, `gallery[]`.
- `services.js` — `incluye[]` / `noIncluye[]` por complejo.
- `gallery.js` — items con `src`, `full`, `alt`, `cat` + categorías del filtro.
- `testimonials.js` — reseñas.
- `promos.js` — `PROMOS_SEED` (fallback cuando no hay Supabase).
- `nav.js` — navegación.
- `images.js` — helper `ux(id,w,h)` + banco de IDs de Unsplash (**placeholders**).

## Cómo hacer cambios frecuentes

- **Cambiar el número de WhatsApp / datos de contacto:** `src/data/site.js`.
  Todo el resto lo consume desde ahí.
- **Agregar/editar una cabaña:** editar `COMPLEJO_1`/`COMPLEJO_2` en `units.js`
  (agregar un objeto al array `units`). Se refleja solo en la página del complejo,
  en los selects del widget de reserva y del formulario de contacto.
- **Cambiar fotos:** reemplazar URLs en `units.js` / `gallery.js` / `promos.js`.
  Ver README → "Fotos" para usar imágenes propias en `/public`.
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

- Contenido es de **ejemplo** (fotos Unsplash, textos genéricos, datos placeholder
  marcados con `TODO` en `site.js`). Reemplazar con datos reales del cliente.
- Supabase **no está configurado** todavía → el admin muestra instrucciones y el
  sitio usa promos seed. Al cargar `.env`, el admin se activa.
- El bundle JS incluye `@supabase/supabase-js` en todas las páginas (~147 kB gzip).
  Si se busca optimizar, considerar lazy-load de Supabase / de `AdminPage`.
- `npm run build` pasa OK. No hay tests automatizados.
