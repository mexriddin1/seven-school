import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';

export function PageHero({
  locale, eyebrow, title, lead, crumbExtra, showCrumbs = true,
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbExtra?: string;
  showCrumbs?: boolean;
}) {
  const dict = getDict(locale);
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        {showCrumbs && (
          <div className="crumbs">
            <Link href={`/${locale}`}>{dict.nav.home}</Link>
            <span className="sep">/</span>
            {crumbExtra && <span>{crumbExtra}</span>}
          </div>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {lead && <p className="lead" dangerouslySetInnerHTML={{ __html: lead }} />}
      </div>
    </section>
  );
}
