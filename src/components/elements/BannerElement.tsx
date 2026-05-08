import type { JSX } from 'react';
import { ContentProps, damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Image from 'next/image';
import Link from 'next/link';
import { BannerElementCT } from '@/content-types/elements/BannerElement';
import { BannerDisplayTemplate } from '@/display-templates/elements/BannerElementDisplayTemplate';

type Props = {
  content: ContentProps<typeof BannerElementCT>;
  displaySettings?: ContentProps<typeof BannerDisplayTemplate>;
};

export default function BannerElement({ content, displaySettings }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  if (!src(content.backgroundImage)) {
    return null;
  }

  // Get display settings with defaults
  const headingTag = displaySettings?.headingTag ?? 'h2';
  const horizontalAlignment = displaySettings?.horizontalAlignment ?? 'center';
  const verticalAlignment = displaySettings?.verticalAlignment ?? 'center';
  const overlayKey = displaySettings?.overlayPercentage ?? 'overlay0';
  const ctaStyle = displaySettings?.ctaStyle ?? 'button';
  const ctaColor = displaySettings?.ctaColor ?? 'light';

  // Horizontal alignment classes
  const horizontalAlignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // Vertical alignment classes
  const verticalAlignmentClasses = {
    top: 'justify-start',
    center: 'justify-center',
    bottom: 'justify-end',
  };

  // Create heading element dynamically
  const HeadingTag = headingTag as keyof JSX.IntrinsicElements;

  // Extract numeric value from overlay key (e.g., 'overlay50' -> 50)
  const overlayPercentage = parseInt(overlayKey.replace('overlay', '')) || 0;
  const overlayOpacity = overlayPercentage / 100;

  return (
    <div className="relative h-96 w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={src(content.backgroundImage)!}
        alt={getAlt(content.backgroundImage, '')}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Overlay */}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-primary"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Content Container */}
      <div
        className={`relative z-10 flex h-full flex-col ${verticalAlignmentClasses[verticalAlignment]} ${horizontalAlignmentClasses[horizontalAlignment]} px-6 py-8 md:px-12 md:py-16`
          .trim()
          .replace(/\s+/g, ' ')}
      >
        <div className="max-w-4xl">
          {/* Heading */}
          <HeadingTag
            className="mb-4 text-3xl font-bold text-primary-foreground md:text-5xl"
            {...pa('heading')}
          >
            {content.heading}
          </HeadingTag>

          {/* Text */}
          {content.text && (
            <p className="mb-6 text-lg text-primary-foreground md:text-xl" {...pa('text')}>
              {content.text}
            </p>
          )}

          {/* CTA Link */}
          {content.ctaLink?.url?.default && (
            <Link
              href={content.ctaLink.url.default}
              className={
                ctaStyle === 'button'
                  ? ctaColor === 'light'
                    ? `inline-block rounded-lg bg-primary-foreground px-6 py-3 font-semibold text-primary transition-opacity hover:opacity-90`
                    : `inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90`
                  : ctaColor === 'light'
                    ? `inline-block font-semibold text-primary-foreground underline underline-offset-4 transition-opacity hover:opacity-80`
                    : `inline-block font-semibold text-primary underline underline-offset-4 transition-opacity hover:opacity-80`
              }
              target={content.ctaLink.target ?? undefined}
              title={content.ctaLink.title ?? undefined}
              {...pa('ctaLink')}
            >
              {content.ctaLink.text || 'Learn More'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
