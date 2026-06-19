'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { submitApplication } from '@/lib/api';
import { getUtm } from '@/lib/utm';
import { fireMetaLead } from '@/lib/meta-pixel';
import { AGE_OPTIONS, GRADE_OPTIONS, UZBEKISTAN_REGIONS } from '@/lib/form-options';

export function ContactForm({ locale }: { locale: Locale }) {
  const d = getDict(locale).contact;
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      await submitApplication({
        ...getUtm(),
        name: String(data.get('name') || ''),
        phone: String(data.get('phone') || ''),
        age: String(data.get('age') || '') || undefined,
        grade: String(data.get('grade') || '') || undefined,
        region: String(data.get('region') || '') || undefined,
        message: String(data.get('message') || ''),
        source_form: 'contact',
      });
      await fireMetaLead();
    } catch (err) {
      console.error(err);
    } finally {
      form.reset();
      router.push(`/${locale}/thanks`);
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
        <label htmlFor="cage">Yosh</label>
        <select id="cage" name="age" defaultValue="">
          <option value="" disabled>Yoshni tanlang</option>
          {AGE_OPTIONS.map((age) => <option key={age} value={age}>{age}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cgrade">{d.fields.grade_lbl}</label>
        <select id="cgrade" name="grade" defaultValue="">
          <option value="" disabled>{d.fields.grade_ph}</option>
          {GRADE_OPTIONS.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cregion">{d.fields.region_lbl}</label>
        <select id="cregion" name="region" defaultValue="">
          <option value="" disabled>{d.fields.region_ph}</option>
          {UZBEKISTAN_REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}
        </select>
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
