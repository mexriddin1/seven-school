'use client';

import { useState, type FormEvent, type SVGProps } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { submitApplication } from '@/lib/api';
import { firstContactAddress, splitContactAddresses } from '@/lib/contact';
import { AGE_OPTIONS, GRADE_OPTIONS, UZBEKISTAN_REGIONS } from '@/lib/form-options';

type Props = {
  locale: Locale;
  settings: Record<string, string>;
  variant?: 'default' | 'compact';
  customTitle?: string;
  customSubtitle?: string;
  showMap?: boolean;
};

type MapLocation = {
  name: string;
  address: string;
  lat: string;
  lng: string;
  zoom: string;
  url: string;
};

function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.36 1.86.7 2.74a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.34-1.34a2 2 0 0 1 2.11-.45c.88.34 1.8.57 2.74.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.5 4.5 2.5 12l5.5 2 2 6 3-3.5 5 4 3.5-16Zm-4.7 4.2-7.5 6.8-1.2-3.7 8.7-3.1Z" />
    </svg>
  );
}

function makeMapUrl(location: Pick<MapLocation, 'lat' | 'lng' | 'zoom' | 'address'>) {
  const lat = location.lat?.trim();
  const lng = location.lng?.trim();
  const zoom = location.zoom?.trim() || '16';
  if (lat && lng) {
    const coords = `${lat},${lng}`;
    return `https://www.google.com/maps?q=${encodeURIComponent(coords)}&z=${encodeURIComponent(zoom)}&output=embed`;
  }
  return location.address
    ? `https://www.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed`
    : '';
}

function parseMapLocations(settings: Record<string, string>, fallbackAddress: string): MapLocation[] {
  const raw = settings['contact.map_locations']?.trim();
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item, index) => {
            const location = {
              name: String(item?.name || `Manzil ${index + 1}`),
              address: String(item?.address || ''),
              lat: String(item?.lat || ''),
              lng: String(item?.lng || ''),
              zoom: String(item?.zoom || '16'),
            };
            return { ...location, url: makeMapUrl(location) };
          })
          .filter((item) => item.url);
      }
    } catch {
      // Fall back to legacy map settings below.
    }
  }

  const embedUrl = settings['contact.map_embed_url']?.trim();
  if (embedUrl) return [{ name: 'Manzil', address: fallbackAddress, lat: '', lng: '', zoom: '16', url: embedUrl }];

  const legacy = {
    name: 'Manzil',
    address: fallbackAddress,
    lat: settings['contact.map_lat'] || '',
    lng: settings['contact.map_lng'] || '',
    zoom: settings['contact.map_zoom'] || '16',
  };
  const url = makeMapUrl(legacy);
  return url ? [{ ...legacy, url }] : [];
}

