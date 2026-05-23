// Static UI labels for the public site (post-redesign).
// Dynamic editorial content (teachers, blog posts, gallery, pricing plans,
// FAQs, testimonial videos, settings) flows from the backend via fetchSiteBundle.

import type { Locale } from './config';

export type EcoCard = { step: string; title: string; age: string; desc: string };
export type KidFeature = { title: string; desc: string };
export type TogarakItem = { title: string };
export type CurriculumItem = { title: string; desc: string };
export type IndividualStat = { num: string; lbl: string; sub: string };
export type ScheduleItem = { time: string; desc: string };
export type LessonBlock = { icon: string; title: string; desc: string; tags: string[] };
export type ContactItem = { label: string; value: string };

export type Dict = {
  nav: { home: string; about: string; lessons: string; blog: string; contact: string };
  cta_apply: string;
  open_menu: string;
  footer_description: string;
  footer_rights: string;
  loading: string;
  read_more: string;

  meta: {
    home_title: string; home_desc: string;
    about_title: string; about_desc: string;
    lessons_title: string; lessons_desc: string;
    blog_title: string; blog_desc: string;
    contact_title: string; contact_desc: string;
  };

  sections: {
    apply_label_phone: string;
  };

  // ============== HOME ==============
  home: {
    pill: string;
    title_line1: string;
    title_line2_pre: string;
    title_line2_accent: string;
    lead: string;
    cta_primary: string;
    cta_secondary: string;
    stats: Array<{ num: string; lbl: string; sub: string }>;

    eco_eyebrow: string;
    eco_title: string;
    eco_sub: string;
    eco: EcoCard[];

    kids_eyebrow: string;
    kids_title_html: string;
    kids_sub: string;
    kids: KidFeature[];

    togarak_eyebrow: string;
    togarak_title: string;
    togarak_sub: string;
    togarak: TogarakItem[];

    pricing_eyebrow: string;
    pricing_title: string;
    pricing_sub: string;
    pricing_cta: string;

    curriculum_eyebrow: string;
    curriculum_title: string;
    curriculum_sub: string;
    curriculum: CurriculumItem[];
    individual_title: string;
    individual_stats: IndividualStat[];

    schedule_eyebrow: string;
    schedule_title: string;
    schedule: ScheduleItem[];
    schedule_extra_title: string;
    schedule_extra_desc: string;

    parents_eyebrow: string;
    parents_title: string;
    parents_sub: string;
    parents_disclaimer: string;
    parents_cta: string;

    cta_h2: string;
    cta_p_html: string;
    cta_btn: string;
    cta_note: string;
  };

  // ============== ABOUT ==============
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    who_title: string;
    who_p1_html: string;
    who_p2_html: string;
    est_label: string;
    stats: Array<{ val: string; lbl: string }>;
    shorts_eyebrow: string;
    shorts_title: string;
    team_eyebrow: string;
    team_title: string;
    team_cta_label: string;
    gallery_eyebrow: string;
    gallery_title: string;
    lead_eyebrow: string;
    lead_title: string;
    lead_sub_html: string;
    lead_name_ph: string;
    lead_phone_ph: string;
    lead_submit: string;
    lead_promise: string;
  };

  // ============== LESSONS ==============
  lessons: {
    eyebrow: string;
    title_html: string;
    lead: string;
    blocks: LessonBlock[];
    dark_h2_html: string;
    dark_p: string;
    dark_btn: string;
  };

  // ============== BLOG ==============
  blog: {
    eyebrow: string;
    title: string;
    lead: string;
    empty: string;
    read_more: string;
    back: string;
  };

  // ============== CONTACT ==============
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    form_title: string;
    form_lead: string;
    fields: {
      name_lbl: string; name_ph: string;
      phone_lbl: string; phone_ph: string;
      message_lbl: string; message_ph: string;
      submit: string;
      success: string;
    };
    info_title: string;
    items: ContactItem[];
    faq_eyebrow: string;
    faq_title: string;
  };

  // ============== POPUP FORM ==============
  popup: {
    title: string;
    lead: string;
    name_lbl: string; name_ph: string;
    phone_lbl: string; phone_ph: string;
    location_lbl: string; location_ph: string;
    submit: string;
    close: string;
    image_caption: string;
    success: string;
    provinces: string[];
  };
};

// ---------------- UZ ----------------

