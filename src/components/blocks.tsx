import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight, MessageCircle, Phone, Navigation, ExternalLink } from 'lucide-react';
import { Img } from './Img';
import { business } from '../content/business';
import { location, mapLinks } from '../content/location';
import { caa, caaIsCurrent } from '../content/caa';
import { products, productOrder } from '../content/products';
import { noPriceText } from '../content/prices';
import { usePrices } from '../lib/usePrices';
import { telHref, whatsappHref, defaultWhatsappMessage } from '../lib/links';

export function PageHeader({ eyebrow, title, intro, photo }: { eyebrow: string; title: string; intro?: ReactNode; photo?: { key: string; alt: string } }) {
  return (
    <section className="border-b border-line">
      <div className={`container-x grid gap-10 py-14 md:py-20 ${photo ? 'lg:grid-cols-12 lg:items-end' : ''}`}>
        <div className={photo ? 'lg:col-span-6' : 'max-w-3xl'}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-[2.4rem] font-semibold sm:text-5xl">{title}</h1>
          {intro && <div className="mt-6 max-w-2xl text-lg text-ink-soft">{intro}</div>}
        </div>
        {photo && (
          <div className="lg:col-span-6">
            <Img name={photo.key} alt={photo.alt} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full object-cover" priority />
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-semibold sm:text-[2.35rem]">{title}</h2>
      {children && <div className="mt-5 text-ink-soft">{children}</div>}
    </div>
  );
}

export function PriceTable() {
  const prices = usePrices();
  return (
    <div>
      <div className="overflow-x-auto border-y border-ocean-deep/80">
        <table className="w-full min-w-[520px] text-left">
          <caption className="sr-only">Shrimp seed rates</caption>
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-[0.14em] text-ink-soft">
              <th scope="col" className="py-4 pr-4 font-semibold">Variety</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Specification</th>
              <th scope="col" className="py-4 font-semibold">Current rate</th>
            </tr>
          </thead>
          <tbody>
            {productOrder.map((id) => {
              const p = products[id];
              const rate = prices[id];
              return (
                <tr key={id} className="border-b border-line last:border-0 align-top">
                  <th scope="row" className="py-5 pr-4">
                    <span className="block font-serif text-xl font-semibold text-ocean-deep">{id === 'vannamei' ? 'Vannamei' : 'Tiger'}</span>
                    <span className="text-sm italic text-ink-soft">{p.scientificName}</span>
                  </th>
                  <td className="py-5 pr-4 text-[0.98rem]">
                    {id === 'vannamei' ? 'SPF post-larvae' : 'Post-larvae'}
                    <span className="block text-sm text-ink-soft">Stage / size on enquiry</span>
                  </td>
                  <td className="py-5" aria-live="polite">
                    {rate ? (
                      <span className="font-serif text-2xl font-semibold text-ocean-deep">{rate}</span>
                    ) : (
                      <span className="font-semibold text-crimson">{noPriceText}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 space-y-1 text-sm text-ink-soft">
        {prices.updated ? <p>Rates last updated {prices.updated}.</p> : <p>Seed rates change with season and batch. Call or WhatsApp us for today’s rate.</p>}
        <p>Rates are indicative and confirmed at the time of booking.</p>
      </div>
    </div>
  );
}

/** Inline price text for cards and spec lists. */
export function PriceText({ species, fallback = noPriceText, className = '' }: { species: 'vannamei' | 'tiger'; fallback?: string; className?: string }) {
  const rate = usePrices()[species];
  return <span className={className}>{rate ?? fallback}</span>;
}

export function ContactButtons({ message = defaultWhatsappMessage, light = false }: { message?: string; light?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={whatsappHref(message)} target="_blank" rel="noopener" className="btn btn-whatsapp">
        <MessageCircle size={18} aria-hidden /> WhatsApp enquiry
      </a>
      <a href={telHref(business.phones[0].e164)} className={`btn ${light ? 'btn-light' : 'btn-outline'}`}>
        <Phone size={18} aria-hidden /> Call {business.phones[0].display}
      </a>
    </div>
  );
}

export function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-shell ${className}`}>
      <iframe
        title="Map showing Nissi Hatcheries at Ponnada, Kakinada District"
        src={mapLinks.embed}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

export function AddressBlock() {
  return (
    <div>
      <a href={mapLinks.view} target="_blank" rel="noopener" className="group block">
        <address className="not-italic text-lg leading-relaxed text-ink">
          <span className="block font-semibold text-ocean-deep">{business.name}</span>
          {location.addressLines.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
        </address>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-ocean group-hover:underline">
          Open in Google Maps <ExternalLink size={14} aria-hidden />
        </span>
      </a>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={mapLinks.directions} target="_blank" rel="noopener" className="btn btn-primary">
          <Navigation size={18} aria-hidden /> Get directions
        </a>
      </div>
    </div>
  );
}

export function CaaFacts({ compact = false }: { compact?: boolean }) {
  const current = caaIsCurrent();
  const rows: [string, string][] = [
    ['Registration number', caa.registrationNumber],
    ['Registered name', caa.registeredName],
    ['Species permitted', caa.speciesPermitted],
    ['Type of hatchery', caa.hatcheryType],
    ['Date of issue', caa.dateOfIssue],
    ['Valid up to', caa.validUpTo],
  ];
  const shown = compact ? rows.filter(([k]) => ['Registration number', 'Species permitted', 'Valid up to'].includes(k)) : rows;
  return (
    <dl className="divide-y divide-line border-y border-line">
      {shown.map(([k, v]) => (
        <div key={k} className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[200px_1fr] sm:gap-6">
          <dt className="text-sm uppercase tracking-[0.12em] text-ink-soft">{k}</dt>
          <dd className={`font-medium ${k === 'Species permitted' ? 'italic' : ''}`}>
            {v}
            {k === 'Valid up to' && !current && <span className="ml-2 text-sm not-italic text-crimson">(renewal to be confirmed)</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CtaBand() {
  return (
    <section className="bg-ocean text-white">
      <div className="container-x grid gap-8 py-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Planning your next stocking?</h2>
          <p className="mt-3 text-white/75">Tell us the variety and quantity you need. We’ll confirm availability, stage and the current rate.</p>
        </div>
        <div className="md:col-span-5 md:justify-self-end">
          <ContactButtons light />
        </div>
      </div>
    </section>
  );
}

export function MoreLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 font-semibold text-ocean">
      {children}
      <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
