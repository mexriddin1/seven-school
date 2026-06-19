// Photo illustrations + chip icons for the Ecosystem cards on the homepage.

const photoStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
};

export function EcoIllu1() {
  return <img src="/eco/kid.jpg" alt="" style={photoStyle} loading="lazy" />;
}

export function EcoIllu2() {
  return <img src="/eco/middle.jpg" alt="" style={photoStyle} loading="lazy" />;
}

export function EcoIllu3() {
  return <img src="/eco/high.jpg" alt="" style={photoStyle} loading="lazy" />;
}

/* ============ chip icons ============ */

export function IcBear() {
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

export function IcPuzzle() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 7h4a1.5 1.5 0 1 1 3 0h4v4a1.5 1.5 0 1 0 0 3v4h-4a1.5 1.5 0 1 0-3 0H5v-4a1.5 1.5 0 1 1 0-3z"
        fill="#5DB94A" />
    </svg>
  );
}

export function IcBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 5h7v14H6a1 1 0 0 1-1-1V5z" fill="#3F86D4" />
      <path d="M19 5h-7v14h6a1 1 0 0 0 1-1V5z" fill="#5AA0E6" />
      <line x1="12" y1="5" x2="12" y2="19" stroke="#1F4F86" strokeWidth="1" />
    </svg>
  );
}

export function IcPalette() {
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

export function IcMonitor() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="12" rx="1.5" fill="#3F86D4" />
      <rect x="5" y="7" width="14" height="8" rx="0.5" fill="#CFE5F7" />
      <rect x="9" y="18" width="6" height="1.5" fill="#3F86D4" />
      <rect x="7" y="19" width="10" height="1.2" rx=".6" fill="#3F86D4" />
    </svg>
  );
}

export function IcBall() {
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

export function IcChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4"  y="13" width="3.5" height="7"  rx="0.6" fill="#5AA0E6" />
      <rect x="10" y="9"  width="3.5" height="11" rx="0.6" fill="#3F86D4" />
      <rect x="16" y="5"  width="3.5" height="15" rx="0.6" fill="#1F4F86" />
    </svg>
  );
}

export function IcCap() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <polygon points="2,11 12,7 22,11 12,15" fill="#1A2547" />
      <path d="M7 13v3.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V13" fill="none" stroke="#1A2547" strokeWidth="1.4" />
      <line x1="20" y1="11" x2="20" y2="17" stroke="#1A2547" strokeWidth="1.4" />
      <circle cx="20" cy="18" r="1.2" fill="#C8A55C" />
    </svg>
  );
}

export function IcGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" fill="none" stroke="#1A2547" strokeWidth="1.4" />
      <path d="M4 12h16 M12 4v16 M5 8c4 2 10 2 14 0 M5 16c4-2 10-2 14 0" stroke="#1A2547" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function IcFlask() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M10 3h4v5l4 9a2 2 0 0 1-1.8 2.9H7.8A2 2 0 0 1 6 17l4-9V3z"
        fill="#CFE5F7" stroke="#1A2547" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8.6 12.5h6.8L17 16a2 2 0 0 1-1.8 2.9H8.8A2 2 0 0 1 7 16z" fill="#3F86D4" />
      <line x1="9" y1="3" x2="15" y2="3" stroke="#1A2547" strokeWidth="1.4" />
    </svg>
  );
}

export function IcTrophy() {
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
