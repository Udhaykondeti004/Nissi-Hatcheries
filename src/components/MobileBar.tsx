import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { business } from '../content/business';
import { mapLinks } from '../content/location';
import { telHref, whatsappHref, defaultWhatsappMessage } from '../lib/links';

/** Fixed action bar on phones: call, WhatsApp, directions. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white text-[0.82rem] font-semibold lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <a href={telHref(business.phones[0].e164)} className="flex flex-col items-center gap-1 py-2.5 text-ocean-deep">
        <Phone size={20} aria-hidden /> Call
      </a>
      <a href={whatsappHref(defaultWhatsappMessage)} target="_blank" rel="noopener" className="flex flex-col items-center gap-1 border-x border-line py-2.5 text-whatsapp">
        <MessageCircle size={20} aria-hidden /> WhatsApp
      </a>
      <a href={mapLinks.directions} target="_blank" rel="noopener" className="flex flex-col items-center gap-1 py-2.5 text-ocean-deep">
        <Navigation size={20} aria-hidden /> Directions
      </a>
    </div>
  );
}
