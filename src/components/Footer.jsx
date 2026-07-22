import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { NAV } from '../data/nav.js'
import { SITE } from '../data/site.js'
import { waLink } from '../lib/whatsapp.js'
import { WhatsAppIcon, InstagramIcon, FacebookIcon, PinIcon, MailIcon } from './icons.jsx'

// Bloque de consulta rápida persistente (patrón de El Capricho): el usuario nunca
// está "lejos" de poder contactar, sin importar en qué sección esté.
function MiniForm() {
  const [nombre, setNombre] = useState('')
  const [tel, setTel] = useState('')
  const [msg, setMsg] = useState('')

  const enviar = (e) => {
    e.preventDefault()
    const texto = `¡Hola! Soy ${nombre || 'un interesado'}${tel ? ` (tel: ${tel})` : ''}. ${
      msg || 'Quiero hacer una consulta sobre el complejo.'
    }`
    window.open(waLink(texto), '_blank', 'noopener')
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-2.5">
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
        className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-turquesa-light focus:outline-none"
      />
      <input
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        placeholder="Teléfono"
        className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-turquesa-light focus:outline-none"
      />
      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Tu consulta"
        rows={2}
        className="resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-turquesa-light focus:outline-none"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-coral-dark"
      >
        <WhatsAppIcon className="size-4" /> Enviar consulta
      </button>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-profundo text-white/80">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{SITE.bajada}</p>
          <div className="mt-5 flex gap-3">
            <a href={SITE.redes.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-coral">
              <InstagramIcon />
            </a>
            <a href={SITE.redes.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-coral">
              <FacebookIcon />
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#25D366]">
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="font-display text-lg text-white">Secciones</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/70 transition-colors hover:text-turquesa-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-display text-lg text-white">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-turquesa-light" />
              <span>{SITE.direccion}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="size-5 shrink-0 text-turquesa-light" />
              <a href={`mailto:${SITE.email}`} className="hover:text-turquesa-light">{SITE.email}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <WhatsAppIcon className="size-5 shrink-0 text-turquesa-light" />
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-turquesa-light">
                Escribinos por WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Consulta rápida */}
        <div>
          <h4 className="font-display text-lg text-white">Consulta rápida</h4>
          <p className="mt-2 mb-4 text-sm text-white/60">Dejanos tus datos y te respondemos por WhatsApp.</p>
          <MiniForm />
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Complejo El Abuelo · {SITE.localidad}, {SITE.provincia}</p>
          <p>Hecho con cariño frente al mar 🌊</p>
        </div>
      </div>
    </footer>
  )
}
