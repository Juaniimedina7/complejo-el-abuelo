import { SITE } from '../data/site.js'

// Arma un link de WhatsApp con un mensaje pre-cargado.
export function waLink(mensaje) {
  const texto = encodeURIComponent(mensaje || '¡Hola! Quiero consultar disponibilidad en Complejo El Abuelo.')
  return `https://wa.me/${SITE.whatsapp}?text=${texto}`
}

// Mensaje para consultar por una unidad puntual.
export function waUnidad(nombreUnidad) {
  return waLink(`¡Hola! Me interesa consultar disponibilidad para ${nombreUnidad} en Complejo El Abuelo.`)
}

// Mensaje armado desde el widget de reservas (fechas + personas + unidad).
export function waReserva({ checkin, checkout, personas, unidad }) {
  const partes = ['¡Hola! Quiero consultar disponibilidad en Complejo El Abuelo.']
  if (unidad && unidad !== 'Cualquiera') partes.push(`Unidad: ${unidad}.`)
  if (checkin) partes.push(`Entrada: ${formatFecha(checkin)}.`)
  if (checkout) partes.push(`Salida: ${formatFecha(checkout)}.`)
  if (personas) partes.push(`Personas: ${personas}.`)
  return waLink(partes.join(' '))
}

function formatFecha(iso) {
  // iso viene como "2026-01-15"; lo mostramos dd/mm/aaaa sin depender de zona horaria.
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
