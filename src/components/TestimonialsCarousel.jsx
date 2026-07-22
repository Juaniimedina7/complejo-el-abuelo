import { useEffect, useRef, useState } from 'react'
import { TESTIMONIALS } from '../data/testimonials.js'

function Stars({ n }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`size-4 ${i < n ? 'text-coral' : 'text-arena-dark'}`} fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsCarousel() {
  const [i, setI] = useState(0)
  const timer = useRef(null)

  const reset = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000)
  }

  useEffect(() => {
    reset()
    return () => timer.current && clearInterval(timer.current)
  }, [])

  const t = TESTIMONIALS[i]

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="relative rounded-3xl bg-arena-soft p-8 shadow-suave ring-1 ring-arena-dark sm:p-10">
        <span className="pointer-events-none absolute left-6 top-2 font-display text-7xl text-turquesa/20">“</span>
        <Stars n={t.rating} />
        <p className="mt-4 min-h-[6rem] text-lg leading-relaxed text-texto text-balance">{t.text}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-turquesa font-bold text-white">{t.initials}</span>
          <div className="text-left">
            <p className="font-bold text-profundo">{t.name}</p>
            <p className="text-xs text-texto-soft">{t.date}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setI(idx); reset() }}
            aria-label={`Testimonio ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? 'w-7 bg-coral' : 'w-2 bg-arena-dark hover:bg-turquesa/50'}`}
          />
        ))}
      </div>
    </div>
  )
}
