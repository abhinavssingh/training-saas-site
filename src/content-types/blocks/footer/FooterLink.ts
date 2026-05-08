import { contentType } from '@optimizely/cms-sdk';

export const FooterLinkCT = contentType({
  key: 'FooterLink',
  displayName: 'Footer Link',
  baseType: '_component',
  properties: {
    label: {
      type: 'string',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
    },
    href: {
      type: 'url',
      isRequired: true,
    },
  },
});
