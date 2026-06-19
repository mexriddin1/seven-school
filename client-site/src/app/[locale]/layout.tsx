import { notFound } from 'next/navigation';
import { isLocale, type Locale, LOCALES } from '@/i18n/config';
import { LocaleSetter } from '@/components/LocaleSetter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PopupForm } from '@/components/PopupForm';
import { UtmCapture } from '@/components/UtmCapture';
import { GlobalContactSection } from '@/components/GlobalContactSection';
import { fetchSiteBundle } from '@/lib/api';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  let bundle: Awaited<ReturnType<typeof fetchSiteBundle>> | null = null;
  try {
    bundle = await fetchSiteBundle(locale);
  } catch (err) {
    console.error('[layout] failed to fetch site bundle:', err);
  }

  const settings = bundle?.settings || {};

  return (
    <>
      <LocaleSetter locale={locale} />
      <UtmCapture />
      <Header locale={locale} settings={settings} />
      {children}
      <GlobalContactSection locale={locale} settings={settings} />
      <Footer locale={locale} settings={settings} />
      <PopupForm locale={locale} />
    </>
  );
}
