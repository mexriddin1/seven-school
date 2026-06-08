// Inline SVG illustrations + chip icons for the Ecosystem cards on the homepage.
// Stylized vector artwork — no external assets required.

type IconProps = { className?: string };

export function EcoIllu1() {
  return (
    <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" role="img">
      {/* sun */}
      <g transform="translate(170 38)">
        <circle r="18" fill="#FFC85C" />
        <g stroke="#FFB42E" strokeWidth="3" strokeLinecap="round">
          <line x1="0" y1="-28" x2="0" y2="-36" />
          <line x1="0" y1="28" x2="0" y2="36" />
          <line x1="-28" y1="0" x2="-36" y2="0" />
          <line x1="28" y1="0" x2="36" y2="0" />
          <line x1="-20" y1="-20" x2="-26" y2="-26" />
          <line x1="20" y1="-20" x2="26" y2="-26" />
          <line x1="-20" y1="20" x2="-26" y2="26" />
          <line x1="20" y1="20" x2="26" y2="26" />
        </g>
        {/* smiley */}
        <circle cx="-6" cy="-2" r="2" fill="#5B3A14" />
        <circle cx="6" cy="-2" r="2" fill="#5B3A14" />
        <path d="M-6 6 Q0 11 6 6" stroke="#5B3A14" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* cloud */}
      <g transform="translate(60 36)" fill="#CFE5F7">
        <ellipse cx="0" cy="0" rx="22" ry="11" />
        <ellipse cx="14" cy="-4" rx="14" ry="9" />
        <ellipse cx="-12" cy="-2" rx="12" ry="8" />
      </g>

      {/* leaf */}
      <g transform="translate(34 168) rotate(-18)" fill="#7DBE5C">
        <path d="M0 0 Q12 -22 32 -10 Q24 6 0 0 Z" />
        <path d="M2 -2 Q14 -16 28 -10" stroke="#5BA547" strokeWidth="1.5" fill="none" />
      </g>

      {/* child (stylized) */}
      <g transform="translate(108 96)">
        {/* head */}
        <circle cx="0" cy="-18" r="20" fill="#F2C9A0" />
        {/* hair */}
        <path d="M-20 -22 Q-14 -42 0 -38 Q16 -42 20 -22 Q12 -32 0 -30 Q-12 -32 -20 -22 Z" fill="#7A4A1F" />
        {/* eye */}
        <circle cx="6" cy="-18" r="2" fill="#3A2410" />
        <circle cx="-6" cy="-18" r="2" fill="#3A2410" />
        {/* smile */}
        <path d="M-5 -10 Q0 -6 5 -10" stroke="#3A2410" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* body */}
        <path d="M-22 4 Q-18 -4 -8 -2 L8 -2 Q18 -4 22 4 L22 38 L-22 38 Z" fill="#F5C24A" />
        {/* arm reaching */}
        <path d="M-22 6 Q-32 16 -34 32" stroke="#F2C9A0" strokeWidth="10" strokeLinecap="round" fill="none" />
      </g>

      {/* blocks tower */}
      <g transform="translate(168 168)">
        <rect x="-26" y="-46" width="22" height="22" rx="3" fill="#E85D55" />
        <rect x="-26" y="-24" width="22" height="22" rx="3" fill="#5DB94A" />
        <rect x="-26" y="-2"  width="22" height="22" rx="3" fill="#F5C24A" />
        <rect x="-4" y="-24"  width="22" height="22" rx="3" fill="#3F86D4" />
        <rect x="-4" y="-2"   width="22" height="22" rx="3" fill="#E85D55" />
        {/* letters */}
        <text x="-15" y="-30" fontFamily="Montserrat, sans-serif" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">A</text>
        <text x="-15" y="-8"  fontFamily="Montserrat, sans-serif" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">B</text>
        <text x="7"  y="-8"   fontFamily="Montserrat, sans-serif" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">C</text>
      </g>
    </svg>
  );
}

