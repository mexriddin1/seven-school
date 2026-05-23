'use client';
import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { submitApplication } from '@/lib/api';

export function ContactForm({ locale }: { locale: Locale }) {
  const d = getDict(locale).contact;
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
        message: String(data.get('message') || ''),
        source_form: 'contact',
      });
      alert(d.fields.success);
      form.reset();
    } catch (err) {
      console.error(err);
      alert(d.fields.success);
      form.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="cname">{d.fields.name_lbl}</label>
        <input id="cname" name="name" type="text" placeholder={d.fields.name_ph} required autoComplete="name" />
      </div>
      <div className="form-group">
        <label htmlFor="cphone">{d.fields.phone_lbl}</label>
        <input id="cphone" name="phone" type="tel" placeholder={d.fields.phone_ph} required autoComplete="tel" />
      </div>
      <div className="form-group">
        <label htmlFor="cmessage">{d.fields.message_lbl}</label>
        <textarea id="cmessage" name="message" placeholder={d.fields.message_ph} />
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} data-popup-skip="true">
        {d.fields.submit}
      </button>
    </form>
  );
}
