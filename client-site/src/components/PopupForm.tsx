'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { submitApplication } from '@/lib/api';
import { AGE_OPTIONS, GRADE_OPTIONS, UZBEKISTAN_REGIONS } from '@/lib/form-options';

type Props = { locale: Locale };

export function PopupForm({ locale }: Props) {
  const d = getDict(locale).popup;
  const pathname = usePathname();
  const router = useRouter();
  const isLanding = pathname?.includes('/short-landing') || pathname?.includes('/long-landing');
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle('popup-open', open);
    return () => document.body.classList.remove('popup-open');
  }, [open]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const trigger = t.closest<HTMLElement>('[data-popup-open], .btn-primary');
      if (!trigger) return;
      if (trigger.closest('.popup-form-modal')) return;
      if (trigger.hasAttribute('data-popup-skip')) return;
      if (trigger.closest('[data-popup-skip="true"]')) return;
      if ((trigger as HTMLButtonElement).type === 'submit' && trigger.closest('form')) return;
      const href = trigger.getAttribute('href') || '';
      if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return;

      if (isLanding) {
        const ctaTarget = document.querySelector('.cta-banner');
        if (ctaTarget && !trigger.closest('.cta-banner')) {
          e.preventDefault();
          ctaTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      e.preventDefault();
      setOpen(true);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [close, isLanding]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      await submitApplication({
        name: String(data.get('name') || ''),
        phone: String(data.get('phone') || ''),
        age: String(data.get('age') || '') || undefined,
        grade: String(data.get('grade') || '') || undefined,
        region: String(data.get('region') || '') || undefined,
        source_form: 'popup',
      });
    } catch (err) {
      console.error(err);
    } finally {
      form.reset();
      setOpen(false);
      const fromShortLanding = pathname?.includes('/short-landing');
      router.push(`/${locale}/thanks${fromShortLanding ? '?tg=short-site' : ''}`);
    }
  }

  return (
    <div className={'popup-form-modal' + (open ? ' open' : '')} aria-hidden={!open}>
      <div className="popup-form-backdrop" onClick={close} />
      <div className="popup-form-card" role="dialog" aria-modal="true">
        <button className="popup-form-close" type="button" aria-label={d.close} onClick={close}>×</button>
        <div className="popup-form-layout">
          <div className="popup-form-left">
            <h3>{d.title}</h3>
            <p>{d.lead}</p>
            <form className="popup-form-fields" onSubmit={onSubmit}>
              <label htmlFor="popupName">{d.name_lbl}</label>
              <input id="popupName" name="name" type="text" placeholder={d.name_ph} required />
              <label htmlFor="popupPhone">{d.phone_lbl}</label>
              <input id="popupPhone" name="phone" type="tel" placeholder={d.phone_ph} required />
              <label htmlFor="popupAge">Yosh</label>
              <select id="popupAge" name="age" required defaultValue="">
                <option value="" disabled>Yoshni tanlang</option>
                {AGE_OPTIONS.map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
              <label htmlFor="popupGrade">{d.grade_lbl}</label>
              <select id="popupGrade" name="grade" required defaultValue="">
                <option value="" disabled>{d.grade_ph}</option>
                {GRADE_OPTIONS.map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <label htmlFor="popupRegion">{d.location_lbl}</label>
              <select id="popupRegion" name="region" required defaultValue="">
                <option value="" disabled>{d.location_ph}</option>
                {UZBEKISTAN_REGIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {d.submit}
              </button>
            </form>
          </div>
          <div className="popup-form-right">
            <img
              src="/img/hero-bg.jpg"
              alt="Seven School"
              loading="lazy"
            />
            <div className="popup-form-image-caption">{d.image_caption}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
