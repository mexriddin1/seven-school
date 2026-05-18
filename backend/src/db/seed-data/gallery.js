import { query } from '../pool.js';

const items = [
  { size: 'tall', sort: 1, mediaKey: 'carousel-telegram-cloud-photo-size-2-5472380547129613300-y', tr: { uz: 'Dars paytida',           ru: 'На уроке',                  en: 'In class' } },
  { size: '',     sort: 2, mediaKey: 'carousel-telegram-cloud-photo-size-2-5472380547129613301-y', tr: { uz: 'Sport mashg\'uloti',     ru: 'Спортивные занятия',       en: 'Sports class' } },
  { size: '',     sort: 3, mediaKey: 'ustoz-mansur',                                               tr: { uz: 'Ustozlar',               ru: 'Учителя',                   en: 'Teachers' } },
  { size: 'wide', sort: 4, mediaKey: 'carousel-telegram-cloud-photo-size-2-5472380547129613302-y', tr: { uz: 'Maktab tadbirlari',      ru: 'Школьные мероприятия',     en: 'School events' } },
  { size: '',     sort: 5, mediaKey: 'carousel-telegram-cloud-photo-size-2-5472380547129613303-y', tr: { uz: 'Tanqidiy fikrlash',      ru: 'Критическое мышление',     en: 'Critical thinking' } },
  { size: '',     sort: 6, mediaKey: 'olympiad',                                                   tr: { uz: 'Olimpiadalar',           ru: 'Олимпиады',                 en: 'Olympiads' } },
  { size: 'tall', sort: 7, mediaKey: 'carousel-telegram-cloud-photo-size-2-5472380547129613304-y', tr: { uz: 'Maktab hayoti',          ru: 'Школьная жизнь',           en: 'School life' } },
  { size: '',     sort: 8, mediaKey: 'carousel-telegram-cloud-photo-size-2-5472380547129613305-y', tr: { uz: 'Sport musobaqalari',     ru: 'Спортивные соревнования',  en: 'Sports competitions' } },
  { size: '',     sort: 9, mediaKey: 'carousel-telegram-cloud-photo-size-2-5472380547129613306-y', tr: { uz: 'Bayram va tadbirlar',    ru: 'Праздники и мероприятия',  en: 'Festivals and events' } },
];

export async function seedGallery(mediaMap = {}) {
  console.log('[seed] gallery...');
  for (const it of items) {
    const imageId = mediaMap[it.mediaKey] || null;
    const r = await query(
      `INSERT INTO gallery_items (image_id, size_class, sort_order, is_published) VALUES (?, ?, ?, 1)`,
      [imageId, it.size, it.sort],
    );
    const id = r.insertId;
    await query(
      `INSERT INTO gallery_translations (gallery_id, locale, caption) VALUES (?,?,?),(?,?,?),(?,?,?)`,
      [id, 'uz', it.tr.uz, id, 'ru', it.tr.ru, id, 'en', it.tr.en],
    );
  }
}
