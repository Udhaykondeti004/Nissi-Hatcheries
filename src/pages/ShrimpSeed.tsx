import { MessageCircle } from 'lucide-react';
import { Img } from '../components/Img';
import { ShrimpIllustration } from '../components/ShrimpIllustration';
import { PageHeader, CtaBand, MoreLink } from '../components/blocks';
import { products, productOrder } from '../content/products';
import { published, formatRate, imagesFor } from '../content/published';
import { whatsappHref } from '../lib/links';

const comparison: [string, string, string][] = [
  ['Scientific name', 'Litopenaeus vannamei', 'Penaeus monodon'],
  ['Common name', 'Pacific white shrimp', 'Black tiger shrimp'],
  ['Origin', 'Eastern Pacific, introduced to India', 'Native to Indian coastal waters'],
  ['Harvest size', 'Medium', 'Large'],
  ['Seed supplied', 'Post-larvae (SPF)', 'Post-larvae'],
];

export default function ShrimpSeed() {
  return (
    <>
      <PageHeader
        eyebrow="Shrimp seed"
        title="Vannamei and tiger shrimp seed."
        intro={<p>Post-larvae for coastal shrimp farmers in Andhra Pradesh. Stage, batch and rate are confirmed with you on enquiry.</p>}
      />

      <nav aria-label="Varieties" className="border-b border-line bg-white">
        <div className="container-x flex gap-8 text-[0.95rem] font-semibold">
          {productOrder.map((id) => (
            <a key={id} href={`#${id}`} className="border-b-2 border-transparent py-4 text-ocean hover:border-crimson">
              {products[id].name}
            </a>
          ))}
        </div>
      </nav>

      {productOrder.map((id, idx) => {
        const p = products[id];
        const upload = imagesFor(id)[0];
        const price = published.prices[id];
        const rate = formatRate(price);
        return (
          <section key={id} id={id} className={`scroll-mt-24 py-20 md:py-28 ${idx % 2 ? 'border-y border-line bg-white' : ''}`}>
            <div className="container-x grid gap-12 lg:grid-cols-12">
              <div className={`lg:col-span-6 ${idx % 2 ? 'lg:order-2 lg:col-start-7' : ''}`}>
                <div className="flex aspect-[4/3] items-center justify-center bg-shell">
                  {upload ? (
                    <Img name={upload.key} alt={upload.alt} sizes="(min-width: 1024px) 560px, 100vw" className="h-full w-full object-cover" />
                  ) : (
                    <ShrimpIllustration species={id} className="w-[85%]" />
                  )}
                </div>
                {!upload && <p className="mt-3 text-xs text-ink-soft">Illustration. Seed photographs to follow.</p>}
              </div>

              <div className={`lg:col-span-5 ${idx % 2 ? 'lg:order-1' : 'lg:col-start-8'}`}>
                <p className="eyebrow">{p.commonName}</p>
                <h2 className="mt-3 text-[2.2rem] font-semibold sm:text-[2.6rem]">{p.name}</h2>
                <p className="mt-1 italic text-ink-soft">{p.scientificName}</p>
                <div className="mt-6 space-y-4 text-ink-soft">
                  {p.description.map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                </div>

                <dl className="mt-8 divide-y divide-line border-y border-line text-[0.98rem]">
                  {p.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[150px_1fr] gap-4 py-3">
                      <dt className="text-ink-soft">{s.label}</dt>
                      <dd className={s.value ? 'font-medium' : 'text-ink-soft'}>{s.value ?? 'Confirm on enquiry'}</dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[150px_1fr] gap-4 py-3">
                    <dt className="text-ink-soft">Rate</dt>
                    <dd className="font-semibold text-ocean-deep">{rate ? `${rate} ${price.unit}` : <span className="text-crimson">Contact us for the latest rate</span>}</dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href={whatsappHref(`Hello Nissi Hatcheries, I would like to enquire about ${p.name.toLowerCase()} (${p.scientificName}): current rate, stage and availability.`)}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-whatsapp"
                  >
                    <MessageCircle size={18} aria-hidden /> Enquire about {id === 'vannamei' ? 'Vannamei' : 'Tiger'}
                  </a>
                  <MoreLink to="/pricing">All seed prices</MoreLink>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="container-x py-20 md:py-24">
        <h2 className="text-3xl font-semibold">At a glance</h2>
        <div className="mt-8 overflow-x-auto border-y border-ocean-deep/80">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-[0.14em] text-ink-soft">
                <th scope="col" className="py-4 pr-4 font-semibold"><span className="sr-only">Attribute</span></th>
                <th scope="col" className="py-4 pr-4 font-semibold">Vannamei</th>
                <th scope="col" className="py-4 font-semibold">Tiger</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([k, a, b]) => (
                <tr key={k} className="border-b border-line last:border-0">
                  <th scope="row" className="py-3.5 pr-4 font-medium text-ink-soft">{k}</th>
                  <td className={`py-3.5 pr-4 ${k === 'Scientific name' ? 'italic' : ''}`}>{a}</td>
                  <td className={`py-3.5 ${k === 'Scientific name' ? 'italic' : ''}`}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