export function CtaBanner({
  locale,
  settings,
  variant = 'default',
  customTitle,
  customSubtitle,
  showMap = true,
}: Props) {
  const dict = getDict(locale);
  const contact = dict.contact;
  const router = useRouter();
  const phone = settings['contact.phone'] || '+998 78 888 80 80';
  const phoneLink = settings['contact.phone_link'] || phone.replace(/\D/g, '');
  const address = settings['contact.address'] || contact.items[0]?.value || '';
  const addresses = splitContactAddresses(address);
  const hours = settings['contact.hours'] || contact.items[2]?.value || '';
  const tg = settings['contact.telegram'] || 'https://t.me/seven_schooluz';
  const ig = settings['contact.instagram'] || 'https://instagram.com/sevenschool.uz';
  const yt = settings['contact.youtube'] || 'https://youtube.com/@sevenschooluz';
  const mapLocations = parseMapLocations(settings, firstContactAddress(address));
  const mapCountClass =
    mapLocations.length === 1 ? 'map-count-1'
    : mapLocations.length === 2 ? 'map-count-2'
    : mapLocations.length === 3 ? 'map-count-3'
    : mapLocations.length === 4 ? 'map-count-4'
    : mapLocations.length === 5 ? 'map-count-5'
    : 'map-count-many';

  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const phoneVal = String(fd.get('phone') || '').trim();
    const message = String(fd.get('message') || '').trim();
    const age = String(fd.get('age') || '').trim();
    const grade = String(fd.get('grade') || '').trim();
    const region = String(fd.get('region') || '').trim();
    if (!name || !phoneVal) return;

    setBusy(true);
    try {
      await submitApplication({
        name,
        phone: phoneVal,
        message: message || undefined,
        age: age || undefined,
        grade: grade || undefined,
        region: region || undefined,
        source_form: 'cta-banner',
      });
      setSuccess(true);
      form.reset();
      router.push(`/${locale}/thanks`);
    } catch (err) {
      console.error(err);
      setBusy(false);
    }
  }

  return (
    <section className="cta-banner">
      <div className="cta-deco cta-deco-1"></div>
      <div className="cta-deco cta-deco-2"></div>
      <div className="cta-deco cta-deco-3"></div>
      <div className="cta-deco cta-deco-4"></div>
      <div className="container">
        <div className="cta-inner reveal">
          <div className="cta-left">
            <div className="cta-info-head">
              <h3 className="cta-info-title">{contact.form_title}</h3>
              <p className="cta-info-sub">{contact.form_lead}</p>
            </div>
            <div className="cta-info-card">
              {variant === 'default' && addresses.map((item, index) => (
                <div className="cta-info-row" key={item}>
                  <PinIcon className="cta-ic" />
                  <div>
                    <span className="cta-info-label">
                      {contact.items[0]?.label || 'Manzil'}{addresses.length > 1 ? ` ${index + 1}` : ''}
                    </span>
                    <span className="cta-info-value">{item}</span>
                  </div>
                </div>
              ))}
              <div className="cta-info-row">
                <PhoneIcon className="cta-ic" />
                <div>
                  <span className="cta-info-label">{contact.items[1]?.label || 'Telefon'}</span>
                  <a href={`tel:${phoneLink}`} className="cta-info-value">{phone}</a>
                </div>
              </div>
              {variant === 'default' && hours && (
                <div className="cta-info-row">
                  <ClockIcon className="cta-ic" />
                  <div>
                    <span className="cta-info-label">{contact.items[2]?.label || 'Ish vaqti'}</span>
                    <span className="cta-info-value">{hours}</span>
                  </div>
                </div>
              )}
            </div>

            {variant === 'default' && (
              <div className="cta-socials">
                <a href={tg} className="cta-social" aria-label="Telegram" data-popup-skip="true">
                  <TelegramIcon />
                </a>
                <a href={ig} className="cta-social" aria-label="Instagram" data-popup-skip="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href={yt} className="cta-social" aria-label="YouTube" data-popup-skip="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 9.71s-.23-1.6-.93-2.3c-.89-.93-1.89-.94-2.35-.99C16.4 6.1 12 6.1 12 6.1s-4.4 0-7.72.32c-.46.05-1.46.06-2.35.99-.7.7-.93 2.3-.93 2.3S.77 11.54.77 13.37v1.71c0 1.83.23 3.66.23 3.66s.23 1.6.93 2.3c.89.93 2.06.9 2.58 1 1.87.18 7.49.23 7.49.23s4.4-.01 7.72-.33c.46-.05 1.46-.06 2.35-.99.7-.7.93-2.3.93-2.3s.23-1.83.23-3.66v-1.71c0-1.83-.23-3.66-.23-3.66ZM9.55 15.72V9.5l6.36 3.12-6.36 3.1Z" /></svg>
                </a>
              </div>
            )}
          </div>

          <div className="cta-right">
            <form className="cta-form" onSubmit={onSubmit} noValidate>
              <div className="cta-form-head">
                <h3 className="cta-form-title">{customTitle || contact.title}</h3>
                <p className="cta-form-sub">{customSubtitle || contact.lead}</p>
              </div>
              <input type="text" name="name" required placeholder={contact.fields.name_ph} />
              <input type="tel" name="phone" required placeholder={contact.fields.phone_ph} />
              <select name="age" defaultValue="">
                <option value="" disabled>Yoshni tanlang</option>
                {AGE_OPTIONS.map((age) => <option key={age} value={age}>{age}</option>)}
              </select>
              <select name="grade" defaultValue="">
                <option value="" disabled>{contact.fields.grade_ph}</option>
                {GRADE_OPTIONS.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
              </select>
              <select name="region" defaultValue="">
                <option value="" disabled>{contact.fields.region_ph}</option>
                {UZBEKISTAN_REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}
              </select>
              <textarea name="message" rows={3} placeholder={contact.fields.message_ph} />
              <button type="submit" className="cta-submit" disabled={busy} data-popup-skip="true">
                {busy ? contact.fields.success : contact.fields.submit}
              </button>
              <div className={'form-success' + (success ? ' show' : '')}>{contact.fields.success}</div>
            </form>
          </div>
        </div>
      </div>

      {showMap && variant === 'default' && mapLocations.length > 0 && (
        <div className={`cta-map-grid ${mapCountClass}`}>
          {mapLocations.map((location, index) => (
            <div className="cta-map-card" key={`${location.name}-${index}`}>
              <div className="cta-map-card-head">
                <strong>{location.name || `Manzil ${index + 1}`}</strong>
                {location.address && <span>{location.address}</span>}
              </div>
              <iframe
                src={location.url}
                title={`Seven School manzili: ${location.name || index + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
