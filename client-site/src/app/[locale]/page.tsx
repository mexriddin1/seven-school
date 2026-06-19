import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, resolveMediaUrl } from '@/lib/api';
import { HeroCarousel } from '@/components/HeroCarousel';
import { TogarakCarousel } from '@/components/TogarakCarousel';
import { CountUp } from '@/components/CountUp';
import {
  EcoIllu1, EcoIllu2, EcoIllu3,
  ECO_ICONS_1, ECO_ICONS_2, ECO_ICONS_3,
} from '@/components/EcoArt';

const CURRICULUM_IMAGES = [
  'https://picsum.photos/seed/it-a/900/560',
  'https://picsum.photos/seed/eng-a/900/560',
  'https://picsum.photos/seed/arab-a/900/560',
  'https://picsum.photos/seed/steam-a/900/560',
  'https://picsum.photos/seed/critical-a/900/560',
  'https://picsum.photos/seed/hayot-a/900/560',
];

const KIDS_IMAGES = [
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=480&h=320&fit=crop',
];

const FALLBACK_PLANS = (d: ReturnType<typeof getDict>) => [
  {
    id: 0, amount: '3 990 000', currency: "so'm/oy", is_featured: 0, sort_order: 0,
    label: d.home.eco[0].age, includes: "Barcha mashg'ulotlar|Nonushta va tushlik|Tolmachoy|Ota-ona ilovasi",
    note: "Bog'cha guruhi", cta_label: d.home.pricing_cta,
  },
  {
    id: 1, amount: '4 590 000', currency: "so'm/oy", is_featured: 1, sort_order: 1,
    label: 'Pre-School', includes: "Barcha mashg'ulotlar|Nonushta va tushlik|Tolmachoy|Ota-ona ilovasi",
    note: 'Tayyorlov guruhi', cta_label: d.home.pricing_cta,
  },
  {
    id: 2, amount: '5 590 000', currency: "so'm/oy", is_featured: 0, sort_order: 2,
    label: '1–4-sinf', includes: 'Barcha fanlar|3 ta sport mashg\'uloti|4 mahal ovqat|Mentor va Tutor tizimi|Ota-ona ilovasi',
    note: "Natijador o'quvchilar uchun stipendiya mavjud.", cta_label: d.home.pricing_cta,
  },
];

const DEFAULT_PARENT_VIDEOS = [
  'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&controls=1',
  'https://www.youtube.com/embed/3JZ_D3ELwOQ?rel=0&controls=1',
  'https://www.youtube.com/embed/kJQP7kiw5Fk?rel=0&controls=1',
];

