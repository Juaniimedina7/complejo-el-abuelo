// Bloque de servicios: lista de lo que ofrece el complejo (título "Servicios").
function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-turquesa" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function ServicesBlock({ servicios }) {
  return (
    <div className="rounded-3xl bg-arena-soft p-6 shadow-suave ring-1 ring-arena-dark sm:p-8">
      <h3 className="mb-5 font-display text-xl text-profundo">Servicios</h3>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {servicios.incluye.map((s) => (
          <li key={s} className="flex items-start gap-2.5 text-sm font-semibold text-texto">
            <Check /> {s}
          </li>
        ))}
      </ul>
    </div>
  )
}
