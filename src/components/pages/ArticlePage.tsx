import { ContentProps, damAssets } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { link } from 'fs';
import Image from 'next/image';
import { ArticlePageCT } from '@/content-types/page/ArticlePage';

type Props = {
  content: ContentProps<typeof ArticlePageCT>;
};

export default function ArticlePage({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      {src(content.featuredImage) && (
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
          <Image
            src={src(content.featuredImage)!}
            alt={getAlt(content.featuredImage, 'Featured image')}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            {...pa('featuredImage')}
          />
        </div>
      )}

      <h1
        className="mb-6 text-3xl font-bold text-foreground md:text-4xl"
        {...pa('heading')}
        data-epi-edit="heading"
      >
        {content.heading}
      </h1>

      {content.ingress && (
        <p
          className="mb-8 text-xl leading-relaxed text-muted-foreground md:text-2xl"
          {...pa('ingress')}
        >
          {content.ingress}
        </p>
      )}

      {content.body && (
        <div className="prose prose-lg max-w-none" {...pa('body')}>
          <RichText content={content.body?.json} />
        </div>
      )}
    </article>
  );
}
