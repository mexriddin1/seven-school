import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, fetchTeacherBySlug, resolveMediaUrl } from '@/lib/api';
import { CtaBanner } from '@/components/CtaBanner';

type Params = { locale: string; slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const t = await fetchTeacherBySlug(params.slug, params.locale as Locale);
  if (!t) return {};
  return {
    title: `${t.name} — Seven School`,
    description: `${t.name} — ${t.role}`,
  };
}

export default async function UstozDetailPage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  const t = await fetchTeacherBySlug(params.slug, locale);
  if (!t) notFound();

  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;

  const bioHtml = (t.bio || '').trim();

  return (
    <>
      {/* ============= USTOZ DETAIL ============= */}
      <section className="ustoz-detail">
        <div className="container">
          <div className="ustoz-grid">
            <div className="ustoz-avatar">
              <div
                className="ustoz-photo"
                style={{ backgroundImage: `url('${resolveMediaUrl(t.image_url)}')` }}
              ></div>
            </div>
            <div className="ustoz-info">
              <h2>{t.name}</h2>
              <p className="ustoz-role">{t.role}</p>
              <div dangerouslySetInnerHTML={{ __html: bioHtml }} />
              <div className="ustoz-meta">
                {(t.meta || []).map((m, i) => (
                  <div key={i} className="meta-item">
                    <span className="meta-label">{m.label}</span>
                    <span className="meta-value">{m.value}</span>
                  </div>
                ))}
              </div>
              <Link href={`/${locale}/about#team`} className="btn btn-outline">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16, marginRight: 6, verticalAlign: 'middle' }}
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                {dict.sections.all_teachers}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============= CTA BANNER ============= */}
      <CtaBanner locale={locale} settings={s} showMap={false} />
    </>
  );
}
