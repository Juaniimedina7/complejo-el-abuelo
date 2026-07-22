import { useState } from 'react'
import { COMPLEJO_1, COMPLEJO_2 } from '../data/units.js'
import { waReserva } from '../lib/whatsapp.js'
import { WhatsAppIcon } from './icons.jsx'

const UNIDADES = [
  'Cualquiera',
  ...COMPLEJO_1.units.map((u) => u.name),
  ...COMPLEJO_2.units.map((u) => u.name),
]

// Widget de "reserva": arma una consulta con fechas + personas + unidad y la
// dispara por WhatsApp (sin motor de reservas ni backend).
export default function ReservationWidget({ variant = 'light', unidadInicial = 'Cualquiera' }) {
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [personas, setPersonas] = useState(2)
  const [unidad, setUnidad] = useState(unidadInicial)

  const consultar = (e) => {
    e.preventDefault()
    window.open(waReserva({ checkin, checkout, personas, unidad }), '_blank', 'noopener')
  }

  const dark = variant === 'dark'
  const labelCls = `mb-1 block text-xs font-bold uppercase tracking-wide ${dark ? 'text-white/70' : 'text-texto-soft'}`
  const fieldCls = `w-full rounded-xl border px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-turquesa/50 ${
    dark
      ? 'border-white/15 bg-white/10 text-white [color-scheme:dark]'
      : 'border-arena-dark bg-white text-texto'
  }`

  return (
    <form
      onSubmit={consultar}
      className={`grid gap-4 rounded-3xl p-5 shadow-flotante sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-3 ${
        dark ? 'bg-white/10 backdrop-blur-md ring-1 ring-white/15' : 'bg-arena-soft ring-1 ring-arena-dark'
      }`}
    >
      <div>
        <label className={labelCls} htmlFor="rw-checkin">Entrada</label>
        <input id="rw-checkin" type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={fieldCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="rw-checkout">Salida</label>
        <input id="rw-checkout" type="date" value={checkout} min={checkin || undefined} onChange={(e) => setCheckout(e.target.value)} className={fieldCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="rw-personas">Personas</label>
        <input id="rw-personas" type="number" min={1} max={12} value={personas} onChange={(e) => setPersonas(e.target.value)} className={fieldCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="rw-unidad">Cabaña</label>
        <select id="rw-unidad" value={unidad} onChange={(e) => setUnidad(e.target.value)} className={fieldCls}>
          {UNIDADES.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-3 font-bold text-white shadow-suave transition-all hover:bg-coral-dark hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1 lg:h-[46px]"
      >
        <WhatsAppIcon className="size-5" /> Consultar
      </button>
    </form>
  )
}
