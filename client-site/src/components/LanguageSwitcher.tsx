'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { LOCALES, type Locale, isLocale, LOCALE_SHORT } from '@/i18n/config';

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = useCallback((target: Locale) => {
    if (target === current) return;
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
    }
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] && isLocale(segments[0])) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    router.push('/' + segments.join('/'));
  }, [current, pathname, router]);

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          className={loc === current ? 'active' : undefined}
          aria-pressed={loc === current}
          onClick={() => switchTo(loc)}
        >
          {LOCALE_SHORT[loc]}
        </button>
      ))}
    </div>
  );
}
