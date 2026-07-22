import { createClient } from '@supabase/supabase-js'

// El sitio funciona SIN Supabase: si no hay credenciales, `supabase` queda null
// y la app usa las promociones de ejemplo (seed). Para activar el panel /admin
// y persistir promos reales, completar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
// en un archivo .env (ver .env.example y el README).

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseEnabled = Boolean(url && anonKey)

export const supabase = supabaseEnabled ? createClient(url, anonKey) : null