const uz: Dict = {
  nav: { home: 'Bosh sahifa', about: 'Biz haqimizda', lessons: 'Darslar', blog: 'Blog', contact: 'Aloqa' },
  cta_apply: 'Ariza qoldiring',
  open_menu: 'Menyu',
  footer_description: "Toshkentdagi yetakchi xususiy maktab. Yoshlarimizni dunyo TOP universitetlariga olib boruvchi xavfsiz ko'prik.",
  footer_rights: 'Barcha huquqlar himoyalangan.',
  loading: 'Yuklanmoqda...',
  read_more: "Batafsil →",

  meta: {
    home_title: 'Seven School — Farzandingiz kelajagi shu yerdan boshlanadi',
    home_desc: "2 yoshdan 4-sinfgacha — Seven Schoolda bola uchun kerak bo'lgan hamma narsa bir joyda.",
    about_title: 'Biz haqimizda — Seven School',
    about_desc: "Seven School — Toshkentdagi xususiy maktab va bog'cha. Jamoamiz, galereya va ota-onalar fikrlari.",
    lessons_title: 'Darslar — Seven School',
    lessons_desc: "O'quv dasturi — darslik uchun emas, hayot uchun ta'lim.",
    blog_title: 'Blog — Seven School',
    blog_desc: "Ta'lim, tarbiya va maktab hayoti haqida maqolalar.",
    contact_title: 'Aloqa — Seven School',
    contact_desc: 'Seven School bilan bog\'laning. Savol bering yoki ariza topshiring.',
  },

  sections: { apply_label_phone: 'QABUL' },

  home: {
    pill: '2025–2026 qabul davom etmoqda',
    title_line1: 'Farzandingiz hozir',
    title_line2_pre: 'nechchi',
    title_line2_accent: "yoshda?",
    lead: "2 yoshdan 4-sinfgacha — Seven Schoolda bola uchun kerak bo'lgan hamma narsa bir joyda.",
    cta_primary: 'Bepul sinov darsi →',
    cta_secondary: 'Ekotizim bilan tanishing',
    stats: [
      { num: '370+', lbl: "O'quvchi", sub: 'Bugun Seven oilasining bir qismi' },
      { num: '54',   lbl: 'Ustoz',    sub: '8–37 yilgacha tajriba' },
      { num: '3',    lbl: 'Kampus',   sub: 'Toshkentning qulay nuqtalarida' },
      { num: '2+',   lbl: '2 yoshdan', sub: 'Dastur 2 yoshdan boshlanadi' },
    ],

    eco_eyebrow: 'Ekotizim',
    eco_title: "Bir tizim. Bir yo'l. Bir maqsad.",
    eco_sub: "Farzandingiz 2 yoshdan 11-sinfgacha — bitta ekotizimda, uzluksiz rivojlanish.",
    eco: [
      { step: '01', title: 'Seven Kids',   age: '2–6 yosh', desc: "O'yin orqali o'rganish. Maktabga ishonch bilan tayyorlanish." },
      { step: '02', title: 'Seven School', age: '1–4 sinf', desc: "Kuchli akademik poydevor, til, IT, sport va tarbiya." },
      { step: '03', title: 'Sodiq School', age: '5–11 sinf', desc: "Dunyo universitetlariga to'liq tayyorgarlik." },
    ],

    kids_eyebrow: 'Seven Kids · 2–6 yosh',
    kids_title_html: "Bola o'ynaydi. O'rganayotganini esa<br>sezmaydi.",
    kids_sub: "2 yoshdan 6 yoshgacha — Seven Kids'da har kun yangi tajriba, yangi kashfiyot. O'qituv uslubi — O'yin → Ko'nikma → Bilim",
    kids: [
      { title: "O'yin orqali o'rganish",         desc: "Bola uchun eng tabiiy usul — o'yin. Shu orqali u fikrlashni, muloqotni va o'rganishni boshlaydi." },
      { title: "Ingliz tili — tabiiy muhitda",   desc: "So'z yodlash emas — tovush, eshitish va gapirish orqali tilga kirish." },
      { title: "Tarbiya — har kuni",             desc: "Mehr, sabr va tartib — kundalik muhitning ajralmas qismi." },
      { title: "Har bolaga individual e'tibor",  desc: "Kichik guruhlar tufayli ustoz har bir bolaning xarakteri va rivojlanishini kuzatib boradi." },
    ],

    togarak_eyebrow: "To'garaklar bo'limi",
    togarak_title: "To'garaklar — qo'shimcha emas, dastur davomidir.",
    togarak_sub: "Kulolchilik · Gimnastika · Suzish · Ijodkorlik · Rasm — hammasi bir joyda. Qo'shimcha qatnovsiz.",
    togarak: [
      { title: 'Kulolchilik' }, { title: 'Rasm' }, { title: 'Gimnastika' },
      { title: 'Suzish' },      { title: 'Ijodkorlik' }, { title: 'Shaxmat' },
      { title: 'Ingliz tili' }, { title: 'Taekwondo' },  { title: 'Robototexnika' },
    ],

    pricing_eyebrow: 'Narx',
    pricing_title: "Narx — Shaffof narx. Yashirin to'lovlarsiz.",
    pricing_sub: "Har bir narxga barcha mashg'ulotlar, ovqatlanish va to'garaklar kiradi.",
    pricing_cta: 'Sinov darsiga yozilish',

    curriculum_eyebrow: 'Seven School · 1–4 sinf',
    curriculum_title: "Boshlang'ich sinf — keyingi 11 yilning poydevori.",
    curriculum_sub: "Seven School'da boshlang'ich ta'lim faqat dars bilan cheklanmaydi. O'quv dasturi — Darslik uchun emas, hayot uchun ta'lim.",
    curriculum: [
      { title: 'IT — 1-sinfdan',               desc: "Mantiqiy fikrlash va boshlang'ich kompyuter asoslari." },
      { title: 'Ingliz tili — bosqichma-bosqich', desc: 'Fonetikadan boshlab keyinchalik IELTS darajasigacha.' },
      { title: 'Arab tili — ilk sinfdan',      desc: 'Til bilan birga qadriyatlar ham shakllanadi.' },
      { title: 'STEAM — amaliy yondashuv',     desc: "Nazariya emas, sinab ko'rish orqali o'rganish." },
      { title: 'Critical Thinking',            desc: "Savol berish, tahlil qilish va mustaqil fikrlash ko'nikmasi." },
      { title: 'Hayot maktabi',                desc: 'Har oy bitta qadriyat. Butun maktab shu muhit bilan yashaydi.' },
    ],
    individual_title: 'Individual yondashuv',
    individual_stats: [
      { num: '18–22',    lbl: "o'quvchi",  sub: 'har sinfda' },
      { num: 'Mentor',   lbl: 'va Tutor',  sub: 'har bolaga' },
      { num: 'Haftalik', lbl: 'hisobot',   sub: 'ota-onaga' },
      { num: 'Tezkor',   lbl: 'javob',     sub: 'har savolga' },
    ],

    schedule_eyebrow: 'Kun tartibi',
    schedule_title: 'Har kun — mazmunli.',
    schedule: [
      { time: '08:30', desc: 'Nonushta' },
      { time: '09:00', desc: "Salomlashish va harakatli o'yinlar" },
      { time: '10:00', desc: "Ingliz tili — o'yin shaklida" },
      { time: '11:00', desc: 'Matematika asoslari' },
      { time: '12:00', desc: "Sog'lom tushlik" },
      { time: '13:00', desc: 'Ijod darslari: rasm, musiqa' },
      { time: '14:00', desc: "Erkin o'yin va dam olish" },
      { time: '15:00', desc: 'Hikoya va kitob vaqti' },
      { time: '16:00', desc: "Sport va harakatli mashg'ulotlar" },
      { time: '16:30', desc: 'Tolmachoy vaqti' },
      { time: '17:00', desc: 'Ota-onalar kutib oladi' },
    ],
    schedule_extra_title: "To'garaklar",
    schedule_extra_desc: 'Suzish · Taekwondo · Gimnastika · Shaxmat · Robototexnika',

    parents_eyebrow: "Ota-onalar bo'limi",
    parents_title: "Eng yaxshi fikrni — ularning o'zi aytadi.",
    parents_sub: "Influencer Lola Zunnunova, Ra'no Mo'minova va boshqa ko'plab ota-onalar Seven School'ni tanladi. Eng yaxshi fikrni esa — ularning o'zi aytadi.",
    parents_disclaimer: "Joylar tez to'lib bormoqda. Har sinfda atigi 18–22 o'rin. Qabul davom etmoqda.",
    parents_cta: 'Bepul konsultatsiyaga yozilish',

    cta_h2: 'Bepul sinov darsiga yoziling.',
    cta_p_html: 'Farzandingiz keladi, muhitni his qiladi. <strong>Keyin qarorni siz berasiz.</strong>',
    cta_btn: 'Ariza topshirish →',
    cta_note: 'Joylar soni cheklangan',
  },

  about: {
    eyebrow: 'Biz haqimizda',
    title: 'Seven School haqida',
    lead: "Seven School — 2024-yilda ochilgan xususiy maktab va bog'cha. Ta'lim 4 yoshdan boshlanib, 7-sinfgacha davom etadi.",
    who_title: 'Biz kimmiz?',
    who_p1_html: "Seven School — 2024-yilda ochilgan xususiy maktab va bog'cha. Ta'lim 4 yoshdan boshlanib, 7-sinfgacha davom etadi. Keyingi bosqichda o'quvchilarimiz <strong>Sodiq School</strong>'da o'qishni davom ettiradi.",
    who_p2_html: 'Bu yerda maktab dasturidan tashqari <strong>tanqidiy fikrlash</strong>, <strong>liderlik</strong>, <strong>AI vositalardan foydalanish</strong> va <strong>arab tili</strong> darslari ham o\'qitiladi.',
    est_label: 'EST. 2024 · TASHKENT',
    stats: [
      { val: '2024',  lbl: 'Tashkil etilgan' },
      { val: '18–22', lbl: "Sinfda o'quvchi" },
      { val: '15+',   lbl: 'Ustozlar' },
      { val: '29+',   lbl: 'Olimpiada medallari' },
    ],
    shorts_eyebrow: 'Ishonch',
    shorts_title: 'Ota-onalar nima deydi?',
    team_eyebrow: 'Bizning jamoa',
    team_title: 'Seven School jamoasi bilan tanishing',
    team_cta_label: 'Tanishing →',
    gallery_eyebrow: 'Galereya',
    gallery_title: 'Maktab hayotidan lavhalar',
    lead_eyebrow: "Bog'lanish",
    lead_title: 'Savolingiz bormi?',
    lead_sub_html: 'Raqamingizni qoldiring.<br>Biz siz bilan 24 soat ichida bog\'lanamiz.',
    lead_name_ph: "To'liq ism-sharif",
    lead_phone_ph: 'Telefon raqam',
    lead_submit: 'Yuborish',
    lead_promise: '✓ 24 soat ichida bog\'lanamiz',
  },

  lessons: {
    eyebrow: 'Darslar',
    title_html: "O'quv dasturi — darslik uchun<br>emas, hayot uchun ta'lim.",
    lead: 'Har bir fan amaliy yondashuv, zamonaviy metodika va tajribali ustozlar bilan o\'tiladi.',
    blocks: [
      { icon: '🔤', title: 'Ingliz tili',          desc: "Fonetikadan IELTS darajasigacha. Tabiiy muhitda, bosqichma-bosqich o'rganish. Speaking Club, listening va writing mashg'ulotlari.", tags: ['1-sinfdan', 'IELTS', 'Speaking'] },
      { icon: '💻', title: "IT & Sun'iy intellekt", desc: '1-sinfdan kompyuter asoslari. 5-sinfdan AI darslari — kelajak kasblariga tayyorlov.', tags: ['1-sinfdan', 'AI', 'Dasturlash'] },
      { icon: '📐', title: 'Matematika & STEAM',   desc: "Nazariya emas, amaliyot. Sinab ko'rish, tajriba qilish va loyiha asosida o'rganish.", tags: ['STEAM', 'Mantiq', 'Loyiha'] },
      { icon: '📖', title: 'Arab tili & Qadriyatlar', desc: 'Til bilan birga qadriyatlar ham shakllanadi. Ilk sinfdan boshlab o\'rgatiladi.', tags: ['1-sinfdan', 'Tarbiya', 'Qadriyat'] },
      { icon: '🧠', title: 'Critical Thinking',     desc: "Savol berish, tahlil qilish va mustaqil fikrlash ko'nikmasi. Har bir darsda rivojlantiriladi.", tags: ['1-sinfdan', 'Tahlil', 'Mantiq'] },
      { icon: '🏊', title: "Sport & To'garaklar",   desc: "Suzish, taekwondo, gimnastika, shaxmat, robototexnika — hammasi maktabning o'zida. Qo'shimcha qatnovsiz.", tags: ['Suzish', 'Taekwondo', 'Shaxmat'] },
    ],
    dark_h2_html: "Darslik uchun emas,<br>hayot uchun ta'lim.",
    dark_p: "Seven School'da har bir dars — bu kashfiyot. Bola faqat tinglamaydi, balki sinab ko'radi, savol beradi, o'zi xulosa chiqaradi.",
    dark_btn: 'Sinov darsiga yozilish →',
  },

  blog: {
    eyebrow: 'Blog',
    title: 'Yangiliklar va maqolalar',
    lead: "Ta'lim, tarbiya va maktab hayoti haqida eng qiziqarli maqolalar.",
    empty: "Hozircha maqolalar yo'q.",
    read_more: 'Batafsil →',
    back: '← Barcha maqolalar',
  },

  contact: {
    eyebrow: 'Aloqa',
    title: "Biz bilan bog'laning",
    lead: 'Savollaringiz bormi? Ariza topshirmoqchimisiz? Quyidagi forma orqali yozing yoki telefon qiling.',
    form_title: "Bog'lanish",
    form_lead: 'Quyidagi forma orqali ariza qoldiring.',
    fields: {
      name_lbl: 'Ism va familiya', name_ph: "To'liq ism-sharif",
      phone_lbl: 'Telefon raqami', phone_ph: '+998 XX XXX XX XX',
      message_lbl: 'Xabaringiz',   message_ph: 'Savolingizni yozing...',
      submit: 'Yuborish',
      success: "Rahmat! Arizangiz qabul qilindi. Tez orada bog'lanamiz.",
    },
    info_title: "Bog'lanish ma'lumotlari",
    items: [
      { label: 'Manzil',     value: "Toshkent shahri, Yashnobod tumani" },
      { label: 'Telefon',    value: '+998 78 888 80 80' },
      { label: 'Ish vaqti',  value: 'Du–Sh: 09:00 — 18:00' },
      { label: 'Email',      value: 'info@sevenschool.uz' },
    ],
    faq_eyebrow: 'FAQ',
    faq_title: "Ko'p beriladigan savollar",
  },

  popup: {
    title: 'Ariza qoldiring',
    lead: 'Ma\'lumotlaringizni qoldiring, operatorimiz siz bilan bog\'lanadi.',
    name_lbl: 'Ismingiz',         name_ph: 'Ism va familiya',
    phone_lbl: 'Telefon raqamingiz', phone_ph: '+998 XX XXX XX XX',
    location_lbl: 'Joylashuv',    location_ph: 'Viloyatni tanlang',
    submit: 'Yuborish', close: 'Yopish',
    image_caption: 'Farzandingizning birinchi katta qadami shu yerdan boshlanadi.',
    success: "Rahmat! Arizangiz qabul qilindi. Tez orada bog'lanamiz.",
    provinces: [
      'Toshkent shahri', 'Toshkent viloyati', 'Andijon viloyati', 'Buxoro viloyati',
      "Farg'ona viloyati", 'Jizzax viloyati', 'Xorazm viloyati', 'Namangan viloyati',
      'Navoiy viloyati', 'Qashqadaryo viloyati', "Qoraqalpog'iston Respublikasi",
      'Samarqand viloyati', 'Sirdaryo viloyati', 'Surxondaryo viloyati',
    ],
  },
};

