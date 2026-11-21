import { ExternalLink } from 'lucide-react';
import { Img } from '../components/Img';
import { PageHeader, CaaFacts, SectionHeading } from '../components/blocks';
import { caa } from '../content/caa';
import { photos } from '../content/media';

export default function CaaApproval() {
  return (
    <>
      <PageHeader
        eyebrow="CAA approval"
        title="Registered with the Coastal Aquaculture Authority."
        intro={
          <p>
            The Coastal Aquaculture Authority (CAA), Government of India, regulates coastal aquaculture and approves the hatcheries that supply shrimp seed. Nissi Hatcheries appears in the CAA list of approved hatcheries for Kakinada District.
          </p>
        }
      />

      <section className="container-x grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="text-2xl font-semibold">Registration details</h2>
          <div className="mt-6">
            <CaaFacts />
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Details as published in the CAA “List of CAA Approved Hatcheries” (Andhra Pradesh, Kakinada). This registration covers the species and hatchery type stated above.
          </p>
          <a href={caa.verifyUrl} target="_blank" rel="noopener" className="btn btn-outline mt-6">
            Verify on caa.gov.in <ExternalLink size={16} aria-hidden />
          </a>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="text-2xl font-semibold">Species covered</h2>
          <p className="mt-4 text-ink-soft">
            The CAA registration lists <em>{caa.speciesPermitted}</em> as the species permitted, under the hatchery type “{caa.hatcheryType}”.
          </p>
          <h2 className="mt-10 text-2xl font-semibold">Registered location</h2>
          <p className="mt-4 text-ink-soft">{caa.registeredLocation}</p>
        </div>
      </section>

      <section className="container-x pb-16 md:pb-20">
        <figure>
          <a href={`/img/${photos.caaListing.key}-1600.webp`} target="_blank" rel="noopener" className="block border border-line bg-white p-2 sm:p-4">
            <Img name={photos.caaListing.key} alt={photos.caaListing.alt} sizes="(min-width: 1200px) 1150px, 100vw" className="w-full" />
          </a>
          <figcaption className="mt-3 text-sm text-ink-soft">Entry for M/s. Nissi Hatcheries in the CAA list of approved hatcheries, searched by registration number. Tap to open full size.</figcaption>
        </figure>
      </section>

      <section className="border-t border-line bg-white py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="What it means" title="Reading the registration." />
          </div>
          <dl className="divide-y divide-line border-y border-line lg:col-span-7">
            <div className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <dt className="font-serif text-lg font-semibold text-ocean-deep">SPF</dt>
              <dd className="text-ink-soft">Specific Pathogen Free: stock that comes from lines tested free of specified shrimp pathogens.</dd>
            </div>
            <div className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <dt className="font-serif text-lg font-semibold text-ocean-deep">Nauplii Rearing Hatchery</dt>
              <dd className="text-ink-soft">A hatchery approved to rear nauplii, the earliest larval stage, through to post-larvae for stocking.</dd>
            </div>
            <div className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <dt className="font-serif text-lg font-semibold text-ocean-deep">Validity</dt>
              <dd className="text-ink-soft">The CAA list shows this registration as valid up to {caa.validUpTo}. Renewals are published by the CAA.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <figure className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <Img name={photos.signboard.key} alt={photos.signboard.alt} sizes="(min-width: 768px) 50vw, 100vw" className="w-full" />
          </div>
          <figcaption className="text-ink-soft md:col-span-5 md:col-start-8">
            <span className="block font-serif text-xl font-semibold text-ocean-deep">On site</span>
            The CAA registration number is displayed on the hatchery signboard at Seelamvaripalem, Ponnada.
          </figcaption>
        </figure>
      </section>
    </>
  );
}
