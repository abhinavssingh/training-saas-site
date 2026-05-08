import { displayTemplate } from '@optimizely/cms-sdk';

export const HeroMediaCardElementDisplayTemplate = displayTemplate({
  key: 'HeroMediaCardElementDisplayTemplate',
  isDefault: true,
  displayName: 'Hero Media Card Style',
  contentType: 'HeroMediaCardElement',
  settings: {
    aspectRatio: {
      editor: 'select',
      displayName: 'Aspect Ratio',
      sortOrder: 0,
      choices: {
        ratio16x9: { displayName: '16:9 (default)', sortOrder: 0 },
        ratio4x3: { displayName: '4:3', sortOrder: 1 },
        ratio1x1: { displayName: '1:1 (square)', sortOrder: 2 },
        ratio3x4: { displayName: '3:4 (portrait)', sortOrder: 3 },
      },
    },
    badgePosition: {
      editor: 'select',
      displayName: 'Badge Stack Position',
      sortOrder: 1,
      choices: {
        topEnd: { displayName: 'Top End (default)', sortOrder: 0 },
        topStart: { displayName: 'Top Start', sortOrder: 1 },
        bottomEnd: { displayName: 'Bottom End', sortOrder: 2 },
      },
    },
  },
});
