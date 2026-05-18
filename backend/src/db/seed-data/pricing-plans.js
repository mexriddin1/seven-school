import { query } from '../pool.js';

const plans = [
  {
    amount: '6 600 000', currency: "so'm", featured: 1, sort: 1,
    tr: {
      uz: {
        label: "Bog'cha va 1–7-sinflar uchun:",
        note: "*Chegirmalar va aka-uka/opa-singil tariflari ham mavjud.",
        includes: "Akademik fanlar (matematika, ingliz tili, ona tili, fanlar)|3 ta majburiy sport (suzish, taekvondo, gimnastika)|AI vositalar darsi (5–7-sinflar)|Tanqidiy fikrlash va liderlik|Notiqlik san'ati va odobnoma|Bepul tushlik va 4 marta yengil ovqat|Maktab transporti (qo'shimcha)|Yopiq xavfsiz hudud va kamera kuzatuvi",
        cta_label: "Ariza topshirish →",
      },
      ru: {
        label: "Для детского сада и 1–7 классов:",
        note: "*Доступны скидки и тарифы для братьев/сестёр.",
        includes: "Академические предметы (математика, английский, родной язык, науки)|3 обязательных вида спорта (плавание, тхэквондо, гимнастика)|Уроки инструментов ИИ (5–7 классы)|Критическое мышление и лидерство|Ораторское искусство и этикет|Бесплатные обеды и 4 лёгких перекуса|Школьный транспорт (дополнительно)|Закрытая безопасная территория с видеонаблюдением",
        cta_label: "Подать заявку →",
      },
      en: {
        label: "For preschool and grades 1–7:",
        note: "*Discounts and sibling pricing available.",
        includes: "Academic subjects (math, English, native language, sciences)|3 mandatory sports (swimming, taekwondo, gymnastics)|AI tools lessons (grades 5–7)|Critical thinking and leadership|Public speaking and ethics|Free lunch and 4 light meals|School transport (optional)|Secure closed campus with video surveillance",
        cta_label: "Apply now →",
      },
    },
  },
];

export async function seedPricingPlans() {
  console.log('[seed] pricing plans...');
  for (const p of plans) {
    const r = await query(
      `INSERT INTO pricing_plans (amount, currency, is_featured, sort_order, is_published)
       VALUES (?, ?, ?, ?, 1)`,
      [p.amount, p.currency, p.featured, p.sort],
    );
    const id = r.insertId;
    for (const [locale, tr] of Object.entries(p.tr)) {
      await query(
        `INSERT INTO pricing_plan_translations (pricing_plan_id, locale, label, note, includes, cta_label)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, locale, tr.label, tr.note, tr.includes, tr.cta_label],
      );
    }
  }
}
