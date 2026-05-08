import { displayTemplate } from '@optimizely/cms-sdk';

export const HeroEyebrowElementDisplayTemplate = displayTemplate({
  key: 'HeroEyebrowElementDisplayTemplate',
  isDefault: true,
  displayName: 'Hero Eyebrow Style',
  contentType: 'HeroEyebrowElement',
  settings: {
    variant: {
      editor: 'select',
      displayName: 'Style',
      sortOrder: 0,
      choices: {
        outlined: { displayName: 'Outlined (default)', sortOrder: 0 },
        filled: { displayName: 'Filled amber', sortOrder: 1 },
        subtle: { displayName: 'Subtle', sortOrder: 2 },
      },
    },
  },
});
