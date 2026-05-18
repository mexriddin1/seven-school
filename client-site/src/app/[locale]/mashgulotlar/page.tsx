import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, resolveMediaUrl } from '@/lib/api';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.mash_title, description: dict.meta.mash_desc };
}

export default async function MashPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;

  const grantStats = (bundle.about_stats || []).filter(st => st.page === 'mash_grant').slice(0, 4);
  const subjects = bundle.lesson_subjects || [];
  const extras = (bundle.lesson_extras || []).slice(0, 4);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={s['mash.hero_eyebrow'] || "Mashg'ulot va kurslar"}
        title={s['mash.hero_title'] || "Bola bizda nima o'rganadi"}
        lead={s['mash.hero_lead'] || "Bog'chadan 7-sinfgacha akademik fanlar, sport, ijod, AI va liderlik darslarini o'rganadi."}
        crumbExtra={dict.nav.lessons}
      />

      {/* GRANT BANNER — 4 stats */}
      <section className="mash-grant-banner">
        <div className="container">
          <div className="grant-banner-inner reveal">
            {grantStats.map((st) => {
              const numeric = /^\d+(\.\d+)?$/.test(st.value);
              return (
                <div key={st.id} className="grant-stat">
                  <span className="grant-dollar">
                    {st.prefix}
                    {numeric ? <span className="cu" data-target={st.value}>0</span> : st.value}
                    {st.suffix}
                  </span>
                  <span className="grant-label">{st.label}</span>
                </div>
              );
            })}
          </div>
          <p className="grant-desc reveal">{s['mash.grant_desc'] || "Bola Seven School'da o'qish davomida akademik fanlar, sport, AI va liderlik darslarini birga o'rganadi."}</p>
        </div>
      </section>

      {/* STAGES — Bog'cha + Maktab */}
      <section className="stages-mash">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{s['mash.stages_eyebrow'] || 'Bosqichlar'}</span>
            <h2>{s['mash.stages_title'] || "Ta'lim bosqichlari"}</h2>
          </div>
          <div className="stages-grid">
            <div className="stg-card stg-card--warm reveal">
              <div className="stg-number">01</div>
              <div className="stg-body">
                <div className="stg-pill">{s['mash.stg1_age'] || '4–6 yosh'}</div>
                <h3>{s['mash.stg1_title'] || "Bog'cha"}</h3>
                <p>{s['mash.stg1_lead'] || "Maktabga to'liq tayyorgarlik: o'qish, yozish, sanoq va ingliz tili. Har bir guruhda 18–22 bola, kun bo'yi ta'lim."}</p>
                <ul>
                  <li>Gimnastika va taekvondo</li>
                  <li>Mental arifmetika</li>
                  <li>Kulolchilik va rasm</li>
                  <li>Mutolaa darslari</li>
                </ul>
              </div>
            </div>
            <div className="stg-card stg-card--cool reveal delay-1">
              <div className="stg-number">02</div>
              <div className="stg-body">
                <div className="stg-pill">{s['mash.stg2_age'] || '1–7 sinf'}</div>
                <h3>{s['mash.stg2_title'] || 'Maktab'}</h3>
                <p>{s['mash.stg2_lead'] || 'Akademik fanlar, STEM, AI va liderlik darslari birgalikda. Kichik sinflar, 7-sinfgacha davom etadi.'}</p>
                <ul>
                  <li>Matematika, ingliz tili, fanlar</li>
                  <li>STEM amaliyot — Muhandis D</li>
                  <li>AI vositalar (5–7-sinf)</li>
                  <li>Tanqidiy fikrlash va liderlik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURR — tag cloud */}
      <section className="curr">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{s['mash.curr_eyebrow'] || "O'quv dasturi"}</span>
            <h2>{s['mash.curr_title'] || "Farzandingiz nima o'rganadi?"}</h2>
          </div>
          <div className="curr-tags reveal">
            {subjects.map((sb) => {
              const warm = sb.group_key === 'tarbiya';
              return (sb.tags || []).map((t: string) => (
                <span key={`${sb.id}-${t}`} className={`curr-tag${warm ? ' curr-tag--warm' : ''}`}>{t}</span>
              ));
            })}
          </div>
        </div>
      </section>

      {/* EXTRA — 4 image cards */}
      <section className="extra">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{s['mash.extra_eyebrow'] || "Qo'shimcha"}</span>
            <h2>{s['mash.extra_title'] || 'Darsdan tashqari'}</h2>
          </div>
          <div className="extra-grid reveal">
            {extras.map((ex) => (
              <a
                key={ex.id}
                href={ex.link_url || '#'}
                target={ex.link_url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="extra-card"
              >
                <div className="extra-thumb">
                  {ex.image_url && <img src={resolveMediaUrl(ex.image_url)} alt={ex.title} />}
                  <span className="extra-play-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </div>
                <div className="extra-info">
                  <h3>{ex.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: ex.description || '' }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner locale={locale} settings={s} />
    </>
  );
}
