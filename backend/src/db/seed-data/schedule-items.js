import { query } from '../pool.js';

const items = [
  { time: '08:30', sort: 1, kind: 'time',
    tr: { uz: 'Nonushta', ru: 'Завтрак', en: 'Breakfast' } },
  { time: '09:00', sort: 2, kind: 'time',
    tr: { uz: "Salomlashish va harakatli o'yinlar", ru: 'Приветствие и подвижные игры', en: 'Greetings and active games' } },
  { time: '10:00', sort: 3, kind: 'time',
    tr: { uz: "Ingliz tili — o'yin shaklida", ru: 'Английский — в игровой форме', en: 'English — in game form' } },
  { time: '11:00', sort: 4, kind: 'time',
    tr: { uz: 'Matematika asoslari', ru: 'Основы математики', en: 'Maths basics' } },
  { time: '12:00', sort: 5, kind: 'time',
    tr: { uz: "Sog'lom tushlik", ru: 'Здоровый обед', en: 'Healthy lunch' } },
  { time: '13:00', sort: 6, kind: 'time',
    tr: { uz: 'Ijod darslari: rasm, musiqa', ru: 'Творчество: рисование, музыка', en: 'Creative classes: drawing, music' } },
  { time: '14:00', sort: 7, kind: 'time',
    tr: { uz: "Erkin o'yin va dam olish", ru: 'Свободная игра и отдых', en: 'Free play and rest' } },
  { time: '15:00', sort: 8, kind: 'time',
    tr: { uz: 'Hikoya va kitob vaqti', ru: 'Сказка и книжный час', en: 'Storytime and reading' } },
  { time: '16:00', sort: 9, kind: 'time',
    tr: { uz: "Sport va harakatli mashg'ulotlar", ru: 'Спорт и подвижные занятия', en: 'Sport and active sessions' } },
  { time: '16:30', sort: 10, kind: 'time',
    tr: { uz: 'Tolmachoy vaqti', ru: 'Полдник', en: 'Afternoon snack' } },
  { time: '17:00', sort: 11, kind: 'time',
    tr: { uz: 'Ota-onalar kutib oladi', ru: 'Родители забирают', en: 'Parents pick up' } },
  // extra row at the bottom (orange)
  { time: '', sort: 12, kind: 'extra',
    tr_title: { uz: "To'garaklar", ru: 'Кружки', en: 'Clubs' },
    tr: { uz: 'Suzish · Taekwondo · Gimnastika · Shaxmat · Robototexnika', ru: 'Плавание · Таэквондо · Гимнастика · Шахматы · Робототехника', en: 'Swimming · Taekwondo · Gymnastics · Chess · Robotics' } },
];

export async function seedScheduleItems() {
  console.log('[seed] schedule_items...');
  for (const it of items) {
    const r = await query(
      `INSERT INTO schedule_items (time_label, kind, sort_order, is_published) VALUES (?, ?, ?, 1)`,
      [it.time, it.kind, it.sort],
    );
    const id = r.insertId;
    for (const locale of ['uz', 'ru', 'en']) {
      const title = it.tr_title ? it.tr_title[locale] : null;
      const desc = it.tr[locale];
      await query(
        `INSERT INTO schedule_item_translations (schedule_item_id, locale, title, description) VALUES (?, ?, ?, ?)`,
        [id, locale, title, desc],
      );
    }
  }
}