export function EcoIllu2() {
  return (
    <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" role="img">
      {/* math text floating background */}
      <g fontFamily="Montserrat, sans-serif" fontWeight="700" opacity="0.55">
        <text x="22" y="38" fontSize="20" fill="#3F86D4">1+2=3</text>
        <text x="118" y="32" fontSize="22" fill="#E85D55">ABC</text>
        <text x="170" y="56" fontSize="18" fill="#F5C24A">★</text>
      </g>

      {/* globe top-right */}
      <g transform="translate(176 78)">
        <circle r="16" fill="#CFE5F7" stroke="#3F86D4" strokeWidth="1.6" />
        <path d="M-16 0 H16 M0 -16 V16 M-13 -8 Q0 -4 13 -8 M-13 8 Q0 4 13 8" stroke="#3F86D4" strokeWidth="1.4" fill="none" />
      </g>

      {/* books stack */}
      <g transform="translate(54 158)">
        <rect x="-30" y="-10" width="60" height="14" rx="3" fill="#E85D55" />
        <rect x="-26" y="-22" width="58" height="14" rx="3" fill="#5DB94A" />
        <rect x="-30" y="-34" width="62" height="14" rx="3" fill="#3F86D4" />
      </g>

      {/* pencil cup */}
      <g transform="translate(178 156)">
        <rect x="-14" y="-6" width="28" height="22" rx="4" fill="#3F86D4" />
        <rect x="-10" y="-22" width="3" height="20" fill="#F5C24A" />
        <polygon points="-10,-22 -7,-22 -8.5,-26" fill="#3A2410" />
        <rect x="-3" y="-26" width="3" height="24" fill="#E85D55" />
        <polygon points="-3,-26 0,-26 -1.5,-30" fill="#3A2410" />
        <rect x="4" y="-20" width="3" height="18" fill="#5DB94A" />
        <polygon points="4,-20 7,-20 5.5,-24" fill="#3A2410" />
      </g>

      {/* student writing */}
      <g transform="translate(108 120)">
        {/* head */}
        <circle cx="0" cy="-22" r="18" fill="#F2C9A0" />
        <path d="M-18 -26 Q-12 -44 0 -42 Q14 -44 18 -26 Q10 -34 0 -34 Q-10 -34 -18 -26 Z" fill="#2A1A0E" />
        {/* eyes */}
        <circle cx="-6" cy="-22" r="1.6" fill="#2A1A0E" />
        <circle cx="6" cy="-22" r="1.6" fill="#2A1A0E" />
        {/* shirt + tie */}
        <path d="M-22 0 Q-16 -8 -8 -6 L8 -6 Q16 -8 22 0 L22 40 L-22 40 Z" fill="#FFFFFF" stroke="#D3DEEA" strokeWidth="1" />
        <polygon points="-3,-6 3,-6 4,4 0,18 -4,4" fill="#06113c" />
        {/* desk */}
        <rect x="-44" y="36" width="88" height="6" rx="2" fill="#C9A06D" />
        {/* notebook */}
        <rect x="-30" y="22" width="60" height="14" rx="2" fill="#fff" stroke="#3F86D4" strokeWidth="1.2" />
        <line x1="-26" y1="28" x2="26" y2="28" stroke="#BFD4EC" strokeWidth="1" />
        <line x1="-26" y1="32" x2="14" y2="32" stroke="#BFD4EC" strokeWidth="1" />
        {/* pencil hand */}
        <path d="M18 4 Q28 14 32 24" stroke="#F2C9A0" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="30" y="22" width="3" height="10" transform="rotate(35 30 22)" fill="#F5C24A" />
      </g>
    </svg>
  );
}

