import { query } from '../pool.js';

const stages = [
  {
    step: '01', sort: 1,
    tr: {
      uz: { title: 'Seven Kids',   age: '2–6 yosh',  description: "O'yin orqali o'rganish. Maktabga ishonch bilan tayyorlanish." },
      ru: { title: 'Seven Kids',   age: '2–6 лет',  description: 'Обучение через игру. Уверенная подготовка к школе.' },
      en: { title: 'Seven Kids',   age: 'Ages 2–6', description: 'Learning through play. Confident readiness for school.' },
    },
  },
  {
    step: '02', sort: 2,
    tr: {
      uz: { title: 'Seven School', age: '1–4 sinf',  description: "Kuchli akademik poydevor, til, IT, sport va tarbiya." },
      ru: { title: 'Seven School', age: '1–4 класс', description: 'Сильная академическая база, языки, IT, спорт и воспитание.' },
      en: { title: 'Seven School', age: 'Grades 1–4', description: 'Strong academic foundation, languages, IT, sport and character.' },
    },
  },
  {
    step: '03', sort: 3,
    tr: {
      uz: { title: 'Sodiq School', age: '5–11 sinf',  description: "Dunyo universitetlariga to'liq tayyorgarlik." },
      ru: { title: 'Sodiq School', age: '5–11 класс', description: 'Полная подготовка к университетам мира.' },
      en: { title: 'Sodiq School', age: 'Grades 5–11', description: 'Full preparation for top universities worldwide.' },
    },
  },
];

export async function seedEcoStages() {
  console.log('[seed] eco_stages...');
  for (const s of stages) {
    const r = await query(
      `INSERT INTO eco_stages (step_label, sort_order, is_published) VALUES (?, ?, 1)`,
      [s.step, s.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(s.tr)) {
      await query(
        `INSERT INTO eco_stage_translations (eco_stage_id, locale, title, age, description) VALUES (?, ?, ?, ?, ?)`,
        [id, locale, tr.title, tr.age, tr.description],
      );
    }
  }
}
