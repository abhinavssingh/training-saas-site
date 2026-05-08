// cms/content-types/global/NavPromoCard.ts
import { contentType } from '@optimizely/cms-sdk';

export const NavPromoCardCT = contentType({
  key: 'NavPromoCard',
  displayName: 'Navigation Promo Card',
  baseType: '_component',
  properties: {
    eyebrow: { type: 'string', isLocalized: true, indexingType: 'searchable', sortOrder: 10 },
    title: {
      type: 'string',
      isLocalized: true,
      indexingType: 'searchable',
      isRequired: true,
      sortOrder: 20,
    },
    description: {
      type: 'string',
      isLocalized: true,
      indexingType: 'searchable',
      isRequired: true,
      sortOrder: 30,
    },
    href: { type: 'url', sortOrder: 40 },
    cta: { type: 'string', sortOrder: 50 },
  },
});
