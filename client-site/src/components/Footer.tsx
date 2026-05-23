import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { Logo } from './Logo';

export function Footer({ locale, settings }: { locale: Locale; settings: Record<string, string> }) {
  const dict = getDict(locale);
  const phone = settings['contact.phone'] || '+998 78 888 80 80';
  const phoneLink = settings['contact.phone_link'] || phone.replace(/\D/g, '');
  const tg = settings['contact.telegram'] || 'https://t.me/seven_schooluz';
  const ig = settings['contact.instagram'] || 'https://instagram.com/sevenschool.uz';
  const yt = settings['contact.youtube'] || 'https://youtube.com/@sevenschooluz';
  const desc = settings['brand.description'] || dict.footer_description;
  const copy = settings['footer.copyright'] || '© 2025 Seven School. ' + dict.footer_rights;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <Logo
              locale={locale}
              variant="footer"
              brand={settings['brand.name']}
              lightUrl={settings['brand.logo_light_url']}
              darkUrl={settings['brand.logo_dark_url']}
            />
            <p className="desc">{desc}</p>
          </div>
          <nav className="footer-nav">
            <Link href={`/${locale}`}>{dict.nav.home}</Link>
            <Link href={`/${locale}/about`}>{dict.nav.about}</Link>
            <Link href={`/${locale}/mashgulotlar`}>{dict.nav.lessons}</Link>
            <Link href={`/${locale}/blog`}>{dict.nav.blog}</Link>
            <Link href={`/${locale}/aloqa`}>{dict.nav.contact}</Link>
          </nav>
          <div className="footer-right">
            <div>
              <span className="phone-lbl">{dict.sections.apply_label_phone}</span>
              <div className="phone"><a href={`tel:${phoneLink}`}>{phone}</a></div>
            </div>
            <div className="socials">
              <a href={tg} className="social-btn" aria-label="Telegram" title="Telegram">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 3.3 2.7 10.8c-1.3.5-1.3 1.3-.2 1.7l4.9 1.5 11.3-7.1c.5-.3 1-.1.6.2l-9.2 8.3-.3 4.8c.5 0 .8-.2 1.1-.4l2.6-2.5 5.4 4c1 .5 1.7.2 2-.9L23.9 5c.4-1.6-.6-2.4-1.9-1.7z"/></svg>
              </a>
              <a href={ig} className="social-btn" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm8.2 1.8H8A4.2 4.2 0 0 0 3.8 8v8a4.2 4.2 0 0 0 4.2 4.2h8a4.2 4.2 0 0 0 4.2-4.2V8a4.2 4.2 0 0 0-4.2-4.2zM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 1.8A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1zm5-2.9a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17 6.2z"/></svg>
              </a>
              <a href={yt} className="social-btn" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23 8.3a3 3 0 0 0-2.1-2.1C19 5.7 12 5.7 12 5.7s-7 0-8.9.5A3 3 0 0 0 1 8.3 31.8 31.8 0 0 0 .5 12 31.8 31.8 0 0 0 1 15.7a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31.8 31.8 0 0 0 .5-3.7 31.8 31.8 0 0 0-.5-3.7ZM9.8 15.2V8.8l5.6 3.2z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">{copy}</div>
      </div>
    </footer>
  );
}
