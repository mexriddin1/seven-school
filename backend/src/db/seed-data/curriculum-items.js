import { query } from '../pool.js';

const items = [
  {
    sort: 1,
    tr: {
      uz: { title: 'IT — 1-sinfdan',                  description: "Mantiqiy fikrlash va boshlang'ich kompyuter asoslari." },
      ru: { title: 'IT — с 1 класса',                 description: 'Логическое мышление и основы компьютера.' },
      en: { title: 'IT — from grade 1',               description: 'Logical thinking and computer basics.' },
    },
  },
  {
    sort: 2,
    tr: {
      uz: { title: 'Ingliz tili — bosqichma-bosqich', description: 'Fonetikadan boshlab keyinchalik IELTS darajasigacha.' },
      ru: { title: 'Английский — по этапам',          description: 'От фонетики до уровня IELTS.' },
      en: { title: 'English — step by step',          description: 'From phonetics to IELTS level.' },
    },
  },
  {
    sort: 3,
    tr: {
      uz: { title: 'Arab tili — ilk sinfdan',         description: 'Til bilan birga qadriyatlar ham shakllanadi.' },
      ru: { title: 'Арабский — с первого класса',     description: 'Вместе с языком формируются ценности.' },
      en: { title: 'Arabic — from grade 1',           description: 'Values are shaped alongside the language.' },
    },
  },
  {
    sort: 4,
    tr: {
      uz: { title: 'STEAM — amaliy yondashuv',        description: "Nazariya emas, sinab ko'rish orqali o'rganish." },
      ru: { title: 'STEAM — практический подход',     description: 'Не теория, а обучение через опыт.' },
      en: { title: 'STEAM — hands-on',                description: 'Not theory — learning by trying.' },
    },
  },
  {
    sort: 5,
    tr: {
      uz: { title: 'Critical Thinking',               description: "Savol berish, tahlil qilish va mustaqil fikrlash ko'nikmasi." },
      ru: { title: 'Critical Thinking',               description: 'Умение задавать вопросы, анализировать и думать самостоятельно.' },
      en: { title: 'Critical Thinking',               description: 'The skill of questioning, analysing and thinking independently.' },
    },
  },
  {
    sort: 6,
    tr: {
      uz: { title: 'Hayot maktabi',                   description: 'Har oy bitta qadriyat. Butun maktab shu muhit bilan yashaydi.' },
      ru: { title: 'Школа жизни',                     description: 'Каждый месяц одна ценность — вся школа живёт этой темой.' },
      en: { title: 'Life school',                     description: 'One value each month. The whole school lives that theme.' },
    },
  },
];

export async function seedCurriculumItems() {
  console.log('[seed] curriculum_items...');
  for (const c of items) {
    const r = await query(
      `INSERT INTO curriculum_items (sort_order, is_published) VALUES (?, 1)`,
      [c.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(c.tr)) {
      await query(
        `INSERT INTO curriculum_item_translations (curriculum_item_id, locale, title, description) VALUES (?, ?, ?, ?)`,
        [id, locale, tr.title, tr.description],
      );
    }
  }
}
