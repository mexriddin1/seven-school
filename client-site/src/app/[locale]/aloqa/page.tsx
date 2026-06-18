import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle } from '@/lib/api';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';
import { FaqAccordion } from '@/components/FaqAccordion';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.contact_title, description: dict.meta.contact_desc };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  const d = dict.contact;
  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;
  const aloqaFaqs = (bundle.faqs || []).filter((f) => f.page === 'aloqa' || f.page === 'both');

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={s['aloqa.hero_eyebrow'] || d.eyebrow || dict.nav.contact}
        title={s['aloqa.hero_title'] || d.title || dict.nav.contact}
        lead={s['aloqa.hero_lead'] || d.lead}
      />

      <CtaBanner locale={locale} settings={s} />

      {aloqaFaqs.length > 0 && (
        <section className="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{d.faq_eyebrow}</span>
              <h2>{d.faq_title}</h2>
            </div>
            <FaqAccordion items={aloqaFaqs} />
          </div>
        </section>
      )}
    </>
  );
}
