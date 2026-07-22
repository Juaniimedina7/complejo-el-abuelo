# Complejo El Abuelo 🌊

Sitio web del **Complejo El Abuelo** — cabañas en Chapadmalal, Buenos Aires.

Dos complejos (Complejo 1 y Complejo 2, cabañas "Abuelo 1" a "Abuelo 5"), galería,
promociones autogestionables y contacto que deriva todo a **WhatsApp**.

## Stack

- **React 19** + **Vite** (JavaScript / JSX, sin TypeScript)
- **Tailwind CSS v4** (plugin de Vite, tokens en `src/index.css`)
- **react-router-dom** para las rutas
- **Supabase** (opcional) para el panel de promociones autogestionable
- **@vercel/analytics** para métricas al desplegar en Vercel

## Cómo correr el proyecto

```bash
npm install
npm run dev        # entorno de desarrollo (http://localhost:5173)
npm run build      # build de producción a /dist
npm run preview    # previsualizar el build
```

El sitio funciona **sin configuración**: usa fotos de Unsplash y promos de ejemplo.

## Datos a reemplazar (placeholders)

| Dónde | Qué reemplazar |
|---|---|
| `src/data/site.js` | Número de WhatsApp, email, dirección, links de Instagram/Facebook, link y embed de Google Maps |
| `src/data/units.js` | Descripciones, capacidades y fotos reales de cada cabaña |
| `src/data/services.js` | Servicios que incluye / no incluye cada complejo |
| `src/data/gallery.js` | Fotos reales para la galería |
| `src/data/testimonials.js` | Reseñas reales (idealmente con link a Google) |
| `src/index.html` | Meta `og:image` (foto real 1200×630 en `/public/og-image.jpg`) |

### Fotos

Hoy las imágenes son **placeholders de Unsplash** (`src/data/images.js`).
Para usar fotos reales: subirlas a `/public` (o a Cloudinary/S3) y reemplazar las
URLs en `units.js`, `gallery.js`, `promos.js` y `site.js`. El helper `ux()` solo
arma URLs de Unsplash; con fotos propias se pasan las URLs directamente.

## Panel de administración de promociones (`/admin`)

El sitio muestra promos de ejemplo hasta que se conecte Supabase. Para activar la
autogestión (que el dueño cree/edite/borre promos desde `/admin`):

### 1. Crear proyecto en Supabase

Crear un proyecto gratuito en [supabase.com](https://supabase.com).

### 2. Crear la tabla `promociones`

En el SQL Editor de Supabase:

```sql
create table promociones (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text not null,
  badge text default 'Oferta',
  tono text default 'coral',        -- 'coral' | 'turquesa'
  vigencia text,
  img text,
  activa boolean default true,
  created_at timestamptz default now()
);

alter table promociones enable row level security;

-- Lectura pública solo de promos activas (para el sitio):
create policy "lectura publica de activas"
  on promociones for select
  using (activa = true);

-- Administradores autenticados: acceso total:
create policy "admin total"
  on promociones for all
  to authenticated
  using (true) with check (true);
```

### 3. Configurar variables de entorno

Copiar `.env.example` a `.env` y completar con los valores del proyecto
(Supabase → Project Settings → API):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### 4. Crear el usuario administrador

En Supabase → Authentication → Users → "Add user", crear el email/contraseña
del dueño. Con eso puede ingresar en `/admin`.

> El sitio público solo lee promos con `activa = true`; el resto queda oculto.

## Deploy en Vercel

1. Importar el repo en Vercel (detecta Vite automáticamente).
2. Cargar las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en
   Project Settings → Environment Variables (si se usa el panel admin).
3. El `vercel.json` ya incluye el rewrite para que las rutas SPA (`/complejo-1`,
   etc.) funcionen al compartir links directos.
4. `@vercel/analytics` ya está montado (`<Analytics />` en `App.jsx`); las
   métricas aparecen solas en el dashboard de Vercel.

## Estructura

```
src/
├── App.jsx              # Rutas + layout (Header/Footer/FAB) + Analytics
├── index.css            # Tokens de color, fuentes y utilidades (Tailwind v4)
├── components/          # Header, Footer, Lightbox, UnitCard, ReservationWidget, etc.
├── pages/               # HomePage, ComplejoPage, GaleriaPage, PromocionesPage, ContactoPage, AdminPage
├── data/                # Contenido editable (site, units, services, gallery, promos, testimonials, nav, images)
└── lib/                 # whatsapp.js, supabase.js, promosService.js
```

Ver [`CLAUDE.md`](./CLAUDE.md) para el detalle de arquitectura pensado para agentes.
