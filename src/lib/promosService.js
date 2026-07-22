import { supabase, supabaseEnabled } from './supabase.js'
import { PROMOS_SEED } from '../data/promos.js'

// Capa de acceso a promociones.
// - Sin Supabase: devuelve las promos de ejemplo (seed).
// - Con Supabase: lee/escribe en la tabla `promociones`.
//
// Estructura esperada de la tabla `promociones` (ver README para el SQL):
//   id (uuid, pk)  titulo (text)  descripcion (text)  badge (text)
//   tono (text: 'coral' | 'turquesa')  vigencia (text)  img (text)
//   activa (bool)  created_at (timestamptz)

// Lista las promos para el sitio público (solo activas).
export async function listPromosPublicas() {
  if (!supabaseEnabled) {
    return PROMOS_SEED.filter((p) => p.activa)
  }
  const { data, error } = await supabase
    .from('promociones')
    .select('*')
    .eq('activa', true)
    .order('created_at', { ascending: false })
  if (error) {
    console.warn('No se pudieron leer promos de Supabase, uso seed:', error.message)
    return PROMOS_SEED.filter((p) => p.activa)
  }
  return data
}

// Lista TODAS las promos (para el panel admin).
export async function listPromosAdmin() {
  if (!supabaseEnabled) return PROMOS_SEED
  const { data, error } = await supabase
    .from('promociones')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function crearPromo(promo) {
  const { data, error } = await supabase.from('promociones').insert(promo).select().single()
  if (error) throw error
  return data
}

export async function actualizarPromo(id, cambios) {
  const { data, error } = await supabase
    .from('promociones')
    .update(cambios)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function borrarPromo(id) {
  const { error } = await supabase.from('promociones').delete().eq('id', id)
  if (error) throw error
}
