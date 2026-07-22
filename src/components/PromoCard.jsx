import { waLink } from '../lib/whatsapp.js'
import { WhatsAppIcon } from './icons.jsx'

// Tarjeta de promoción. `tono` define el color del badge ('coral' | 'turquesa').
export default function PromoCard({ promo }) {
  const badgeCls = promo.tono === 'turquesa' ? 'bg-turquesa' : 'bg-coral'
  const mensaje = `¡Hola! Me interesa la promo "${promo.titulo}" del Complejo El Abuelo. ¿Me pasan más info?`

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-arena-soft shadow-suave ring-1 ring-arena-dark transition-shadow hover:shadow-flotante">
      <div className="relative aspect-[16/10] overflow-hidden">
        {promo.img ? (
          <img src={promo.img} alt={promo.titulo} loading="lazy" className="size-full object-cover" />
        ) : (
          <div className="size-full bg-gradient-to-br from-turquesa to-profundo" />
        )}
        {promo.badge && (
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-suave ${badgeCls}`}>
            {promo.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-profundo">{promo.titulo}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-texto-soft">{promo.descripcion}</p>
        {promo.vigencia && (
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-turquesa-dark">
            Vigencia: {promo.vigencia}
          </p>
        )}
        <a
          href={waLink(mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-3 font-bold text-white transition-all hover:bg-coral-dark hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="size-5" /> Quiero esta promo
        </a>
      </div>
    </article>
  )
}
