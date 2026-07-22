import { img } from './images.js'

// Unidades del complejo — datos y fotos reales (Supabase Storage, bucket "images").
// Cada unidad: nombre, capacidad, descripción, detalles (ficha), imagen principal,
// galería (fotos) y, si corresponde, un video.

export const COMPLEJO_1 = {
  numero: 1,
  titulo: 'Complejo 1',
  direccion: 'Calle Quintana 722 e/ Richieri y Arbolito',
  bajada:
    'Dos cabañas completamente equipadas para 5 personas, con parque cercado y pileta con climatización solar. A dos cuadras del mar.',
  hero: img('Abuelo 1/Interior El Abuelo 1.jpg'),
  units: [
    {
      slug: 'abuelo-1',
      name: 'Abuelo 1',
      capacity: 5,
      desc: 'Cabaña de dos plantas muy cómoda para 5 personas, con terraza y excelente vista.',
      detalles: [
        '2 dormitorios con salida a terraza',
        '2 baños (uno con hidromasaje)',
        'Living comedor',
        'Cocina con vajilla completa (heladera con freezer, microondas, juguera, cafetera, tostadora)',
        'Terraza con excelente vista',
        'Garaje cubierto',
        'Parrilla techada',
        'Calefacción con salamandra Tromen y placas en las habitaciones',
        'Secador de pelo y amenities',
        'Ducha exterior',
      ],
      img: img('Abuelo 1/Interior El Abuelo 1.jpg'),
      gallery: [
        img('Abuelo 1/abuelo1-living.jpg'),
        img('Abuelo 1/abuelo1-cama-doble.jpg'),
        img('Abuelo 1/abuelo1-camas-simples.jpg'),
        img('Abuelo 1/abuelo1-banio.jpg'),
        img('Abuelo 1/parrila el Abuelo 1.jpg'),
        img('Abuelo 1/Interior El Abuelo 1.jpg'),
      ],
    },
    {
      slug: 'abuelo-2',
      name: 'Abuelo 2',
      capacity: 5,
      desc: 'Cómoda para 5 personas, con un dormitorio en planta baja y balcón con excelente vista.',
      detalles: [
        '2 dormitorios (uno en planta baja)',
        'Amplio baño con secador de pelo',
        'Living comedor',
        'Cocina con vajilla completa (heladera con freezer, microondas, juguera, cafetera, tostadora)',
        'Balcón con excelente vista',
        'Parrilla',
        'Calefacción con salamandra Tromen y placas en las habitaciones',
        'Ducha exterior',
      ],
      img: img('Abuelo 2/abuelo2-interior.jpg'),
      gallery: [
        img('Abuelo 2/abuelo2-interior.jpg'),
        img('Abuelo 2/abuelo2-cama-doble.jpg'),
        img('Abuelo 2/abuelo2-camas-simples.jpg'),
        img('Abuelo 2/abuelo2-cocina.jpg'),
      ],
    },
  ],
}

// Los tres departamentos del Complejo 2 comparten equipamiento (2/3 personas, A/C).
const detallesDepto = [
  '1 dormitorio con somier hotelero',
  'Sofá cama en el comedor',
  '1 baño completo',
  'Cocina comedor con vajilla completa (heladera con freezer, microondas, juguera, cafetera, tostadora)',
  'Aire acondicionado en el comedor',
  'Mesas y sillas exteriores',
  'Ducha exterior',
]

export const COMPLEJO_2 = {
  numero: 2,
  titulo: 'Complejo 2',
  direccion: 'Calle Quintana 706 esquina Richieri',
  bajada:
    'Tres departamentos completamente equipados para 2 o 3 personas, con aire acondicionado y parque compartido. A dos cuadras del mar.',
  hero: img('Abuelo 3/abuelo3-interior.jpg'),
  units: [
    {
      slug: 'abuelo-3',
      name: 'Abuelo 3',
      capacity: 3,
      desc: 'Departamento cómodo para 2 o 3 personas, con aire acondicionado y todo lo necesario para tu estadía.',
      detalles: detallesDepto,
      img: img('Abuelo 3/abuelo3-interior.jpg'),
      gallery: [
        img('Abuelo 3/abuelo3-interior.jpg'),
        img('Abuelo 3/abuelo3-interior2.jpg'),
        img('Abuelo 3/abuelo3-cama-doble.jpg'),
        img('Abuelo 3/abuelo3-banio.jpg'),
      ],
      video: img('Abuelo 3/abuelo3-video.mp4'),
    },
    {
      slug: 'abuelo-4',
      name: 'Abuelo 4',
      capacity: 3,
      desc: 'Departamento luminoso para 2 o 3 personas, con aire acondicionado y comodidad para descansar.',
      detalles: detallesDepto,
      img: img('Abuelo 4/abuelo4-interior.jpg'),
      gallery: [
        img('Abuelo 4/abuelo4-interior.jpg'),
        img('Abuelo 4/abuelo4-interior2.jpg'),
        img('Abuelo 4/abuelo4-interior3.jpg'),
        img('Abuelo 4/abuelo4-cama-doble.jpg'),
        img('Abuelo 4/abuelo4-banio.jpg'),
      ],
      video: img('Abuelo 4/abuelo4-video.mp4'),
    },
    {
      slug: 'abuelo-5',
      name: 'Abuelo 5',
      capacity: 3,
      desc: 'Departamento equipado para 2 o 3 personas, con cocina comedor y aire acondicionado.',
      detalles: detallesDepto,
      img: img('Abuelo 5/abuelo5-interior.jpg'),
      gallery: [
        img('Abuelo 5/abuelo5-interior.jpg'),
        img('Abuelo 5/abuelo5-cocina.jpg'),
        img('Abuelo 5/abuelo5-cama-doble.jpg'),
        img('Abuelo 5/abuelo5-banio.jpg'),
      ],
      video: img('Abuelo 5/abuelo5-video.mp4'),
    },
  ],
}

export const COMPLEJOS = { 1: COMPLEJO_1, 2: COMPLEJO_2 }
