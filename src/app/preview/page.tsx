import { GraphClient, type PreviewParams } from '@optimizely/cms-sdk';
import { getClient } from '@optimizely/cms-sdk';
import { PreviewComponent } from '@optimizely/cms-sdk/react/client';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import Script from 'next/script';
import PreviewError from '@/components/layout/PreviewError';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const client = getClient();

  let response;
  let error: unknown = null;
  const maxRetries = 3;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      error = null;
      response = await client.getPreviewContent(params as PreviewParams);
      break;
    } catch (err: unknown) {
      error = err;
      const isNotYetIndexed =
        err instanceof Error && err.message.includes('No content found for key');
      if (isNotYetIndexed && attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        continue;
      }
      break;
    }
  }

  if (error) {
    return <PreviewError error={error} params={params} />;
  }

  return (
    <div>
      <Script
        src={`${process.env.OPTIMIZELY_CMS_URL}/util/javascript/communicationinjector.js`}
        strategy="beforeInteractive"
        id="optimizely-communication-injector"
      />
      <PreviewComponent />
      <OptimizelyComponent content={response} />
    </div>
  );
}

export default withAppContext(Page);
