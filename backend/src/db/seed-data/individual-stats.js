import { query } from '../pool.js';

const items = [
  {
    num: '18–22', sort: 1,
    tr: {
      uz: { lbl: "o'quvchi",  sub: 'har sinfda' },
      ru: { lbl: 'учеников',  sub: 'в каждом классе' },
      en: { lbl: 'students',  sub: 'in each class' },
    },
  },
  {
    num: 'Mentor', sort: 2,
    tr: {
      uz: { lbl: 'va Tutor',  sub: 'har bolaga' },
      ru: { lbl: 'и Tutor',   sub: 'для каждого ребёнка' },
      en: { lbl: 'and Tutor', sub: 'for every child' },
    },
  },
  {
    num: 'Haftalik', sort: 3,
    tr: {
      uz: { lbl: 'hisobot',   sub: 'ota-onaga' },
      ru: { lbl: 'отчёт',     sub: 'родителям' },
      en: { lbl: 'report',    sub: 'for parents' },
    },
  },
  {
    num: 'Tezkor', sort: 4,
    tr: {
      uz: { lbl: 'javob',     sub: 'har savolga' },
      ru: { lbl: 'ответ',     sub: 'на любой вопрос' },
      en: { lbl: 'response',  sub: 'to every question' },
    },
  },
];

export async function seedIndividualStats() {
  console.log('[seed] individual_stats...');
  for (const it of items) {
    const r = await query(
      `INSERT INTO individual_stats (num, sort_order, is_published) VALUES (?, ?, 1)`,
      [it.num, it.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(it.tr)) {
      await query(
        `INSERT INTO individual_stat_translations (individual_stat_id, locale, lbl, sub) VALUES (?, ?, ?, ?)`,
        [id, locale, tr.lbl, tr.sub],
      );
    }
  }
}
