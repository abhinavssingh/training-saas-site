import { displayTemplate } from '@optimizely/cms-sdk';

export const LayoutContainerSectionDisplayTemplate = displayTemplate({
  key: 'LayoutContainerSectionDisplayTemplate',
  isDefault: true,
  displayName: 'Layout Options',
  contentType: 'LayoutContainerSection',
  settings: {
    layout: {
      editor: 'select',
      displayName: 'Container Layout',
      sortOrder: 0,
      choices: {
        full: {
          displayName: 'Full width (1/1)',
          sortOrder: 0,
        },
        half: {
          displayName: 'Half width (1/2)',
          sortOrder: 1,
        },
        oneThird: {
          displayName: 'One-third (1/3)',
          sortOrder: 2,
        },
        twoThirds: {
          displayName: 'Two-thirds (2/3)',
          sortOrder: 3,
        },
        oneQuarter: {
          displayName: 'One-quarter (1/4)',
          sortOrder: 4,
        },
        oneFifth: {
          displayName: 'One-fifth (1/5)',
          sortOrder: 5,
        },
        oneSixth: {
          displayName: 'One-sixth (1/6)',
          sortOrder: 6,
        },
      },
    },
  },
});
