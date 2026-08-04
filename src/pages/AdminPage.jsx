import { useEffect, useState } from 'react'
import { supabase, supabaseEnabled } from '../lib/supabase.js'
import { listPromosAdmin, crearPromo, actualizarPromo, borrarPromo } from '../lib/promosService.js'
import PromoCard from '../components/PromoCard.jsx'
import { GALLERY } from '../data/gallery.js'
import { esVideo } from '../data/images.js'

// Imágenes para elegir en las promos: las mismas de la galería del sitio (sin videos).
const IMAGENES = GALLERY.filter((g) => !esVideo(g.src))

const PROMO_VACIA = { titulo: '', descripcion: '', badge: 'Oferta', tono: 'coral', vigencia: '', img: '', activa: true }

// ── Aviso cuando Supabase no está configurado ────────────────────────────────
function SetupAviso() {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-arena-soft p-8 shadow-suave ring-1 ring-arena-dark">
      <h1 className="font-display text-3xl text-profundo">Panel de administración</h1>
      <p className="mt-3 text-texto-soft">
        El panel todavía no está conectado a Supabase, así que el sitio muestra las promociones de ejemplo.
      </p>
      <p className="mt-4 font-bold text-texto">Para activarlo:</p>
      <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-texto">
        <li>Crear un proyecto gratuito en <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="font-bold text-turquesa-dark underline">supabase.com</a>.</li>
        <li>Crear la tabla <code className="rounded bg-arena-dark/50 px-1">promociones</code> (ver el SQL en el README).</li>
        <li>Copiar la URL y la anon key del proyecto a un archivo <code className="rounded bg-arena-dark/50 px-1">.env</code>.</li>
        <li>Crear un usuario administrador en Supabase → Authentication.</li>
      </ol>
      <p className="mt-4 text-sm text-texto-soft">Los pasos detallados están en el <code className="rounded bg-arena-dark/50 px-1">README.md</code>.</p>
    </div>
  )
}

// ── Login ─────────────────────────────────────────────────────────────────────
function Login({ onLogged }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    setLoading(false)
    if (error) setError('No pudimos iniciar sesión. Revisá el email y la contraseña.')
    else onLogged()
  }

  const cls = 'w-full rounded-xl border border-arena-dark bg-white px-3.5 py-2.5 text-sm focus:border-turquesa focus:outline-none focus:ring-2 focus:ring-turquesa/30'

  return (
    <div className="mx-auto max-w-sm rounded-3xl bg-arena-soft p-8 shadow-suave ring-1 ring-arena-dark">
      <h1 className="font-display text-2xl text-profundo">Ingresar al panel</h1>
      <p className="mt-1 text-sm text-texto-soft">Acceso exclusivo para administrar promociones.</p>
      <form onSubmit={submit} className="mt-6 grid gap-3">
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={cls} />
        <input type="password" required placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} className={cls} />
        {error && <p className="text-sm font-semibold text-coral-dark">{error}</p>}
        <button disabled={loading} className="rounded-xl bg-coral px-4 py-3 font-bold text-white transition-colors hover:bg-coral-dark disabled:opacity-60">
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