// ---------------- RU ----------------

const ru: Dict = {
  nav: { home: 'Главная', about: 'О нас', lessons: 'Уроки', blog: 'Блог', contact: 'Контакты' },
  cta_apply: 'Оставить заявку',
  open_menu: 'Меню',
  footer_description: 'Ведущая частная школа в Ташкенте. Безопасный мост к лучшим университетам мира.',
  footer_rights: 'Все права защищены.',
  loading: 'Загрузка...',
  read_more: 'Подробнее →',

  meta: {
    home_title: 'Seven School — Будущее вашего ребёнка начинается здесь',
    home_desc: 'От 2 лет до 4 класса — в Seven School есть всё, что нужно ребёнку.',
    about_title: 'О нас — Seven School',
    about_desc: 'Частная школа и детский сад в Ташкенте. Команда, галерея, отзывы родителей.',
    lessons_title: 'Уроки — Seven School',
    lessons_desc: 'Образование не ради учебника, а для жизни.',
    blog_title: 'Блог — Seven School',
    blog_desc: 'Статьи об образовании, воспитании и школьной жизни.',
    contact_title: 'Контакты — Seven School',
    contact_desc: 'Свяжитесь с Seven School. Задайте вопрос или подайте заявку.',
  },

  sections: { apply_label_phone: 'ПРИЁМ' },

  home: {
    pill: 'Приём 2025–2026 открыт',
    title_line1: 'Сколько лет',
    title_line2_pre: 'вашему',
    title_line2_accent: 'ребёнку?',
    lead: 'От 2 лет до 4 класса — в Seven School всё, что нужно ребёнку, в одном месте.',
    cta_primary: 'Бесплатный пробный урок →',
    cta_secondary: 'Познакомиться с экосистемой',
    stats: [
      { num: '370+', lbl: 'Учеников', sub: 'Уже в семье Seven' },
      { num: '54',   lbl: 'Педагогов', sub: 'Опыт 8–37 лет' },
      { num: '3',    lbl: 'Кампуса',   sub: 'В удобных точках Ташкента' },
      { num: '2+',   lbl: 'От 2 лет',  sub: 'Программа начинается с 2 лет' },
    ],

    eco_eyebrow: 'Экосистема',
    eco_title: 'Одна система. Один путь. Одна цель.',
    eco_sub: 'Ваш ребёнок от 2 лет до 11 класса — в одной экосистеме, в непрерывном развитии.',
    eco: [
      { step: '01', title: 'Seven Kids',   age: '2–6 лет',  desc: 'Обучение через игру. Уверенная подготовка к школе.' },
      { step: '02', title: 'Seven School', age: '1–4 класс', desc: 'Сильная академическая база, языки, IT, спорт и воспитание.' },
      { step: '03', title: 'Sodiq School', age: '5–11 класс', desc: 'Полная подготовка к университетам мира.' },
    ],

    kids_eyebrow: 'Seven Kids · 2–6 лет',
    kids_title_html: 'Ребёнок играет. А что учится —<br>даже не замечает.',
    kids_sub: 'От 2 до 6 лет — в Seven Kids каждый день новое открытие. Метод: Игра → Навык → Знание.',
    kids: [
      { title: 'Обучение через игру',             desc: 'Самый естественный способ для ребёнка — игра. С неё начинается мышление, общение и обучение.' },
      { title: 'Английский в естественной среде', desc: 'Не зубрёжка слов, а вход в язык через звуки, слух и речь.' },
      { title: 'Воспитание каждый день',          desc: 'Доброта, терпение и порядок — неотъемлемая часть среды.' },
      { title: 'Индивидуальное внимание',         desc: 'Маленькие группы — педагог следит за характером и развитием каждого ребёнка.' },
    ],

    togarak_eyebrow: 'Кружки',
    togarak_title: 'Кружки — не дополнение, а часть программы.',
    togarak_sub: 'Гончарное дело · Гимнастика · Плавание · Творчество · Рисование — всё в одном месте. Без поездок.',
    togarak: [
      { title: 'Гончарное дело' }, { title: 'Рисование' }, { title: 'Гимнастика' },
      { title: 'Плавание' },       { title: 'Творчество' }, { title: 'Шахматы' },
      { title: 'Английский' },     { title: 'Таэквондо' },  { title: 'Робототехника' },
    ],

    pricing_eyebrow: 'Цена',
    pricing_title: 'Цена — прозрачная. Без скрытых платежей.',
    pricing_sub: 'В каждую цену включены все занятия, питание и кружки.',
    pricing_cta: 'Записаться на пробный урок',

    curriculum_eyebrow: 'Seven School · 1–4 класс',
    curriculum_title: 'Начальная школа — фундамент следующих 11 лет.',
    curriculum_sub: 'В Seven School начальное образование не ограничивается уроками. Образование — не ради учебника, а для жизни.',
    curriculum: [
      { title: 'IT — с 1 класса',                   desc: 'Логическое мышление и основы компьютера.' },
      { title: 'Английский — по этапам',            desc: 'От фонетики до уровня IELTS.' },
      { title: 'Арабский — с первого класса',       desc: 'Вместе с языком формируются ценности.' },
      { title: 'STEAM — практический подход',       desc: 'Не теория, а обучение через опыт.' },
      { title: 'Critical Thinking',                 desc: 'Умение задавать вопросы, анализировать и думать самостоятельно.' },
      { title: 'Школа жизни',                       desc: 'Каждый месяц одна ценность — вся школа живёт этой темой.' },
    ],
    individual_title: 'Индивидуальный подход',
    individual_stats: [
      { num: '18–22',      lbl: 'учеников',  sub: 'в каждом классе' },
      { num: 'Mentor',     lbl: 'и Tutor',   sub: 'для каждого ребёнка' },
      { num: 'Еженедельный', lbl: 'отчёт',   sub: 'родителям' },
      { num: 'Быстрый',    lbl: 'ответ',     sub: 'на любой вопрос' },
    ],

    schedule_eyebrow: 'Распорядок дня',
    schedule_title: 'Каждый день — содержательный.',
    schedule: [
      { time: '08:30', desc: 'Завтрак' },
      { time: '09:00', desc: 'Приветствие и подвижные игры' },
      { time: '10:00', desc: 'Английский — в игровой форме' },
      { time: '11:00', desc: 'Основы математики' },
      { time: '12:00', desc: 'Здоровый обед' },
      { time: '13:00', desc: 'Творчество: рисование, музыка' },
      { time: '14:00', desc: 'Свободная игра и отдых' },
      { time: '15:00', desc: 'Сказка и книжный час' },
      { time: '16:00', desc: 'Спорт и подвижные занятия' },
      { time: '16:30', desc: 'Полдник' },
      { time: '17:00', desc: 'Родители забирают' },
    ],
    schedule_extra_title: 'Кружки',
    schedule_extra_desc: 'Плавание · Таэквондо · Гимнастика · Шахматы · Робототехника',

    parents_eyebrow: 'Родители',
    parents_title: 'Лучше всего расскажут — сами родители.',
    parents_sub: 'Инфлюенсеры Лола Зуннунова, Раъно Муминова и многие другие родители выбрали Seven School. Их слова — лучший отзыв.',
    parents_disclaimer: 'Места быстро заканчиваются. В каждом классе всего 18–22 места. Приём продолжается.',
    parents_cta: 'Записаться на консультацию',

    cta_h2: 'Запишитесь на бесплатный пробный урок.',
    cta_p_html: 'Ребёнок приходит, чувствует среду. <strong>Решение остаётся за вами.</strong>',
    cta_btn: 'Подать заявку →',
    cta_note: 'Количество мест ограничено',
  },

  about: {
    eyebrow: 'О нас',
    title: 'О Seven School',
    lead: 'Seven School — частная школа и детский сад, открытые в 2024 году. Обучение с 4 лет до 7 класса.',
    who_title: 'Кто мы?',
    who_p1_html: 'Seven School — частная школа и детский сад, открытые в 2024 году. Обучение с 4 лет до 7 класса. На следующем этапе ученики продолжают в <strong>Sodiq School</strong>.',
    who_p2_html: 'Помимо школьной программы преподаются <strong>критическое мышление</strong>, <strong>лидерство</strong>, <strong>использование AI</strong> и <strong>арабский</strong>.',
    est_label: 'EST. 2024 · TASHKENT',
    stats: [
      { val: '2024',  lbl: 'Год основания' },
      { val: '18–22', lbl: 'Учеников в классе' },
      { val: '15+',   lbl: 'Педагогов' },
      { val: '29+',   lbl: 'Медалей олимпиад' },
    ],
    shorts_eyebrow: 'Доверие',
    shorts_title: 'Что говорят родители?',
    team_eyebrow: 'Наша команда',
    team_title: 'Познакомьтесь с командой Seven School',
    team_cta_label: 'Подробнее →',
    gallery_eyebrow: 'Галерея',
    gallery_title: 'Моменты из школьной жизни',
    lead_eyebrow: 'Связаться',
    lead_title: 'Есть вопросы?',
    lead_sub_html: 'Оставьте номер.<br>Мы свяжемся в течение 24 часов.',
    lead_name_ph: 'Полное имя',
    lead_phone_ph: 'Номер телефона',
    lead_submit: 'Отправить',
    lead_promise: '✓ Свяжемся в течение 24 часов',
  },

  lessons: {
    eyebrow: 'Уроки',
    title_html: 'Образование — не ради учебника,<br>а для жизни.',
    lead: 'Каждый предмет — практический подход, современная методика и опытные педагоги.',
    blocks: [
      { icon: '🔤', title: 'Английский',            desc: 'От фонетики до уровня IELTS. В естественной среде, пошагово. Speaking Club, listening и writing.', tags: ['С 1 класса', 'IELTS', 'Speaking'] },
      { icon: '💻', title: 'IT и AI',                desc: 'С 1 класса — основы компьютера. С 5 класса — уроки AI. Подготовка к профессиям будущего.', tags: ['С 1 класса', 'AI', 'Программирование'] },
      { icon: '📐', title: 'Математика и STEAM',     desc: 'Не теория, а практика. Эксперименты и проектное обучение.', tags: ['STEAM', 'Логика', 'Проект'] },
      { icon: '📖', title: 'Арабский и ценности',    desc: 'Вместе с языком формируются ценности. Преподаётся с младших классов.', tags: ['С 1 класса', 'Воспитание', 'Ценности'] },
      { icon: '🧠', title: 'Critical Thinking',      desc: 'Умение задавать вопросы, анализировать и думать самостоятельно. Развивается на каждом уроке.', tags: ['С 1 класса', 'Анализ', 'Логика'] },
      { icon: '🏊', title: 'Спорт и кружки',         desc: 'Плавание, таэквондо, гимнастика, шахматы, робототехника — всё в школе. Без дополнительных поездок.', tags: ['Плавание', 'Таэквондо', 'Шахматы'] },
    ],
    dark_h2_html: 'Не ради учебника,<br>а для жизни.',
    dark_p: 'В Seven School каждый урок — открытие. Ребёнок не просто слушает, а пробует, спрашивает и сам делает выводы.',
    dark_btn: 'Записаться на пробный урок →',
  },

  blog: {
    eyebrow: 'Блог',
    title: 'Новости и статьи',
    lead: 'Самые интересные статьи об образовании, воспитании и школьной жизни.',
    empty: 'Пока нет статей.',
    read_more: 'Подробнее →',
    back: '← Все статьи',
  },

  contact: {
    eyebrow: 'Контакты',
    title: 'Свяжитесь с нами',
    lead: 'Есть вопросы? Хотите подать заявку? Напишите через форму ниже или позвоните.',
    form_title: 'Связаться',
    form_lead: 'Оставьте заявку через форму ниже.',
    fields: {
      name_lbl: 'Имя и фамилия', name_ph: 'Полное имя',
      phone_lbl: 'Телефон',      phone_ph: '+998 XX XXX XX XX',
      message_lbl: 'Сообщение',  message_ph: 'Напишите ваш вопрос...',
      submit: 'Отправить',
      success: 'Спасибо! Ваша заявка принята. Скоро свяжемся.',
    },
    info_title: 'Контактная информация',
    items: [
      { label: 'Адрес',    value: 'Ташкент, Яшнабадский район' },
      { label: 'Телефон',  value: '+998 78 888 80 80' },
      { label: 'Часы работы', value: 'Пн–Сб: 09:00 — 18:00' },
      { label: 'Email',    value: 'info@sevenschool.uz' },
    ],
    faq_eyebrow: 'FAQ',
    faq_title: 'Часто задаваемые вопросы',
  },

  popup: {
    title: 'Оставьте заявку',
    lead: 'Оставьте данные, и наш оператор свяжется с вами.',
    name_lbl: 'Ваше имя',         name_ph: 'Имя и фамилия',
    phone_lbl: 'Номер телефона',  phone_ph: '+998 XX XXX XX XX',
    location_lbl: 'Локация',      location_ph: 'Выберите регион',
    submit: 'Отправить', close: 'Закрыть',
    image_caption: 'Первый большой шаг вашего ребёнка начинается здесь.',
    success: 'Спасибо! Ваша заявка принята. Скоро свяжемся.',
    provinces: [
      'г. Ташкент', 'Ташкентская область', 'Андижанская область', 'Бухарская область',
      'Ферганская область', 'Джизакская область', 'Хорезмская область', 'Наманганская область',
      'Навоийская область', 'Кашкадарьинская область', 'Республика Каракалпакстан',
      'Самаркандская область', 'Сырдарьинская область', 'Сурхандарьинская область',
    ],
  },
};

