import { contentType } from '@optimizely/cms-sdk';

export const HeroEyebrowElementCT = contentType({
  key: 'HeroEyebrowElement',
  displayName: 'Hero Eyebrow',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    text: {
      type: 'string',
      displayName: 'Text',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
    },
    icon: {
      type: 'string',
      displayName: 'Icon (emoji)',
      description: 'Optional emoji or short glyph rendered before the text.',
      isLocalized: true,
    },
  },
});
