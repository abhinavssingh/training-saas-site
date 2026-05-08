import { contentType } from '@optimizely/cms-sdk';
import { FooterLinkCT } from './FooterLink';

export const FooterSectionCT = contentType({
  key: 'FooterSection',
  displayName: 'Footer Section',
  baseType: '_component',
  properties: {
    title: {
      type: 'string',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
    },
    links: {
      type: 'array',
      isRequired: true,
      items: {
        type: 'content',
        allowedTypes: [FooterLinkCT],
      },
    },
  },
});
