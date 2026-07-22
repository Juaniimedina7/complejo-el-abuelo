import { useCallback, useEffect } from 'react'

// Lightbox compartido con navegación por flechas y teclado.
// Props: images (string[]), alts (string[]), index, onClose, onPrev, onNext.
export default function Lightbox({ images, alts = [], index, onClose, onPrev, onNext }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (index == null) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-profundo/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Anterior"
            className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Siguiente"
            className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </>
      )}

      <figure className="mx-4 max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[index]}
          alt={alts[index] || ''}
          className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-flotante"
        />
        <figcaption className="mt-3 text-center text-sm text-white/70">
          {alts[index] ? `${alts[index]} · ` : ''}
          {index + 1} / {images.length}
        </figcaption>
      </figure>
    </div>
  )
}
