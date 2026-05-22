// Static UI labels (titles, nav, button text, etc.) — kept in code
// since the user said "title-laridan boshqa deyarli barcha narsa o'zgaradi".
// These are the things the admin DOESN'T edit — only the dynamic content does.

import type { Locale } from './config';

export type Dict = {
  nav: {
    home: string; about: string; results: string;
    lessons: string; blog: string; contact: string;
  };
  cta_apply: string;
  cta_back_all: string;
  read_more: string;
  scroll_left: string;
  scroll_right: string;
  open_menu: string;
  see_video: string;
  loading: string;
  blog_search_placeholder: string;

  form: {
    name: string;
    name_placeholder: string;
    phone: string;
    phone_placeholder: string;
    grade: string;
    grade_choose: string;
    grade_options: string[];
    message: string;
    message_placeholder: string;
    submit: string;
    submitted: string;
    success: string;
    privacy: string;
  };

  sections: {
    parents_say_eyebrow: string;
    parents_say_title: string;
    top_students_eyebrow: string;
    top_students_title: string;
    results_eyebrow: string;
    results_title: string;
    universities_eyebrow: string;
    universities_title: string;
    universities_partners: string;
    awards_eyebrow: string;
    awards_title: string;
    advantages_eyebrow: string;
    advantages_title: string;
    faq_eyebrow: string;
    faq_title: string;
    contact_eyebrow: string;
    contact_title: string;
    contact_subtitle: string;
    address_label: string;
    phone_label: string;
    hours_label: string;
    apply_label_phone: string;
    telegram_btn: string;
    crumb_home: string;
    teacher_more: string;
    all_results: string;
    all_articles: string;
    all_teachers: string;
    team_eyebrow: string;
    team_title: string;
    team_lead: string;
    gallery_eyebrow: string;
    gallery_title: string;
    bottom_stat_template: string;
    natijalar_alumni_eyebrow: string;
    natijalar_alumni_title: string;
    natijalar_alumni_sub: string;
    natijalar_practice_eyebrow: string;
    natijalar_uni_question: string;
    mash_grant_dollars: string;
    mash_grant_to: string;
    mash_grant_save: string;
    mash_grant_grads: string;
    mash_grant_offers: string;
    mash_grant_desc: string;
    mash_exam_eyebrow: string;
    mash_exam_title: string;
    mash_exam_lead: string;
    mash_subjects_eyebrow: string;
    mash_subjects_title: string;
    mash_extra_eyebrow: string;
    mash_extra_title: string;
    mash_cta_title: string;
    mash_cta_desc: string;
    admissions_step1_label: string; admissions_step1_desc: string;
    admissions_step2_label: string; admissions_step2_desc: string;
    admissions_step3_label: string; admissions_step3_desc: string;
    admissions_test_eyebrow: string;
    admissions_test_title: string;
    admissions_grades_label: string; admissions_grades_value: string;
    admissions_register: string;
    admissions_secondary: string;
  };

  home_about: {
    eyebrow: string;
    title: string;
    p1_html: string;
    p2_html: string;
    cta: string;
    card_founded: string;
    card_class_size_lbl: string;
    card_class_size_val: string;
    card_class_size_suffix: string;
    card_teachers_lbl: string;
    card_teachers_val: string;
    card_teachers_suffix: string;
    card_medals_lbl: string;
    card_medals_val: string;
  };

  home_unis: {
    eyebrow: string;
    title: string;
  };

  page_eyebrows: {
    about: string;
    aloqa: string;
    blog: string;
    lessons: string;
    results: string;
  };

  about_page: {
    // "Biz kimmiz?" left text + right card
    eyebrow: string;
    title: string;
    p1_html: string;
    p2_html: string;
    card_founded_lbl: string;
    card_founded_val: string;
    card_class_lbl: string;
    card_class_val: string;
    card_class_suffix: string;
    card_teachers_lbl: string;
    card_teachers_val: string;
    card_teachers_suffix: string;
    card_medals_lbl: string;
    card_medals_val: string;
    // "Natijalarimiz" stats section
    stats_eyebrow: string;
    stats_title: string;
    stat_year_val: string;
    stat_year_lbl: string;
    stat_medals_val: string;
    stat_medals_suffix: string;
    stat_medals_lbl: string;
    stat_teachers_val: string;
    stat_teachers_suffix: string;
    stat_teachers_lbl: string;
    stat_clubs_val: string;
    stat_clubs_lbl: string;
    stat_sport_val: string;
    stat_sport_suffix: string;
    stat_sport_lbl: string;
  };

  meta: {
    home_title: string; home_desc: string;
    about_title: string; about_desc: string;
    natijalar_title: string; natijalar_desc: string;
    mash_title: string; mash_desc: string;
    blog_title: string; blog_desc: string;
    aloqa_title: string; aloqa_desc: string;
  };
};

