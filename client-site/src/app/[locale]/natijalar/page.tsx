import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, resolveMediaUrl, API_BASE } from '@/lib/api';
import { PageHero } from '@/components/PageHero';
import { LogoCarousel } from '@/components/LogoCarousel';
import { CtaBanner } from '@/components/CtaBanner';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.natijalar_title, description: dict.meta.natijalar_desc };
}

export default async function NatijalarPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;

  const seed = (p: string) => `${API_BASE}/uploads/seed/${p}`;

  const natijalarUnis = bundle.universities.filter(
    (u) => u.page === 'natijalar' || u.page === 'both'
  );

  return (
    <>
      {/* ============= PAGE HERO ============= */}
      <PageHero
        locale={locale}
        eyebrow={dict.page_eyebrows.results}
        title={s['natijalar.hero_title'] || dict.nav.results}
        showCrumbs={false}
      />

      {/* ============= NATIJALAR (RESULTS-DARK) =============
          IELTS va SAT alohida tab'larda. Tab almashish JS: GlobalScripts.tsx. */}
      <section className="results-dark">
        <div className="container">
          <div className="nat-head reveal">
            <h2>{s['results_dark.title'] || 'Sovrinlarimiz'}</h2>
            <p>
              {s['results_dark.subtitle'] ||
                'Olimpiada va sport musobaqalaridagi natijalarimiz'}
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
                <div
                  key={r.id}
                  className={`nat-card reveal${i ? ' delay-' + Math.min(i, 3) : ''}`}
                >
                  <div
                    className="nat-photo"
                    style={{
                      backgroundImage: `url('${resolveMediaUrl(r.image_url) || seed('img/ustoz-mansur.png')}')`,
                    }}
                  ></div>
                  <div className="nat-name">{r.name}</div>
                  <div
                    className="nat-scores"
                    dangerouslySetInnerHTML={{ __html: r.grade || '' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="tab-panel" id="tab-sat">
            <div className="nat-grid">
              {(bundle.exam_results?.sat || []).map((r, i) => (
                <div
                  key={r.id}
                  className={`nat-card reveal${i ? ' delay-' + Math.min(i, 3) : ''}`}
                >
                  <div
                    className="nat-photo"
                    style={{
                      backgroundImage: `url('${resolveMediaUrl(r.image_url) || seed('img/ustoz-mansur.png')}')`,
                    }}
                  ></div>
                  <div className="nat-name">{r.name}</div>
                  <div
                    className="nat-scores"
                    dangerouslySetInnerHTML={{ __html: r.grade || '' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= ALUMNI ============= */}
      {bundle.alumni && bundle.alumni.length > 0 && (
        <section className="alumni">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">
                {s['alumni.eyebrow'] || 'Muvaffaqiyat hikoyalari'}
              </span>
              <h2>{s['alumni.title'] || 'Bizning bitiruvchilar'}</h2>
              <p className="sub">{s['alumni.subtitle'] || ''}</p>
            </div>
            <div className="alumni-grid">
              {bundle.alumni.map((a, i) => (
                <div
                  key={a.id}
                  className={`alumni-card reveal${i ? ' delay-' + Math.min(i, 3) : ''}`}
                >
                  <div
                    className="alumni-photo"
                    style={{
                      backgroundImage: `url('${resolveMediaUrl(a.image_url) || seed('img/ustoz-mansur.png')}')`,
                    }}
                  ></div>
                  <div className="alumni-info">
                    <div className="name">{a.name}</div>
                    <div className="uni">{a.university}</div>
                    <div className="major">{a.major}</div>
                    {a.ielts_label && <span className="ielts">{a.ielts_label}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============= UNIVERSITIES ============= */}
      <section className="unis">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{dict.sections.universities_eyebrow}</span>
            <h2>{dict.sections.natijalar_uni_question}</h2>
          </div>
        </div>
        <LogoCarousel universities={natijalarUnis} />
        <div className="container">
          <p
            className="uni-bottom-stat reveal"
            dangerouslySetInnerHTML={{ __html: s['natijalar.alumni_summary'] || '' }}
          />
        </div>
      </section>

      {/* ============= CTA ============= */}
      <CtaBanner locale={locale} settings={s} showMap={false} />
    </>
  );
}
