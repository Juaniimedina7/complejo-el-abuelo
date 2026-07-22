import { img } from './images.js'

// Promociones de ejemplo (SEED). Solo se muestran si NO hay Supabase configurado.
// Con Supabase activo (caso actual), las promos las carga el propietario en /admin.

export const PROMOS_SEED = [
  {
    id: 'seed-1',
    titulo: 'Escapada de temporada baja',
    badge: 'Oferta',
    tono: 'coral',
    descripcion: '3 noches al precio de 2 de lunes a jueves. Ideal para descansar sin apuro fuera de temporada alta.',
    vigencia: 'Abril a noviembre',
    activa: true,
    img: img('Abuelo 1/Interior El Abuelo 1.jpg'),
  },
  {
    id: 'seed-2',
    titulo: 'Reserva anticipada de verano',
    badge: 'Verano',
    tono: 'turquesa',
    descripcion: 'Reservá con anticipación tu semana de enero o febrero y asegurá el mejor precio de la temporada.',
    vigencia: 'Hasta el 30/11',
    activa: true,
    img: img('Abuelo 3/abuelo3-interior.jpg'),
  },
]
