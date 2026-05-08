import { contentType } from '@optimizely/cms-sdk';

export const HeroMediaCardElementCT = contentType({
  key: 'HeroMediaCardElement',
  displayName: 'Hero Media Card',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    image: {
      type: 'contentReference',
      displayName: 'Image',
      isRequired: true,
      allowedTypes: ['_image'],
    },
    altText: {
      type: 'string',
      displayName: 'Alt Text',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
    },
    videoUrl: {
      type: 'url',
      displayName: 'Video URL (optional)',
      description: 'When set, the card shows a play button overlay.',
    },
    title: {
      type: 'string',
      displayName: 'Title (overlay caption)',
      isLocalized: true,
      indexingType: 'searchable',
    },
    subtitle: {
      type: 'string',
      displayName: 'Subtitle (e.g. "Featured Film * 2 min")',
      isLocalized: true,
      indexingType: 'searchable',
    },
    badgeLabels: {
      type: 'array',
      displayName: 'Badge Labels',
      description: 'Pill labels shown over the top-right of the card (e.g. "Ports & Shipping").',
      items: { type: 'string' },
      maxItems: 4,
      isLocalized: true,
    },
  },
});
