import { Link } from 'react-router';
import { MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';
import { Logo } from './Logo';
import { business } from '../content/business';
import { location, mapLinks } from '../content/location';
import { caa } from '../content/caa';
import { navRoutes } from '../content/site';
import { telHref, whatsappHref, defaultWhatsappMessage } from '../lib/links';

export function Footer() {
  return (
    <footer className="bg-ocean-deep pb-24 text-white/80 lg:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo inverse />
          <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-white/70">{business.shortDescription}</p>
          <p className="mt-6 text-sm text-white/60">
            CAA Reg. No. <span className="font-semibold text-white">{caa.registrationNumber}</span>
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Pages</h2>
          <ul className="mt-4 space-y-2.5 text-[0.98rem]">
            {navRoutes.map((r) => (
              <li key={r.path}>
                <Link to={r.path} className="hover:text-white">
                  {r.nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Visit &amp; contact</h2>
          <address className="mt-4 space-y-4 not-italic text-[0.98rem]">
            <a href={mapLinks.view} target="_blank" rel="noopener" className="flex gap-3 hover:text-white">
              <MapPin size={18} className="mt-1 shrink-0 text-white/50" aria-hidden />
              <span>
                {location.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </a>
            {business.phones.map((p) => (
              <a key={p.e164} href={telHref(p.e164)} className="flex items-center gap-3 hover:text-white">
                <Phone size={18} className="shrink-0 text-white/50" aria-hidden />
                {p.display}
              </a>
            ))}
            <a href={whatsappHref(defaultWhatsappMessage)} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-white">
              <MessageCircle size={18} className="shrink-0 text-white/50" aria-hidden />
              WhatsApp enquiry
            </a>
            <a href={mapLinks.directions} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-white">
              <Navigation size={18} className="shrink-0 text-white/50" aria-hidden />
              Get directions
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>Ponnada · U. Kothapalli Mandal · Kakinada District · Andhra Pradesh</p>
        </div>
      </div>
    </footer>
  );
}
