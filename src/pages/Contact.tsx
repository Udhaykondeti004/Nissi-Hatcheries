import { Phone, MessageCircle, Mail } from 'lucide-react';
import { PageHeader, MapEmbed, AddressBlock } from '../components/blocks';
import { EnquiryForm } from '../components/EnquiryForm';
import { business } from '../content/business';
import { telHref, whatsappHref, defaultWhatsappMessage } from '../lib/links';

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the hatchery."
        intro={<p>For seed rates, availability and bookings, call us or send an enquiry on WhatsApp.</p>}
      />

      <section className="container-x grid gap-16 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-semibold">Seed enquiry</h2>
          <p className="mt-2 text-ink-soft">Fill in the details and we’ll reply on WhatsApp.</p>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">Phone</h2>
          <ul className="mt-4 space-y-3">
            {business.phones.map((p) => (
              <li key={p.e164}>
                <a href={telHref(p.e164)} className="flex items-center gap-3 font-serif text-2xl font-semibold text-ocean-deep hover:text-ocean">
                  <Phone size={20} className="text-crimson" aria-hidden /> {p.display}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">WhatsApp</h2>
          <a href={whatsappHref(defaultWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-whatsapp mt-4">
            <MessageCircle size={18} aria-hidden /> Chat on WhatsApp
          </a>

          {business.email && (
            <>
              <h2 className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">Email</h2>
              <a href={`mailto:${business.email}`} className="link mt-4 inline-flex items-center gap-2">
                <Mail size={18} aria-hidden /> {business.email}
              </a>
            </>
          )}

          <h2 className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">Address</h2>
          <div className="mt-4">
            <AddressBlock />
          </div>
        </aside>
      </section>

      <MapEmbed className="h-[380px] w-full md:h-[460px]" />
    </>
  );
}
