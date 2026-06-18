import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle } from '@/lib/api';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.lessons_title, description: dict.meta.lessons_desc };
}

export default async function LessonsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDict(locale).lessons;
  const bundle = await fetchSiteBundle(locale);

  const blocks = (bundle.lesson_blocks || []).length
    ? bundle.lesson_blocks.map((b) => ({
        icon: b.icon || '✦',
        title: b.title,
        desc: b.description,
        tags: Array.isArray(b.tags) ? b.tags : [],
      }))
    : d.blocks;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{d.eyebrow}</span>
          <h1 dangerouslySetInnerHTML={{ __html: d.title_html }} />
          <p className="lead">{d.lead}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="lessons-grid">
            {blocks.map((b, i) => (
              <div className="lesson-block" key={i}>
                <div className="lesson-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <div className="lesson-tags">
                  {(b.tags || []).map((t: string) => <span className="lesson-tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: '#fff' }} dangerouslySetInnerHTML={{ __html: d.dark_h2_html }} />
          <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 600, margin: '20px auto 32px', fontSize: '1rem', lineHeight: 1.7 }}>
            {d.dark_p}
          </p>
          <button type="button" className="btn btn-primary btn-lg" data-popup-open>{d.dark_btn}</button>
        </div>
      </section>
    </>
  );
}
