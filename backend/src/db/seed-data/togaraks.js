import { query } from '../pool.js';

const items = [
  { uz: 'Kulolchilik',  ru: 'Гончарное дело', en: 'Pottery' },
  { uz: 'Rasm',         ru: 'Рисование',      en: 'Drawing' },
  { uz: 'Gimnastika',   ru: 'Гимнастика',     en: 'Gymnastics' },
  { uz: 'Suzish',       ru: 'Плавание',       en: 'Swimming' },
  { uz: 'Ijodkorlik',   ru: 'Творчество',     en: 'Creativity' },
  { uz: 'Shaxmat',      ru: 'Шахматы',        en: 'Chess' },
  { uz: 'Ingliz tili',  ru: 'Английский',     en: 'English' },
  { uz: 'Taekwondo',    ru: 'Таэквондо',      en: 'Taekwondo' },
  { uz: 'Robototexnika', ru: 'Робототехника', en: 'Robotics' },
];

export async function seedTogaraks() {
  console.log('[seed] togaraks...');
  let sort = 1;
  for (const item of items) {
    const r = await query(
      `INSERT INTO togaraks (sort_order, is_published) VALUES (?, 1)`,
      [sort++],
    );
    const id = r.insertId;
    for (const locale of ['uz', 'ru', 'en']) {
      await query(
        `INSERT INTO togarak_translations (togarak_id, locale, title) VALUES (?, ?, ?)`,
        [id, locale, item[locale]],
      );
    }
  }
}