function youtubeEmbed(url: string): string {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&controls=1`;
  return url;
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.home_title, description: dict.meta.home_desc };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  return HomeContent({ params });
}

type HomeVariant = 'default' | 'short-landing' | 'long-landing';

function ContactAction({
  isLanding,
  className,
  children,
}: {
  isLanding: boolean;
  className: string;
  children: ReactNode;
}) {
  if (isLanding) {
    return (
      <a href="#contact" className={className} data-popup-skip="true">
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} data-popup-open>
      {children}
    </button>
  );
}

export async function HomeContent({
  params,
  variant = 'default',
}: {
  params: { locale: string };
  variant?: HomeVariant;
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDict(locale);
  const bundle = await fetchSiteBundle(locale);
  const isShortLanding = variant === 'short-landing';
  const isLanding = variant !== 'default';
  const s = bundle.settings || {};

  const heroSlides = bundle.carousel
    .map((c) => resolveMediaUrl(c.image_url))
    .filter(Boolean) as string[];

  // Prefer backend-driven content; fall back to dictionary defaults if a list is empty.
  const ecoStages = (bundle.eco_stages || []).length
    ? bundle.eco_stages.map((s) => ({ step: s.step_label, title: s.title, age: s.age, desc: s.description }))
    : d.home.eco;

  const kidsFeatures = (bundle.kids_features || []).length
    ? bundle.kids_features.map((k) => ({ title: k.title, desc: k.description, imageUrl: resolveMediaUrl(k.image_url) }))
    : d.home.kids.map((k, i) => ({ ...k, imageUrl: KIDS_IMAGES[i % KIDS_IMAGES.length] }));

  const togaraks = (bundle.togaraks || []).length
    ? bundle.togaraks.map((t) => ({ title: t.title, imageUrl: resolveMediaUrl(t.image_url) }))
    : d.home.togarak.map((t) => ({ title: t.title, imageUrl: '' }));
  const togarakEyebrow = s['home.togarak_eyebrow'] || d.home.togarak_eyebrow;
  const togarakTitle = s['home.togarak_title'] || d.home.togarak_title;
  const togarakSub = s['home.togarak_sub'] || d.home.togarak_sub;

  const curriculum = (bundle.curriculum_items || []).length
    ? bundle.curriculum_items.map((c) => ({ title: c.title, desc: c.description, imageUrl: resolveMediaUrl(c.image_url) }))
    : d.home.curriculum.map((c, i) => ({ ...c, imageUrl: CURRICULUM_IMAGES[i % CURRICULUM_IMAGES.length] }));

  const individualStats = (bundle.individual_stats || []).length
    ? bundle.individual_stats.map((s) => ({ num: s.num, lbl: s.lbl, sub: s.sub || '' }))
    : d.home.individual_stats;

  const scheduleTimes = (bundle.schedule_items || []).filter((s) => s.kind === 'time');
  const scheduleExtra = (bundle.schedule_items || []).find((s) => s.kind === 'extra') || null;
  const useScheduleFromBundle = scheduleTimes.length > 0;

  const lessonBlocks = bundle.lesson_blocks || [];

  const pricingPlans = (bundle.pricing_plans && bundle.pricing_plans.length >= 3)
    ? bundle.pricing_plans.slice(0, 3)
    : FALLBACK_PLANS(d);

  const parentVideos = (bundle.testimonial_videos && bundle.testimonial_videos.length >= 3)
    ? bundle.testimonial_videos.slice(0, 3).map((v) => youtubeEmbed(v.url))
    : DEFAULT_PARENT_VIDEOS;

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="hero">
        <HeroCarousel slides={heroSlides} />
        <div className="container hero-inner">
          <div className="pill"><span className="dot" />{d.home.pill}</div>
          <h1>
            {d.home.title_line1}<br />
            {d.home.title_line2_pre}{' '}
            <span className="accent">{d.home.title_line2_accent}</span>
          </h1>
          <p className="lead">{d.home.lead}</p>
          <div className="hero-actions">
            <ContactAction isLanding={isLanding} className="btn btn-primary btn-lg">
              {d.home.cta_primary}
            </ContactAction>
            <a href="#ecosystem" className="btn btn-ghost" data-popup-skip="true">
              {d.home.cta_secondary}
            </a>
          </div>
          <div className="hero-stats">
            {(d.home.stats).map((st, i) => (
              <div className="hero-stat" key={i}>
                <div className="num"><CountUp value={st.num} /></div>
                <div className="lbl">{st.lbl}</div>
                <div className="sub">{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== ECOSYSTEM ============== */}
      <section id="ecosystem">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{d.home.eco_eyebrow}</span>
            <h2>{d.home.eco_title}</h2>
            <p className="sub">{d.home.eco_sub}</p>
          </div>
          <div className="eco-grid">
            {ecoStages.map((c, i) => (
              <div className={`eco-card eco-card--v${i + 1}`} key={i}>
                <div className="eco-card__body">
                  <div className="eco-card__text">
                    <div className="eco-step">{c.step}</div>
                    <h3>{c.title}</h3>
                    <div className="eco-age">{c.age}</div>
                    <p>{c.desc}</p>
                  </div>
                  <div className="eco-card__illu" aria-hidden="true">
                    {i === 0 && <EcoIllu1 />}
                    {i === 1 && <EcoIllu2 />}
                    {i === 2 && <EcoIllu3 />}
                  </div>
                </div>
                <div className="eco-card__icons" aria-hidden="true">
                  {(i === 0 ? ECO_ICONS_1 : i === 1 ? ECO_ICONS_2 : ECO_ICONS_3).map((Icon, k) => (
                    <span className="eco-chip" key={k}><Icon /></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SEVEN KIDS (2x2) ============== */}
      <section style={{ background: '#f8f9fc' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{d.home.kids_eyebrow}</span>
            <h2 dangerouslySetInnerHTML={{ __html: d.home.kids_title_html }} />
            <p className="sub">{d.home.kids_sub}</p>
          </div>
          <div className="features-grid kids-grid">
            {kidsFeatures.map((k, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-image">
                  <img src={k.imageUrl || KIDS_IMAGES[i % KIDS_IMAGES.length]} alt={k.title} />
                </div>
                <div className="feat-content">
                  <h3>{k.title}</h3>
                  <p>{k.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TO'GARAKLAR ============== */}
      <section className="togarakarlar-carousel" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{togarakEyebrow}</span>
            <h2>{togarakTitle}</h2>
            <p className="sub">{togarakSub}</p>
          </div>
        </div>
        <div className="container">
          <TogarakCarousel items={togaraks} />
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className="pricing">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{d.home.pricing_eyebrow}</span>
            <h2>{d.home.pricing_title}</h2>
            <p className="sub">{d.home.pricing_sub}</p>
          </div>
          <div className="price-layout">
            <div className="plans-grid">
              {pricingPlans.map((p, idx) => {
                const features = (p.includes || '').split('|').map((x) => x.trim()).filter(Boolean);
                const isFeatured = idx === 1 || p.is_featured === 1;
                return (
                  <article key={p.id} className={'plan-card' + (isFeatured ? ' featured' : '')}>
                    <h3 className="plan-title">{p.label}</h3>
                    <div className="plan-price">
                      {p.amount} <span>{p.currency}</span>
                    </div>
                    {p.note && <div className="plan-subtitle">{p.note}</div>}
                    <ul className="plan-features">
                      {features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </article>
                );
              })}
            </div>
            <div className="price-cta">
              <ContactAction isLanding={isLanding} className="btn btn-primary btn-lg">
                {d.home.pricing_cta}
              </ContactAction>
            </div>
          </div>
        </div>
      </section>

      {/* ============== SCHOOL CURRICULUM ============== */}
      <section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{d.home.curriculum_eyebrow}</span>
            <h2>{d.home.curriculum_title}</h2>
            <p className="sub">{d.home.curriculum_sub}</p>
          </div>
          <div className="school-curriculum-grid">
            {curriculum.map((c, i) => (
              <article className="school-curriculum-item" key={i}>
                <div className="curriculum-media">
                  <img src={c.imageUrl || CURRICULUM_IMAGES[i % CURRICULUM_IMAGES.length]} alt={c.title} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
          <div className="section-head individual-head"><h3>{d.home.individual_title}</h3></div>
          <div className="hero-stats individual-hero-stats">
            {individualStats.map((st, i) => (
              <div className="hero-stat" key={i}>
                <div className="num"><CountUp value={st.num} /></div>
                <div className="lbl">{st.lbl}</div>
                <div className="sub">{st.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isShortLanding && (
        <>
          {/* ============== DAILY SCHEDULE ============== */}
          <section style={{ background: '#f8f9fc' }}>
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">{d.home.schedule_eyebrow}</span>
                <h2>{d.home.schedule_title}</h2>
              </div>
              <div className="schedule-grid">
                {useScheduleFromBundle
                  ? scheduleTimes.map((sc) => (
                      <div className="schedule-item" key={sc.id}>
                        <div className="schedule-time">{sc.time_label}</div>
                        <div className="schedule-desc">{sc.description}</div>
                      </div>
                    ))
                  : d.home.schedule.map((sc, i) => (
                      <div className="schedule-item" key={i}>
                        <div className="schedule-time">{sc.time}</div>
                        <div className="schedule-desc">{sc.desc}</div>
                      </div>
                    ))}
                <div className="schedule-item schedule-extra">
                  <div className="schedule-extra-title">{scheduleExtra?.title || d.home.schedule_extra_title}</div>
                  <div className="schedule-extra-desc">{scheduleExtra?.description || d.home.schedule_extra_desc}</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ============== PARENT VIDEOS ============== */}
      <section className="parents-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{d.home.parents_eyebrow}</span>
            <h2>{d.home.parents_title}</h2>
            <p className="sub">{d.home.parents_sub}</p>
          </div>
          <div className="videos-grid">
            {parentVideos.map((src, i) => (
              <div className="video-card" key={i}>
                <div className="video-wrap">
                  <iframe
                    src={src}
                    title={`Parent video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="disclaimer" role="status">
            <div className="text">{d.home.parents_disclaimer}</div>
            <ContactAction isLanding={isLanding} className="btn btn-primary">
              {d.home.parents_cta}
            </ContactAction>
          </div>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="cta-section">
        <div className="container">
          <h2>{d.home.cta_h2}</h2>
          <p dangerouslySetInnerHTML={{ __html: d.home.cta_p_html }} />
          <ContactAction isLanding={isLanding} className="btn btn-primary btn-lg">
            {d.home.cta_btn}
          </ContactAction>
          <p className="cta-note">{d.home.cta_note}</p>
        </div>
      </section>
    </>
  );
}
