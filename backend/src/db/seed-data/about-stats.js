import { query } from '../pool.js';

const stats = [
  // ===== HOME page — "Biz kimmiz?" =====
  {
    prefix: '', value: '29', suffix: '+', page: 'home_about', sort: 1,
    tr: {
      uz: { label: 'Birinchi yildagi olimpiada medallari', sub: "29 dan ortiq medal — Seven School o'quvchilarining birinchi yildagi natijasi." },
      ru: { label: 'Олимпиадных медалей в первый год', sub: 'Более 29 медалей — результат учеников Seven School в первый год.' },
      en: { label: 'Olympic medals in the first year', sub: '29+ medals — the first-year result of Seven School students.' },
    },
  },
  {
    prefix: '', value: '18–22', suffix: '', page: 'home_about', sort: 2,
    tr: {
      uz: { label: "Sinfda o'quvchi", sub: "Har bir o'quvchiga shaxsiy yondashuv." },
      ru: { label: 'Учеников в классе', sub: 'Индивидуальный подход к каждому ученику.' },
      en: { label: 'Students per class', sub: 'Personal attention for every child.' },
    },
  },
  {
    prefix: '', value: '8–37', suffix: ' yil', page: 'home_about', sort: 3,
    tr: {
      uz: { label: 'Ustozlar tajribasi', sub: 'Darslik mualliflari, davlat mukofotlari sohiblari.' },
      ru: { label: 'Опыт учителей', sub: 'Авторы учебников, обладатели государственных наград.' },
      en: { label: 'Years of teacher experience', sub: 'Textbook authors and state award winners.' },
    },
  },
  {
    prefix: '', value: '4', suffix: '+', page: 'home_about', sort: 4,
    tr: {
      uz: { label: 'Sport turlari', sub: 'Suzish, taekvondo, gimnastika, tennis.' },
      ru: { label: 'Видов спорта', sub: 'Плавание, тхэквондо, гимнастика, теннис.' },
      en: { label: 'Sports', sub: 'Swimming, taekwondo, gymnastics, tennis.' },
    },
  },

  // ===== ABOUT page =====
  {
    prefix: '', value: '4', suffix: ' yosh', page: 'about_about', sort: 5,
    tr: {
      uz: { label: "Boshlang'ich yosh", sub: "Bog'chadan 7-sinfgacha — uzluksiz ta'lim." },
      ru: { label: 'Начальный возраст', sub: 'От детского сада до 7 класса — непрерывное обучение.' },
      en: { label: 'Starting age', sub: 'From preschool to grade 7 — seamless education.' },
    },
  },
  {
    prefix: '', value: '15', suffix: '+', page: 'about_about', sort: 6,
    tr: {
      uz: { label: 'Tajribali ustozlar', sub: "Akademik, sport va kreativ yo'nalishlar." },
      ru: { label: 'Опытных учителей', sub: 'Академические, спортивные и креативные направления.' },
      en: { label: 'Experienced teachers', sub: 'Academic, sports and creative tracks.' },
    },
  },
  {
    prefix: '', value: '500', suffix: '+', page: 'about_about', sort: 7,
    tr: {
      uz: { label: 'Yillik sport soati', sub: 'Jismoniy rivojlanish — har kuni.' },
      ru: { label: 'Часов спорта в год', sub: 'Физическое развитие — каждый день.' },
      en: { label: 'Sport hours per year', sub: 'Physical development — every day.' },
    },
  },
  {
    prefix: '', value: '6', suffix: '+', page: 'about_about', sort: 8,
    tr: {
      uz: { label: "To'garaklar", sub: 'Shaxmat, robototexnika, kulolchilik, mental arifmetika va boshqalar.' },
      ru: { label: 'Кружков', sub: 'Шахматы, робототехника, гончарное дело, ментальная арифметика и др.' },
      en: { label: 'Clubs', sub: 'Chess, robotics, pottery, mental arithmetic and more.' },
    },
  },

  // ===== RESULTS page — "Natijalar" =====
  {
    prefix: '', value: '29', suffix: '+', page: 'results', sort: 9,
    tr: {
      uz: { label: 'Olimpiada medallari', sub: 'World Scholar\'s Cup, Asiarope va boshqa xalqaro musobaqalar.' },
      ru: { label: 'Олимпиадных медалей', sub: 'World Scholar\'s Cup, Asiarope и другие международные конкурсы.' },
      en: { label: 'Olympic medals', sub: 'World Scholar\'s Cup, Asiarope and other international competitions.' },
    },
  },
  {
    prefix: '', value: '27', suffix: '', page: 'results', sort: 10,
    tr: {
      uz: { label: "Sovrindor o'quvchi", sub: "Birinchi o'quv yili davomida." },
      ru: { label: 'Учеников-призёров', sub: 'За первый учебный год.' },
      en: { label: 'Medal-winning students', sub: 'Within the first academic year.' },
    },
  },
  {
    prefix: '', value: '8', suffix: '', page: 'results', sort: 11,
    tr: {
      uz: { label: '"Qibray Open" karate', sub: 'Sport maydonida ham yaxshi natijalar.' },
      ru: { label: '"Qibray Open" каратэ', sub: 'Хорошие результаты и в спорте.' },
      en: { label: '"Qibray Open" karate', sub: 'Strong results in sports too.' },
    },
  },
  {
    prefix: '', value: '100', suffix: '%', page: 'results', sort: 12,
    tr: {
      uz: { label: 'Sinflarning aktivligi', sub: "Har bir o'quvchi kamida 1 ta musobaqada ishtirok etdi." },
      ru: { label: 'Активность классов', sub: 'Каждый ученик участвовал минимум в одном конкурсе.' },
      en: { label: 'Class participation', sub: 'Every student took part in at least one competition.' },
    },
  },

  // ===== MASHG'ULOTLAR — grant banner (4 stats) =====
  {
    prefix: '', value: '4 yosh', suffix: '', page: 'mash_grant', sort: 13,
    tr: {
      uz: { label: 'dan', sub: '' },
      ru: { label: 'от', sub: '' },
      en: { label: 'from age', sub: '' },
    },
  },
  {
    prefix: '', value: '7-sinf', suffix: '', page: 'mash_grant', sort: 14,
    tr: {
      uz: { label: 'gacha', sub: '' },
      ru: { label: 'до 7 класса', sub: '' },
      en: { label: 'to grade 7', sub: '' },
    },
  },
  {
    prefix: '', value: '18–22', suffix: '', page: 'mash_grant', sort: 15,
    tr: {
      uz: { label: "o'quvchi sinfda", sub: '' },
      ru: { label: 'учеников в классе', sub: '' },
      en: { label: 'students per class', sub: '' },
    },
  },
  {
    prefix: '', value: '6', suffix: '+', page: 'mash_grant', sort: 16,
    tr: {
      uz: { label: "to'garak", sub: '' },
      ru: { label: 'кружков', sub: '' },
      en: { label: 'clubs', sub: '' },
    },
  },

];

export async function seedAboutStats() {
  console.log('[seed] about stats...');
  for (const s of stats) {
    const r = await query(
      `INSERT INTO about_stats (prefix, value, suffix, page, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [s.prefix, s.value, s.suffix, s.page, s.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(s.tr)) {
      await query(
        `INSERT INTO about_stat_translations (about_stat_id, locale, label, sub)
         VALUES (?, ?, ?, ?)`,
        [id, locale, tr.label, tr.sub],
      );
    }
  }
}
