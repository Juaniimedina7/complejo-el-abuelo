import { createClient } from '@supabase/supabase-js'

// El sitio funciona SIN Supabase: si no hay credenciales, `supabase` queda null
// y la app usa las promociones de ejemplo (seed). Para activar el panel /admin
// y persistir promos reales, completar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
// en un archivo .env (ver .env.example y el README).

// Sanitiza el valor de la variable: quita espacios/saltos de línea y, si por error
// quedó pegado más de una vez (típico al copiar en el dashboard), toma el primero.
// Un valor con "\n" rompe el header de las requests y hace fallar el login/lectura.
const limpiar = (v) => (v || '').trim().split(/\s+/)[0]

const url = limpiar(import.meta.env.VITE_SUPABASE_URL)
const anonKey = limpiar(import.meta.env.VITE_SUPABASE_ANON_KEY)

export const supabaseEnabled = Boolean(url && anonKey)

export const supabase = supabaseEnabled ? createClient(url, anonKey) : null
