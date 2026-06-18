import { pool, query } from './pool.js';

const settings = [
  {
    key: 'home.togarak_eyebrow',
    uz: "To'garaklar bo'limi",
    ru: 'Кружки',
    en: 'Clubs',
  },
  {
    key: 'home.togarak_title',
    uz: "To'garaklar — qo'shimcha emas, dastur davomidir.",
    ru: 'Кружки — не дополнение, а часть программы.',
    en: "Clubs aren't an add-on — they're part of the program.",
  },
  {
    key: 'home.togarak_sub',
    uz: "Kulolchilik · Gimnastika · Suzish · Ijodkorlik · Rasm — hammasi bir joyda. Qo'shimcha qatnovsiz.",
    ru: 'Гончарное дело · Гимнастика · Плавание · Творчество · Рисование — всё в одном месте. Без поездок.',
    en: 'Pottery · Gymnastics · Swimming · Creativity · Drawing — all in one place. No extra trips.',
  },
];

async function run() {
  console.log('[seed] home togarak settings...');
  for (const s of settings) {
    await query(
      `INSERT INTO settings (\`key\`, value_uz, value_ru, value_en, \`group\`)
       VALUES (?, ?, ?, ?, 'togaraklar')
       ON DUPLICATE KEY UPDATE
         \`group\` = VALUES(\`group\`)`,
      [s.key, s.uz, s.ru, s.en],
    );
  }
  console.log('[seed] home togarak settings done');
  await pool.end();
}

run().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
