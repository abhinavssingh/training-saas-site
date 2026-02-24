import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { LandingPageCT } from '@/content-types';

type Props = {
  content: ContentProps<typeof LandingPageCT>;
};
export default function LandingPage({ content }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const data = content ?? {};
  const heroImage = data.image ?? null;
  const heading = data.heading ?? '';
  const subheading = data.subheading ?? '';
  const ctaLink = data.callToActionLink ?? null;
  const ctaText = data.callToActionText ?? '';
  const bodyContent = data.body ?? null;
  const enableFeatured = !!data.enableFeaturedSection;
  const featuredContent = data.featuredContent ?? null;

  return (
    <main>
      <section>
        {heroImage ? <img src={heroImage} alt={heading || 'Hero'} /> : null}
        <h1>{heading}</h1>
        {subheading && <h2>{subheading}</h2>}
        {ctaLink && ctaLink.href && ctaText ? (
          <a href={ctaLink.href}>{ctaText}</a>
        ) : null}
      </section>
      {bodyContent ? <section>{bodyContent}</section> : null}
      {enableFeatured && featuredContent ? (
        <section>{featuredContent}</section>
      ) : null}
    </main>
  );
}
