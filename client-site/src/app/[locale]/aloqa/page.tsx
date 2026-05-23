import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle } from '@/lib/api';
import { ContactForm } from '@/components/ContactForm';
import { FaqAccordion } from '@/components/FaqAccordion';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.contact_title, description: dict.meta.contact_desc };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDict(locale).contact;
  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;

  const phone   = s['contact.phone']   || d.items.find((i) => /phone|tel|телеф/i.test(i.label))?.value || '+998 78 888 80 80';
  const email   = s['contact.email']   || 'info@sevenschool.uz';
  const address = s['contact.address'] || (d.items[0]?.value || 'Toshkent');
  const hours   = s['contact.hours']   || (d.items[2]?.value || '');

  const tg = s['contact.telegram']  || 'https://t.me/seven_schooluz';
  const ig = s['contact.instagram'] || 'https://instagram.com/sevenschool.uz';
  const yt = s['contact.youtube']   || 'https://youtube.com/@sevenschooluz';

  const aloqaFaqs = (bundle.faqs || []).filter((f) => f.page === 'aloqa' || f.page === 'both');

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{d.eyebrow}</span>
          <h1>{d.title}</h1>
          <p className="lead">{d.lead}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="contact-grid">
            <ContactForm locale={locale} />

            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>{d.items[0]?.label || 'Address'}</h4>
                  <p>{address}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>{d.items[1]?.label || 'Phone'}</h4>
                  <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                </div>
              </div>
              {hours && (
                <div className="contact-item">
                  <div className="contact-icon">🕘</div>
                  <div>
                    <h4>{d.items[2]?.label || 'Hours'}</h4>
                    <p>{hours}</p>
                  </div>
                </div>
              )}
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h4>{d.items[3]?.label || 'Email'}</h4>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
              <div className="social-links">
                <a href={tg} className="social-link" aria-label="Telegram" data-popup-skip="true">TG</a>
                <a href={ig} className="social-link" aria-label="Instagram" data-popup-skip="true">IG</a>
                <a href={yt} className="social-link" aria-label="YouTube" data-popup-skip="true">YT</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {aloqaFaqs.length > 0 && (
        <section style={{ background: '#f8f9fc' }}>
          <div className="container">
            <div className="section-head">
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
