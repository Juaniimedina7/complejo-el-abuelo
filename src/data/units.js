import { ux, IMG } from './images.js'

// Unidades del complejo. Cada una: nombre, capacidad, descripción, detalles
// (lista tipo "ficha" que genera confianza), imagen principal y galería.
// ⚠️ Textos y fotos son de ejemplo — validar con el cliente.

export const COMPLEJO_1 = {
  numero: 1,
  titulo: 'Complejo 1',
  bajada: 'Dos cabañas íntimas ideales para parejas y familias, con pileta y parque compartido.',
  hero: ux(IMG.cabanas[0], 1600, 900),
  units: [
    {
      slug: 'abuelo-1',
      name: 'Abuelo 1',
      capacity: 4,
      desc: 'Cabaña acogedora para hasta 4 personas, con living-comedor integrado y vista al parque.',
      detalles: [
        '1 dormitorio con cama matrimonial',
        'Sofá cama en el living (2 plazas)',
        'Cocina completa equipada',
        'Baño con ducha y agua caliente',
        'Calefacción y ventilador',
        'Parrilla propia y galería',
      ],
      img: ux(IMG.cabanas[0], 900, 650),
      gallery: [ux(IMG.cabanas[0], 1400, 900), ux(IMG.interiores[0], 1400, 900), ux(IMG.interiores[1], 1400, 900)],
    },
    {
      slug: 'abuelo-2',
      name: 'Abuelo 2',
      capacity: 6,
      desc: 'Cabaña amplia para hasta 6 personas, perfecta para grupos familiares, con deck exterior.',
      detalles: [
        '2 dormitorios (1 matrimonial + 1 con 2 cuchetas)',
        'Cocina completa equipada',
        'Baño amplio con ducha',
        'Calefacción y TV Smart',
        'Deck exterior con parrilla',
        'Estacionamiento junto a la cabaña',
      ],
      img: ux(IMG.cabanas[1], 900, 650),
      gallery: [ux(IMG.cabanas[1], 1400, 900), ux(IMG.interiores[2], 1400, 900), ux(IMG.interiores[3], 1400, 900)],
    },
  ],
}

export const COMPLEJO_2 = {
  numero: 2,
  titulo: 'Complejo 2',
  bajada: 'Tres cabañas con pileta semiolímpica y amplio parque con juegos, ideal para familias grandes.',
  hero: ux(IMG.cabanas[2], 1600, 900),
  units: [
    {
      slug: 'abuelo-3',
      name: 'Abuelo 3',
      capacity: 6,
      desc: 'Cabaña luminosa para hasta 6 personas, con gran ventanal al parque y la pileta.',
      detalles: [
        '2 dormitorios (matrimonial + 4 individuales)',
        'Cocina completa equipada',
        'Baño con ducha y agua caliente',
        'Calefacción y TV Smart',
        'Parrilla y fogón compartido',
        'Estacionamiento',
      ],
      img: ux(IMG.cabanas[2], 900, 650),
      gallery: [ux(IMG.cabanas[2], 1400, 900), ux(IMG.interiores[0], 1400, 900), ux(IMG.pileta[0], 1400, 900)],
    },
    {
      slug: 'abuelo-4',
      name: 'Abuelo 4',
      capacity: 4,
      desc: 'Cabaña cálida para hasta 4 personas, a pasos de la pileta y el sector de juegos.',
      detalles: [
        '1 dormitorio matrimonial',
        'Sofá cama (2 plazas)',
        'Cocina completa equipada',
        'Baño con ducha',
        'Calefacción y ventilador',
        'Parrilla propia',
      ],
      img: ux(IMG.cabanas[3], 900, 650),
      gallery: [ux(IMG.cabanas[3], 1400, 900), ux(IMG.interiores[1], 1400, 900), ux(IMG.entorno[0], 1400, 900)],
    },
    {
      slug: 'abuelo-5',
      name: 'Abuelo 5',
      capacity: 8,
      desc: 'La más amplia del complejo, para hasta 8 personas. Ideal para grupos grandes y familias numerosas.',
      detalles: [
        '3 dormitorios',
        'Cocina completa con comedor amplio',
        '2 baños con ducha',
        'Calefacción y TV Smart',
        'Deck con parrilla y fogón',
        'Estacionamiento para 2 vehículos',
      ],
      img: ux(IMG.interiores[2], 900, 650),
      gallery: [ux(IMG.interiores[2], 1400, 900), ux(IMG.cabanas[0], 1400, 900), ux(IMG.pileta[1], 1400, 900)],
    },
  ],
}

export const COMPLEJOS = { 1: COMPLEJO_1, 2: COMPLEJO_2 }
