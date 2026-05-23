import { query } from '../pool.js';

const items = [
  {
    icon: '🔤', sort: 1,
    tr: {
      uz: { title: 'Ingliz tili',          description: "Fonetikadan IELTS darajasigacha. Tabiiy muhitda, bosqichma-bosqich o'rganish. Speaking Club, listening va writing mashg'ulotlari.", tags: ['1-sinfdan', 'IELTS', 'Speaking'] },
      ru: { title: 'Английский',           description: 'От фонетики до уровня IELTS. В естественной среде, пошагово. Speaking Club, listening и writing.', tags: ['С 1 класса', 'IELTS', 'Speaking'] },
      en: { title: 'English',              description: 'From phonetics to IELTS level. In a natural setting, step by step. Speaking Club, listening and writing.', tags: ['Grade 1+', 'IELTS', 'Speaking'] },
    },
  },
  {
    icon: '💻', sort: 2,
    tr: {
      uz: { title: "IT & Sun'iy intellekt", description: '1-sinfdan kompyuter asoslari. 5-sinfdan AI darslari — kelajak kasblariga tayyorlov.', tags: ['1-sinfdan', 'AI', 'Dasturlash'] },
      ru: { title: 'IT и AI',               description: 'С 1 класса — основы компьютера. С 5 класса — уроки AI. Подготовка к профессиям будущего.', tags: ['С 1 класса', 'AI', 'Программирование'] },
      en: { title: 'IT & AI',               description: 'Computer basics from grade 1. AI lessons from grade 5 — preparing for tomorrow.', tags: ['Grade 1+', 'AI', 'Programming'] },
    },
  },
  {
    icon: '📐', sort: 3,
    tr: {
      uz: { title: 'Matematika & STEAM',    description: "Nazariya emas, amaliyot. Sinab ko'rish, tajriba qilish va loyiha asosida o'rganish.", tags: ['STEAM', 'Mantiq', 'Loyiha'] },
      ru: { title: 'Математика и STEAM',    description: 'Не теория, а практика. Эксперименты и проектное обучение.', tags: ['STEAM', 'Логика', 'Проект'] },
      en: { title: 'Maths & STEAM',         description: 'Not theory — practice. Experiments and project-based learning.', tags: ['STEAM', 'Logic', 'Projects'] },
    },
  },
  {
    icon: '📖', sort: 4,
    tr: {
      uz: { title: 'Arab tili & Qadriyatlar', description: "Til bilan birga qadriyatlar ham shakllanadi. Ilk sinfdan boshlab o'rgatiladi.", tags: ['1-sinfdan', 'Tarbiya', 'Qadriyat'] },
      ru: { title: 'Арабский и ценности',  description: 'Вместе с языком формируются ценности. Преподаётся с младших классов.', tags: ['С 1 класса', 'Воспитание', 'Ценности'] },
      en: { title: 'Arabic & values',      description: 'Values form together with the language. Taught from the earliest grades.', tags: ['Grade 1+', 'Character', 'Values'] },
    },
  },
  {
    icon: '🧠', sort: 5,
    tr: {
      uz: { title: 'Critical Thinking',     description: "Savol berish, tahlil qilish va mustaqil fikrlash ko'nikmasi. Har bir darsda rivojlantiriladi.", tags: ['1-sinfdan', 'Tahlil', 'Mantiq'] },
      ru: { title: 'Critical Thinking',     description: 'Умение задавать вопросы, анализировать и думать самостоятельно. Развивается на каждом уроке.', tags: ['С 1 класса', 'Анализ', 'Логика'] },
      en: { title: 'Critical Thinking',     description: 'The skill of asking, analysing and thinking independently — developed in every lesson.', tags: ['Grade 1+', 'Analysis', 'Logic'] },
    },
  },
  {
    icon: '🏊', sort: 6,
    tr: {
      uz: { title: "Sport & To'garaklar",   description: "Suzish, taekwondo, gimnastika, shaxmat, robototexnika — hammasi maktabning o'zida. Qo'shimcha qatnovsiz.", tags: ['Suzish', 'Taekwondo', 'Shaxmat'] },
      ru: { title: 'Спорт и кружки',        description: 'Плавание, таэквондо, гимнастика, шахматы, робототехника — всё в школе. Без дополнительных поездок.', tags: ['Плавание', 'Таэквондо', 'Шахматы'] },
      en: { title: 'Sport & clubs',         description: 'Swimming, taekwondo, gymnastics, chess, robotics — all on-site. No extra trips.', tags: ['Swimming', 'Taekwondo', 'Chess'] },
    },
  },
];

export async function seedLessonBlocks() {
  console.log('[seed] lesson_blocks...');
  for (const it of items) {
    const r = await query(
      `INSERT INTO lesson_blocks (icon, sort_order, is_published) VALUES (?, ?, 1)`,
      [it.icon, it.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(it.tr)) {
      await query(
        `INSERT INTO lesson_block_translations (lesson_block_id, locale, title, description, tags_json) VALUES (?, ?, ?, ?, ?)`,
        [id, locale, tr.title, tr.description, JSON.stringify(tr.tags)],
      );
    }
  }
}
