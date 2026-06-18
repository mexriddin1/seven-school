import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchTeacherBySlug, resolveMediaUrl } from '@/lib/api';

function stripHtml(html: string | null | undefined): string {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  try {
    const t = await fetchTeacherBySlug(params.slug, params.locale as Locale);
    if (t) return { title: `${t.name} — Seven School`, description: stripHtml(t.bio) };
  } catch {}
  return {};
}

export default async function TeacherDetailPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDict(locale);

  const t = await fetchTeacherBySlug(params.slug, locale);
  if (!t) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{d.about.team_eyebrow}</span>
          <h1>{t.name}</h1>
          <p className="lead">{t.role}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="teacher-detail teacher-detail-grid">
            <div className="teacher-detail-photo">
              {t.image_url ? (
                <img src={resolveMediaUrl(t.image_url)} alt={t.name} />
              ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="rgba(255,255,255,0.55)" />
                </svg>
              )}
            </div>
            <div className="teacher-detail-info">
              <div className="team-role">{t.role}</div>
              <h1>{t.name}</h1>
              {t.bio && <div className="teacher-bio" dangerouslySetInnerHTML={{ __html: t.bio }} />}
              {t.meta && t.meta.length > 0 && (
                <div className="teacher-meta">
                  {t.meta.map((m, i) => (
                    <div className="teacher-meta-item" key={i}>
                      <div className="teacher-meta-label">{m.label}</div>
                      <div className="teacher-meta-value">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}
              <p style={{ marginTop: 28 }}>
                <Link href={`/${locale}/about#team`} className="team-cta" data-popup-skip="true">
                  {d.blog.back}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
