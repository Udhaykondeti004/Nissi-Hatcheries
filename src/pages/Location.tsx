import { Img } from '../components/Img';
import { PageHeader, MapEmbed, AddressBlock, ContactButtons } from '../components/blocks';
import { location } from '../content/location';
import { photos } from '../content/media';

export default function Location() {
  return (
    <>
      <PageHeader
        eyebrow="Location"
        title="Find the hatchery."
        intro={<p>Nissi Hatcheries is at Seelamvaripalem, Ponnada Village, on the coastal NH 516F in U. Kothapalli Mandal, Kakinada District.</p>}
      />

      <section className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <MapEmbed className="aspect-square w-full sm:aspect-[16/11]" />
        </div>
        <div className="lg:col-span-4">
          <AddressBlock />
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">Landmarks</h2>
            <ul className="mt-4 space-y-3">
              {location.landmarks.map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-[0.75em] h-px w-4 shrink-0 bg-crimson" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
            <dl className="mt-8 space-y-2 text-sm text-ink-soft">
              <div className="flex gap-2"><dt>Plus Code:</dt><dd className="font-medium text-ink">{location.plusCode}, Ponnada</dd></div>
              <div className="flex gap-2"><dt>Coordinates:</dt><dd className="font-medium text-ink">{location.lat.toFixed(5)}° N, {location.lng.toFixed(5)}° E</dd></div>
              <div className="flex gap-2"><dt>District:</dt><dd className="text-ink">Kakinada (formerly {location.formerDistrict})</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white py-16 md:py-20">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <figure>
            <Img name={photos.signboard.key} alt={photos.signboard.alt} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
            <figcaption className="mt-3 text-sm text-ink-soft">Look for the Nissi Hatchery signboard at the entrance.</figcaption>
          </figure>
          <figure>
            <Img name={photos.courtyard.key} alt={photos.courtyard.alt} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
            <figcaption className="mt-3 text-sm text-ink-soft">Inside the hatchery compound.</figcaption>
          </figure>
        </div>
        <div className="container-x mt-12">
          <ContactButtons message="Hello Nissi Hatcheries, I would like to visit the hatchery. Please share a suitable time." />
        </div>
      </section>
    </>
  );
}