export function EcoIllu3() {
  return (
    <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" role="img">
      {/* faded grad cap */}
      <g transform="translate(168 50)" opacity="0.4" fill="#A09A8C">
        <polygon points="-22,0 0,-10 22,0 0,10" />
        <path d="M-10 4 V14 Q0 20 10 14 V4" fill="none" stroke="#A09A8C" strokeWidth="2" />
        <line x1="22" y1="0" x2="22" y2="14" stroke="#A09A8C" strokeWidth="2" />
        <circle cx="22" cy="16" r="2.5" fill="#A09A8C" />
      </g>

      {/* faded globe */}
      <g transform="translate(40 60)" opacity="0.35">
        <circle r="22" fill="none" stroke="#7A7567" strokeWidth="1.6" />
        <path d="M-22 0 H22 M0 -22 V22 M-18 -12 Q0 -6 18 -12 M-18 12 Q0 6 18 12" stroke="#7A7567" strokeWidth="1.2" fill="none" />
      </g>

      {/* faded columns */}
      <g transform="translate(176 150)" opacity="0.3" fill="#7A7567">
        <rect x="-22" y="0" width="44" height="3" />
        <rect x="-20" y="-32" width="4" height="32" />
        <rect x="-8"  y="-32" width="4" height="32" />
        <rect x="4"   y="-32" width="4" height="32" />
        <rect x="16"  y="-32" width="4" height="32" />
        <rect x="-24" y="-36" width="48" height="4" />
      </g>

      {/* student (suited) */}
      <g transform="translate(108 110)">
        {/* head */}
        <circle cx="0" cy="-28" r="22" fill="#E8B98C" />
        {/* hair */}
        <path d="M-22 -32 Q-14 -56 0 -52 Q16 -56 22 -32 Q12 -44 0 -44 Q-12 -44 -22 -32 Z" fill="#1F1409" />
        {/* eyes / mouth */}
        <circle cx="-7" cy="-28" r="1.8" fill="#1F1409" />
        <circle cx="7" cy="-28" r="1.8" fill="#1F1409" />
        <path d="M-5 -18 Q0 -15 5 -18" stroke="#1F1409" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* suit */}
        <path d="M-30 -4 Q-22 -10 -10 -10 L10 -10 Q22 -10 30 -4 L30 56 L-30 56 Z" fill="#1A2547" />
        {/* white shirt + tie */}
        <polygon points="-10,-10 10,-10 6,8 -6,8" fill="#FFFFFF" />
        <polygon points="-3,-8 3,-8 4,4 0,22 -4,4" fill="#A0303A" />
        {/* lapels */}
        <polygon points="-10,-10 -2,-4 -8,10 -22,4" fill="#0F1731" />
        <polygon points="10,-10 2,-4 8,10 22,4" fill="#0F1731" />
        {/* folder under arm */}
        <rect x="14" y="14" width="22" height="30" rx="2" fill="#0F1731" stroke="#5A6378" strokeWidth="0.8" />
        <circle cx="25" cy="29" r="3" fill="none" stroke="#C8A55C" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

/* ============ chip icons ============ */

function Chip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function IcBear(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="6.5" cy="6.5" r="2" fill="#C77F3F" />
      <circle cx="17.5" cy="6.5" r="2" fill="#C77F3F" />
      <circle cx="12" cy="13" r="6.5" fill="#E0A269" />
      <circle cx="10" cy="12" r=".9" fill="#3a2410" />
      <circle cx="14" cy="12" r=".9" fill="#3a2410" />
      <ellipse cx="12" cy="15.4" rx="1.6" ry="1.2" fill="#3a2410" />
    </svg>
  );
}

export function IcPuzzle(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 7h4a1.5 1.5 0 1 1 3 0h4v4a1.5 1.5 0 1 0 0 3v4h-4a1.5 1.5 0 1 0-3 0H5v-4a1.5 1.5 0 1 1 0-3z"
        fill="#5DB94A" />
    </svg>
  );
}

export function IcBook(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 5h7v14H6a1 1 0 0 1-1-1V5z" fill="#3F86D4" />
      <path d="M19 5h-7v14h6a1 1 0 0 0 1-1V5z" fill="#5AA0E6" />
      <line x1="12" y1="5" x2="12" y2="19" stroke="#1F4F86" strokeWidth="1" />
    </svg>
  );
}

