import { img } from './images.js'

// Galería general con fotos reales del bucket de Supabase. `cat` alimenta el filtro.

const item = (path, alt, cat, posterPath = null) => ({
  src: img(path),
  full: img(path),
  alt,
  cat,
  poster: posterPath ? img(posterPath) : null,
})

export const GALLERY = [
  // Complejo 1
  item('Abuelo 1/Interior El Abuelo 1.jpg', 'Interior de la cabaña — Abuelo 1', 'Complejo 1'),
  item('Abuelo 1/abuelo1-living.jpg', 'Living de la cabaña — Abuelo 1', 'Complejo 1'),
  item('Abuelo 1/abuelo1-cama-doble.jpg', 'Dormitorio con cama doble — Abuelo 1', 'Complejo 1'),
  item('Abuelo 1/estufa.jpg', 'Estufa encendida living — Abuelo 1', 'Complejo 1'),
  item('Abuelo 1/abuelo1-camas-simples.jpg', 'Dormitorio con camas simples — Abuelo 1', 'Complejo 1'),
  item('Abuelo 1/parrila el Abuelo 1.jpg', 'Parrilla techada — Abuelo 1', 'Complejo 1'),
  item('Abuelo 1/abuelo1-banio.jpg', 'Baño con hidromasaje — Abuelo 1', 'Complejo 1'),
  item('Abuelo 2/abuelo2-interior.jpg', 'Interior de la cabaña — Abuelo 2', 'Complejo 1'),
  item('Abuelo 2/abuelo2-cocina.jpg', 'Cocina de la cabaña — Abuelo 2', 'Complejo 1'),
  item('Abuelo 2/abuelo2-cama-doble.jpg', 'Dormitorio con cama doble — Abuelo 2', 'Complejo 1'),
  item('complejo1/frente-complejo1.jpg', 'Frente del Complejo 1', 'Complejo 1'),
  item('complejo1/pileta.jpg', 'Pileta del Complejo 1', 'Complejo 1'),
  item('complejo1/pileta2.jpg', 'Pileta del Complejo 1', 'Complejo 1'),
  item('complejo1/patio-complejo1.jpg', 'Patio del Complejo 1', 'Complejo 1'),



  // Complejo 2
  item('Abuelo 3/abuelo3-interior.jpg', 'Departamento Abuelo 3', 'Complejo 2'),
  item('Abuelo 3/abuelo3-cama-doble.jpg', 'Dormitorio — Abuelo 3', 'Complejo 2'),
  item('Abuelo 4/abuelo4-interior.jpg', 'Departamento Abuelo 4', 'Complejo 2'),
  item('Abuelo 4/abuelo4-interior2.jpg', 'Comedor — Abuelo 4', 'Complejo 2'),
  item('Abuelo 5/abuelo5-interior.jpg', 'Departamento Abuelo 5', 'Complejo 2'),
  item('Abuelo 5/abuelo5-cocina.jpg', 'Cocina comedor — Abuelo 5', 'Complejo 2'),
  item(
    'Abuelo 3/abuelo3-video.mp4',
    'Recorrido por el departamento — Abuelo 3',
    'Complejo 2',
    'Abuelo 3/abuelo3-interior.jpg',
  ),
  item(
    'Abuelo 4/abuelo4-video.mp4',
    'Recorrido por el departamento — Abuelo 4',
    'Complejo 2',
    'Abuelo 4/abuelo4-interior.jpg',
  ),
  item(
    'Abuelo 5/abuelo5-video.mp4',
    'Recorrido por el departamento — Abuelo 5',
    'Complejo 2',
    'Abuelo 5/abuelo5-interior.jpg',
  ),

]

export const GALLERY_CATS = ['Todas', 'Complejo 1', 'Complejo 2']
