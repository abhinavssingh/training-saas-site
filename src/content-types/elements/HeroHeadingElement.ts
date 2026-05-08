import { contentType } from '@optimizely/cms-sdk';

export const HeroHeadingElementCT = contentType({
  key: 'HeroHeadingElement',
  displayName: 'Hero Heading',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    heading: {
      type: 'string',
      displayName: 'Heading',
      description:
        'Full heading text. Use the Accent Text field below to highlight a specific phrase in accent color.',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
    },
    accentText: {
      type: 'string',
      displayName: 'Accent Text',
      description:
        'Optional substring of the heading that will be rendered in the accent color (e.g., "Belt & Road").',
      isLocalized: true,
      indexingType: 'searchable',
    },
  },
});
