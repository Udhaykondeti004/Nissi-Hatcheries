import { PageHeader, PriceTable, ContactButtons, SectionHeading } from '../components/blocks';
import { business } from '../content/business';

const steps = [
  { title: 'Tell us what you need', text: 'Call or WhatsApp with the variety, quantity and your planned stocking date.' },
  { title: 'Confirm the batch', text: 'We confirm availability, post-larval stage and the rate for your order.' },
  { title: 'Arrange collection', text: 'Agree the collection date and transport arrangements with the hatchery.' },
];

export default function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Seed prices"
        title="Current shrimp seed rates."
        intro={<p>Rates are set by season and batch. This table shows the latest rates published by the hatchery. Call or WhatsApp to confirm before you book.</p>}
      />
      <section className="container-x py-16 md:py-20">
        <PriceTable />
        <div className="mt-10">
          <ContactButtons message="Hello Nissi Hatcheries, please share today’s vannamei and tiger shrimp seed rates and availability." />
        </div>
      </section>

      <section className="border-t border-line bg-white py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="How to order" title="Booking seed takes one call." />
          <ol className="mt-12 grid gap-px bg-line md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-white py-8 md:px-8 md:first:pl-0">
                <span className="font-serif text-3xl font-semibold text-crimson/80">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-ink-soft">
            Phone: {business.phones.map((p, i) => (
              <span key={p.e164}>
                {i > 0 && ' / '}
                <a className="link" href={`tel:${p.e164}`}>{p.display}</a>
              </span>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
