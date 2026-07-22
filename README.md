# Complejo El Abuelo 🌊

Sitio web del **Complejo El Abuelo** — cabañas y departamentos en Camet Norte,
Santa Clara del Mar (Buenos Aires), a dos cuadras del mar.

Dos complejos (Complejo 1: cabañas "Abuelo 1" y "2"; Complejo 2: departamentos
"Abuelo 3", "4" y "5"), galería, promociones autogestionables y contacto que
deriva todo a **WhatsApp**.

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

Con las variables de Supabase en `.env`, el panel `/admin` queda activo. Sin ellas,
el sitio igual funciona usando promos de ejemplo (seed).

## Datos del cliente (ya cargados)

Ubicación, contacto, unidades (Abuelo 1–5), servicios, fotos y videos son **datos
reales**. Lo que todavía conviene actualizar:

| Dónde | Qué actualizar |
|---|---|
| `src/data/testimonials.js` | Reemplazar reseñas de ejemplo por reales (con link a Google) |
| `index.html` | Meta `og:image` (foto real 1200×630 en `/public/og-image.jpg`) |

Para editar contacto/unidades/servicios/galería: `src/data/*.js` (ver `CLAUDE.md`).

### Fotos y videos

Viven en el bucket **público** `images` de Supabase Storage, en carpetas
`Abuelo 1` … `Abuelo 5`. Se referencian con el helper `img('Abuelo 1/archivo.jpg')`
(`src/data/images.js`), que arma la URL pública. Para agregar/cambiar una foto:
subirla al bucket y usar `img('<carpeta>/<archivo>')` en `units.js` / `gallery.js`.
Los videos `.mp4` se muestran en el lightbox y en las miniaturas de las cabañas.

## Panel de administración de promociones (`/admin`)

**Estado: ya configurado.** El proyecto de Supabase existe, la tabla `promociones`
está creada y el bucket `images` es público. El `/admin` levanta el login. Solo
resta que el dueño tenga su usuario admin creado (paso 4). Estos pasos quedan como
referencia / para replicar el setup:

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
VITE_SUPABASE_ANON_KEY=sb_publishable_xxx   # o la anon key legacy (eyJhbGci...)
```

> Solo las variables con prefijo `VITE_` llegan al navegador. La *publishable key*
> es pública/segura para el front. **Nunca** pongas la `secret key`, el
> `DATABASE_URL` ni las access keys de S3 con prefijo `VITE_`.

### 4. Crear el usuario administrador

En Supabase → Authentication → Users → "Add user", crear el email/contraseña
del dueño. Con eso puede ingresar en `/admin`.

### 5. Fotos: bucket de Storage

Las fotos van en un bucket **público** llamado `images` (carpetas `Abuelo 1` …
`Abuelo 5`). Si se crea de cero: Storage → New bucket → nombre `images` → marcar
"Public bucket". Ver "Fotos y videos" arriba.

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
