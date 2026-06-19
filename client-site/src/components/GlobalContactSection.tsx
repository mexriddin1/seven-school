'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { CtaBanner } from './CtaBanner';

export function GlobalContactSection({
  locale,
  settings,
}: {
  locale: Locale;
  settings: Record<string, string>;
}) {
  const pathname = usePathname();
  const hiddenPaths = [`/${locale}/about`, `/${locale}/aloqa`, `/${locale}/thanks`];

  if (hiddenPaths.some((path) => pathname === path || pathname?.startsWith(`${path}?`))) {
    return null;
  }

  return <CtaBanner locale={locale} settings={settings} />;
}
