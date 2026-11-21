import type { SpeciesId } from '../content/products';

/**
 * Fine-line scientific-style shrimp drawing, used until real seed photographs are added
 * (put them in assets-src/photos and reference them in src/content/media.ts). Tiger variant carries the dark abdominal bands.
 */
export function ShrimpIllustration({ species, className = '' }: { species: SpeciesId; className?: string }) {
  const tiger = species === 'tiger';
  const stroke = tiger ? '#1f2a33' : '#173b63';
  const body = tiger ? '#e9e4d8' : '#f3f1ec';
  const segX = [196, 222, 246, 268, 288, 305];
  const clipId = `shrimp-body-${species}`;
  return (
    <svg viewBox="0 0 400 210" className={className} role="img" aria-label={tiger ? 'Line drawing of a black tiger shrimp' : 'Line drawing of a Pacific white (vannamei) shrimp'}>
      <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        {/* antennae */}
        <path d="M70 97 C 40 70, 22 46, 6 22" strokeWidth="1" opacity="0.7" />
        <path d="M68 101 C 34 112, 14 134, 4 168" strokeWidth="1" opacity="0.7" />
        <path d="M66 99 C 46 92, 30 92, 16 98" strokeWidth="0.9" opacity="0.6" />
        {/* walking legs */}
        {[100, 116, 132, 148, 162].map((x, i) => (
          <path key={x} d={`M${x} ${114 - i} q ${-6 - i} 16 ${-2 - i * 2} ${30 + i * 2}`} strokeWidth="1" opacity="0.8" />
        ))}
        {/* swimming legs */}
        {[200, 226, 250, 272].map((x, i) => (
          <path key={x} d={`M${x} ${112 + i * 2} q -4 12 -10 18`} strokeWidth="1" opacity="0.7" />
        ))}
      </g>

      <defs>
        <clipPath id={clipId}>
          <path d="M62 92 C 92 70, 150 60, 192 64 C 244 69, 292 82, 320 112 C 336 129, 340 146, 335 160
           C 322 141, 302 126, 272 120 C 242 114, 212 111, 190 113 L 170 115 C 140 119, 102 117, 80 106 Z" />
        </clipPath>
      </defs>
      {/* body */}
      <path
        d="M62 92 C 92 70, 150 60, 192 64 C 244 69, 292 82, 320 112 C 336 129, 340 146, 335 160
           C 322 141, 302 126, 272 120 C 242 114, 212 111, 190 113 L 170 115 C 140 119, 102 117, 80 106 Z"
        fill={body}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* tiger bands */}
      {tiger && (
        <g clipPath={`url(#${clipId})`}>
        {segX.map((x, i) => (
          <path
            key={x}
            d={`M${x - 8} ${64 + i * 4 + (i > 2 ? i * 4 : 0)} q 6 ${24 - i} 2 ${48 - i * 3}`}
            stroke="#2a2f36"
            strokeWidth={7 - i * 0.6}
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        ))}
        </g>
      )}
      {/* segment lines */}
      <g fill="none" stroke={stroke} strokeWidth="1.1" strokeLinecap="round">
        {segX.map((x, i) => (
          <path key={x} d={`M${x} ${66 + i * 4 + (i > 2 ? i * 4 : 0)} q 6 ${24 - i} 2 ${48 - i * 3}`} />
        ))}
        {/* carapace groove */}
        <path d="M100 82 C 130 92, 160 96, 186 96" opacity="0.6" />
        <path d="M172 66 C 178 84, 180 100, 172 114" />
      </g>
      {/* rostrum */}
      <path d="M64 92 L 26 83 L 40 90 L 30 91 L 60 99" fill={body} stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      {/* eye */}
      <circle cx="80" cy="91" r="4.2" fill={stroke} />
      {/* tail fan */}
      <path
        d="M335 160 C 326 172, 312 182, 296 186 C 312 192, 330 194, 344 190 C 356 186, 364 176, 366 166 C 356 164, 344 162, 335 160 Z"
        fill={body}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M335 162 L 318 186 M 337 163 L 340 191 M 339 163 L 360 172" stroke={stroke} strokeWidth="0.9" opacity="0.7" />
    </svg>
  );
}
