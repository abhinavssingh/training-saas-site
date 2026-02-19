import { contentType } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { Infer } from 'next/dist/compiled/superstruct';
import { BasePageContentType } from '../BaseContentType/BaseContentType';

export const HomePageContentType = contentType({
  key: 'HomePage',
  displayName: ' Training Home Page',
  baseType: '_page',
  properties: {
    ...BasePageContentType.properties,
  },
});

type Props = {
  opti: Infer<typeof HomePageContentType>;
};

export default function HomePage({ opti }: Props) {
  return (
    <main>
      <h1>{opti.heading}</h1>
      <RichText content={opti.body?.json} />
    </main>
  );
}