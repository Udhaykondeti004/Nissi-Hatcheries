import { Link } from 'react-router';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { Img } from '../components/Img';
import { ShrimpIllustration } from '../components/ShrimpIllustration';
import { SectionHeading, CaaFacts, MapEmbed, AddressBlock, CtaBand, MoreLink } from '../components/blocks';
import { photos } from '../content/media';
import { business } from '../content/business';
import { caa } from '../content/caa';
import { products, productOrder } from '../content/products';
import { imagesFor, published, formatRate } from '../content/published';
import { whatsappHref, defaultWhatsappMessage, telHref } from '../lib/links';

export default function Home() {
  const heroUpload = imagesFor('home')[0];
  const hero = heroUpload ? { key: heroUpload.key, alt: heroUpload.alt } : photos.hero;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ocean-deep text-white">
        <Img name={hero.key} alt={hero.alt} priority className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-ocean-deep/65" aria-hidden />
        <div className="container-x flex min-h-[78vh] flex-col justify-end pb-14 pt-28 md:min-h-[640px] md:pb-20">
          <p className="reveal text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-white/80">
            CAA-registered shrimp hatchery · Ponnada, Kakinada District
          </p>
          <h1 className="reveal mt-5 max-w-3xl text-[2.7rem] font-semibold leading-[1.05] text-white sm:text-6xl lg:text-[4.4rem]">
            Quality Shrimp Seed. <span className="text-[#f4c5c9]">Built on Trust.</span>
          </h1>
          <p className="reveal mt-6 max-w-xl text-lg text-white/85">
            Vannamei and tiger shrimp seed, reared in covered tanks on filtered seawater at our hatchery in U. Kothapalli Mandal, Andhra Pradesh.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-3">
            <Link to="/shrimp-seed" className="btn btn-light">
              View shrimp seed <ArrowRight size={18} aria-hidden />
            </Link>
            <a href={whatsappHref(defaultWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-whatsapp">
              <MessageCircle size={18} aria-hidden /> WhatsApp for rates
            </a>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="border-b border-line bg-white">
        <dl className="container-x grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {[
            ['CAA registration', caa.registrationNumber],
            ['Species (CAA)', 'SPF L. vannamei'],
            ['Location', 'Ponnada, U. Kothapalli'],
            ['Call', business.phones[0].display.replace('+91 ', '')],
          ].map(([k, v], i) => (
            <div key={k} className={`py-6 md:px-6 ${i % 2 ? 'pl-4 md:pl-6' : 'md:first:pl-0'} ${i < 2 ? 'border-b border-line md:border-0' : ''}`}>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-soft">{k}</dt>
              <dd className="mt-1.5 font-serif text-lg font-semibold text-ocean-deep">
                {k === 'Call' ? <a href={telHref(business.phones[0].e164)}>{v}</a> : v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Introduction */}
      <section className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">About the hatchery</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-[2.6rem]">Healthy seed starts with clean water and careful rearing.</h2>
        </div>
        <div className="space-y-5 text-lg text-ink-soft lg:col-span-6 lg:col-start-7">
          <p>
            Nissi Hatcheries is a shrimp hatchery at Seelamvaripalem, Ponnada, on the Kakinada coast. We are registered with the Coastal Aquaculture Authority as a Nauplii Rearing Hatchery for SPF <em>L. vannamei</em>, and we rear nauplii through to post-larvae ready for stocking.
          </p>
          <p>
            Seawater is treated through slow sand filtration before it reaches our covered, tile-lined rearing tanks, and blower-driven aeration runs to every tank.
          </p>
          <MoreLink to="/about">Inside the hatchery</MoreLink>
        </div>
      </section>

      {/* Varieties */}
      <section className="border-t border-line bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Shrimp seed" title="Two varieties, one standard of care." />
          <div className="mt-14 grid gap-px bg-line md:grid-cols-2">
            {productOrder.map((id) => {
              const p = products[id];
              const upload = imagesFor(id)[0];
              const rate = formatRate(published.prices[id]);
              return (
                <article key={id} className="flex flex-col bg-white p-0 md:p-10 md:first:pl-0 md:last:pr-0">
                  <div className="flex aspect-[16/9] items-center justify-center bg-paper">
                    {upload ? (
                      <Img name={upload.key} alt={upload.alt} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
                    ) : (
                      <ShrimpIllustration species={id} className="w-4/5" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col pt-7 pb-12 md:pb-0">
                    <p className="text-sm italic text-ink-soft">{p.scientificName}</p>
                    <h3 className="mt-1 text-[1.75rem] font-semibold">{p.name}</h3>
                    <p className="mt-3 text-ink-soft">{p.summary}</p>
                    <ul className="mt-5 space-y-2 text-[0.98rem]">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-[0.7em] h-px w-4 shrink-0 bg-crimson" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                      <MoreLink to={`/shrimp-seed#${id}`}>Seed details</MoreLink>
                      <span className="text-sm font-semibold text-ink-soft">{rate ? `${rate} ${published.prices[id].unit}` : 'Rate on enquiry'}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Facilities" title="Built for consistent post-larvae." />
            <MoreLink to="/about">See the full hatchery</MoreLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-12">
            <figure className="md:col-span-7">
              <Img name={photos.tanks.key} alt={photos.tanks.alt} sizes="(min-width: 768px) 60vw, 100vw" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="mt-3 text-sm text-ink-soft"><span className="font-semibold text-ink">Rearing tanks.</span> Tile-lined tanks under shade, with aeration and water lines.</figcaption>
            </figure>
            <div className="grid gap-6 md:col-span-5">
              <figure>
                <Img name={photos.filter.key} alt={photos.filter.alt} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[16/10] w-full object-cover" />
                <figcaption className="mt-3 text-sm text-ink-soft"><span className="font-semibold text-ink">Slow sand filter.</span> Seawater is filtered before use.</figcaption>
              </figure>
              <figure>
                <Img name={photos.blower.key} alt={photos.blower.alt} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[16/10] w-full object-cover" />
                <figcaption className="mt-3 text-sm text-ink-soft"><span className="font-semibold text-ink">Blower room.</span> Air supply to every rearing tank.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* CAA */}
      <section className="border-y border-line bg-shell py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ShieldCheck size={34} className="text-teal" aria-hidden />
            <p className="eyebrow mt-5">Regulatory approval</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-[2.35rem]">Listed by the Coastal Aquaculture Authority.</h2>
            <p className="mt-5 text-ink-soft">
              Nissi Hatcheries appears in the CAA list of approved hatcheries for Kakinada District as a Nauplii Rearing Hatchery for SPF <em>Litopenaeus vannamei</em>.
            </p>
            <div className="mt-7">
              <MoreLink to="/caa-approval">Registration details</MoreLink>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <CaaFacts />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Visit us" title="On the coastal road at Ponnada." />
            <div className="mt-8">
              <AddressBlock />
            </div>
          </div>
          <div className="lg:col-span-7">
            <MapEmbed className="aspect-[4/3] w-full md:aspect-[16/10]" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
