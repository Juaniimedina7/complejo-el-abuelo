import { useMemo, useState } from 'react'
import Lightbox from '../components/Lightbox.jsx'
import { GALLERY, GALLERY_CATS } from '../data/gallery.js'
import { esVideo } from '../data/images.js'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 size-7" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function GaleriaPage() {
  const [cat, setCat] = useState('Todas')
  const [index, setIndex] = useState(null)

  const items = useMemo(
    () => (cat === 'Todas' ? GALLERY : GALLERY.filter((g) => g.cat === cat)),
    [cat],
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-coral">Galería</p>
        <h1 className="font-display text-4xl text-profundo sm:text-5xl">Mirá cada rincón</h1>
        <p className="mx-auto mt-4 max-w-xl text-texto-soft">
          Recorré las cabañas, la pileta y el entorno de Santa Clara del Mar. Hacé clic en cualquier foto para verla en grande.
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {GALLERY_CATS.map((c) => (
          <button
            key={c}
            onClick={() => { setCat(c); setIndex(null) }}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              cat === c ? 'bg-turquesa text-white shadow-suave' : 'bg-arena-soft text-texto ring-1 ring-arena-dark hover:bg-turquesa/10'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((g, i) => {
          const video = esVideo(g.src)

          return (
            <button
              key={g.src}
              onClick={() => setIndex(i)}
              aria-label={video ? `Reproducir ${g.alt}` : `Ver ${g.alt}`}
              className="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-arena-dark"
            >
              <img
                src={video ? g.poster : g.src}
                alt={video ? '' : g.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {video && (
                <>
                  <span className="absolute inset-0 bg-profundo/25 transition-colors group-hover:bg-profundo/40" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid size-16 place-items-center rounded-full bg-white/90 text-turquesa shadow-flotante transition-transform group-hover:scale-110">
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-profundo/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    Video
                  </span>
                </>
              )}

              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-profundo/70 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-left text-xs font-semibold text-white">{g.alt}</span>
              </span>
            </button>
          )
        })}
      </div>

      {index != null && (
        <Lightbox
          images={items.map((g) => g.full)}
          alts={items.map((g) => g.alt)}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          onNext={() => setIndex((i) => (i + 1) % items.length)}
        />
      )}
    </section>
  )
}
