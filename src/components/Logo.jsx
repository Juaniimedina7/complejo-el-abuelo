import { SITE } from '../data/site.js'

// Logo: casita con sol (mismo lenguaje que el favicon) + wordmark.
export default function Logo({ dark = false, compact = false }) {
  const textColor = dark ? 'text-white' : 'text-profundo'
  return (
    <span className="flex items-center gap-2.5 select-none">
      <span
        className={`grid place-items-center rounded-2xl bg-turquesa shadow-suave transition-all ${
          compact ? 'size-9' : 'size-11'
        }`}
      >
        <svg viewBox="0 0 64 64" className={compact ? 'size-6' : 'size-7'} aria-hidden="true">
          <circle cx="46" cy="16" r="6" fill="#f4a17f" />
          <path
            d="M12 36 L32 18 L52 36"
            fill="none"
            stroke="#f5ead8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="20" y="34" width="24" height="16" rx="2" fill="#f5ead8" />
          <rect x="28" y="40" width="8" height="10" fill="#e86f43" />
        </svg>
      </span>
      <span className={`font-display leading-none ${compact ? 'text-lg' : 'text-xl'} ${textColor}`}>
        <span className="font-medium">El </span>
        <span className="font-semibold text-coral">Abuelo</span>
        <span className={`block font-sans font-semibold tracking-widest uppercase ${dark ? 'text-turquesa-light' : 'text-texto-soft'} ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
          {SITE.localidad}
        </span>
      </span>
    </span>
  )
}