// ---------------- EN ----------------

const en: Dict = {
  nav: { home: 'Home', about: 'About', lessons: 'Lessons', blog: 'Blog', contact: 'Contact' },
  cta_apply: 'Leave a request',
  open_menu: 'Menu',
  footer_description: "Tashkent's leading private school — a safe bridge to the world's top universities.",
  footer_rights: 'All rights reserved.',
  loading: 'Loading...',
  read_more: 'Read more →',

  meta: {
    home_title: "Seven School — Your child's future starts here",
    home_desc: 'From age 2 to grade 4 — everything a child needs, in one place at Seven School.',
    about_title: 'About — Seven School',
    about_desc: 'A private school and kindergarten in Tashkent. Our team, gallery and parent reviews.',
    lessons_title: 'Lessons — Seven School',
    lessons_desc: 'Education for life, not for the textbook.',
    blog_title: 'Blog — Seven School',
    blog_desc: 'Articles about education, parenting and school life.',
    contact_title: 'Contact — Seven School',
    contact_desc: 'Get in touch with Seven School. Ask a question or apply.',
  },

  sections: { apply_label_phone: 'ADMISSIONS' },

  home: {
    pill: '2025–2026 admissions open',
    title_line1: 'How old is',
    title_line2_pre: 'your',
    title_line2_accent: 'child?',
    lead: 'From age 2 to grade 4 — everything a child needs is in one place at Seven School.',
    cta_primary: 'Free trial lesson →',
    cta_secondary: 'Explore the ecosystem',
    stats: [
      { num: '370+', lbl: 'Students', sub: 'Part of the Seven family today' },
      { num: '54',   lbl: 'Teachers', sub: '8–37 years of experience' },
      { num: '3',    lbl: 'Campuses', sub: "In convenient parts of Tashkent" },
      { num: '2+',   lbl: 'From age 2', sub: 'Program starts at age 2' },
    ],

    eco_eyebrow: 'Ecosystem',
    eco_title: 'One system. One path. One goal.',
    eco_sub: 'Your child from age 2 to grade 11 — in a single ecosystem, growing continuously.',
    eco: [
      { step: '01', title: 'Seven Kids',   age: 'Ages 2–6',   desc: 'Learning through play. Confident readiness for school.' },
      { step: '02', title: 'Seven School', age: 'Grades 1–4', desc: 'Strong academic foundation, languages, IT, sport and character.' },
      { step: '03', title: 'Sodiq School', age: 'Grades 5–11', desc: 'Full preparation for top universities worldwide.' },
    ],

    kids_eyebrow: 'Seven Kids · Ages 2–6',
    kids_title_html: "The child plays — and doesn't<br>notice they're learning.",
    kids_sub: 'From age 2 to 6 — every day a new experience at Seven Kids. Method: Play → Skill → Knowledge.',
    kids: [
      { title: 'Learning through play',         desc: "Play is the most natural way for a child. It's where thinking, communication and learning begin." },
      { title: 'English in a natural setting',  desc: 'Not memorising words — entering the language through sound, listening and speaking.' },
      { title: 'Character every day',           desc: 'Kindness, patience and order — built into the daily environment.' },
      { title: 'Individual attention',          desc: "Small groups mean each teacher follows every child's character and growth." },
    ],

    togarak_eyebrow: 'Clubs',
    togarak_title: "Clubs aren't an add-on — they're part of the program.",
    togarak_sub: 'Pottery · Gymnastics · Swimming · Creativity · Drawing — all in one place. No extra trips.',
    togarak: [
      { title: 'Pottery' }, { title: 'Drawing' }, { title: 'Gymnastics' },
      { title: 'Swimming' }, { title: 'Creativity' }, { title: 'Chess' },
      { title: 'English' }, { title: 'Taekwondo' }, { title: 'Robotics' },
    ],

    pricing_eyebrow: 'Pricing',
    pricing_title: 'Transparent pricing. No hidden fees.',
    pricing_sub: 'Every price includes all classes, meals and clubs.',
    pricing_cta: 'Book a trial lesson',

    curriculum_eyebrow: 'Seven School · Grades 1–4',
    curriculum_title: 'Primary school — the foundation for the next 11 years.',
    curriculum_sub: "At Seven School primary education isn't limited to lessons. Curriculum is education for life, not for the textbook.",
    curriculum: [
      { title: 'IT — from grade 1',         desc: 'Logical thinking and computer basics.' },
      { title: 'English — step by step',    desc: 'From phonetics to IELTS level.' },
      { title: 'Arabic — from grade 1',     desc: 'Values are shaped alongside the language.' },
      { title: 'STEAM — hands-on',          desc: 'Not theory — learning by trying.' },
      { title: 'Critical Thinking',         desc: 'The skill of questioning, analysing and thinking independently.' },
      { title: 'Life school',               desc: 'One value each month. The whole school lives that theme.' },
    ],
    individual_title: 'Individual approach',
    individual_stats: [
      { num: '18–22',   lbl: 'students',   sub: 'in each class' },
      { num: 'Mentor',  lbl: 'and Tutor',  sub: 'for every child' },
      { num: 'Weekly',  lbl: 'report',     sub: 'for parents' },
      { num: 'Fast',    lbl: 'response',   sub: 'to every question' },
    ],

    schedule_eyebrow: 'Daily schedule',
    schedule_title: 'Every day — meaningful.',
    schedule: [
      { time: '08:30', desc: 'Breakfast' },
      { time: '09:00', desc: 'Greetings and active games' },
      { time: '10:00', desc: 'English — in game form' },
      { time: '11:00', desc: 'Maths basics' },
      { time: '12:00', desc: 'Healthy lunch' },
      { time: '13:00', desc: 'Creative classes: drawing, music' },
      { time: '14:00', desc: 'Free play and rest' },
      { time: '15:00', desc: 'Storytime and reading' },
      { time: '16:00', desc: 'Sport and active sessions' },
      { time: '16:30', desc: 'Afternoon snack' },
      { time: '17:00', desc: 'Parents pick up' },
    ],
    schedule_extra_title: 'Clubs',
    schedule_extra_desc: 'Swimming · Taekwondo · Gymnastics · Chess · Robotics',

    parents_eyebrow: 'Parents',
    parents_title: 'The best review — from parents themselves.',
    parents_sub: 'Influencers Lola Zunnunova, Rano Mominova and many other parents chose Seven School. The best testimonial — their own words.',
    parents_disclaimer: 'Spots fill quickly. Only 18–22 seats per class. Admissions are open.',
    parents_cta: 'Book a free consultation',

    cta_h2: 'Book a free trial lesson.',
    cta_p_html: "Your child comes, feels the environment. <strong>Then you decide.</strong>",
    cta_btn: 'Apply now →',
    cta_note: 'Limited number of seats',
  },

  about: {
    eyebrow: 'About',
    title: 'About Seven School',
    lead: 'Seven School is a private school and kindergarten opened in 2024. Education from age 4 to grade 7.',
    who_title: 'Who are we?',
    who_p1_html: "Seven School is a private school and kindergarten opened in 2024. Education runs from age 4 to grade 7. After that, students continue at <strong>Sodiq School</strong>.",
    who_p2_html: 'In addition to the school program we teach <strong>critical thinking</strong>, <strong>leadership</strong>, <strong>AI literacy</strong> and <strong>Arabic</strong>.',
    est_label: 'EST. 2024 · TASHKENT',
    stats: [
      { val: '2024',  lbl: 'Founded' },
      { val: '18–22', lbl: 'Students per class' },
      { val: '15+',   lbl: 'Teachers' },
      { val: '29+',   lbl: 'Olympiad medals' },
    ],
    shorts_eyebrow: 'Trust',
    shorts_title: 'What parents say',
    team_eyebrow: 'Our team',
    team_title: 'Meet the Seven School team',
    team_cta_label: 'Learn more →',
    gallery_eyebrow: 'Gallery',
    gallery_title: 'Moments from school life',
    lead_eyebrow: 'Contact',
    lead_title: 'Got a question?',
    lead_sub_html: "Leave your number.<br>We'll get back within 24 hours.",
    lead_name_ph: 'Full name',
    lead_phone_ph: 'Phone number',
    lead_submit: 'Submit',
    lead_promise: "✓ We'll contact you within 24 hours",
  },

  lessons: {
    eyebrow: 'Lessons',
    title_html: 'Education for life,<br>not for the textbook.',
    lead: 'Every subject — hands-on approach, modern methods and experienced teachers.',
    blocks: [
      { icon: '🔤', title: 'English',            desc: 'From phonetics to IELTS level. In a natural setting, step by step. Speaking Club, listening and writing.', tags: ['Grade 1+', 'IELTS', 'Speaking'] },
      { icon: '💻', title: 'IT & AI',            desc: 'Computer basics from grade 1. AI lessons from grade 5 — preparing for tomorrow.', tags: ['Grade 1+', 'AI', 'Programming'] },
      { icon: '📐', title: 'Maths & STEAM',      desc: 'Not theory — practice. Experiments and project-based learning.', tags: ['STEAM', 'Logic', 'Projects'] },
      { icon: '📖', title: 'Arabic & values',    desc: 'Values form together with the language. Taught from the earliest grades.', tags: ['Grade 1+', 'Character', 'Values'] },
      { icon: '🧠', title: 'Critical Thinking',  desc: 'The skill of asking, analysing and thinking independently — developed in every lesson.', tags: ['Grade 1+', 'Analysis', 'Logic'] },
      { icon: '🏊', title: 'Sport & clubs',      desc: 'Swimming, taekwondo, gymnastics, chess, robotics — all on-site. No extra trips.', tags: ['Swimming', 'Taekwondo', 'Chess'] },
    ],
    dark_h2_html: 'For life,<br>not for the textbook.',
    dark_p: 'Every lesson at Seven School is a discovery. The child not only listens but tries, asks and reaches their own conclusions.',
    dark_btn: 'Book a trial lesson →',
  },

  blog: {
    eyebrow: 'Blog',
    title: 'News and articles',
    lead: 'The most interesting articles about education, parenting and school life.',
    empty: 'No articles yet.',
    read_more: 'Read more →',
    back: '← All articles',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    lead: 'Got questions? Want to apply? Use the form below or call us.',
    form_title: 'Contact',
    form_lead: 'Submit your application via the form below.',
    fields: {
      name_lbl: 'Name', name_ph: 'Full name',
      phone_lbl: 'Phone', phone_ph: '+998 XX XXX XX XX',
      message_lbl: 'Message', message_ph: 'Write your question...',
      submit: 'Submit',
      success: "Thank you! We've received your request and will be in touch soon.",
    },
    info_title: 'Contact info',
    items: [
      { label: 'Address',  value: 'Tashkent, Yashnabad district' },
      { label: 'Phone',    value: '+998 78 888 80 80' },
      { label: 'Hours',    value: 'Mon–Sat: 09:00 — 18:00' },
      { label: 'Email',    value: 'info@sevenschool.uz' },
    ],
    faq_eyebrow: 'FAQ',
    faq_title: 'Frequently asked questions',
  },

  popup: {
    title: 'Leave a request',
    lead: 'Leave your details and our operator will contact you.',
    name_lbl: 'Your name',  name_ph: 'Full name',
    phone_lbl: 'Your phone number', phone_ph: '+998 XX XXX XX XX',
    location_lbl: 'Location', location_ph: 'Select a region',
    submit: 'Submit', close: 'Close',
    image_caption: "Your child's first big step starts here.",
    success: "Thank you! We've received your request and will be in touch soon.",
    provinces: [
      'Tashkent city', 'Tashkent region', 'Andijan region', 'Bukhara region',
      'Fergana region', 'Jizzakh region', 'Khorezm region', 'Namangan region',
      'Navoiy region', 'Kashkadarya region', 'Republic of Karakalpakstan',
      'Samarkand region', 'Syrdarya region', 'Surkhandarya region',
    ],
  },
};

const dictionaries: Record<Locale, Dict> = { uz, ru, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries.uz;
}
