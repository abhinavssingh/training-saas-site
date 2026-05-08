import { contentType } from '@optimizely/cms-sdk';

/**
 * Content Container Section.
 *
 * Composite section that holds content in a row of columns. The Section's
 * display template picks the layout preset (2/3+1/3, 1/2+1/2, 1/1) and the
 * renderer applies column-width classes to the rendered columns by index.
 *
 * Authors compose the hero by placing hero-specific elements
 * (HeroEyebrow, HeroHeading) plus reusable
 * elements (RichTextElement for description, CallToActionElement for CTAs)
 * inside the columns.
 */
export const ContentContainerSectionCT = contentType({
  key: 'ContentContainerSection',
  displayName: 'Content Container Section',
  baseType: '_section',
  // Allow the canonical hero elements + the reusable atoms used as
  // description and CTAs. Use '*' to be lenient if more get added later.
  mayContainTypes: ['*'],
});
