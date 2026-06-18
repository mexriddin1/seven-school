import { pool, query } from './pool.js';

const settings = [
  {
    key: 'home.pricing_eyebrow',
    uz: 'Narx',
    ru: 'Цена',
    en: 'Pricing',
  },
  {
    key: 'home.pricing_title',
    uz: "Narx — Shaffof narx. Yashirin to'lovlarsiz.",
    ru: 'Цена — прозрачная. Без скрытых платежей.',
    en: 'Transparent pricing. No hidden fees.',
  },
  {
    key: 'home.pricing_sub',
    uz: "Har bir narxga barcha mashg'ulotlar, ovqatlanish va to'garaklar kiradi.",
    ru: 'В каждую цену включены все занятия, питание и кружки.',
    en: 'Every price includes all classes, meals and clubs.',
  },
  {
    key: 'home.pricing_cta',
    uz: 'Sinov darsiga yozilish',
    ru: 'Записаться на пробный урок',
    en: 'Book a trial lesson',
  },
];

async function run() {
  console.log('[seed] home pricing settings...');
  for (const s of settings) {
    await query(
      `INSERT INTO settings (\`key\`, value_uz, value_ru, value_en, \`group\`)
       VALUES (?, ?, ?, ?, 'pricing')
       ON DUPLICATE KEY UPDATE
         \`group\` = VALUES(\`group\`)`,
      [s.key, s.uz, s.ru, s.en],
    );
  }
  console.log('[seed] home pricing settings done');
  await pool.end();
}

run().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
