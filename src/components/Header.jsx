import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { NAV } from '../data/nav.js'
import { waLink } from '../lib/whatsapp.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cerrar el menú mobile al cambiar de página.
  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-arena-soft/85 backdrop-blur-md shadow-suave'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="Inicio — Complejo El Abuelo">
          <Logo compact={scrolled} />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-turquesa text-white shadow-suave'
                    : 'text-texto hover:bg-turquesa/10 hover:text-turquesa-dark'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-white shadow-suave transition-all hover:bg-coral-dark hover:-translate-y-0.5 active:translate-y-0 sm:inline-block"
          >
            Reservar
          </a>

          {/* Hamburguesa mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-full bg-white/70 text-profundo lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Dropdown mobile */}
      <div
        className={`overflow-hidden bg-arena-soft/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-96 shadow-suave' : 'max-h-0'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 font-semibold transition-colors ${
                  isActive ? 'bg-turquesa text-white' : 'text-texto hover:bg-turquesa/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 rounded-xl bg-coral px-4 py-3 text-center font-bold text-white"
          >
            Reservar por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
