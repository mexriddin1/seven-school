import { query } from '../pool.js';

const items = [
  {
    sort: 1,
    tr: {
      uz: { title: "O'yin orqali o'rganish",        description: "Bola uchun eng tabiiy usul — o'yin. Shu orqali u fikrlashni, muloqotni va o'rganishni boshlaydi." },
      ru: { title: 'Обучение через игру',           description: 'Самый естественный способ для ребёнка — игра. С неё начинается мышление, общение и обучение.' },
      en: { title: 'Learning through play',         description: "Play is the most natural way for a child. It's where thinking, communication and learning begin." },
    },
  },
  {
    sort: 2,
    tr: {
      uz: { title: 'Ingliz tili — tabiiy muhitda',  description: "So'z yodlash emas — tovush, eshitish va gapirish orqali tilga kirish." },
      ru: { title: 'Английский в естественной среде', description: 'Не зубрёжка слов, а вход в язык через звуки, слух и речь.' },
      en: { title: 'English in a natural setting', description: 'Not memorising words — entering the language through sound, listening and speaking.' },
    },
  },
  {
    sort: 3,
    tr: {
      uz: { title: 'Tarbiya — har kuni',            description: 'Mehr, sabr va tartib — kundalik muhitning ajralmas qismi.' },
      ru: { title: 'Воспитание каждый день',        description: 'Доброта, терпение и порядок — неотъемлемая часть среды.' },
      en: { title: 'Character every day',           description: 'Kindness, patience and order — built into the daily environment.' },
    },
  },
  {
    sort: 4,
    tr: {
      uz: { title: "Har bolaga individual e'tibor", description: "Kichik guruhlar tufayli ustoz har bir bolaning xarakteri va rivojlanishini kuzatib boradi." },
      ru: { title: 'Индивидуальное внимание',       description: 'Маленькие группы — педагог следит за характером и развитием каждого ребёнка.' },
      en: { title: 'Individual attention',          description: "Small groups mean each teacher follows every child's character and growth." },
    },
  },
];

export async function seedKidsFeatures() {
  console.log('[seed] kids_features...');
  for (const k of items) {
    const r = await query(
      `INSERT INTO kids_features (sort_order, is_published) VALUES (?, 1)`,
      [k.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(k.tr)) {
      await query(
        `INSERT INTO kids_feature_translations (kids_feature_id, locale, title, description) VALUES (?, ?, ?, ?)`,
        [id, locale, tr.title, tr.description],
      );
    }
  }
}
