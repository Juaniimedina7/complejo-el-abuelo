import { useState } from 'react'
import Lightbox from './Lightbox.jsx'
import { waUnidad } from '../lib/whatsapp.js'
import { WhatsAppIcon } from './icons.jsx'
import { esVideo } from '../data/images.js'

function PlayIcon({ className = 'size-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

// Tarjeta de unidad: imagen + capacidad + descripción + ficha de detalles +
// miniaturas (fotos y video, abren lightbox) + CTA de consulta por WhatsApp.
export default function UnitCard({ unit }) {
  const [lbIndex, setLbIndex] = useState(null)
  // El video (si existe) se suma al final de la galería del lightbox.
  const media = unit.video ? [...unit.gallery, unit.video] : unit.gallery

  return (
    <article id={unit.slug} className="group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl bg-arena-soft shadow-suave ring-1 ring-arena-dark transition-shadow hover:shadow-flotante">
      <div className="relative aspect-[4/3] overflow-hidden">
        <button onClick={() => setLbIndex(0)} className="block size-full" aria-label={`Ver fotos de ${unit.name}`}>
          <img src={unit.img} alt={unit.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-profundo/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-profundo opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            Ver fotos{unit.video ? ' y video' : ''}
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

        {/* Miniaturas + CTA al fondo (mt-auto) para alinear los botones entre cards */}
        <div className="mt-auto pt-5">
          <div className="grid grid-cols-4 gap-2">
          {media.slice(0, 4).map((src, i) => {
            const video = esVideo(src)
            const last = i === 3 && media.length > 4
            return (
              <button
                key={src}
                onClick={() => setLbIndex(i)}
                className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-arena-dark transition-transform hover:scale-[1.03]"
                aria-label={video ? `Ver video de ${unit.name}` : `Foto ${i + 1} de ${unit.name}`}
              >
                {video ? (
                  <span className="grid size-full place-items-center bg-profundo text-white">
                    <PlayIcon className="size-7" />
                  </span>
                ) : (
                  <img src={src} alt="" loading="lazy" className="size-full object-cover" />
                )}
                {last && (
                  <span className="absolute inset-0 grid place-items-center bg-profundo/60 text-sm font-bold text-white">
                    +{media.length - 4}
                  </span>
                )}
                {video && !last && (
                  <span className="absolute bottom-1 left-1 rounded bg-black/50 px-1.5 text-[10px] font-bold text-white">Video</span>
                )}
              </button>
            )
          })}
          </div>

          <a
            href={waUnidad(unit.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-3 font-bold text-white transition-all hover:bg-coral-dark hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="size-5" /> Consultar {unit.name}
          </a>
        </div>
      </div>

      {lbIndex != null && (
        <Lightbox
          images={media}
          alts={media.map((src, i) => (esVideo(src) ? `${unit.name} — video` : `${unit.name} — foto ${i + 1}`))}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex((i) => (i - 1 + media.length) % media.length)}
          onNext={() => setLbIndex((i) => (i + 1) % media.length)}
        />
      )}
    </article>
  )
}
