'use client';
import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { submitApplication } from '@/lib/api';

export function LeadForm({ locale }: { locale: Locale }) {
  const d = getDict(locale).about;
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      await submitApplication({
        name: String(data.get('name') || ''),
        phone: String(data.get('phone') || ''),
        source_form: 'lead',
      });
      alert(getDict(locale).popup.success);
      form.reset();
    } catch (err) {
      console.error(err);
      alert(getDict(locale).popup.success);
      form.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input type="text" name="name" placeholder={d.lead_name_ph} required autoComplete="name" />
      <input type="tel"  name="phone" placeholder={d.lead_phone_ph} required autoComplete="tel" />
      <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} data-popup-skip="true">
        {d.lead_submit}
      </button>
      <p className="promise">{d.lead_promise}</p>
    </form>
  );
}
