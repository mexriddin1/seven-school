import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/i18n/config';
import { fetchSiteBundle } from '@/lib/api';
import { MetaContactLink } from '@/components/MetaContactLink';

const COPY: Record<string, { title: string; body: string }> = {
  uz: {
    title: "Rahmat, ma'lumotingiz uchun!",
    body: "Arizangiz qabul qilindi. Operatorimiz eng qisqa vaqt ichida siz bilan bog'lanadi.",
  },
  ru: {
    title: 'Спасибо за вашу информацию!',
    body: 'Ваша заявка принята. Наш оператор свяжется с вами в ближайшее время.',
  },
  en: {
    title: 'Thank you for your information!',
    body: 'Your request has been received. Our operator will contact you shortly.',
  },
};

export function generateMetadata(): Metadata {
  return {
    title: 'Thank you - Seven School',
    robots: { index: false, follow: false },
  };
}

export default async function ThanksPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = COPY[locale] || COPY.uz;
  const telegramLabel = locale === 'en' ? 'Contact on Telegram' : locale === 'ru' ? 'Telegram' : "Telegram orqali bog'lanish";
  const phoneLabel = locale === 'en' ? 'Call' : locale === 'ru' ? 'Telefon' : "Qo'ng'iroq qilish";
  let settings: Record<string, string> = {};
  try {
    settings = (await fetchSiteBundle(locale)).settings;
  } catch {
    settings = {};
  }
  const phone = settings['contact.phone'] || '+998 78 888 80 80';
  const phoneLink = settings['contact.phone_link'] || phone.replace(/\D/g, '');

  return (
    <>
      <Script id="telegram-lead-thanks" strategy="afterInteractive">
        {`if(new URLSearchParams(window.location.search).get('tg')==='short-site'||window.sessionStorage.getItem('telegramLead')==='short-site'){window.sessionStorage.removeItem('telegramLead');var f=false;var fire=function(){if(f||typeof window.tgp!=='function')return;f=true;window.tgp('event','aGnVh4yo-LgRjEjQB');};fire();if(!f){var i=0;var timer=setInterval(function(){i+=1;fire();if(f||i>20)clearInterval(timer);},250);}}`}
      </Script>
      <Script id="meta-pixel-seven-thanks" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1560622008619916');`}
      </Script>
      <main className="thanks-page">
        <div className="thanks-check" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 33 L27 46 L50 21" />
          </svg>
        </div>
        <h1>{t.title}</h1>
        <p>{t.body}</p>
        <div className="thanks-actions">
          <MetaContactLink contentName="phone_call" className="btn btn-primary" href={`tel:${phoneLink}`} data-popup-skip="true">
            {phoneLabel}
          </MetaContactLink>
          <MetaContactLink contentName="telegram" className="btn btn-primary" href="https://t.me/sevenschooladmin" target="_blank" rel="noopener noreferrer" data-popup-skip="true">
            {telegramLabel}
          </MetaContactLink>
        </div>
      </main>
    </>
  );
}
