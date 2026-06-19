import { HomeContent, generateMetadata } from '../page';

export { generateMetadata };

export default async function LongLandingPage({ params }: { params: { locale: string } }) {
  return HomeContent({ params, variant: 'long-landing' });
}
