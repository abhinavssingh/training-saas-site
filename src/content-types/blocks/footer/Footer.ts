import { contentType } from '@optimizely/cms-sdk';
import { EmirateCardCT } from './EmirateCard';
import { FooterSectionCT } from './FooterSection';
import { SocialLinkCT } from './SocialLink';

export const FooterCT = contentType({
  key: 'Footer',
  displayName: 'Footer',
  baseType: '_component',
  properties: {
    sections: {
      type: 'array',
      isRequired: true,
      items: {
        type: 'content',
        allowedTypes: [FooterSectionCT],
      },
    },
    emirates: {
      type: 'array',
      isRequired: true,
      items: {
        type: 'content',
        allowedTypes: [EmirateCardCT],
      },
    },
    socialLinks: {
      type: 'array',
      isRequired: true,
      items: {
        type: 'content',
        allowedTypes: [SocialLinkCT],
      },
    },
    copyrightText: {
      type: 'string',
      isRequired: true,
    },
    lastUpdated: {
      type: 'dateTime',
      isRequired: true,
    },
  },
});
