import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFAB from './components/WhatsAppFAB.jsx'
import HomePage from './pages/HomePage.jsx'
import ComplejoPage from './pages/ComplejoPage.jsx'
import GaleriaPage from './pages/GaleriaPage.jsx'
import PromocionesPage from './pages/PromocionesPage.jsx'
import ContactoPage from './pages/ContactoPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

// Lleva el scroll al tope al navegar entre páginas.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' }), [pathname])
  return null
}

function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
      <span className="text-6xl">🏖️</span>
      <h1 className="mt-4 font-display text-4xl text-profundo">Página no encontrada</h1>
      <p className="mt-2 text-texto-soft">La página que buscás no existe o se mudó de lugar.</p>
      <Link to="/" className="mt-6 rounded-full bg-coral px-6 py-3 font-bold text-white hover:bg-coral-dark">
        Volver al inicio
      </Link>
    </section>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/complejo-1" element={<ComplejoPage numero={1} />} />
          <Route path="/complejo-2" element={<ComplejoPage numero={2} />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/promociones" element={<PromocionesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {!isAdmin && <WhatsAppFAB />}
      <Analytics />
    </div>
  )
}
