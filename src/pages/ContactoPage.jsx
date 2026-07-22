import { useState } from 'react'
import { SITE } from '../data/site.js'
import { COMPLEJO_1, COMPLEJO_2 } from '../data/units.js'
import { waLink } from '../lib/whatsapp.js'
import { WhatsAppIcon, InstagramIcon, FacebookIcon, PinIcon, MailIcon } from '../components/icons.jsx'

const UNIDADES = ['Cualquiera', ...COMPLEJO_1.units.map((u) => u.name), ...COMPLEJO_2.units.map((u) => u.name)]

function Field({ label, children, required }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-bold text-texto">
        {label} {required && <span className="text-coral">*</span>}
      </span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-arena-dark bg-white px-3.5 py-2.5 text-sm text-texto focus:border-turquesa focus:outline-none focus:ring-2 focus:ring-turquesa/30'

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: '', telefono: '', email: '', checkin: '', checkout: '', personas: 2, unidad: 'Cualquiera', mensaje: '',
  })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const fmt = (iso) => (iso ? iso.split('-').reverse().join('/') : '—')

  const enviar = (e) => {
    e.preventDefault()
    const texto = [
      `¡Hola! Soy ${form.nombre}. Quiero consultar disponibilidad en Complejo El Abuelo.`,
      form.unidad !== 'Cualquiera' ? `Cabaña de interés: ${form.unidad}.` : '',
      `Fechas: ${fmt(form.checkin)} a ${fmt(form.checkout)}.`,
      `Personas: ${form.personas}.`,
      form.telefono ? `Mi teléfono: ${form.telefono}.` : '',
      form.email ? `Mi email: ${form.email}.` : '',
      form.mensaje ? `Comentario: ${form.mensaje}` : '',
    ].filter(Boolean).join(' ')
    window.open(waLink(texto), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-coral">Contacto</p>
        <h1 className="font-display text-4xl text-profundo sm:text-5xl">Reservá tu estadía</h1>
        <p className="mx-auto mt-4 max-w-xl text-texto-soft">
          Completá tus datos y te respondemos por WhatsApp con disponibilidad y precios. También podés escribirnos directo.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Formulario */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-arena-soft p-10 text-center shadow-suave ring-1 ring-arena-dark">
              <span className="text-5xl">🌊</span>
              <h2 className="mt-4 font-display text-2xl text-profundo">¡Gracias, {form.nombre || 'crack'}!</h2>
              <p className="mt-2 max-w-sm text-texto-soft">
                Abrimos WhatsApp con tu consulta cargada. Si no se abrió, escribinos directamente y coordinamos todo.
              </p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-2 rounded-xl bg-coral px-5 py-3 font-bold text-white hover:bg-coral-dark">
                <WhatsAppIcon className="size-5" /> Abrir WhatsApp
              </a>
              <button onClick={() => setSent(false)} className="mt-3 text-sm font-semibold text-turquesa-dark underline">
                Volver al formulario
              </button>
            </div>
          ) : (
            <form onSubmit={enviar} className="grid gap-4 rounded-3xl bg-arena-soft p-6 shadow-suave ring-1 ring-arena-dark sm:p-8 sm:grid-cols-2">
              <Field label="Nombre" required>
                <input required value={form.nombre} onChange={set('nombre')} className={inputCls} placeholder="Tu nombre" />
              </Field>
              <Field label="Teléfono" required>
                <input required value={form.telefono} onChange={set('telefono')} className={inputCls} placeholder="Cód. área + número" />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="tucorreo@mail.com" />
              </Field>
              <Field label="Cabaña de interés">
                <select value={form.unidad} onChange={set('unidad')} className={inputCls}>
                  {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </Field>
              <Field label="Entrada">
                <input type="date" value={form.checkin} onChange={set('checkin')} className={inputCls} />
              </Field>
              <Field label="Salida">
                <input type="date" value={form.checkout} min={form.checkin || undefined} onChange={set('checkout')} className={inputCls} />
              </Field>
              <Field label="Personas">
                <input type="number" min={1} max={12} value={form.personas} onChange={set('personas')} className={inputCls} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Comentario">
                  <textarea rows={3} value={form.mensaje} onChange={set('mensaje')} className={`${inputCls} resize-none`} placeholder="Contanos qué estás buscando..." />
                </Field>
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-coral px-5 py-3.5 font-bold text-white transition-all hover:bg-coral-dark hover:-translate-y-0.5 sm:col-span-2">
                <WhatsAppIcon className="size-5" /> Enviar consulta por WhatsApp
              </button>
            </form>
          )}
        </div>

        {/* Datos + mapa */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-3xl bg-profundo p-6 text-white/85">
            <h3 className="font-display text-xl text-white">Datos de contacto</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5"><PinIcon className="mt-0.5 size-5 shrink-0 text-turquesa-light" /> {SITE.direccion}</li>
              <li className="flex items-center gap-2.5"><MailIcon className="size-5 shrink-0 text-turquesa-light" /> <a href={`mailto:${SITE.email}`} className="hover:text-turquesa-light">{SITE.email}</a></li>
              <li className="flex items-center gap-2.5"><WhatsAppIcon className="size-5 shrink-0 text-turquesa-light" /> <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-turquesa-light">WhatsApp directo</a></li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href={SITE.redes.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-coral"><InstagramIcon /></a>
              <a href={SITE.redes.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-coral"><FacebookIcon /></a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-suave ring-1 ring-arena-dark">
            <iframe
              title="Ubicación del Complejo El Abuelo en Chapadmalal"
              src={SITE.mapsEmbed}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="block bg-arena-soft px-4 py-3 text-center text-sm font-bold text-turquesa-dark hover:underline">
              Ver en Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
