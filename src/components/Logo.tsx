/** Official Nissi spiral-shell mark with the wordmark set as on the business card (crimson "N", slate-teal letters). */
export function Logo({ inverse = false, size = 44 }: { inverse?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={inverse ? 'grid place-items-center rounded-full bg-white p-1.5' : ''}
        style={{ width: inverse ? size + 8 : size, height: inverse ? size + 8 : size }}
      >
        <img
          src="/brand/nissi-logo-mark-256.png"
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="leading-none">
        <span className={`block font-sans text-[1.18rem] font-bold tracking-[0.2em] ${inverse ? 'text-white' : 'text-teal'}`}>
          <span className={inverse ? 'text-[#f2a3aa]' : 'text-crimson'}>N</span>ISSI
        </span>
        <span className={`mt-1 block font-sans text-[0.72rem] font-semibold uppercase tracking-[0.28em] ${inverse ? 'text-white/70' : 'text-ink-soft'}`}>
          Hatcheries
        </span>
      </span>
      <span className="sr-only">Nissi Hatcheries</span>
    </span>
  );
}
