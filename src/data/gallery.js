import { ux, IMG } from './images.js'

// Galería general. `cat` alimenta el filtro por categoría.
// ⚠️ Fotos placeholder — reemplazar por imágenes reales del complejo.

const item = (id, alt, cat) => ({
  src: ux(id, 800, 600),
  full: ux(id, 1600, 1050),
  alt,
  cat,
})

export const GALLERY = [
  item(IMG.cabanas[0], 'Cabaña Abuelo 1 desde el parque', 'Complejo 1'),
  item(IMG.interiores[0], 'Interior de cabaña con living integrado', 'Complejo 1'),
  item(IMG.interiores[1], 'Dormitorio principal', 'Complejo 1'),
  item(IMG.parrilla[0], 'Parrilla lista para el asado', 'Complejo 1'),
  item(IMG.cabanas[2], 'Cabaña Abuelo 3 junto a la pileta', 'Complejo 2'),
  item(IMG.pileta[0], 'Pileta semiolímpica del Complejo 2', 'Complejo 2'),
  item(IMG.interiores[2], 'Comedor amplio de la cabaña Abuelo 5', 'Complejo 2'),
  item(IMG.pileta[1], 'Reposeras al sol junto a la pileta', 'Complejo 2'),
  item(IMG.playa[0], 'La playa de Chapadmalal', 'Entorno'),
  item(IMG.playa[1], 'Atardecer sobre el mar', 'Entorno'),
  item(IMG.entorno[0], 'Verde y naturaleza alrededor del complejo', 'Entorno'),
  item(IMG.entorno[1], 'Camino de acceso entre árboles', 'Entorno'),
]

export const GALLERY_CATS = ['Todas', 'Complejo 1', 'Complejo 2', 'Entorno']
