import { displayTemplate } from '@optimizely/cms-sdk';

export const RowDisplayTemplate = displayTemplate({
  key: 'RowDisplayTemplate',
  isDefault: true,
  displayName: 'Row Settings',
  nodeType: 'row',
  settings: {
    layout: {
      editor: 'select',
      displayName: 'Row Layout',
      sortOrder: 0,
      choices: {
        single: {
          displayName: 'Single (1 column)',
          sortOrder: 1,
        },
        full: {
          displayName: 'Auto / Full (default)',
          sortOrder: 2,
        },
        half: {
          displayName: 'Half (1/2)',
          sortOrder: 3,
        },
        twoThirds: {
          displayName: 'Two thirds (2/3)',
          sortOrder: 4,
        },
        oneThird: {
          displayName: 'One third (1/3)',
          sortOrder: 5,
        },
        oneQuarter: {
          displayName: 'One quarter (1/4)',
          sortOrder: 6,
        },
        oneFifth: {
          displayName: 'One fifth (1/5)',
          sortOrder: 7,
        },
        oneSixth: {
          displayName: 'One sixth (1/6)',
          sortOrder: 8,
        },
      },
    },

    rowSpacing: {
      editor: 'select',
      displayName: 'Bottom Spacing',
      sortOrder: 1,
      choices: {
        none: { displayName: 'None', sortOrder: 0 },
        small: { displayName: 'Small', sortOrder: 1 },
        medium: { displayName: 'Medium (default)', sortOrder: 2 },
        large: { displayName: 'Large', sortOrder: 3 },
      },
    },

    verticalAlignment: {
      editor: 'select',
      displayName: 'Vertical Alignment',
      sortOrder: 2,
      choices: {
        start: { displayName: 'Top (default)', sortOrder: 0 },
        center: { displayName: 'Center', sortOrder: 1 },
        end: { displayName: 'Bottom', sortOrder: 2 },
        stretch: { displayName: 'Stretch', sortOrder: 3 },
      },
    },
  },
});
