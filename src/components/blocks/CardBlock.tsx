import { ContentProps, damAssets } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Image from 'next/image';
import { CardBlockCT } from '@/content-types/blocks/CardBlock';

type Props = {
  content: ContentProps<typeof CardBlockCT>;
};

export default function CardBlock({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-md transition-shadow duration-300 hover:shadow-lg">
      {src(content.image) && (
        <div className="relative h-48 w-full">
          <Image
            src={src(content.image)!}
            alt={getAlt(content.image, 'Card image')}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            {...pa('image')}
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-card-foreground" {...pa('title')}>
          {content.title}
        </h3>

        {content.text && (
          <div className="prose prose-sm mb-4 text-muted-foreground" {...pa('text')}>
            <RichText content={content.text?.json} />
          </div>
        )}

        {content.linkUrl && content.linkText && (
          <a
            href={String(content.linkUrl)}
            className="inline-flex items-center font-medium text-accent hover:text-accent/80"
            {...pa('linkUrl')}
          >
            {content.linkText}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