const uz: Dict = {
  nav: { home: 'Bosh sahifa', about: 'Biz haqimizda', results: 'Natijalar', lessons: "Mashg'ulot", blog: 'Blog', contact: 'Aloqa' },
  cta_apply: 'Ariza Topshirish',
  cta_back_all: 'Barcha maqolalar',
  read_more: "O'qish →",
  scroll_left: 'Chapga', scroll_right: "O'ngga",
  open_menu: 'Menyu',
  see_video: "Videoni ko'rish →",
  loading: 'Yuklanmoqda...',
  blog_search_placeholder: 'Maqolalardan qidiring...',
  form: {
    name: "To'liq ism-sharif", name_placeholder: 'Ismingiz',
    phone: 'Telefon raqami', phone_placeholder: '+998 90 123 45 67',
    grade: 'Farzandingiz sinfi', grade_choose: 'Tanlang...',
    grade_options: ['7-sinf','8-sinf','9-sinf','10-sinf','11-sinf'],
    message: 'Savolingiz', message_placeholder: 'Savolingizni yozing...',
    submit: 'Maslahat olaman', submitted: 'Yuborildi!',
    success: 'Rahmat! Arizangiz qabul qilindi. 24 soat ichida bog\'lanamiz.',
    privacy: "Ma'lumotlaringiz uchinchi shaxslarga oshkor etilmaydi.",
  },
  sections: {
    parents_say_eyebrow: 'Ishonch', parents_say_title: 'Ota-onalar nima deydi?',
    top_students_eyebrow: "O'quvchilar natijalari", top_students_title: 'Ular allaqachon TOP universitetlarda',
    results_eyebrow: 'Raqamlarda', results_title: "Natijalar o'zlari gapiradi",
    universities_eyebrow: 'Universitetlar', universities_title: "O'quvchilarimiz qaysi universitetlarga kirishdi?",
    universities_partners: 'Hamkorlar',
    awards_eyebrow: 'Yutuqlar', awards_title: 'Sovrinlarimiz',
    advantages_eyebrow: 'Nima uchun biz?', advantages_title: 'Seven School afzalliklari',
    faq_eyebrow: 'FAQ', faq_title: "Ko'p beriladigan savollar",
    contact_eyebrow: "Bog'lanish", contact_title: 'Maslahat olish uchun raqamingizni qoldiring',
    contact_subtitle: 'Biz siz bilan 24 soat ichida bog\'lanamiz.',
    address_label: 'Manzil', phone_label: 'Telefon', hours_label: 'Ish vaqti',
    apply_label_phone: 'Qabul', telegram_btn: 'Telegram orqali yozing',
    crumb_home: 'Bosh sahifa',
    teacher_more: 'Batafsil',
    all_results: "Barcha natijalarni ko'rish →",
    all_articles: 'Barcha maqolalar',
    all_teachers: 'Barcha ustozlar',
    team_eyebrow: 'Bizning jamoa',
    team_title: 'Seven School jamoasi bilan tanishing',
    team_lead: 'Darslik mualliflari, xalqaro sertifikatli pedagoglar, Italiya va Buyuk Britaniya universitetlari bitiruvchilari. 8-25 yilgacha tajriba. 7000+ o\'quvchi tayyorlagan mutaxassislar.',
    gallery_eyebrow: 'Galereya', gallery_title: 'Maktab hayoti',
    bottom_stat_template: '<strong>239</strong> bitiruvchi <strong>500+</strong> TOP universitetdan qabul xati olgan',
    natijalar_alumni_eyebrow: 'Muvaffaqiyat hikoyalari', natijalar_alumni_title: 'Bizning bitiruvchilar',
    natijalar_alumni_sub: 'Dunyoning nufuzli universitetlarida o\'qiyotgan Seven School bitiruvchilari.',
    natijalar_practice_eyebrow: 'Amaliyot hamkorlari',
    natijalar_uni_question: 'Qaysi universitetlarga kirishdi?',
    mash_grant_dollars: '$0', mash_grant_to: 'dan', mash_grant_save: 'gacha tejaysiz',
    mash_grant_grads: 'bitiruvchi', mash_grant_offers: 'qabul xati',
    mash_grant_desc: "Farzandingiz grant yutib, chet elda o'qishga kirsa — siz shu miqdordagi ta'lim xarajatidan xalos bo'lasiz.",
    mash_exam_eyebrow: 'Xalqaro imtihonlar', mash_exam_title: 'IELTS va SAT tayyorlov',
    mash_exam_lead: 'Akademik fanlar bilan parallel o\'rgatiladigan xalqaro imtihon kurslari',
    mash_subjects_eyebrow: "O'quv dasturi", mash_subjects_title: 'Akademik va tarbiya fanlari',
    mash_extra_eyebrow: "Qo'shimcha", mash_extra_title: "Qo'shimcha faoliyatlar",
    mash_cta_title: 'Farzandingizning kelajagini bugundan boshlang',
    mash_cta_desc: "Qabul 2026–2027 uchun ochiq. Joylar soni cheklangan — har sinfga atigi <strong>20 ta o'rin</strong>.",
    admissions_step1_label: 'Imtihon', admissions_step1_desc: 'Matematika, ingliz tili, tanqidiy fikrlash — 2 soat',
    admissions_step2_label: 'Suhbat',  admissions_step2_desc: 'Bola va ota-onalari bilan suhbat',
    admissions_step3_label: 'Natija va qabul', admissions_step3_desc: "Grant yoki chegirma asosida o'qish",
    admissions_test_eyebrow: 'Imtihon', admissions_test_title: 'Imtihon nimalardan iborat?',
    admissions_grades_label: 'Qabul qilinadigan sinflar', admissions_grades_value: '7–11 sinf',
    admissions_register: "Ro'yxatdan o'tish",
    admissions_secondary: 'Savollaringiz bormi?',
  },
  home_about: {
    eyebrow: 'Seven School',
    title: "Toshkentdagi xususiy maktab va bog'cha",
    p1_html: "Bu Toshkentdagi xususiy maktab va bog'cha. Bu yerda ta'lim <strong>4 yoshdan</strong> boshlanadi va <strong>7-sinfgacha</strong> davom etadi. Keyin o'quvchilar Sodiq School'da o'qishni davom ettirib, dunyoning TOP universitetlarga tayyorlanadi.",
    p2_html: "Bolalar kun davomida <strong>matematika va ingliz tilini</strong>, sport, liderlik va <strong>AI darslarini</strong> birga o'rganadi.",
    cta: 'Batafsil bilib oling →',
    card_founded: 'Tashkil etilgan',
    card_class_size_lbl: "Sinfda o'quvchi", card_class_size_val: '18–22', card_class_size_suffix: 'nafar',
    card_teachers_lbl: 'Ustozlar tajribasi', card_teachers_val: '8–37', card_teachers_suffix: 'yil',
    card_medals_lbl: 'Olimpiada medallari', card_medals_val: '29+',
  },
  home_unis: {
    eyebrow: 'Hamkorlar',
    title: 'Biz bilan ishlaydigan hamkorlar',
  },
  page_eyebrows: {
    about: 'Biz haqimizda',
    aloqa: "Bog'lanish",
    blog: 'Blog',
    lessons: "Mashg'ulot va kurslar",
    results: 'Bizning natijalar',
  },
  about_page: {
    eyebrow: 'Seven School haqida',
    title: 'Biz kimmiz?',
    p1_html: "Seven School — 2024-yilda ochilgan xususiy maktab va bog'cha. Ta'lim 4 yoshdan boshlanib, 7-sinfgacha davom etadi. Keyingi bosqichda o'quvchilarimiz Sodiq School'da o'qishni davom ettiradi.",
    p2_html: 'Bu yerda maktab dasturidan tashqari tanqidiy fikrlash, liderlik, AI vositalardan foydalanish va arab tili darslari ham o\'qitiladi.',
    card_founded_lbl: 'Tashkil etilgan', card_founded_val: '2024',
    card_class_lbl: "Sinfda o'quvchi", card_class_val: '18–22', card_class_suffix: 'nafar',
    card_teachers_lbl: 'Ustozlar', card_teachers_val: '15+', card_teachers_suffix: 'ustoz',
    card_medals_lbl: 'Olimpiada medallari', card_medals_val: '29+',
    stats_eyebrow: 'Raqamlarda',
    stats_title: 'Natijalarimiz',
    stat_year_val: '2024', stat_year_lbl: 'yilda ochildi',
    stat_medals_val: '29', stat_medals_suffix: '+', stat_medals_lbl: 'medal — olimpiada natijalari',
    stat_teachers_val: '15', stat_teachers_suffix: '+', stat_teachers_lbl: 'ustoz',
    stat_clubs_val: '6', stat_clubs_lbl: "ta to'garak",
    stat_sport_val: '500', stat_sport_suffix: '+', stat_sport_lbl: 'soat sport — yillik dastur',
  },
  meta: {
    home_title: 'Seven School — Toshkentdagi yetakchi xususiy maktab',
    home_desc: "Seven School — 7-11 sinf o'quvchilarini dunyo TOP universitetlariga tayyorlovchi Toshkentdagi yetakchi xususiy maktab.",
    about_title: 'Biz haqimizda — Seven School',
    about_desc: 'Seven School — 2022-yilda Toshkentda tashkil etilgan. 239 bitiruvchimiz Harvard, NYU, University of Chicago kabi TOP universitetlarda.',
    natijalar_title: "O'quvchilar natijalari — Seven School",
    natijalar_desc: 'Seven School o\'quvchilarining IELTS, SAT imtihonlaridagi yutuqlari va xorijiy universitetlardagi bitiruvchilarimiz.',
    mash_title: "Mashg'ulotlar — Seven School",
    mash_desc: "Seven School kurslari va mashg'ulotlari: IELTS, SAT, asosiy fanlar, tarbiya fanlari va qo'shimcha faoliyatlar.",
    blog_title: 'Blog — Seven School',
    blog_desc: 'IELTS, SAT, qabul jarayoni va xorijiy universitetlar haqida foydali maqolalar.',
    aloqa_title: 'Aloqa — Seven School',
    aloqa_desc: 'Seven School bilan bog\'laning: ariza topshiring, savollaringizga javob oling.',
  },
};

