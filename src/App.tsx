import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBar } from './components/MobileBar';
import { metaFor } from './content/site';
import { business } from './content/business';
import Home from './pages/Home';
import About from './pages/About';
import ShrimpSeed from './pages/ShrimpSeed';
import Pricing from './pages/Pricing';
import CaaApproval from './pages/CaaApproval';
import Location from './pages/Location';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/** Keeps title, description and canonical in sync on client-side navigation (prerendered HTML already has them). */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const m = metaFor(pathname);
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', business.siteUrl + (m.path === '/' ? '/' : m.path));
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shrimp-seed" element={<ShrimpSeed />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/caa-approval" element={<CaaApproval />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
