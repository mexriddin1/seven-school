import type { Metadata } from 'next';
import type React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, resolveMediaUrl, API_BASE } from '@/lib/api';
import { LogoCarousel } from '@/components/LogoCarousel';
import { ImgCarousel } from '@/components/ImgCarousel';
import { CtaBanner } from '@/components/CtaBanner';

// ---------------------------------------------------------------------------
// Inline SVG icons copied verbatim from seven-school/index.html (reference).
// Class -> className, stroke-width -> strokeWidth, self-closed empty tags.
// ---------------------------------------------------------------------------

function IconPeople() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>
  );
}
function IconBars() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
  );
}
function IconGradCap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/></svg>
  );
}
function IconSparkles() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/></svg>
  );
}
function IconDocument() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg>
  );
}
function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"/></svg>
  );
}
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>
  );
}
function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M17.72 6.28l1.06-1.06"/><circle cx="12" cy="12" r="4"/></svg>
  );
}

// Map advantage icon_key -> icon. Reference uses 6 icons in this order:
// people, bars, gradcap, sparkles, document, building
const advIconMap: Record<string, () => React.JSX.Element> = {
  people: IconPeople,
  bars: IconBars,
  graduation: IconGradCap,
  gradcap: IconGradCap,
  sparkles: IconSparkles,
  document: IconDocument,
  building: IconBuilding,
};

