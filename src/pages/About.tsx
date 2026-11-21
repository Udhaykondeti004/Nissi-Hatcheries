import { Img } from '../components/Img';
import { PageHeader, SectionHeading, CtaBand } from '../components/blocks';
import { photos } from '../content/media';
import { imagesFor } from '../content/published';

const steps = [
  {
    n: '01',
    title: 'Nauplii arrive',
    text: 'As a Nauplii Rearing Hatchery, we take in nauplii, the first larval stage, rather than spawning broodstock on site.',
  },
  {
    n: '02',
    title: 'Larval rearing',
    text: 'Larvae are raised through their developmental stages in covered rearing tanks, on filtered seawater with continuous aeration.',
  },
  {
    n: '03',
    title: 'Post-larvae for stocking',
    text: 'Once they reach post-larval stage, the seed is counted and packed for farmers to stock in their ponds.',
  },
];

const facilities = [
  { photo: photos.hero, title: 'Covered rearing hall', text: 'Rows of tile-lined tanks under a roofed hall, with water and air lines at every tank.' },
  { photo: photos.tanks, title: 'Outdoor rearing tanks', text: 'A second bank of tanks under a shade frame, with drainage and aeration fittings.' },
  { photo: photos.filter, title: 'Slow sand filtration', text: 'Seawater passes through the slow sand filter before it is used in the hatchery.' },
  { photo: photos.blower, title: 'Blower room', text: 'Air blowers feed the distribution pipes that aerate the rearing tanks.' },
  { photo: photos.reservoir, title: 'Reservoir pond', text: 'A lined reservoir inside the fenced boundary holds water ahead of treatment.' },
  { photo: photos.plSection, title: 'PL section', text: 'Our team at work outside PL Section 1, where post-larvae are handled.' },
];

const principles = [
  { title: 'Water comes first', text: 'Most seed problems begin with water. Filtration and aeration get attention before anything else.' },
  { title: 'Straight answers', text: 'We tell you the variety, stage and rate before you book, and we tell you plainly if a batch is not ready.' },
  { title: 'Here at stocking time', text: 'Farmers can call or visit the hatchery. Our location and numbers are on every page of this site.' },
];

export default function About() {
  const gallery = imagesFor('gallery');
  return (
    <>
      <PageHeader
        eyebrow="About Nissi Hatcheries"
        title="A working hatchery on the Kakinada coast."
        intro={
          <p>
            Nissi Hatcheries is located at Seelamvaripalem, Ponnada Village, in U. Kothapalli Mandal of Kakinada District. We rear shrimp seed for farmers along the Andhra Pradesh coast, and we are registered with the Coastal Aquaculture Authority as a Nauplii Rearing Hatchery for SPF <em>L. vannamei</em>.
          </p>
        }
        photo={photos.courtyard}
      />

      <section className="container-x py-20 md:py-28">
        <SectionHeading eyebrow="How we work" title="From nauplii to post-larvae.">
          <p>A nauplii rearing hatchery focuses on one job: raising young larvae into healthy post-larvae ready for the pond.</p>
        </SectionHeading>
        <ol className="mt-14 grid gap-px bg-line md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="bg-paper py-8 md:px-8 md:first:pl-0">
              <span className="font-serif text-4xl font-semibold text-crimson/80">{s.n}</span>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Infrastructure" title="The hatchery, as it is." >
            <p>Every photograph on this site was taken at Nissi Hatcheries.</p>
          </SectionHeading>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <figure key={f.title}>
                <Img name={f.photo.key} alt={f.photo.alt} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="mt-4">
                  <span className="block font-serif text-lg font-semibold text-ocean-deep">{f.title}</span>
                  <span className="mt-1 block text-[0.98rem] text-ink-soft">{f.text}</span>
                </figcaption>
              </figure>
            ))}
            {gallery.map((g) => (
              <figure key={g.key}>
                <Img name={g.key} alt={g.alt} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="mt-4 text-[0.98rem] text-ink-soft">{g.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Our commitment" title="What farmers can expect from us." />
          </div>
          <dl className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {principles.map((p) => (
              <div key={p.title} className="grid gap-2 py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
                <dt className="font-serif text-xl font-semibold text-ocean-deep">{p.title}</dt>
                <dd className="text-ink-soft">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
