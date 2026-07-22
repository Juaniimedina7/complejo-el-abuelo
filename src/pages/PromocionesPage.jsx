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
        <div className="rounded-3xl bg-arena-soft p-12 text-center shadow-suave ring-1 ring-arena-dark">
          <p className="text-lg text-texto">Por ahora no hay promociones activas.</p>
          <p className="mt-2 text-texto-soft">Escribinos igual y con gusto te armamos la mejor propuesta.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-coral px-5 py-3 font-bold text-white hover:bg-coral-dark">
            <WhatsAppIcon className="size-5" /> Consultar por WhatsApp
          </a>
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
