import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UnitCard from '../components/UnitCard.jsx'
import ServicesBlock from '../components/ServicesBlock.jsx'
import { COMPLEJOS } from '../data/units.js'
import { SERVICIOS } from '../data/services.js'

// Página de complejo, reutilizable para el 1 y el 2 (via prop `numero`).
export default function ComplejoPage({ numero }) {
  const complejo = COMPLEJOS[numero]
  const servicios = SERVICIOS[numero]
  const otro = numero === 1 ? 2 : 1

  // Scroll al top al cambiar de complejo.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [numero])

  return (
    <>
      {/* Banner */}
      <section className="relative isolate flex min-h-[46vh] items-end overflow-hidden">
        <img src={complejo.hero} alt={complejo.titulo} className="absolute inset-0 -z-10 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-profundo/85 via-profundo/40 to-profundo/30" />
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-turquesa-light">Complejo El Abuelo</p>
          <h1 className="mt-2 font-display text-5xl text-white sm:text-6xl">{complejo.titulo}</h1>
          <p className="mt-3 max-w-xl text-lg text-white/85">{complejo.bajada}</p>
        </div>
      </section>

      {/* Servicios */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="mb-6 font-display text-3xl text-profundo">Servicios del {complejo.titulo}</h2>
        <ServicesBlock servicios={servicios} />
      </section>

      {/* Unidades */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="mb-8 font-display text-3xl text-profundo">Cabañas disponibles</h2>
        <div className={`grid gap-8 ${complejo.units.length >= 3 ? 'lg:grid-cols-3 md:grid-cols-2' : 'md:grid-cols-2'}`}>
          {complejo.units.map((unit) => (
            <UnitCard key={unit.slug} unit={unit} />
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-turquesa/10 p-8 text-center ring-1 ring-turquesa/20">
          <p className="text-texto">¿Querés conocer el otro complejo?</p>
          <Link to={`/complejo-${otro}`} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-profundo px-6 py-3 font-bold text-white transition-transform hover:-translate-y-0.5">
            Ver Complejo {otro}
          </Link>
        </div>
      </section>
    </>
  )
}
