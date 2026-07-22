import { waLink } from '../lib/whatsapp.js'
import { WhatsAppIcon } from './icons.jsx'

// Botón flotante de WhatsApp, presente en todas las páginas.
export default function WhatsAppFAB() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-flotante transition-transform hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="size-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[10rem] group-hover:pr-1">
        Escribinos
      </span>
    </a>
  )
}
