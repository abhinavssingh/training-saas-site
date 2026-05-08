import { contentType } from '@optimizely/cms-sdk';

export const HeroStatsElementCT = contentType({
  key: 'HeroStatsElement',
  displayName: 'Hero Stats',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    values: {
      type: 'array',
      displayName: 'Values',
      description:
        'Numeric/short values shown large (e.g., "$102B", "+27%", "4,000+", "#1"). Pair index-by-index with Labels.',
      items: { type: 'string' },
      minItems: 1,
      maxItems: 6,
    },
    labels: {
      type: 'array',
      displayName: 'Labels',
      description:
        'Short labels shown below each value. Must have the same number of entries as Values.',
      items: { type: 'string' },
      minItems: 1,
      maxItems: 6,
      isLocalized: true,
    },
  },
});
