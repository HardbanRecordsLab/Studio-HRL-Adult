import { useRouter } from 'next/router';

export const LOCALES = ['en', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** A message bundle that must exist, with the same shape, in every locale. */
export type Messages<T> = Record<Locale, T>;

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

export const toLocale = (value: unknown): Locale => (isLocale(value) ? value : DEFAULT_LOCALE);

export const useLocale = (): Locale => toLocale(useRouter().locale);

/** Picks the bundle for the active locale: `const t = useMessages(home)`. */
export const useMessages = <T,>(messages: Messages<T>): T => messages[useLocale()];

/** BCP 47 tag for Intl / toLocaleDateString. */
export const intlLocale = (locale: Locale) => (locale === 'pl' ? 'pl-PL' : 'en-GB');