export function IcPalette(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 4a8 8 0 1 0 0 16c1 0 1.5-.6 1.5-1.4 0-.6-.4-1-.4-1.6 0-.8.6-1.4 1.4-1.4H16a4 4 0 0 0 4-4 8 8 0 0 0-8-8z" fill="#E85D55" />
      <circle cx="7.5" cy="11" r="1.2" fill="#F5C24A" />
      <circle cx="10" cy="7.5" r="1.2" fill="#5DB94A" />
      <circle cx="14" cy="7.5" r="1.2" fill="#3F86D4" />
      <circle cx="16.5" cy="11" r="1.2" fill="#A24CC1" />
    </svg>
  );
}

export function IcMonitor(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="12" rx="1.5" fill="#3F86D4" />
      <rect x="5" y="7" width="14" height="8" rx="0.5" fill="#CFE5F7" />
      <rect x="9" y="18" width="6" height="1.5" fill="#3F86D4" />
      <rect x="7" y="19" width="10" height="1.2" rx=".6" fill="#3F86D4" />
    </svg>
  );
}

export function IcBall(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" fill="#fff" stroke="#1F4F86" strokeWidth="1.4" />
      <polygon points="12,8 15,10.2 13.9,13.8 10.1,13.8 9,10.2" fill="#1F4F86" />
      <line x1="12" y1="4" x2="12" y2="8" stroke="#1F4F86" strokeWidth="1.2" />
      <line x1="15" y1="10.2" x2="19" y2="9" stroke="#1F4F86" strokeWidth="1.2" />
      <line x1="13.9" y1="13.8" x2="16.5" y2="17" stroke="#1F4F86" strokeWidth="1.2" />
      <line x1="10.1" y1="13.8" x2="7.5" y2="17" stroke="#1F4F86" strokeWidth="1.2" />
      <line x1="9" y1="10.2" x2="5" y2="9" stroke="#1F4F86" strokeWidth="1.2" />
    </svg>
  );
}

export function IcChart(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4"  y="13" width="3.5" height="7"  rx="0.6" fill="#5AA0E6" />
      <rect x="10" y="9"  width="3.5" height="11" rx="0.6" fill="#3F86D4" />
      <rect x="16" y="5"  width="3.5" height="15" rx="0.6" fill="#1F4F86" />
    </svg>
  );
}

export function IcCap(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <polygon points="2,11 12,7 22,11 12,15" fill="#1A2547" />
      <path d="M7 13v3.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V13" fill="none" stroke="#1A2547" strokeWidth="1.4" />
      <line x1="20" y1="11" x2="20" y2="17" stroke="#1A2547" strokeWidth="1.4" />
      <circle cx="20" cy="18" r="1.2" fill="#C8A55C" />
    </svg>
  );
}

export function IcGlobe(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" fill="none" stroke="#1A2547" strokeWidth="1.4" />
      <path d="M4 12h16 M12 4v16 M5 8c4 2 10 2 14 0 M5 16c4-2 10-2 14 0" stroke="#1A2547" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function IcFlask(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M10 3h4v5l4 9a2 2 0 0 1-1.8 2.9H7.8A2 2 0 0 1 6 17l4-9V3z"
        fill="#CFE5F7" stroke="#1A2547" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8.6 12.5h6.8L17 16a2 2 0 0 1-1.8 2.9H8.8A2 2 0 0 1 7 16z" fill="#3F86D4" />
      <line x1="9" y1="3" x2="15" y2="3" stroke="#1A2547" strokeWidth="1.4" />
    </svg>
  );
}

export function IcTrophy(_: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M7 4h10v3a5 5 0 1 1-10 0V4z" fill="#C8A55C" />
      <path d="M5 5h2v3a3 3 0 0 0 0-3z M17 5h2v3a3 3 0 0 1 0-3z" stroke="#9C7E37" strokeWidth="1.2" fill="none" />
      <rect x="10" y="13" width="4" height="3" fill="#C8A55C" />
      <rect x="8" y="16" width="8" height="2.5" rx="0.6" fill="#9C7E37" />
    </svg>
  );
}

export const ECO_ICONS_1 = [IcBear, IcPuzzle, IcBook, IcPalette];
export const ECO_ICONS_2 = [IcBook, IcMonitor, IcBall, IcChart];
export const ECO_ICONS_3 = [IcCap, IcGlobe, IcFlask, IcTrophy];
