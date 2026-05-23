'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { resolveMediaUrl } from '@/lib/api';

// Single-image logo, kept "as-is" from the previous site. The new design's
// navbar is light/floating, so we always render the dark-coloured ("Light.png")
// variant. The footer is dark, so the existing CSS filter inverts it.
export function Logo({
  locale,
  lightUrl,
  darkUrl,
  brand,
  variant = 'header',
}: {
  locale: Locale;
  lightUrl?: string | null;
  darkUrl?: string | null;
  brand?: string;
  variant?: 'header' | 'footer';
}) {
  // File-naming reality (kept from original code):
  //   "Light.png" = the DARK-coloured logo (for white/light backgrounds)
  //   "Dark.png"  = the LIGHT/white logo (for dark backgrounds)
  const onLightBg = resolveMediaUrl(darkUrl || '/uploads/seed/Logo/Light.png');
  const onDarkBg  = resolveMediaUrl(lightUrl || '/uploads/seed/Logo/Dark.png');
  const alt = brand || 'Seven School';
  const home = `/${locale}`;
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === home || pathname === home + '/';

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (onHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(home);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 50);
    }
  }

  const src = variant === 'footer' ? onDarkBg : onLightBg;

  return (
    <Link className={variant === 'footer' ? 'logo' : 'nav-logo'} href={home} aria-label={alt} onClick={handleClick}>
      <img src={src} alt={alt} />
    </Link>
  );
}