const ru: Dict = {
  nav: { home: 'Главная', about: 'О нас', results: 'Результаты', lessons: 'Занятия', blog: 'Блог', contact: 'Контакты' },
  cta_apply: 'Подать заявку',
  cta_back_all: 'Все статьи',
  read_more: 'Читать →',
  scroll_left: 'Влево', scroll_right: 'Вправо',
  open_menu: 'Меню',
  see_video: 'Смотреть видео →',
  loading: 'Загрузка...',
  blog_search_placeholder: 'Поиск по статьям...',
  form: {
    name: 'ФИО', name_placeholder: 'Ваше имя',
    phone: 'Номер телефона', phone_placeholder: '+998 90 123 45 67',
    grade: 'Класс ребёнка', grade_choose: 'Выберите...',
    grade_options: ['7 класс','8 класс','9 класс','10 класс','11 класс'],
    message: 'Ваш вопрос', message_placeholder: 'Напишите ваш вопрос...',
    submit: 'Получить консультацию', submitted: 'Отправлено!',
    success: 'Спасибо! Заявка принята. Свяжемся в течение 24 часов.',
    privacy: 'Ваши данные не передаются третьим лицам.',
  },
  sections: {
    parents_say_eyebrow: 'Доверие', parents_say_title: 'Что говорят родители?',
    top_students_eyebrow: 'Результаты учеников', top_students_title: 'Они уже в TOP-университетах',
    results_eyebrow: 'В цифрах', results_title: 'Результаты говорят сами за себя',
    universities_eyebrow: 'Университеты', universities_title: 'В какие университеты поступили наши ученики?',
    universities_partners: 'Партнёры',
    awards_eyebrow: 'Достижения', awards_title: 'Наши награды',
    advantages_eyebrow: 'Почему мы?', advantages_title: 'Преимущества Seven School',
    faq_eyebrow: 'FAQ', faq_title: 'Часто задаваемые вопросы',
    contact_eyebrow: 'Связаться', contact_title: 'Оставьте номер для консультации',
    contact_subtitle: 'Мы свяжемся с вами в течение 24 часов.',
    address_label: 'Адрес', phone_label: 'Телефон', hours_label: 'Часы работы',
    apply_label_phone: 'Приём', telegram_btn: 'Написать в Telegram',
    crumb_home: 'Главная',
    teacher_more: 'Подробнее',
    all_results: 'Посмотреть все результаты →',
    all_articles: 'Все статьи',
    all_teachers: 'Все учителя',
    team_eyebrow: 'Наша команда',
    team_title: 'Познакомьтесь с командой Seven School',
    team_lead: 'Авторы учебников, педагоги с международными сертификатами, выпускники университетов Италии и Великобритании. Опыт 8–25 лет. Подготовлено 7000+ учеников.',
    gallery_eyebrow: 'Галерея', gallery_title: 'Жизнь школы',
    bottom_stat_template: '<strong>239</strong> выпускников получили приглашения от <strong>500+</strong> ТОП-университетов',
    natijalar_alumni_eyebrow: 'Истории успеха', natijalar_alumni_title: 'Наши выпускники',
    natijalar_alumni_sub: 'Выпускники Seven School в престижных университетах мира.',
    natijalar_practice_eyebrow: 'Партнёры по практике',
    natijalar_uni_question: 'В какие университеты поступили?',
    mash_grant_dollars: '$0', mash_grant_to: 'от', mash_grant_save: 'до сэкономите',
    mash_grant_grads: 'выпускников', mash_grant_offers: 'офферов',
    mash_grant_desc: 'Если ребёнок выиграет грант и поступит за рубеж — вы освобождаетесь от расходов на обучение в этом размере.',
    mash_exam_eyebrow: 'Международные экзамены', mash_exam_title: 'Подготовка к IELTS и SAT',
    mash_exam_lead: 'Курсы международных экзаменов параллельно с академическими предметами',
    mash_subjects_eyebrow: 'Учебная программа', mash_subjects_title: 'Академические и воспитательные предметы',
    mash_extra_eyebrow: 'Дополнительно', mash_extra_title: 'Дополнительные занятия',
    mash_cta_title: 'Начните будущее ребёнка уже сегодня',
    mash_cta_desc: 'Приём 2026–2027 открыт. Места ограничены — всего <strong>20 мест</strong> на класс.',
    admissions_step1_label: 'Экзамен', admissions_step1_desc: 'Математика, английский, критическое мышление — 2 часа',
    admissions_step2_label: 'Собеседование', admissions_step2_desc: 'Беседа с ребёнком и родителями',
    admissions_step3_label: 'Результат и приём', admissions_step3_desc: 'Обучение по гранту или со скидкой',
    admissions_test_eyebrow: 'Экзамен', admissions_test_title: 'Из чего состоит экзамен?',
    admissions_grades_label: 'Принимаемые классы', admissions_grades_value: '7–11 класс',
    admissions_register: 'Записаться',
    admissions_secondary: 'Есть вопросы?',
  },
  home_about: {
    eyebrow: 'Seven School',
    title: 'Частная школа и детский сад в Ташкенте',
    p1_html: 'Это частная школа и детский сад в Ташкенте. Обучение здесь начинается с <strong>4 лет</strong> и продолжается до <strong>7-го класса</strong>. Затем ученики продолжают обучение в Sodiq School и готовятся к поступлению в TOP-университеты мира.',
    p2_html: 'В течение дня дети одновременно изучают <strong>математику и английский язык</strong>, занимаются спортом, лидерством и <strong>уроками AI</strong>.',
    cta: 'Узнать подробнее →',
    card_founded: 'Год основания',
    card_class_size_lbl: 'Учеников в классе', card_class_size_val: '18–22', card_class_size_suffix: 'чел.',
    card_teachers_lbl: 'Опыт педагогов', card_teachers_val: '8–37', card_teachers_suffix: 'лет',
    card_medals_lbl: 'Медалей олимпиад', card_medals_val: '29+',
  },
  home_unis: {
    eyebrow: 'Партнёры',
    title: 'Наши партнёры',
  },
  page_eyebrows: {
    about: 'О нас',
    aloqa: 'Связаться',
    blog: 'Блог',
    lessons: 'Занятия и курсы',
    results: 'Наши результаты',
  },
  about_page: {
    eyebrow: 'О Seven School',
    title: 'Кто мы?',
    p1_html: 'Seven School — частная школа и детский сад, открытые в 2024 году. Обучение начинается с 4 лет и продолжается до 7-го класса. На следующем этапе наши ученики продолжают обучение в Sodiq School.',
    p2_html: 'Помимо школьной программы здесь также преподаются критическое мышление, лидерство, использование AI-инструментов и арабский язык.',
    card_founded_lbl: 'Год основания', card_founded_val: '2024',
    card_class_lbl: 'Учеников в классе', card_class_val: '18–22', card_class_suffix: 'чел.',
    card_teachers_lbl: 'Педагоги', card_teachers_val: '15+', card_teachers_suffix: 'педагогов',
    card_medals_lbl: 'Медалей олимпиад', card_medals_val: '29+',
    stats_eyebrow: 'В цифрах',
    stats_title: 'Наши результаты',
    stat_year_val: '2024', stat_year_lbl: 'год открытия',
    stat_medals_val: '29', stat_medals_suffix: '+', stat_medals_lbl: 'медалей — результаты олимпиад',
    stat_teachers_val: '15', stat_teachers_suffix: '+', stat_teachers_lbl: 'педагогов',
    stat_clubs_val: '6', stat_clubs_lbl: 'кружков',
    stat_sport_val: '500', stat_sport_suffix: '+', stat_sport_lbl: 'часов спорта — годовая программа',
  },
  meta: {
    home_title: 'Seven School — ведущая частная школа Ташкента',
    home_desc: 'Seven School — ведущая частная школа Ташкента, готовящая учеников 7–11 классов к поступлению в TOP университеты мира.',
    about_title: 'О нас — Seven School',
    about_desc: 'Seven School основана в 2022 году в Ташкенте. 239 выпускников учатся в Harvard, NYU, University of Chicago.',
    natijalar_title: 'Результаты учеников — Seven School',
    natijalar_desc: 'Достижения учеников Seven School на IELTS, SAT и наши выпускники в зарубежных университетах.',
    mash_title: 'Занятия — Seven School',
    mash_desc: 'Курсы Seven School: IELTS, SAT, основные предметы, воспитательные предметы и дополнительные занятия.',
    blog_title: 'Блог — Seven School',
    blog_desc: 'Полезные статьи об IELTS, SAT, поступлении и зарубежных университетах.',
    aloqa_title: 'Контакты — Seven School',
    aloqa_desc: 'Свяжитесь с Seven School: подайте заявку, получите ответы на вопросы.',
  },
};

