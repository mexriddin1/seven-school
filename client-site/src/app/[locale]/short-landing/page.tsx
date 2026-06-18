import { HomeContent, generateMetadata } from '../page';

export { generateMetadata };

export default async function ShortLandingPage({ params }: { params: { locale: string } }) {
  return HomeContent({ params, variant: 'short-landing' });
}