// ── Formulario de promo ─────────────────────────────────────────────────────
function PromoForm({ inicial, onGuardar, onCancelar }) {
  const [p, setP] = useState(inicial)
  const [saving, setSaving] = useState(false)
  const set = (k) => (e) => setP((v) => ({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const cls = 'w-full rounded-xl border border-arena-dark bg-white px-3.5 py-2.5 text-sm focus:border-turquesa focus:outline-none focus:ring-2 focus:ring-turquesa/30'

  const guardar = async (e) => {
    e.preventDefault()
    setSaving(true)
    try { await onGuardar(p) } finally { setSaving(false) }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
    <form onSubmit={guardar} className="grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-arena-dark">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-bold text-texto sm:col-span-2">Título
          <input required value={p.titulo} onChange={set('titulo')} className={`mt-1 ${cls}`} />
        </label>
        <label className="block text-sm font-bold text-texto sm:col-span-2">Descripción
          <textarea required rows={2} value={p.descripcion} onChange={set('descripcion')} className={`mt-1 resize-none ${cls}`} />
        </label>
        <label className="block text-sm font-bold text-texto">Etiqueta (badge)
          <input value={p.badge} onChange={set('badge')} className={`mt-1 ${cls}`} placeholder="Oferta" />
        </label>
        <label className="block text-sm font-bold text-texto">Color de etiqueta
          <select value={p.tono} onChange={set('tono')} className={`mt-1 ${cls}`}>
            <option value="coral">Coral</option>
            <option value="turquesa">Turquesa</option>
          </select>
        </label>
        <label className="block text-sm font-bold text-texto">Vigencia
          <input value={p.vigencia} onChange={set('vigencia')} className={`mt-1 ${cls}`} placeholder="Ej: Abril a noviembre" />
        </label>
        <div className="sm:col-span-2">
          <p className="mb-1 text-sm font-bold text-texto">Imagen de la promo</p>
          <p className="mb-2 text-xs text-texto-soft">Elegí una foto de la galería del sitio.</p>
          <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto rounded-xl border border-arena-dark bg-arena-soft p-2 sm:grid-cols-5">
            <button
              type="button"
              onClick={() => setP((v) => ({ ...v, img: '' }))}
              className={`grid aspect-square place-items-center rounded-lg px-1 text-center text-[11px] font-bold ring-2 transition ${
                !p.img ? 'bg-turquesa/10 text-turquesa-dark ring-turquesa' : 'bg-white text-texto-soft ring-transparent hover:ring-turquesa/40'
              }`}
            >
              Sin imagen
            </button>
            {IMAGENES.map((im) => (
              <button
                type="button"
                key={im.src}
                onClick={() => setP((v) => ({ ...v, img: im.src }))}
                title={im.alt}
                aria-label={`Usar imagen: ${im.alt}`}
                className={`relative aspect-square overflow-hidden rounded-lg ring-2 transition ${
                  p.img === im.src ? 'ring-turquesa' : 'ring-transparent hover:ring-turquesa/40'
                }`}
              >
                <img src={im.src} alt="" loading="lazy" className="size-full object-cover" />
                {p.img === im.src && (
                  <span className="absolute inset-0 grid place-items-center bg-turquesa/30">
                    <svg viewBox="0 0 24 24" className="size-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm font-bold text-texto">
        <input type="checkbox" checked={p.activa} onChange={set('activa')} className="size-4 accent-turquesa" />
        Mostrar en el sitio (activa)
      </label>
      <div className="flex gap-2">
        <button disabled={saving} className="rounded-xl bg-turquesa px-5 py-2.5 font-bold text-white hover:bg-turquesa-dark disabled:opacity-60">
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancelar} className="rounded-xl bg-arena-dark/50 px-5 py-2.5 font-bold text-texto hover:bg-arena-dark">
          Cancelar
        </button>
      </div>
    </form>

      {/* Vista previa en vivo: mismo componente que ve el público */}
      <aside className="lg:sticky lg:top-24">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-texto-soft">Vista previa</p>
        <div className="max-w-sm">
          <PromoCard
            promo={{
              ...p,
              titulo: p.titulo || 'Título de la promo',
              descripcion: p.descripcion || 'Acá va la descripción de la promoción…',
            }}
          />
        </div>
        {!p.activa && (
          <p className="mt-3 rounded-xl bg-arena px-3 py-2 text-xs text-texto-soft">
            Está marcada como oculta: no se mostrará en el sitio hasta activarla.
          </p>
        )}
      </aside>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [promos, setPromos] = useState([])
  const [editing, setEditing] = useState(null) // objeto promo o 'nueva'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const recargar = async () => {
    try { setPromos(await listPromosAdmin()) } catch (e) { setError(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { recargar() }, [])

  const guardar = async (p) => {
    setError('')
    try {
      if (p.id) {
        const { id, created_at, ...cambios } = p
        await actualizarPromo(id, cambios)
      } else {
        await crearPromo(p)
      }
      setEditing(null)
      await recargar()
    } catch (e) { setError(e.message) }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta promoción?')) return
    try { await borrarPromo(id); await recargar() } catch (e) { setError(e.message) }
  }

  const toggle = async (p) => {
    try { await actualizarPromo(p.id, { activa: !p.activa }); await recargar() } catch (e) { setError(e.message) }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-profundo">Promociones</h1>
          <p className="text-sm text-texto-soft">Creá, editá y activá las promos que se ven en el sitio.</p>
        </div>
        <button onClick={onLogout} className="rounded-xl bg-arena-dark/50 px-4 py-2 text-sm font-bold text-texto hover:bg-arena-dark">
          Salir
        </button>
      </div>

      {error && <p className="mt-4 rounded-xl bg-coral/15 px-4 py-3 text-sm font-semibold text-coral-dark">{error}</p>}

      <div className="mt-6">
        {editing ? (
          <PromoForm
            inicial={editing === 'nueva' ? PROMO_VACIA : editing}
            onGuardar={guardar}
            onCancelar={() => setEditing(null)}
          />
        ) : (
          <button onClick={() => setEditing('nueva')} className="rounded-xl bg-coral px-5 py-3 font-bold text-white hover:bg-coral-dark">
            + Nueva promoción
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-3">
        {loading ? (
          <p className="text-texto-soft">Cargando…</p>
        ) : promos.length === 0 ? (
          <p className="rounded-xl bg-arena-soft px-4 py-6 text-center text-texto-soft ring-1 ring-arena-dark">Todavía no hay promociones. Creá la primera.</p>
        ) : (
          promos.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-arena-dark">
              {p.img && <img src={p.img} alt="" className="size-16 shrink-0 rounded-xl object-cover" />}
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-profundo">{p.titulo}</p>
                <p className="truncate text-sm text-texto-soft">{p.descripcion}</p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold text-white ${p.activa ? 'bg-turquesa' : 'bg-texto-soft'}`}>
                  {p.activa ? 'Activa' : 'Oculta'}
                </span>
              </div>
              <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row">
                <button onClick={() => toggle(p)} className="rounded-lg bg-arena-dark/40 px-3 py-1.5 text-xs font-bold text-texto hover:bg-arena-dark">
                  {p.activa ? 'Ocultar' : 'Activar'}
                </button>
                <button onClick={() => setEditing(p)} className="rounded-lg bg-turquesa/15 px-3 py-1.5 text-xs font-bold text-turquesa-dark hover:bg-turquesa/25">
                  Editar
                </button>
                <button onClick={() => eliminar(p.id)} className="rounded-lg bg-coral/15 px-3 py-1.5 text-xs font-bold text-coral-dark hover:bg-coral/25">
                  Borrar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!supabaseEnabled) { setReady(true); return }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  const logout = async () => { await supabase.auth.signOut(); setSession(null) }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {!supabaseEnabled ? (
        <SetupAviso />
      ) : !ready ? (
        <p className="text-center text-texto-soft">Cargando…</p>
      ) : !session ? (
        <Login onLogged={() => {}} />
      ) : (
        <Dashboard onLogout={logout} />
      )}
    </section>
  )
}
