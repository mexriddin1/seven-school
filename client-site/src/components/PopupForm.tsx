'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { submitApplication } from '@/lib/api';

type Props = { locale: Locale };

// Modal application form. Listens for clicks on any `.btn[data-popup-open]`
// element AND, to mirror the static site's behaviour, any `.btn-primary`
// outside the form itself or explicit opt-outs.
export function PopupForm({ locale }: Props) {
  const d = getDict(locale).popup;
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
      const trigger = t.closest<HTMLElement>('.btn');
      if (!trigger) return;
      // Skip the form's own close/submit and explicit opt-outs.
      if (trigger.closest('.popup-form-modal')) return;
      if (trigger.hasAttribute('data-popup-skip')) return;
      if (trigger.closest('[data-popup-skip="true"]')) return;
      // Skip CTAs that are themselves real submits in inline lead forms.
      if ((trigger as HTMLButtonElement).type === 'submit' && trigger.closest('form')) return;
      // Skip ghost / outline buttons that scroll instead of opening the form.
      if (trigger.classList.contains('btn-ghost')) return;
      if (trigger.getAttribute('href')?.startsWith('#')) return;
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
  }, [close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      await submitApplication({
        name: String(data.get('name') || ''),
        phone: String(data.get('phone') || ''),
        message: String(data.get('location') || ''),
        source_form: 'popup',
      });
      alert(d.success);
      form.reset();
      close();
    } catch (err) {
      console.error(err);
      alert(d.success); // graceful even on failure — UX preference from static site
      form.reset();
      close();
    } finally {
      setSubmitting(false);
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
              <label htmlFor="popupLocation">{d.location_lbl}</label>
              <select id="popupLocation" name="location" required defaultValue="">
                <option value="" disabled>{d.location_ph}</option>
                {d.provinces.map((p) => (
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
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
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
