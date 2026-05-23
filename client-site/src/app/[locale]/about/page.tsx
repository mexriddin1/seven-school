import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, resolveMediaUrl } from '@/lib/api';
import { LeadForm } from '@/components/LeadForm';
import { CountUp } from '@/components/CountUp';

function youtubeShortEmbed(url: string): string {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  return url;
}

// Strip HTML tags from teacher bio (cards want a short plain-text summary).
function bioPreview(html: string | null | undefined, max = 180): string {
  if (!html) return '';
  const plain = String(html)
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

const DEFAULT_SHORTS = [
  'dQw4w9WgXcQ', '3JZ_D3ELwOQ', 'kJQP7kiw5Fk',
  'L_jWHffIx5E', 'fJ9rUzIMcZQ', '9bZkp7q19f0',
  'hTWKbfoikeg', 'kXYiU_JCYtU', '60ItHLz5WEA', 'OPf0YbXqDm0',
];

const GALLERY_FALLBACK = [
  { src: 'https://picsum.photos/seed/sg1/720/480', cls: '' },
  { src: 'https://picsum.photos/seed/sg2/480/600', cls: '' },
  { src: 'https://picsum.photos/seed/sg3/480/800', cls: 'span-row-2' },
  { src: 'https://picsum.photos/seed/sg4/960/480', cls: 'span-col-2' },
  { src: 'https://picsum.photos/seed/sg5/720/480', cls: '' },
  { src: 'https://picsum.photos/seed/sg6/720/480', cls: '' },
  { src: 'https://picsum.photos/seed/sg7/480/800', cls: 'span-row-2' },
  { src: 'https://picsum.photos/seed/sg8/720/480', cls: '' },
  { src: 'https://picsum.photos/seed/sg9/720/480', cls: '' },
];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.about_title, description: dict.meta.about_desc };
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDict(locale);
  const bundle = await fetchSiteBundle(locale);

  const shorts = (bundle.testimonial_videos || []).slice(0, 10);
  const shortEmbeds = shorts.length
    ? shorts.map((v) => youtubeShortEmbed(v.url))
    : DEFAULT_SHORTS.map((id) => `https://www.youtube.com/embed/${id}?rel=0`);

  const teachers = bundle.teachers || [];
  const gallery = (bundle.gallery && bundle.gallery.length)
    ? bundle.gallery.slice(0, 9).map((g, i) => ({
        src: resolveMediaUrl(g.image_url) || GALLERY_FALLBACK[i % GALLERY_FALLBACK.length].src,
        cls: g.size_class || GALLERY_FALLBACK[i % GALLERY_FALLBACK.length].cls,
        alt: g.caption || 'Seven School',
      }))
    : GALLERY_FALLBACK.map((g) => ({ src: g.src, cls: g.cls, alt: 'Seven School' }));

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{d.about.eyebrow}</span>
          <h1>{d.about.title}</h1>
          <p className="lead">{d.about.lead}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>{d.about.who_title}</h2>
              <p dangerouslySetInnerHTML={{ __html: d.about.who_p1_html }} />
              <p dangerouslySetInnerHTML={{ __html: d.about.who_p2_html }} />
              <h3 style={{ marginTop: 32, color: 'var(--orange)', textTransform: 'uppercase' }}>
                {d.about.est_label}
              </h3>
            </div>
            <div className="about-stats">
              {d.about.stats.map((st, i) => (
                <div className="about-stat-big" key={i}>
                  <div className="val"><CountUp value={st.val} /></div>
                  <div className="lbl">{st.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#f8f9fc' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{d.about.shorts_eyebrow}</span>
            <h2>{d.about.shorts_title}</h2>
          </div>
          <div className="shorts-grid">
            {shortEmbeds.map((src, i) => (
              <div className="shorts-card" key={i}>
                <iframe
                  src={src}
                  title={`Shorts ${i + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{d.about.team_eyebrow}</span>
            <h2>{d.about.team_title}</h2>
          </div>
          <div className="team-grid">
            {teachers.map((t) => (
              <div className="team-card" key={t.id}>
                <div className="team-photo">
                  {t.image_url ? (
                    <img src={resolveMediaUrl(t.image_url)} alt={t.name} loading="lazy" />
                  ) : (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="rgba(255,255,255,0.35)"/>
                    </svg>
                  )}
                </div>
                <div className="team-body">
                  <div className="team-role">{t.role}</div>
                  <div className="team-name">{t.name}</div>
                  <div className="team-bio">{bioPreview(t.bio)}</div>
                  <Link href={`/${locale}/ustoz/${t.slug}`} className="team-cta">
                    {d.about.team_cta_label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#f8f9fc' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{d.about.gallery_eyebrow}</span>
            <h2>{d.about.gallery_title}</h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((g, i) => (
              <div className={'gallery-item ' + (g.cls || '')} key={i}>
                <img src={g.src} alt={g.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="lead-form-wrap">
            <div className="section-head">
              <span className="eyebrow">{d.about.lead_eyebrow}</span>
              <h2>{d.about.lead_title}</h2>
              <p className="sub" dangerouslySetInnerHTML={{ __html: d.about.lead_sub_html }} />
            </div>
            <LeadForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
