import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { navRoutes } from '../content/site';
import { business } from '../content/business';
import { telHref } from '../lib/links';

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  const items = navRoutes.filter((r) => r.path !== '/');
  const primary = business.phones[0];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link to="/" aria-label="Nissi Hatcheries home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-medium">
            {items.map((r) => (
              <li key={r.path}>
                <NavLink
                  to={r.path}
                  className={({ isActive }) =>
                    `py-2 transition-colors ${isActive ? 'text-crimson' : 'text-ink hover:text-ocean'}`
                  }
                >
                  {r.nav}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a href={telHref(primary.e164)} className="btn btn-primary hidden !py-2.5 lg:inline-flex">
          <Phone size={16} aria-hidden /> {primary.display.replace('+91 ', '')}
        </a>

        <button
          type="button"
          className="-mr-2 p-2 text-ocean-deep lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-paper lg:hidden">
          <ul className="container-x py-2">
            {navRoutes.map((r) => (
              <li key={r.path} className="border-b border-line last:border-0">
                <NavLink
                  to={r.path}
                  end
                  className={({ isActive }) =>
                    `block py-3.5 text-[1.05rem] font-medium ${isActive ? 'text-crimson' : 'text-ink'}`
                  }
                >
                  {r.nav}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
