import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, resolveMediaUrl, API_BASE } from '@/lib/api';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';

// ---------------------------------------------------------------------------
// Inline SVG icons copied verbatim from seven-school/about.html (reference).
// JSX-ized: class -> className, stroke-width -> strokeWidth.
// ---------------------------------------------------------------------------

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="5"/><path d="M3 21.8c0-3.5 4-6.3 9-6.3s9 2.8 9 6.3"/></svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
  );
}
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
  );
}
function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
  );
}

// Map about_stats icon_key -> icon component, with a default order fallback.
const statIconMap: Record<string, () => React.JSX.Element> = {
  clock: IconClock,
  user: IconUser,
  users: IconUsers,
  certificate: IconUser,
  layers: IconLayers,
  alert: IconAlert,
};

// Default order for the 5 stat icons (matches reference order).
const defaultStatIcons = [IconClock, IconUsers, IconUser, IconLayers, IconAlert];

// Reference defaults (used as fallback when DB has fewer than 5 stats_about rows).
type StatRow = {
  id: number | string;
  prefix: string;
  value: string;
  suffix: string;
  label: string;
  icon_key?: string | null;
};
const defaultStatRows: StatRow[] = [
  { id: 'd-1', prefix: '', value: '2024', suffix: '', label: 'yilda ochildi', icon_key: 'clock' },
  { id: 'd-2', prefix: '', value: '29', suffix: '+', label: 'medal — olimpiada natijalari', icon_key: 'users' },
  { id: 'd-3', prefix: '', value: '15', suffix: '+', label: 'ustoz', icon_key: 'user' },
  { id: 'd-4', prefix: '', value: '6', suffix: '', label: "ta to'garak", icon_key: 'layers' },
  { id: 'd-5', prefix: '', value: '500', suffix: '+', label: 'soat sport — yillik dastur', icon_key: 'alert' },
];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.about_title, description: dict.meta.about_desc };
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;

  const seed = (p: string) => `${API_BASE}/uploads/seed/${p}`;

  // About card rows (right column of "Biz kimmiz?" section).
  const aboutCardRows = (bundle.about_stats || []).filter(
    (st) => st.page === 'about_about' || st.page === 'both'
  );

  // Stats grid rows — bind to about_stats where page='stats_about'.
  // If DB has fewer than 5, fill remaining slots with reference defaults.
  const dbStatRows = (bundle.about_stats || []).filter((st) => st.page === 'stats_about');
  const statRows: StatRow[] = [];
  for (let i = 0; i < 5; i++) {
    if (dbStatRows[i]) {
      const r = dbStatRows[i];
      statRows.push({
        id: r.id,
        prefix: r.prefix,
        value: r.value,
        suffix: r.suffix,
        label: r.label,
        icon_key: (r as unknown as { icon_key?: string }).icon_key || null,
      });
    } else {
      statRows.push(defaultStatRows[i]);
    }
  }

  return (
    <>
      {/* ============= PAGE HERO ============= */}
      <PageHero
        locale={locale}
        eyebrow={dict.page_eyebrows.about}
        title={s['about_page.hero_title'] || dict.nav.about}
        showCrumbs={false}
      />

      {/* ============= ABOUT =============
          Matnlar dictionary'dan (UZ/RU/EN), HTML manbai bilan bir xil. */}
      <section className="about">
        <div className="container about-grid">
          <div className="reveal">
            <span className="eyebrow">{dict.about_page.eyebrow}</span>
            <h2>{dict.about_page.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: dict.about_page.p1_html }} />
            <p dangerouslySetInnerHTML={{ __html: dict.about_page.p2_html }} />
          </div>
          <div className="about-card reveal delay-1">
            <div className="row">
              <span className="lbl">{dict.about_page.card_founded_lbl}</span>
              <span className="val"><span className="accent">{dict.about_page.card_founded_val}</span></span>
            </div>
            <div className="row">
              <span className="lbl">{dict.about_page.card_class_lbl}</span>
              <span className="val"><span className="accent">{dict.about_page.card_class_val}</span> {dict.about_page.card_class_suffix}</span>
            </div>
            <div className="row">
              <span className="lbl">{dict.about_page.card_teachers_lbl}</span>
              <span className="val"><span className="accent">{dict.about_page.card_teachers_val}</span> {dict.about_page.card_teachers_suffix}</span>
            </div>
            <div className="row">
              <span className="lbl">{dict.about_page.card_medals_lbl}</span>
              <span className="val"><span className="accent">{dict.about_page.card_medals_val}</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ============= STATS =============
          Matnlar dictionary'dan (HTML manbai bilan bir xil). */}
      <section className="stats">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{dict.about_page.stats_eyebrow}</span>
            <h2>{dict.about_page.stats_title}</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-item reveal">
              <div className="stat-icon"><IconClock /></div>
              <span className="stat-big">{dict.about_page.stat_year_val}</span>
              <span className="stat-label">{dict.about_page.stat_year_lbl}</span>
            </div>
            <div className="stat-item reveal delay-1">
              <div className="stat-icon"><IconUser /></div>
              <span className="cu" data-target={dict.about_page.stat_medals_val}>0</span>
              <span className="suffix">{dict.about_page.stat_medals_suffix}</span>
              <span className="stat-label">{dict.about_page.stat_medals_lbl}</span>
            </div>
            <div className="stat-item reveal delay-2">
              <div className="stat-icon"><IconUsers /></div>
              <span className="cu" data-target={dict.about_page.stat_teachers_val}>0</span>
              <span className="suffix">{dict.about_page.stat_teachers_suffix}</span>
              <span className="stat-label">{dict.about_page.stat_teachers_lbl}</span>
            </div>
            <div className="stat-item reveal delay-1">
              <div className="stat-icon"><IconLayers /></div>
              <span className="stat-big">{dict.about_page.stat_clubs_val}</span>
              <span className="stat-label">{dict.about_page.stat_clubs_lbl}</span>
            </div>
            <div className="stat-item reveal delay-2">
              <div className="stat-icon"><IconAlert /></div>
              <span className="cu" data-target={dict.about_page.stat_sport_val}>0</span>
              <span className="suffix">{dict.about_page.stat_sport_suffix}</span>
              <span className="stat-label">{dict.about_page.stat_sport_lbl}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============= TESTIMONIALS (VIDEO) ============= */}
      <section className="testimonials">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{dict.sections.parents_say_eyebrow}</span>
            <h2>{dict.sections.parents_say_title}</h2>
          </div>
          <div className="video-wrap reveal delay-1">
            <button className="scroll-arrow scroll-left" aria-label={dict.scroll_left}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="scroll-arrow scroll-right" aria-label={dict.scroll_right}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="video-testimonials">
              {bundle.testimonial_videos.map((v) => (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card"
                  aria-label={v.name || 'Video'}
                >
                  <div
                    className="video-thumb"
                    style={{ backgroundImage: `url('${resolveMediaUrl(v.thumbnail_url) || seed('img/ustoz-mansur.png')}')` }}
                  >
                    <div className="video-play">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= TEAM ============= */}
      <section className="team" id="team">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{dict.sections.team_eyebrow}</span>
            <h2>{dict.sections.team_title}</h2>
            <p className="lead" style={{ maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
              {dict.sections.team_lead}
            </p>
          </div>
          <div className="team-row">
            {bundle.teachers.map((t, i) => (
              <Link
                key={t.id}
                href={`/${locale}/ustoz/${t.slug}`}
                className={`team-card reveal${i ? ' delay-' + (i % 4) : ''}`}
              >
                <div
                  className="team-img"
                  style={{ backgroundImage: `url('${resolveMediaUrl(t.image_url) || seed('img/ustoz-mansur.png')}')` }}
                ></div>
                <div className="team-info">
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                  <span className="team-more">
                    {dict.sections.teacher_more}{' '}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============= GALLERY ============= */}
      <section className="gallery">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{dict.sections.gallery_eyebrow}</span>
            <h2>{dict.sections.gallery_title}</h2>
          </div>
          <div className="masonry reveal delay-1">
            {bundle.gallery.map((g) => (
              <div
                key={g.id}
                className={`tile ${g.size_class || ''}`.trim()}
                style={
                  g.image_url
                    ? {
                        backgroundImage: `url('${resolveMediaUrl(g.image_url)}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : undefined
                }
              >
                {!g.image_url && <div className="glyph">S</div>}
                <div className="overlay">{g.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CTA BANNER ============= */}
      <CtaBanner locale={locale} settings={s} />
    </>
  );
}