const en: Dict = {
  nav: { home: 'Home', about: 'About us', results: 'Results', lessons: 'Lessons', blog: 'Blog', contact: 'Contact' },
  cta_apply: 'Apply now',
  cta_back_all: 'All articles',
  read_more: 'Read →',
  scroll_left: 'Left', scroll_right: 'Right',
  open_menu: 'Menu',
  see_video: 'Watch video →',
  loading: 'Loading...',
  blog_search_placeholder: 'Search articles...',
  form: {
    name: 'Full name', name_placeholder: 'Your name',
    phone: 'Phone number', phone_placeholder: '+998 90 123 45 67',
    grade: "Child's grade", grade_choose: 'Choose...',
    grade_options: ['Grade 7','Grade 8','Grade 9','Grade 10','Grade 11'],
    message: 'Your question', message_placeholder: 'Write your question...',
    submit: 'Get a consultation', submitted: 'Submitted!',
    success: 'Thank you! Your application is received. We will contact you within 24 hours.',
    privacy: 'Your information is not shared with third parties.',
  },
  sections: {
    parents_say_eyebrow: 'Trust', parents_say_title: 'What parents say',
    top_students_eyebrow: 'Student results', top_students_title: 'They are already at top universities',
    results_eyebrow: 'In numbers', results_title: 'Results speak for themselves',
    universities_eyebrow: 'Universities', universities_title: 'Which universities did our students get into?',
    universities_partners: 'Partners',
    awards_eyebrow: 'Achievements', awards_title: 'Our awards',
    advantages_eyebrow: 'Why us?', advantages_title: 'Seven School advantages',
    faq_eyebrow: 'FAQ', faq_title: 'Frequently asked questions',
    contact_eyebrow: 'Contact', contact_title: 'Leave your number for a consultation',
    contact_subtitle: "We'll get back to you within 24 hours.",
    address_label: 'Address', phone_label: 'Phone', hours_label: 'Hours',
    apply_label_phone: 'Admissions', telegram_btn: 'Message us on Telegram',
    crumb_home: 'Home',
    teacher_more: 'Read more',
    all_results: 'See all results →',
    all_articles: 'All articles',
    all_teachers: 'All teachers',
    team_eyebrow: 'Our team',
    team_title: 'Meet the Seven School team',
    team_lead: 'Textbook authors, internationally certified educators, graduates of Italian and British universities. 8–25 years of experience. Specialists who have prepared 7000+ students.',
    gallery_eyebrow: 'Gallery', gallery_title: 'School life',
    bottom_stat_template: '<strong>239</strong> graduates have received offers from <strong>500+</strong> top universities',
    natijalar_alumni_eyebrow: 'Success stories', natijalar_alumni_title: 'Our alumni',
    natijalar_alumni_sub: 'Seven School graduates studying at the world\'s top universities.',
    natijalar_practice_eyebrow: 'Internship partners',
    natijalar_uni_question: 'Which universities did they get into?',
    mash_grant_dollars: '$0', mash_grant_to: 'from', mash_grant_save: 'up to saved',
    mash_grant_grads: 'graduates', mash_grant_offers: 'admission offers',
    mash_grant_desc: 'If your child wins a grant and gets in abroad, you save this much in tuition.',
    mash_exam_eyebrow: 'International exams', mash_exam_title: 'IELTS and SAT preparation',
    mash_exam_lead: 'International exam courses taught alongside academic subjects',
    mash_subjects_eyebrow: 'Curriculum', mash_subjects_title: 'Academic and character subjects',
    mash_extra_eyebrow: 'Extras', mash_extra_title: 'Extra activities',
    mash_cta_title: "Start your child's future today",
    mash_cta_desc: 'Admissions 2026–2027 are open. Limited seats — only <strong>20 spots</strong> per grade.',
    admissions_step1_label: 'Exam', admissions_step1_desc: 'Math, English, critical thinking — 2 hours',
    admissions_step2_label: 'Interview', admissions_step2_desc: 'Conversation with the child and parents',
    admissions_step3_label: 'Result & admission', admissions_step3_desc: 'Study on a grant or with a discount',
    admissions_test_eyebrow: 'Exam', admissions_test_title: 'What is on the exam?',
    admissions_grades_label: 'Grades accepted', admissions_grades_value: 'Grades 7–11',
    admissions_register: 'Register',
    admissions_secondary: 'Got questions?',
  },
  home_about: {
    eyebrow: 'Seven School',
    title: 'A private school and kindergarten in Tashkent',
    p1_html: "This is a private school and kindergarten in Tashkent. Learning starts at <strong>age 4</strong> and continues through <strong>grade 7</strong>. After that, students continue at Sodiq School and prepare for the world's TOP universities.",
    p2_html: 'During the day children learn <strong>maths and English</strong>, sports, leadership and <strong>AI lessons</strong> together.',
    cta: 'Learn more →',
    card_founded: 'Founded',
    card_class_size_lbl: 'Students per class', card_class_size_val: '18–22', card_class_size_suffix: 'kids',
    card_teachers_lbl: 'Teaching experience', card_teachers_val: '8–37', card_teachers_suffix: 'years',
    card_medals_lbl: 'Olympiad medals', card_medals_val: '29+',
  },
  home_unis: {
    eyebrow: 'Partners',
    title: 'Our partners',
  },
  page_eyebrows: {
    about: 'About us',
    aloqa: 'Get in touch',
    blog: 'Blog',
    lessons: 'Lessons & courses',
    results: 'Our results',
  },
  about_page: {
    eyebrow: 'About Seven School',
    title: 'Who are we?',
    p1_html: 'Seven School is a private school and kindergarten opened in 2024. Education starts at age 4 and continues through grade 7. After that, our students continue their studies at Sodiq School.',
    p2_html: 'In addition to the school curriculum, we also teach critical thinking, leadership, the use of AI tools and Arabic.',
    card_founded_lbl: 'Founded', card_founded_val: '2024',
    card_class_lbl: 'Students per class', card_class_val: '18–22', card_class_suffix: 'kids',
    card_teachers_lbl: 'Teachers', card_teachers_val: '15+', card_teachers_suffix: 'teachers',
    card_medals_lbl: 'Olympiad medals', card_medals_val: '29+',
    stats_eyebrow: 'In numbers',
    stats_title: 'Our results',
    stat_year_val: '2024', stat_year_lbl: 'year opened',
    stat_medals_val: '29', stat_medals_suffix: '+', stat_medals_lbl: 'medals — olympiad results',
    stat_teachers_val: '15', stat_teachers_suffix: '+', stat_teachers_lbl: 'teachers',
    stat_clubs_val: '6', stat_clubs_lbl: 'clubs',
    stat_sport_val: '500', stat_sport_suffix: '+', stat_sport_lbl: 'hours of sport — yearly program',
  },
  meta: {
    home_title: "Seven School — Tashkent's leading private school",
    home_desc: 'Seven School — the leading private school in Tashkent preparing grades 7–11 for the world\'s top universities.',
    about_title: 'About — Seven School',
    about_desc: 'Seven School was founded in 2022 in Tashkent. 239 alumni study at Harvard, NYU, University of Chicago and more.',
    natijalar_title: 'Student results — Seven School',
    natijalar_desc: "Seven School students' IELTS and SAT achievements and our graduates in foreign universities.",
    mash_title: 'Lessons — Seven School',
    mash_desc: 'Seven School courses: IELTS, SAT, core subjects, character subjects and extracurriculars.',
    blog_title: 'Blog — Seven School',
    blog_desc: 'Useful articles on IELTS, SAT, admissions and foreign universities.',
    aloqa_title: 'Contact — Seven School',
    aloqa_desc: 'Get in touch with Seven School — apply or ask a question.',
  },
};

const dictionaries: Record<Locale, Dict> = { uz, ru, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries.uz;
}
