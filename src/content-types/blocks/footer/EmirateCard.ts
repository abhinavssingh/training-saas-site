import { contentType } from '@optimizely/cms-sdk';

export const EmirateCardCT = contentType({
  key: 'EmirateCard',
  displayName: 'Emirate Card',
  baseType: '_component',
  properties: {
    name: {
      type: 'string',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
    },
    subtitle: {
      type: 'string',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
    },
    href: {
      type: 'url',
      isRequired: false,
    },
  },
});
