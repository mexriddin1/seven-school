export const LOCALES = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'uz';

export const LOCALE_NAMES: Record<Locale, string> = {
  uz: "O'zbek",
  ru: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439',
  en: 'English',
};

export const LOCALE_SHORT: Record<Locale, string> = {
  uz: 'UZ',
  ru: 'RU',
  en: 'EN',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
