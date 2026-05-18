import { query } from '../pool.js';

const extras = [
  {
    mediaKey: 'extra-togaraklar',
    link_url: 'https://www.instagram.com/sevenschool.uz/reel/DSrX9zvgp1D/',
    icon_key: 'sparkles',
    sort: 1,
    tr: {
      uz: { title: "To'garaklar",       description: "Suzish, taekvondo, gimnastika, tennis, shaxmat, mental arifmetika, kulolchilik, IT, robototexnika", link_label: '' },
      ru: { title: 'Кружки',             description: 'Плавание, тхэквондо, гимнастика, теннис, шахматы, ментальная арифметика, гончарное дело, IT, робототехника', link_label: '' },
      en: { title: 'Clubs',              description: 'Swimming, taekwondo, gymnastics, tennis, chess, mental arithmetic, pottery, IT, robotics', link_label: '' },
    },
  },
  {
    mediaKey: 'extra-stem',
    link_url: 'https://www.instagram.com/sevenschool.uz/reel/DXrM4EfAnUZ/',
    icon_key: 'book',
    sort: 2,
    tr: {
      uz: { title: 'STEM amaliyot',      description: "Fizika va texnologiyani bola amaliyotda, qo'l bilan ishlab o'rganadi.", link_label: '' },
      ru: { title: 'STEM-практика',      description: 'Физику и технологии ребёнок осваивает на практике, своими руками.', link_label: '' },
      en: { title: 'STEM hands-on',      description: 'Physics and technology learned hands-on by the student.', link_label: '' },
    },
  },
  {
    mediaKey: 'extra-ai',
    link_url: 'https://www.instagram.com/sevenschool.uz/',
    icon_key: 'sparkles',
    sort: 3,
    tr: {
      uz: { title: 'AI vositalar (5–7-sinf)', description: "Bola sun'iy intellektdan qanday to'g'ri foydalanishni o'rganadi.", link_label: '' },
      ru: { title: 'ИИ-инструменты (5–7 кл.)', description: 'Ребёнок учится правильно использовать инструменты искусственного интеллекта.', link_label: '' },
      en: { title: 'AI tools (grades 5–7)',    description: 'Students learn how to use AI tools responsibly and effectively.', link_label: '' },
    },
  },
  {
    mediaKey: 'extra-tarbiya',
    link_url: 'https://www.instagram.com/sevenschool.uz/',
    icon_key: 'book',
    sort: 4,
    tr: {
      uz: { title: 'Tarbiya fanlari',   description: "Odobnoma, notiqlik san'ati va ma'naviy darslar.", link_label: '' },
      ru: { title: 'Воспитание',        description: 'Этикет, ораторское искусство и духовные занятия.', link_label: '' },
      en: { title: 'Character lessons', description: 'Ethics, public speaking and spiritual lessons.', link_label: '' },
    },
  },
];

export async function seedLessonExtras(mediaMap = {}) {
  console.log('[seed] lesson extras...');
  for (const e of extras) {
    const imageId = mediaMap[e.mediaKey] || null;
    const r = await query(
      `INSERT INTO lesson_extras (image_id, link_url, icon_key, sort_order, is_published) VALUES (?, ?, ?, ?, 1)`,
      [imageId, e.link_url, e.icon_key, e.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(e.tr)) {
      await query(
        `INSERT INTO lesson_extra_translations (lesson_extra_id, locale, title, description, link_label) VALUES (?,?,?,?,?)`,
        [id, locale, tr.title, tr.description, tr.link_label],
      );
    }
  }
}
