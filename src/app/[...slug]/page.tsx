import { getClient } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSeoMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getContent(slug: string[]) {
  const client = getClient();
  const content = await client.getContentByPath(`/${slug.join('/')}/`);
  return content?.[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent(slug);
  if (!content) return {};
  return getSeoMetadata(content as Record<string, unknown>);
}

export async function Page({ params }: Props) {
  const { slug } = await params;
  const content = await getContent(slug);

  if (!content) {
    notFound();
  }

  return <OptimizelyComponent content={content} />;
}

export default withAppContext(Page);
