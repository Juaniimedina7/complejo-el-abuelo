import { useState } from 'react'
import Lightbox from './Lightbox.jsx'
import { waUnidad } from '../lib/whatsapp.js'
import { WhatsAppIcon } from './icons.jsx'

// Tarjeta de unidad: imagen + capacidad + descripción + ficha de detalles +
// miniaturas (abren lightbox) + CTA de consulta por WhatsApp.
export default function UnitCard({ unit }) {
  const [lbIndex, setLbIndex] = useState(null)

  return (
    <article id={unit.slug} className="group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl bg-arena-soft shadow-suave ring-1 ring-arena-dark transition-shadow hover:shadow-flotante">
      <div className="relative aspect-[4/3] overflow-hidden">
        <button onClick={() => setLbIndex(0)} className="block size-full" aria-label={`Ver fotos de ${unit.name}`}>
          <img src={unit.img} alt={unit.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-profundo/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-profundo opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            Ver fotos
          </span>
        </button>
        <span className="absolute right-3 top-3 rounded-full bg-turquesa px-3 py-1 text-xs font-bold text-white shadow-suave">
          Hasta {unit.capacity} personas
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-profundo">{unit.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-texto-soft">{unit.desc}</p>

        <ul className="mt-4 grid gap-1.5">
          {unit.detalles.map((d) => (
            <li key={d} className="flex items-start gap-2 text-sm text-texto">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-coral" />
              {d}
            </li>
          ))}
        </ul>

        {/* Miniaturas */}
        <div className="mt-5 flex gap-2">
          {unit.gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setLbIndex(i)}
              className="relative aspect-square w-1/3 overflow-hidden rounded-xl ring-1 ring-arena-dark transition-transform hover:scale-[1.03]"
              aria-label={`Foto ${i + 1} de ${unit.name}`}
            >
              <img src={src} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>

        <a
          href={waUnidad(unit.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-3 font-bold text-white transition-all hover:bg-coral-dark hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="size-5" /> Consultar {unit.name}
        </a>
      </div>

      {lbIndex != null && (
        <Lightbox
          images={unit.gallery}
          alts={unit.gallery.map((_, i) => `${unit.name} — foto ${i + 1}`)}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex((i) => (i - 1 + unit.gallery.length) % unit.gallery.length)}
          onNext={() => setLbIndex((i) => (i + 1) % unit.gallery.length)}
        />
      )}
    </article>
  )
}
