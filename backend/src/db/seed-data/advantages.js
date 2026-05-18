import { query } from '../pool.js';

const advantages = [
  {
    icon_key: 'people', accent_num: 1, sort: 1,
    tr: {
      uz: { title: 'Kichik sinflar — shaxsiy e\'tibor', description: "Har sinfda atigi <strong>18–22 o'quvchi</strong>. Ustoz har bir bolaga vaqt ajratadi va kuchli/zaif tomonlarini biladi." },
      ru: { title: 'Малые классы — индивидуальное внимание', description: 'В каждом классе всего <strong>18–22 ученика</strong>. Учитель уделяет время каждому ребёнку.' },
      en: { title: 'Small classes — personal attention', description: 'Just <strong>18–22 students</strong> per class. Each teacher knows every child personally.' },
    },
  },
  {
    icon_key: 'graduation', accent_num: 2, sort: 2,
    tr: {
      uz: { title: 'Tajribali ustozlar', description: "<strong>8–37 yil</strong> tajribali ustozlar. Darslik mualliflari va davlat mukofotlari sohiblari." },
      ru: { title: 'Опытные учителя', description: 'Учителя с <strong>8–37 годами</strong> опыта. Авторы учебников и обладатели наград.' },
      en: { title: 'Experienced teachers', description: 'Teachers with <strong>8–37 years</strong> of experience. Textbook authors and award winners.' },
    },
  },
  {
    icon_key: 'building', accent_num: 3, sort: 3,
    tr: {
      uz: { title: 'Akademik + Sport + AI', description: "Matematika, ingliz tili, fanlar bilan birga — <strong>4+ sport turi</strong> va 5-sinfdan boshlab <strong>AI vositalar</strong> darslari." },
      ru: { title: 'Академика + Спорт + ИИ', description: 'Математика, английский, науки + <strong>4+ вида спорта</strong> и уроки <strong>ИИ</strong> с 5 класса.' },
      en: { title: 'Academics + Sports + AI', description: 'Math, English, sciences + <strong>4+ sports</strong> and <strong>AI tools</strong> lessons from grade 5.' },
    },
  },
  {
    icon_key: 'bars', accent_num: 4, sort: 4,
    tr: {
      uz: { title: 'Birinchi yiliyoq natija', description: "Tashkil etilganidan keyingi <strong>birinchi yilda 29+ olimpiada medali</strong>. Bolaning iqtidori bizning natijamiz." },
      ru: { title: 'Результат с первого года', description: '<strong>29+ олимпиадных медалей</strong> в первый же год работы. Талант ребёнка — наш результат.' },
      en: { title: 'Results from year one', description: '<strong>29+ olympic medals</strong> in our very first year. Your child\'s talent is our outcome.' },
    },
  },
  {
    icon_key: 'document', accent_num: 5, sort: 5,
    tr: {
      uz: { title: "Sodiq Schoolga to'g'ridan-to'g'ri yo'l", description: "Seven Schoolni tugatgan o'quvchi avtomatik ravishda <strong>Sodiq School</strong>ga (8–11-sinf) o'tib, jahon TOP universitetlariga tayyorgarlik ko'radi." },
      ru: { title: 'Прямой путь в Sodiq School', description: 'Выпускник Seven School автоматически переходит в <strong>Sodiq School</strong> (8–11 классы) для подготовки в TOP-университеты мира.' },
      en: { title: 'Direct path to Sodiq School', description: 'Seven School graduates move on to <strong>Sodiq School</strong> (grades 8–11) to prepare for the world\'s top universities.' },
    },
  },
];

export async function seedAdvantages() {
  console.log('[seed] advantages...');
  for (const a of advantages) {
    const r = await query(
      `INSERT INTO advantages (icon_key, accent_num, sort_order, is_published)
       VALUES (?, ?, ?, 1)`,
      [a.icon_key, a.accent_num, a.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(a.tr)) {
      await query(
        `INSERT INTO advantage_translations (advantage_id, locale, title, description)
         VALUES (?, ?, ?, ?)`,
        [id, locale, tr.title, tr.description],
      );
    }
  }
}
