import { useEffect, useState } from 'react'
import PromoCard from '../components/PromoCard.jsx'
import { WhatsAppIcon } from '../components/icons.jsx'
import { listPromosPublicas } from '../lib/promosService.js'
import { waLink } from '../lib/whatsapp.js'

export default function PromocionesPage() {
  const [promos, setPromos] = useState(null)

  useEffect(() => {
    let ok = true
    listPromosPublicas().then((p) => ok && setPromos(p)).catch(() => ok && setPromos([]))
    return () => { ok = false }
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-coral">Ofertas</p>
        <h1 className="font-display text-4xl text-profundo sm:text-5xl">Promociones</h1>
        <p className="mx-auto mt-4 max-w-xl text-texto-soft">
          Aprovechá nuestras ofertas de temporada. Escribinos por WhatsApp para conocer condiciones y reservar.
        </p>
      </div>

      {promos === null ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-96 animate-pulse rounded-3xl bg-arena-dark/40" />
          ))}
        </div>
      ) : promos.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-arena-dark bg-arena-soft/60 px-6 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-turquesa/10 text-turquesa">
            <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
              <circle cx="7" cy="7" r="1.2" fill="currentColor" />
            </svg>
          </span>
          <h2 className="mt-5 font-display text-2xl text-profundo">No hay promociones vigentes</h2>
          <p className="mt-2 max-w-md text-texto-soft">
            En este momento no tenemos ofertas activas. Volvé pronto o consultanos: siempre buscamos la mejor tarifa para tu estadía.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promos.map((p) => <PromoCard key={p.id} promo={p} />)}
        </div>
      )}

      <div className="mt-14 rounded-3xl bg-turquesa p-8 text-center text-white sm:p-10">
        <h2 className="font-display text-2xl">¿No encontrás lo que buscás?</h2>
        <p className="mx-auto mt-2 max-w-lg text-white/85">Contanos las fechas y cuántos son, y vemos qué promo o combo te conviene más.</p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-profundo hover:-translate-y-0.5 transition-transform">
          <WhatsAppIcon className="size-5" /> Escribinos
        </a>
      </div>
    </section>
  )
}
