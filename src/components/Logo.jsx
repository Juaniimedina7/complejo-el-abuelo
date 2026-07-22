// Logo del Complejo El Abuelo — según la marca del cliente:
// techo con chimenea (+ número opcional para el logo secundario 1/2) y
// wordmark "Complejo El Abuelo" con tipografía script (font-script).
export default function Logo({ dark = false, compact = false, numero }) {
  const textColor = dark ? 'text-white' : 'text-profundo'
  const roofColor = dark ? '#67b0bf' : '#006f95'
  return (
    <span className="flex items-center gap-2.5 select-none">
      <span className={`relative shrink-0 ${compact ? 'w-10' : 'w-12'}`}>
        <svg viewBox="0 0 64 42" className="w-full" fill="none" aria-hidden="true">
          {/* techo */}
          <path d="M6 30 L32 8 L58 30" stroke={roofColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* chimenea */}
          <rect x="46" y="12" width="6" height="9" rx="1" fill="#f26e50" />
          {numero != null && (
            <text x="49" y="19.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff" fontFamily="Nunito, sans-serif">
              {numero}
            </text>
          )}
        </svg>
      </span>
      <span className={`leading-none ${textColor}`}>
        <span className={`block font-sans font-bold uppercase tracking-[0.25em] ${dark ? 'text-turquesa-light' : 'text-texto-soft'} ${compact ? 'text-[8px]' : 'text-[9px]'}`}>
          Complejo
        </span>
        <span className={`block font-script ${compact ? 'text-xl' : 'text-2xl'} text-coral`}>
          El Abuelo
        </span>
      </span>
    </span>
  )
}
