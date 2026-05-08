import { displayTemplate } from '@optimizely/cms-sdk';

export const ColumnDisplayTemplate = displayTemplate({
  key: 'ColumnDisplayTemplate',
  isDefault: true,
  displayName: 'Column Settings',
  nodeType: 'column',
  settings: {
    layout: {
      editor: 'select',
      displayName: 'Column Width',
      sortOrder: 0,
      choices: {
        full: { displayName: 'Full width (1/1)', sortOrder: 1 },
        half: { displayName: 'Half width (1/2)', sortOrder: 2 },
        twoThirds: { displayName: 'Two thirds (2/3)', sortOrder: 3 },
        oneThird: { displayName: 'One third (1/3)', sortOrder: 4 },
        oneQuarter: { displayName: 'One quarter (1/4)', sortOrder: 5 },
      },
    },

    columnSpacing: {
      editor: 'select',
      displayName: 'Inner Padding',
      sortOrder: 1,
      choices: {
        none: { displayName: 'None (default)', sortOrder: 0 },
        small: { displayName: 'Small', sortOrder: 1 },
        medium: { displayName: 'Medium', sortOrder: 2 },
        large: { displayName: 'Large', sortOrder: 3 },
      },
    },

    hideOnMobile: {
      editor: 'select',
      displayName: 'Hide on Mobile',
      sortOrder: 2,
      choices: {
        show: { displayName: 'Show (default)', sortOrder: 0 },
        hide: { displayName: 'Hide on mobile', sortOrder: 1 },
      },
    },

    hideOnTablet: {
      editor: 'select',
      displayName: 'Hide on Tablet',
      sortOrder: 3,
      choices: {
        show: { displayName: 'Show (default)', sortOrder: 0 },
        hide: { displayName: 'Hide on tablet', sortOrder: 1 },
      },
    },
  },
});
