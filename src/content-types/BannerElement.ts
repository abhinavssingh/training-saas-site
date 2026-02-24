import { contentType } from '@optimizely/cms-sdk';

export const BannerElementCT = contentType({
  key: 'BannerElement',
  displayName: 'Banner Element',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  group: 'training',
  description: 'A banner element with background image, heading, text, and optional call-to-action link',
  properties: {
    backgroundImage: {
      type: 'contentReference',
      displayName: 'Background Image',
      required: true,
      allowedTypes: ['_image'],
    },
    heading: {
      type: 'string',
      displayName: 'Heading',
      required: true,
      localized: true,
    },
    text: {
      type: 'string',
      displayName: 'Text',
      localized: true,
    },
    ctaLink: {
      type: 'link',
      displayName: 'Call to Action Link',
    },
  },
});

// Re-export display template from separate file
export { BannerDisplayTemplate } from '@/display-templates/BannerElementDisplayTemplate';
