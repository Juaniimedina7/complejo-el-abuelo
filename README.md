# Complejo El Abuelo 🌊

Sitio web oficial del **Complejo El Abuelo**: cabañas y departamentos en **Camet
Norte, Santa Clara del Mar** (Buenos Aires), a dos cuadras del mar.

El objetivo del sitio es simple: que quien llega desde redes, Google o el boca a
boca encuentre **fotos, detalles y ubicación**, y pueda **consultar y reservar por
WhatsApp** en un par de clics. Además, el dueño puede **cargar sus propias
promociones** desde un panel, sin depender de nadie.

🔗 **En vivo:** https://complejo-el-abuelo.vercel.app

---

## ¿Qué ofrece el sitio?

- **Inicio** con un carrusel de fotos de la zona, buscador de fechas y accesos
  rápidos (WhatsApp, ubicación, Instagram).
- **Complejo 1** (cabañas Abuelo 1 y 2) y **Complejo 2** (departamentos Abuelo 3, 4
  y 5): cada unidad con su descripción, servicios, galería de fotos y **video**.
- **Galería** general con filtros por complejo y visor de imágenes/videos.
- **Promociones** que administra el dueño (ver más abajo).
- **Contacto** con formulario que arma el mensaje y abre WhatsApp, más el mapa.
- **Botón de WhatsApp flotante** en todas las páginas.

> Todo el contacto y las reservas se resuelven por **WhatsApp**. No hay pagos ni
> motor de reservas online: el sitio arma el mensaje y abre el chat con los datos
> ya cargados (fechas, personas, cabaña).

---

## Guía para el dueño: administrar promociones

El sitio tiene un panel privado para crear y editar las ofertas que se muestran en
la sección **Promociones**.

1. Entrá a **`/admin`** (por ejemplo, `https://complejo-el-abuelo.vercel.app/admin`).
2. Iniciá sesión con tu **email y contraseña** (el ícono del ojo 👁 te deja ver lo
   que escribís).
3. Tocá **“+ Nueva promoción”** y completá:
   - **Título** y **descripción** de la oferta.
   - **Etiqueta** (ej. “Oferta”, “Verano”) y su **color** (coral o turquesa) — el
     botón de WhatsApp de la promo toma ese mismo color.
   - **Vigencia** (texto libre, ej. “Abril a noviembre”).
   - **Imagen**: la elegís de la **galería del sitio** (no hace falta pegar links).
   - **“Mostrar en el sitio”**: si lo desmarcás, la promo queda guardada pero oculta.
4. A la derecha ves una **vista previa** en vivo de cómo va a quedar la tarjeta.
5. **Guardá.** La promo aparece al instante en la página **Promociones**.

Cada promo se puede **editar, ocultar/activar o borrar** desde la lista. Si no hay
promociones activas, el sitio muestra un mensaje de “No hay promociones vigentes”.

> ¿Querés cambiar fotos, textos, precios de referencia u otra cosa del sitio (que no
> sean promos)? Esos cambios los hace el desarrollador; escribile y los aplica.

---

## Cómo pedir cambios de contenido

El contenido “fijo” (unidades, servicios, datos de contacto, fotos, etc.) vive en
archivos del proyecto y se actualiza con un pequeño cambio de código + un nuevo
deploy. Lo más habitual:

| Qué cambiar | Dónde |
|---|---|
| Número de WhatsApp, email, dirección, redes, mapa | `src/data/site.js` |
| Cabañas: nombre, capacidad, descripción, detalles | `src/data/units.js` |
| Servicios de cada complejo | `src/data/services.js` |
| Fotos de la galería | `src/data/gallery.js` |
| Reseñas / testimonios | `src/data/testimonials.js` |

Las **fotos y videos** se suben al almacenamiento de Supabase (bucket `images`) y se
referencian por nombre; ver la sección técnica.

Pendientes menores sugeridos: reemplazar los testimonios de ejemplo por reseñas
reales de Google y subir una imagen para compartir en redes (`/public/og-image.jpg`,
1200×630).

