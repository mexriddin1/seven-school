'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { submitApplication } from '@/lib/api';
import { AGE_OPTIONS, GRADE_OPTIONS, UZBEKISTAN_REGIONS } from '@/lib/form-options';

export function LeadForm({ locale }: { locale: Locale }) {
  const d = getDict(locale).about;
  const router = useRouter();
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
        age: String(data.get('age') || '') || undefined,
        grade: String(data.get('grade') || '') || undefined,
        region: String(data.get('region') || '') || undefined,
        source_form: 'lead',
      });
    } catch (err) {
      console.error(err);
    } finally {
      form.reset();
      router.push(`/${locale}/thanks`);
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input type="text" name="name" placeholder={d.lead_name_ph} required autoComplete="name" />
      <input type="tel"  name="phone" placeholder={d.lead_phone_ph} required autoComplete="tel" />
      <select name="age" defaultValue="">
        <option value="" disabled>Yoshni tanlang</option>
        {AGE_OPTIONS.map((age) => <option key={age} value={age}>{age}</option>)}
      </select>
      <select name="grade" defaultValue="">
        <option value="" disabled>Sinfni tanlang</option>
        {GRADE_OPTIONS.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
      </select>
      <select name="region" defaultValue="">
        <option value="" disabled>Viloyatni tanlang</option>
        {UZBEKISTAN_REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}
      </select>
      <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} data-popup-skip="true">
        {d.lead_submit}
      </button>
      <p className="promise">{d.lead_promise}</p>
    </form>
  );
}
