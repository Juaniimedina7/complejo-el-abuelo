// Bloque de servicios en dos columnas: "Incluye" (check verde) / "No incluye" (equis gris).
function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-turquesa" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
function Cross() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-texto-soft/50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export default function ServicesBlock({ servicios }) {
  return (
    <div className="grid gap-6 rounded-3xl bg-arena-soft p-6 shadow-suave ring-1 ring-arena-dark sm:grid-cols-2 sm:p-8">
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl text-profundo">Incluye</h3>
        <ul className="space-y-2.5">
          {servicios.incluye.map((s) => (
            <li key={s} className="flex items-start gap-2.5 text-sm font-semibold text-texto">
              <Check /> {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="sm:border-l sm:border-arena-dark sm:pl-6">
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl text-texto-soft">No incluye</h3>
        <ul className="space-y-2.5">
          {servicios.noIncluye.map((s) => (
            <li key={s} className="flex items-start gap-2.5 text-sm font-medium text-texto-soft">
              <Cross /> {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
