import { ux, IMG } from './images.js'

// Promociones de ejemplo (SEED). Se muestran cuando no hay Supabase configurado.
// Con Supabase activo, estas se reemplazan por las que cargue el propietario en /admin.
// ⚠️ Contenido de ejemplo.

export const PROMOS_SEED = [
  {
    id: 'seed-1',
    titulo: 'Escapada de temporada baja',
    badge: 'Oferta',
    tono: 'coral',
    descripcion: '3 noches al precio de 2 de lunes a jueves. Ideal para descansar sin apuro fuera de temporada alta.',
    vigencia: 'Abril a noviembre',
    activa: true,
    img: ux(IMG.cabanas[1], 900, 600),
  },
  {
    id: 'seed-2',
    titulo: 'Finde largo en familia',
    badge: 'Destacado',
    tono: 'turquesa',
    descripcion: 'Descuento especial reservando la cabaña grande (Abuelo 5) para grupos de 6 o más personas.',
    vigencia: 'Fines de semana largo 2026',
    activa: true,
    img: ux(IMG.interiores[2], 900, 600),
  },
  {
    id: 'seed-3',
    titulo: 'Reserva anticipada de verano',
    badge: 'Verano',
    tono: 'coral',
    descripcion: 'Reservá antes del 30/11 tu semana de enero o febrero y asegurá el mejor precio de la temporada.',
    vigencia: 'Hasta el 30/11/2026',
    activa: true,
    img: ux(IMG.playa[1], 900, 600),
  },
]
