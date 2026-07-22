// Helper de imágenes: arma URLs públicas del bucket "images" de Supabase Storage.
// Las fotos reales viven en Supabase (carpetas "Abuelo 1" … "Abuelo 5").
// El bucket es público; esta URL base es pública (no es un secreto).
//
// Uso: img('Abuelo 1/abuelo1-living.jpg') -> URL completa lista para <img src>.
// Sirve también para videos .mp4.

export const STORAGE_BASE =
  'https://gpcgmssibbcbbfowyxlh.supabase.co/storage/v1/object/public/images'

export function img(path) {
  const clean = String(path).replace(/^\/+/, '')
  return `${STORAGE_BASE}/${clean.split('/').map(encodeURIComponent).join('/')}`
}

export const esVideo = (url) => /\.mp4($|\?)/i.test(url || '')
