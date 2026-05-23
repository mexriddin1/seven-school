'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ locale, settings }: { locale: Locale; settings: Record<string, string> }) {
  const dict = getDict(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === `/${locale}`) return pathname === href || pathname === href + '/';
    return pathname === href || pathname?.startsWith(href + '/');
  }

  const links = [
    { href: `/${locale}`,             label: dict.nav.home },
    { href: `/${locale}/about`,       label: dict.nav.about },
    { href: `/${locale}/mashgulotlar`, label: dict.nav.lessons },
    { href: `/${locale}/blog`,        label: dict.nav.blog },
    { href: `/${locale}/aloqa`,       label: dict.nav.contact },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Logo
          locale={locale}
          brand={settings['brand.name']}
          lightUrl={settings['brand.logo_light_url']}
          darkUrl={settings['brand.logo_dark_url']}
        />
        <div className={'nav-menu' + (open ? ' open' : '')} id="navMenu">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? 'active' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <LanguageSwitcher current={locale} />
          <button
            className="hamburger"
            aria-label={dict.open_menu}
            onClick={() => setOpen(!open)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