---

## Parte técnica (para desarrolladores)

### Stack

- **React 19 + Vite** (JavaScript / JSX, sin TypeScript).
- **Tailwind CSS v4** (plugin de Vite; tokens de color y tipografías en `src/index.css`).
- **react-router-dom v7** para las rutas.
- **Supabase** (Auth + Postgres + Storage) para el panel de promociones y las fotos.
- **@vercel/analytics** para métricas en Vercel.

### Correr el proyecto

```bash
npm install
npm run dev        # desarrollo → http://localhost:5173
npm run build      # build de producción → /dist
npm run preview    # previsualizar el build
```

El sitio funciona sin configuración (usa contenido real ya cargado). El panel
`/admin` requiere las variables de Supabase (ver abajo).

### Estructura

```
src/
├── App.jsx           # Rutas + layout (Header / Footer / botón WhatsApp) + Analytics
├── index.css         # Paleta, tipografías y utilidades (Tailwind v4 @theme)
├── components/        # Header, Footer, Lightbox, UnitCard, ReservationWidget, PromoCard, …
├── pages/             # Home, Complejo, Galería, Promociones, Contacto, Admin
├── data/              # Contenido editable (site, units, services, gallery, promos, testimonials, nav, images)
└── lib/               # whatsapp.js (mensajes), supabase.js (cliente), promosService.js (CRUD promos)
```

Para el detalle de arquitectura, convenciones y decisiones, ver [`CLAUDE.md`](./CLAUDE.md).

### Fotos y videos (Supabase Storage)

Viven en el bucket **público** `images`, en carpetas `Abuelo 1` … `Abuelo 5` (más
`hero/`, `logo/`, `complejo1/`, `complejo2/`). Se referencian con el helper
`img('Abuelo 1/archivo.jpg')` de `src/data/images.js`, que arma la URL pública. Para
agregar/cambiar una foto: subirla al bucket y usarla en `units.js` / `gallery.js`.
Los `.mp4` se detectan solos y se reproducen en el visor. **Ojo:** el nombre debe
coincidir exacto (Storage distingue mayúsculas y minúsculas).

### Configurar Supabase (ya hecho en este proyecto)

El proyecto de Supabase ya existe: tabla `promociones` creada, bucket `images`
público y usuario admin del dueño dado de alta. Estos pasos quedan como referencia
para replicar el setup desde cero:

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. Crear la tabla y las políticas (SQL Editor):

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

   -- El público solo lee promos activas:
   create policy "lectura publica de activas"
     on promociones for select using (activa = true);

   -- El admin autenticado tiene acceso total:
   create policy "admin total"
     on promociones for all to authenticated
     using (true) with check (true);
   ```

3. Crear el bucket `images` (Storage → New bucket → **Public**).
4. Crear el usuario admin (Authentication → Users → Add user).
5. Variables de entorno: copiar `.env.example` a `.env` y completar:

   ```
   VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_xxx     # o la anon key legacy (eyJ...)
   ```

> Solo las variables con prefijo `VITE_` llegan al navegador; la *publishable key*
> es pública y segura para el front. **Nunca** expongas con `VITE_` la `secret key`,
> el `DATABASE_URL` ni las access keys de S3.
>
> Al cargar las variables en Vercel, pegá **cada valor en una sola línea** (un salto
> de línea o un valor duplicado rompe la conexión). El código igual las sanea por las
> dudas (`src/lib/supabase.js`).

### Deploy en Vercel

1. Importar el repo (Vercel detecta Vite automáticamente).
2. Cargar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en Project Settings →
   Environment Variables (Production y Preview) y **redeployar** (las variables se
   toman en el build).
3. `vercel.json` ya incluye el rewrite para que las rutas directas (`/complejo-1`,
   `/promociones`, …) funcionen al compartir el link.
4. `@vercel/analytics` ya está montado; las métricas aparecen solas en el dashboard.

---

Hecho con cariño para el Complejo El Abuelo · Camet Norte, Santa Clara del Mar.
