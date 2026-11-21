import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 text-4xl font-semibold">This page doesn’t exist.</h1>
      <p className="mt-4 text-ink-soft">The link may be old or mistyped.</p>
      <Link to="/" className="btn btn-primary mt-8">Go to the home page</Link>
    </section>
  );
}
