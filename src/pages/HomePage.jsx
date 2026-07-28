import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReservationWidget from '../components/ReservationWidget.jsx'
import TestimonialsCarousel from '../components/TestimonialsCarousel.jsx'
import PromoCard from '../components/PromoCard.jsx'
import { WhatsAppIcon, InstagramIcon, PinIcon } from '../components/icons.jsx'
import { SITE } from '../data/site.js'
import { COMPLEJO_1, COMPLEJO_2 } from '../data/units.js'
import { img } from '../data/images.js'
import { waLink } from '../lib/whatsapp.js'
import { listPromosPublicas } from '../lib/promosService.js'

// Fotos de la zona para el carrusel del inicio (bucket images/hero de Supabase).
const HERO_IMAGES = [
  img('hero/camet.jpg'),
  img('hero/frente-complejo1.jpg'),
]

function Hero() {
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_IMAGES.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative isolate overflow-hidden">
      {/* Carrusel de fondo */}
      <div className="absolute inset-0 -z-10">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-profundo/70 via-profundo/40 to-profundo/80" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <p className="animate-rise mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-profundo/45 px-3.5 py-1.5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-suave ring-1 ring-white/15 backdrop-blur-sm" style={{ animationDelay: '0.05s' }}>
          <PinIcon className="size-4 text-turquesa-light" /> {SITE.localidad} · {SITE.zona}
        </p>
        <h1 className="animate-rise max-w-3xl font-display text-5xl font-medium text-white text-balance sm:text-6xl lg:text-7xl" style={{ animationDelay: '0.15s' }}>
          {SITE.slogan}
        </h1>
        <p className="animate-rise mt-5 max-w-xl text-lg text-white/85" style={{ animationDelay: '0.3s' }}>
          {SITE.heroSub}
        </p>

        <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '0.45s' }}>
          <Link to="/complejo-1" className="rounded-full bg-white px-6 py-3 font-bold text-profundo shadow-suave transition-transform hover:-translate-y-0.5">
            Ver las cabañas
          </Link>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-bold text-white shadow-suave transition-transform hover:-translate-y-0.5">
            <WhatsAppIcon className="size-5" /> Reservar ahora
          </a>
        </div>

        {/* Widget de reserva */}
        <div className="animate-rise mt-12 w-full" style={{ animationDelay: '0.6s' }}>
          <p className="mb-3 text-sm font-semibold text-white/80">Consultá la disponibilidad:</p>
          <ReservationWidget variant="dark" />
        </div>
      </div>
    </section>
  )
}

function QuickBar() {
  const items = [
    { label: 'WhatsApp', href: waLink(), icon: <WhatsAppIcon className="size-5" />, external: true },
    { label: 'Ubicación', href: SITE.mapsLink, icon: <PinIcon className="size-5" />, external: true },
    { label: 'Instagram', href: SITE.redes.instagram, icon: <InstagramIcon className="size-5" />, external: true },
  ]
  return (
    <div className="bg-turquesa">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 text-white sm:px-6">
        {items.map((it) => (
          <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-80">
            {it.icon} {it.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function ComplejoTeaser({ complejo, to }) {
  return (
    <Link to={to} className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl shadow-suave sm:aspect-[3/4]">
      <img src={complejo.hero} alt={complejo.titulo} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-profundo/85 via-profundo/20 to-transparent" />
      <div className="relative p-7 text-white">
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">{complejo.units.length} cabañas</span>
        <h3 className="mt-3 font-display text-3xl">{complejo.titulo}</h3>
        <p className="mt-2 max-w-sm text-sm text-white/85">{complejo.bajada}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-turquesa-light">
          Ver detalles
          <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </Link>
  )
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-coral">{eyebrow}</p>}
      <h2 className="font-display text-4xl text-profundo sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-texto-soft">{children}</p>}
    </div>
  )
}

export default function HomePage() {
  const [promos, setPromos] = useState([])
  useEffect(() => {
    let ok = true
    listPromosPublicas().then((p) => ok && setPromos(p.slice(0, 3))).catch(() => {})
    return () => { ok = false }
  }, [])

  return (
    <>
      <Hero />
      <QuickBar />

      {/* Nuestros complejos */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader eyebrow="Dónde quedarte" title="Nuestros complejos">
          Dos espacios pensados para tu descanso, cada uno con su encanto. Elegí el que mejor se adapte a tu grupo.
        </SectionHeader>
        <div className="grid gap-6 sm:grid-cols-2">
          <ComplejoTeaser complejo={COMPLEJO_1} to="/complejo-1" />
          <ComplejoTeaser complejo={COMPLEJO_2} to="/complejo-2" />
        </div>
      </section>

      {/* Promociones */}
      {promos.length > 0 && (
        <section className="bg-arena-dark/30 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader eyebrow="Aprovechá" title="Promociones vigentes">
              Ofertas para que tu escapada rinda más. Consultá condiciones por WhatsApp.
            </SectionHeader>
            <div className="grid gap-6 md:grid-cols-3">
              {promos.map((p) => <PromoCard key={p.id} promo={p} />)}
            </div>
            <div className="mt-10 text-center">
              <Link to="/promociones" className="inline-flex items-center gap-1.5 rounded-full bg-profundo px-6 py-3 font-bold text-white transition-transform hover:-translate-y-0.5">
                Ver todas las promociones
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonios */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader eyebrow="Nos recomiendan" title="Lo que dicen quienes nos visitan" />
        <TestimonialsCarousel />
      </section>

      {/* CTA band */}
      <section className="relative isolate overflow-hidden bg-profundo">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-4xl text-white sm:text-5xl text-balance">¿Listo para tu próxima escapada al mar?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Escribinos y coordinamos tu estadía en {SITE.nombreCompleto}. Te respondemos rápido por WhatsApp.
          </p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-lg font-bold text-white shadow-flotante transition-transform hover:-translate-y-0.5">
            <WhatsAppIcon className="size-6" /> Consultar disponibilidad
          </a>
        </div>
      </section>
    </>
  )
}