// Map award icon_key (or default by index) -> stage marker SVG used in stages section.
const stageIcons = [IconSun, IconBook, IconSparkles, IconGradCap];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.home_title, description: dict.meta.home_desc };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;

  const phone = s['contact.phone'] || '+998 55 555 80 80';
  const phoneLink = s['contact.phone_link'] || phone.replace(/\D/g, '');

  const seed = (p: string) => `${API_BASE}/uploads/seed/${p}`;

  const indexUnis = bundle.universities.filter((u) => u.page === 'index' || u.page === 'both');
  const indexFaqs = bundle.faqs.filter((f) => f.page === 'index' || f.page === 'both');

  const pricingPlans = (bundle.pricing_plans || []).length
    ? bundle.pricing_plans
    : [{
        id: 0,
        amount: s['pricing.amount'] || '6 600 000',
        currency: s['pricing.currency'] || "so'm",
        is_featured: 1,
        sort_order: 0,
        label: s['pricing.label'] || "Bog'cha va maktab uchun:",
        note: s['pricing.note'] || '*Chegirmalar ham mavjud',
        includes: s['pricing.includes'] || [
          'Barcha akademik fanlar',
          'Ingliz, rus va arab tillari',
          "3 ta majburiy sport: suzish, taekvondo, gimnastika",
          "To'garaklar va qo'shimcha mashg'ulotlar",
        ].join('|'),
        cta_label: s['pricing.cta'] || 'Ariza topshirish →',
      }];

  // Stages (TODO: backend can later add a `stages` settings group / table).
  const stages = [
    {
      age: s['stages.s1_age'] || '4–6 yosh',
      title: s['stages.s1_title'] || 'Pre-school',
      desc: s['stages.s1_desc'] || "O'qish-yozish, mantiqiy fikrlash, ijtimoiy ko'nikmalar",
    },
    {
      age: s['stages.s2_age'] || '1–4 sinf',
      title: s['stages.s2_title'] || "Boshlang'ich",
      desc: s['stages.s2_desc'] || "Akademik baza, til o'rganish, 3 ta majburiy sport",
    },
    {
      age: s['stages.s3_age'] || '5–7 sinf',
      title: s['stages.s3_title'] || "O'rta",
      desc: s['stages.s3_desc'] || 'STEM amaliyoti, AI, tanqidiy fikrlash va liderlik',
    },
    {
      age: s['stages.s4_age'] || '7-sinfdan keyin',
      title: s['stages.s4_title'] || 'Sodiq School',
      desc: s['stages.s4_desc'] || 'Xalqaro universitetlarga tayyorgarlik',
    },
  ];

  return (
    <>
      {/* ============= 1. HERO ============= */}
      <section className="hero" id="top">
        <div className="hero-particles" id="heroParticles"></div>
        <div className="container hero-inner">
          <span className="pill reveal">
            <span className="dot"></span>
            {s['hero.pill'] || 'Qabul 2026–2027 ochiq · Joylar cheklangan'}
          </span>
          <h1 className="reveal delay-1">
            <span className="hero-line">{s['hero.title_main'] || 'Hammasini'}</span>
            <span className="hero-line">
              <span className="accent">{s['hero.title_accent'] || 'bitta maktabda'}</span>
              {(s['hero.title_suffix'] || 'oladi') && (
                <> {s['hero.title_suffix'] || 'oladi'}</>
              )}
            </span>
          </h1>
          <p
            className="lead reveal delay-2"
            dangerouslySetInnerHTML={{
              __html:
                s['hero.lead'] ||
                "Seven School'da bilim, sport va sun'iy intellekt darslari birgalikda o'tiladi. Farzandingiz kerak bo'lgan hamma narsani <strong>shu yerdan</strong> oladi.",
            }}
          />
          <div className="hero-actions reveal delay-3">
            <Link href={`/${locale}/aloqa`} className="btn btn-primary btn-large">
              {s['hero.cta_primary'] || 'Bepul maslahat olish →'}
            </Link>
            <Link href={`/${locale}/natijalar`} className="text-link on-dark">
              {s['hero.cta_secondary'] || "Natijalar bilan tanishing ↓"}
            </Link>
          </div>

          <div className="hero-stats reveal delay-4">
            <div className="hero-stat">
              <div className="num">
                <span className="cu" data-target={s['hero.stat_medals_value'] || '29'}>0</span>+
              </div>
              <div className="lbl">{s['hero.stat_medals_label'] || 'Medal'}</div>
              <div className="sub">{s['hero.stat_medals_sub'] || 'Birinchi yilda olimpiadalardan'}</div>
            </div>
            <div className="hero-stat">
              <div className="num">{s['hero.stat_students_value'] || '18–22'}</div>
              <div className="lbl">{s['hero.stat_students_label'] || "O'quvchi"}</div>
              <div className="sub">{s['hero.stat_students_sub'] || "Har sinfda — individual e'tibor"}</div>
            </div>
            <div className="hero-stat">
              <div className="num">{s['hero.stat_sports_value'] || '4+'}</div>
              <div className="lbl">{s['hero.stat_sports_label'] || 'Sport'}</div>
              <div className="sub">{s['hero.stat_sports_sub'] || 'Suzish, taekvondo, gimnastika'}</div>
            </div>
            <div className="hero-stat">
              <div className="num">{s['hero.stat_ai_value'] || '5-sinf'}</div>
              <div className="lbl">{s['hero.stat_ai_label'] || 'AI darslari'}</div>
              <div className="sub">{s['hero.stat_ai_sub'] || "Sun'iy intellekt erta yoshdan"}</div>
            </div>
            <div className="hero-stat">
              <div className="num">{s['hero.stat_age_value'] || '4 yosh'}</div>
              <div className="lbl">{s['hero.stat_age_label'] || 'dan'}</div>
              <div className="sub">{s['hero.stat_age_sub'] || 'Universitetgacha yo\'l'}</div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator"><div className="arrow"></div></div>
      </section>

      {/* ============= 2. BIZ KIMMIZ (ABOUT) =============
          Matnlar dictionary'dan (UZ/RU/EN). CMS bu joyga ta'sir qilmaydi —
          kontent HTML manbai bilan bir xil. O'zgartirish uchun `dictionaries.ts` -> home_about ni tahrir qiling. */}
      <section className="about" id="about">
        <div className="container about-grid">
          <div className="reveal">
            <span className="eyebrow">{dict.home_about.eyebrow}</span>
            <h2>{dict.home_about.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: dict.home_about.p1_html }} />
            <p dangerouslySetInnerHTML={{ __html: dict.home_about.p2_html }} />
            <Link href={`/${locale}/about`} className="text-link">
              {dict.home_about.cta}
            </Link>
          </div>
          <div className="about-card reveal delay-1">
            <div className="row">
              <span className="lbl">{dict.home_about.card_founded}</span>
              <span className="val"><span className="accent">2024</span></span>
            </div>
            <div className="row">
              <span className="lbl">{dict.home_about.card_class_size_lbl}</span>
              <span className="val"><span className="accent">{dict.home_about.card_class_size_val}</span> {dict.home_about.card_class_size_suffix}</span>
            </div>
            <div className="row">
              <span className="lbl">{dict.home_about.card_teachers_lbl}</span>
              <span className="val"><span className="accent">{dict.home_about.card_teachers_val}</span> {dict.home_about.card_teachers_suffix}</span>
            </div>
            <div className="row">
              <span className="lbl">{dict.home_about.card_medals_lbl}</span>
              <span className="val"><span className="accent">{dict.home_about.card_medals_val}</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ============= 3.5 OTA-ONALAR FIKRI (VIDEO TESTIMONIALS) ============= */}
      <section className="testimonials video-testimonials-section">
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

      {/* ============= 4. TOP STUDENTS ============= */}
      <section className="top-students">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{dict.sections.top_students_eyebrow}</span>
            <h2>{s['top_students.title'] || dict.sections.top_students_title || "Birinchi yiliyoq natija ko'rsatdik"}</h2>
          </div>
          <div className="top-students-grid">
            {bundle.top_students.map((t, i) => (
              <div
                key={t.id}
                className={`top-student-card reveal${i ? ' delay-' + Math.min(i, 3) : ''}`}
                data-tilt=""
              >
                <div
                  className="top-student-img"
                  style={{ backgroundImage: `url('${resolveMediaUrl(t.image_url) || seed('img/ustoz-mansur.png')}')` }}
                >
                  <div className="top-student-grant glow">{t.grant_label}</div>
                </div>
                <div className="top-student-body">
                  <div className="top-student-uni">{t.university}</div>
                  <div className="top-student-name">{t.name}</div>
                  <p>{t.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="results-cta reveal">
            <Link href={`/${locale}/natijalar`} className="btn btn-outline">
              {dict.sections.all_results || "Barcha natijalarni ko'rish →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ============= 5. SOVRINLAR (RESULTS-DARK TABS) ============= */}
      <section className="results-dark" id="results">
        <div className="container">
          <div className="nat-head reveal">
            <h2>{s['results_dark.title'] || 'Sovrinlarimiz'}</h2>
            <p>
              {s['results_dark.subtitle'] ||
                "Maktab 2024-yilda ochildi. Birinchi yiliyoq o'quvchilarimiz xalqaro olimpiadalardan medal olib qaytdi."}
            </p>
          </div>

          <div className="tabs reveal" role="tablist">
            <button className="tab-btn active" data-tab="ielts">
              {s['results_dark.tab1_label'] || 'IELTS'}
            </button>
            <button className="tab-btn" data-tab="sat">
              {s['results_dark.tab2_label'] || 'SAT'}
            </button>
          </div>

          <div className="tab-panel active" id="tab-ielts">
            <div className="nat-grid">
              {(bundle.exam_results?.ielts || []).map((r, i) => (
                <div key={r.id} className={`nat-card reveal${i ? ' delay-' + Math.min(i, 3) : ''}`}>
                  <div
                    className="nat-photo"
                    style={{ backgroundImage: `url('${resolveMediaUrl(r.image_url) || seed('img/ustoz-mansur.png')}')` }}
                  ></div>
                  <div className="nat-name">{r.name}</div>
                  <div className="nat-scores" dangerouslySetInnerHTML={{ __html: r.grade || '' }} />
                </div>
              ))}
            </div>
          </div>
          <div className="tab-panel" id="tab-sat">
            <div className="nat-grid">
              {(bundle.exam_results?.sat || []).map((r, i) => (
                <div key={r.id} className={`nat-card reveal${i ? ' delay-' + Math.min(i, 3) : ''}`}>
                  <div
                    className="nat-photo"
                    style={{ backgroundImage: `url('${resolveMediaUrl(r.image_url) || seed('img/ustoz-mansur.png')}')` }}
                  ></div>
                  <div className="nat-name">{r.name}</div>
                  <div className="nat-scores" dangerouslySetInnerHTML={{ __html: r.grade || '' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="results-cta reveal">
            <Link href={`/${locale}/natijalar`} className="btn btn-outline">
              {dict.sections.all_results || "Barcha natijalarni ko'rish →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ============= 6. HAMKORLAR (UNIVERSITIES) ============= */}
      <section className="unis">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{s['unis.eyebrow'] || dict.home_unis.eyebrow}</span>
            <h2>{s['unis.title'] || dict.home_unis.title}</h2>
          </div>
        </div>

        <LogoCarousel universities={indexUnis} />

        <div className="container">
          <p
            className="uni-bottom-stat reveal"
            dangerouslySetInnerHTML={{
              __html:
                s['unis.bottom_stat'] ||
                dict.sections.bottom_stat_template ||
                "Seven School'dan keyin o'quvchilar <strong>Sodiq School</strong>'da o'qishni davom ettirib, dunyoning <strong>TOP universitetlarga</strong> tayyorlanadi.",
            }}
          />
        </div>
      </section>

      {/* ============= 7. SOVRINLAR (AWARDS) ============= */}
      <section className="awards" id="awards">
        <div className="awards-bg">
          <div className="awards-orb awards-orb-1"></div>
          <div className="awards-orb awards-orb-2"></div>
          <div className="awards-orb awards-orb-3"></div>
        </div>
        <div className="container">
          <div className="section-head reveal">
            <span
              className="eyebrow"
              style={{ color: 'var(--orange)', background: 'rgba(255,138,50,0.15)' }}
            >
              {s['awards.eyebrow'] || dict.sections.awards_eyebrow || 'Yutuqlar'}
            </span>
            <h2 style={{ color: '#fff' }}>{s['awards.title'] || dict.sections.awards_title || 'Sovrinlarimiz'}</h2>
            <p className="sub" style={{ color: 'rgba(255,255,255,.55)' }}>
              {s['awards.subtitle'] ||
                "Maktab 2024-yilda ochildi. Birinchi yiliyoq xalqaro olimpiadalardan medal olib qaytdik."}
            </p>
          </div>
          <div className="awards-grid">
            {bundle.awards.map((a, i) => (
              <div key={a.id} className={`award-card reveal${i ? ' delay-' + i : ''}`} data-tilt="">
                <div className="award-shimmer"></div>
                <div className="award-media">
                  {a.image_url
                    ? <img src={resolveMediaUrl(a.image_url)} alt={a.title} />
                    : <img src={seed('awards/wsc.png')} alt={a.title} />}
                </div>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
                <div className="award-medals">
                  {a.gold_count > 0 && (
                    <div className="medal-badge gold">
                      <span className="medal-num cu" data-target={a.gold_count}>0</span>
                      <span className="medal-label">{a.gold_label || 'Oltin'}</span>
                    </div>
                  )}
                  {a.silver_count > 0 && (
                    <div className="medal-badge silver">
                      <span className="medal-num cu" data-target={a.silver_count}>0</span>
                      <span className="medal-label">{a.silver_label || 'Kumush'}</span>
                    </div>
                  )}
                  {a.bronze_count > 0 && (
                    <div className="medal-badge bronze">
                      <span className="medal-num cu" data-target={a.bronze_count}>0</span>
                      <span className="medal-label">{a.bronze_label || 'Bronza'}</span>
                    </div>
                  )}
                </div>
                <div className="award-total">
                  <span className="award-total-num">{a.total_label_value}</span> {a.total_label || 'medal'}
                </div>
              </div>
            ))}
          </div>

          <div className="awards-summary reveal">
            <div className="awards-summary-item">
              <span className="awards-summary-num cu" data-target={s['awards.summary_total_value'] || '29'}>0</span>
              <span className="awards-summary-label">{s['awards.summary_total_label'] || 'Jami medallar'}</span>
            </div>
            <div className="awards-summary-divider"></div>
            <div className="awards-summary-item">
              <span className="awards-summary-num cu" data-target={s['awards.summary_competitions_value'] || '3'}>0</span>
              <span className="awards-summary-label">{s['awards.summary_competitions_label'] || 'Musobaqa'}</span>
            </div>
            <div className="awards-summary-divider"></div>
            <div className="awards-summary-item">
              <span className="awards-summary-num cu" data-target={s['awards.summary_winners_value'] || '47'}>0</span>
              <span className="awards-summary-label">{s['awards.summary_winners_label'] || "Sovrindor o'quvchi"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============= IMAGE CAROUSEL ============= */}
      <ImgCarousel items={bundle.carousel} />

      {/* ============= 8. AFZALLIKLAR (ADVANTAGES) ============= */}
      <section className="advantages">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{s['advantages.eyebrow'] || dict.sections.advantages_eyebrow || 'Nima uchun biz?'}</span>
            <h2>{s['advantages.title'] || dict.sections.advantages_title || 'Nega Seven School?'}</h2>
          </div>
          <div className="advantages-grid">
            {(bundle.advantages || []).map((a, i) => {
              const Icon = advIconMap[a.icon_key] || IconPeople;
              const accentNum = a.accent_num && a.accent_num > 0 ? a.accent_num : ((i % 5) + 1);
              const delayClass = i === 0 ? '' : i % 3 === 1 ? ' delay-1' : i % 3 === 2 ? ' delay-2' : '';
              return (
                <div key={a.id} className={`adv-card adv-accent-${accentNum} reveal${delayClass}`}>
                  <div className="adv-icon"><Icon /></div>
                  <h3>{a.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: a.description || '' }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============= 9. NARXLAR (PRICING) ============= */}
      <section className="pricing" id="narx">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{s['pricing.eyebrow'] || 'Narxlar'}</span>
            <h2>{s['pricing.title'] || "Oylik to'lov"}</h2>
          </div>
          {pricingPlans.map((p) => {
            const includes = (p.includes || '').split('|').map((x) => x.trim()).filter(Boolean);
            return (
              <div key={p.id} className="pricing-card reveal delay-1">
                <span className="pricing-label">{p.label}</span>
                <div className="pricing-amount">
                  {p.amount} <span>{p.currency}</span>
                </div>
                {p.note && <p className="pricing-note">{p.note}</p>}
                <div className="pricing-includes">
                  {includes.map((inc, idx) => (
                    <div key={idx} className="pricing-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                      {inc}
                    </div>
                  ))}
                </div>
                <Link href={`/${locale}/aloqa`} className="btn btn-primary btn-large">
                  {p.cta_label || 'Ariza topshirish →'}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============= 9b. TA'LIM BOSQICHLARI (STAGES) =============
          TODO: backend can later add a `stages` settings group or a dedicated table.
          For now we fall back to hardcoded reference text via `s['stages.sN_*']` keys. */}
      <section className="stages" id="bosqichlar">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{s['stages.eyebrow'] || "Ta'lim bosqichlari"}</span>
            <h2>{s['stages.title'] || '4 yoshdan universitetgacha'}</h2>
          </div>
          <div className="stages-timeline reveal">
            {stages.map((st, i) => {
              const IconC = stageIcons[i] || IconSun;
              const isFinal = i === stages.length - 1;
              return (
                <div key={i} className={`stage-step${isFinal ? ' stage-step--final' : ''}`}>
                  <div className="stage-marker stage-marker--orange">
                    <IconC />
                  </div>
                  <div className="stage-content">
                    <span className="stage-age">{st.age}</span>
                    <h3>{st.title}</h3>
                    <p>{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============= 10. QABUL (ADMISSIONS) ============= */}
      <section className="admissions" id="qabul">
        <div className="container">
          <div className="adm-header reveal">
            <span className="eyebrow">{s['admissions.eyebrow'] || 'Qabul 2026–2027'}</span>
            <h2
              dangerouslySetInnerHTML={{
                __html: s['admissions.title'] || 'Farzandingizni kelajak uchun<br>hozirdan tayyorlang',
              }}
            />
            <p
              className="adm-desc"
              dangerouslySetInnerHTML={{
                __html:
                  s['admissions.desc'] ||
                  "2026/2027 o'quv yili uchun ro'yxatga olish endi ochiq. Asosiy qabul imtihonlari <strong>2026-yil iyul</strong> oyida o'tadi.",
              }}
            />
          </div>

          <div className="adm-cols">
            <div className="adm-col-steps reveal">
              <h3 className="adm-col-title">{s['admissions.process_title'] || 'Qabul jarayoni'}</h3>
              <div className="adm-timeline">
                <AdmStep
                  n={1}
                  lbl={s['admissions.step1_label'] || dict.sections.admissions_step1_label || 'Hujjat topshirish'}
                  desc={s['admissions.step1_desc'] || dict.sections.admissions_step1_desc || 'Sayt orqali masofadan yoki maktabga kelib'}
                  hasLine
                />
                <AdmStep
                  n={2}
                  lbl={s['admissions.step2_label'] || dict.sections.admissions_step2_label || 'Suhbat yoki imtihon'}
                  desc={s['admissions.step2_desc'] || dict.sections.admissions_step2_desc || "Bog'cha va 1-sinf — suhbat. 2–7-sinf — yozma imtihon."}
                  hasLine
                />
                <AdmStep
                  n={3}
                  lbl={s['admissions.step3_label'] || dict.sections.admissions_step3_label || 'Natija va qabul'}
                  desc={s['admissions.step3_desc'] || dict.sections.admissions_step3_desc || "Yuqori natija olgan o'quvchilarga grant ajratiladi"}
                />
              </div>
            </div>

            <div className="adm-col-exam reveal delay-1">
              <h3 className="adm-col-title">{s['admissions.exams_title'] || 'Imtihon fanlari (2–7-sinf)'}</h3>
              <div className="adm-tests">
                <TestCard
                  nm={s['admissions.test1_name'] || 'Matematika'}
                  sub={s['admissions.test1_sub'] || 'Mantiq va hisoblash'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 4h16v16H4z"/>
                      <path d="M9 9h6M9 13h6M9 17h3"/>
                    </svg>
                  }
                />
                <TestCard
                  nm={s['admissions.test2_name'] || 'Mantiqiy fikrlash'}
                  sub={s['admissions.test2_sub'] || 'Tahlil va mushohada'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M12 3v18M3 12h18"/>
                    </svg>
                  }
                />
                <TestCard
                  nm={s['admissions.test3_name'] || 'Ingliz tili'}
                  sub={s['admissions.test3_sub'] || 'Grammar va reading'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 5h18M3 12h18M3 19h12"/>
                    </svg>
                  }
                />
              </div>
            </div>

            <div className="adm-col-info reveal delay-2">
              <h3 className="adm-col-title">{s['admissions.info_title'] || "Ma'lumot"}</h3>
              <div className="adm-info-list">
                <AdmInfoItem
                  label={s['admissions.info1_label'] || 'Qabul yoshi'}
                  value={s['admissions.info1_value'] || '4 yoshdan 7-sinfgacha'}
                />
                <AdmInfoItem
                  label={s['admissions.info2_label'] || 'Har sinfda joy'}
                  value={s['admissions.info2_value'] || "18–22 ta o'rin"}
                />
                <AdmInfoItem
                  label={s['admissions.info3_label'] || 'Ish vaqti'}
                  value={s['admissions.info3_value'] || '09:00 dan 17:00 gacha'}
                />
                <AdmInfoItem
                  label={s['admissions.info4_label'] || 'Grant imkoniyati'}
                  value={s['admissions.info4_value'] || 'Mavjud'}
                  highlight
                />
              </div>
              <Link href={`/${locale}/aloqa`} className="btn btn-primary btn-large btn-block">
                {s['admissions.cta'] || dict.sections.admissions_register || 'Hujjat topshirish'}
              </Link>
              <p className="adm-secondary">
                {s['admissions.secondary'] || dict.sections.admissions_secondary || 'Savollaringiz bormi?'}{' '}
                <a href={`tel:${phoneLink}`}>{phone}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============= 11. FAQ ============= */}
      <section className="faq">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{dict.sections.faq_eyebrow || 'FAQ'}</span>
            <h2>{dict.sections.faq_title || "Ko'p beriladigan savollar"}</h2>
          </div>
          <div className="faq-list reveal delay-1" id="faqList">
            {indexFaqs.map((f) => (
              <div key={f.id} className="faq-item">
                <button className="faq-q" type="button">
                  {f.question}
                  <span className="icon">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: f.answer || '' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= 12. CONTACT (CTA BANNER) ============= */}
      <CtaBanner locale={locale} settings={s} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Local helpers
// ---------------------------------------------------------------------------

function AdmStep({ n, lbl, desc, hasLine }: { n: number; lbl: string; desc: string; hasLine?: boolean }) {
  return (
    <div className="adm-step">
      <div className="adm-step-marker">
        <span className="n">{n}</span>
        {hasLine && <span className="adm-step-line"></span>}
      </div>
      <div className="adm-step-content">
        <span className="lbl">{lbl}</span>
        <span className="step-desc">{desc}</span>
      </div>
    </div>
  );
}

function TestCard({ nm, sub, icon }: { nm: string; sub: string; icon: React.ReactNode }) {
  return (
    <div className="test-card">
      <div className="test-card-icon">{icon}</div>
      <div className="test-card-text">
        <span className="nm">{nm}</span>
        <span className="test-sub">{sub}</span>
      </div>
    </div>
  );
}

function AdmInfoItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="adm-info-item">
      <span className="adm-info-label">{label}</span>
      <span className={'adm-info-val' + (highlight ? ' adm-info-highlight' : '')}>{value}</span>
    </div>
  );
}
