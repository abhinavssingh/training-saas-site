import { contentType } from '@optimizely/cms-sdk';

export const SocialLinkCT = contentType({
  key: 'SocialLink',
  displayName: 'Social Link',
  baseType: '_component',
  properties: {
    label: {
      type: 'string',
      isRequired: true,
      description: 'Accessible screen reader label',
      isLocalized: true,
      indexingType: 'searchable',
    },
    href: {
      type: 'url',
      isRequired: true,
    },
    iconPath: {
      type: 'string',
      isRequired: true,
      description: 'SVG path data (24x24)',
    },
  },
});
