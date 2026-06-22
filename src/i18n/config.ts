// Single source for the language switcher. Adding a language = one entry here
// (+ its page under src/pages/<code>/). The menu scales to any number of locales.
export interface Language {
  code: string;
  label: string; // native name shown in the menu
  short: string; // 2-letter code shown on the button
  href: string; // homepage URL for this locale
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', short: 'EN', href: '/' },
  { code: 'de', label: 'Deutsch', short: 'DE', href: '/de' },
];

export function currentLanguage(lang: string): Language {
  return LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
}
