import { displayTemplate } from '@optimizely/cms-sdk';

export const ContentContainerSectionDisplayTemplate = displayTemplate({
  key: 'ContentContainerSectionDisplayTemplate',
  isDefault: true,
  displayName: 'Content Container Layout',
  contentType: 'ContentContainerSection',
  settings: {
    layout: {
      editor: 'select',
      displayName: 'Column Layout',
      sortOrder: 0,
      choices: {
        twoThirds: {
          displayName: 'Content 2/3 + Media 1/3 (default)',
          sortOrder: 0,
        },
        oneThird: {
          displayName: 'Media 1/3 + Content 2/3',
          sortOrder: 1,
        },
        half: {
          displayName: 'Equal 1/2 + 1/2',
          sortOrder: 2,
        },
        full: {
          displayName: 'Single column (1/1)',
          sortOrder: 3,
        },
      },
    },
    colorScheme: {
      editor: 'select',
      displayName: 'Color Scheme',
      sortOrder: 1,
      choices: {
        light: { displayName: 'Light (default)', sortOrder: 0 },
        gradient: { displayName: 'Subtle Gradient', sortOrder: 1 },
        gold: { displayName: 'Gold Gradient', sortOrder: 2 },
        dark: { displayName: 'Dark', sortOrder: 3 },
      },
    },
    sectionSpacing: {
      editor: 'select',
      displayName: 'Section Padding',
      sortOrder: 2,
      choices: {
        small: { displayName: 'Small', sortOrder: 0 },
        medium: { displayName: 'Medium', sortOrder: 1 },
        large: { displayName: 'Large (default)', sortOrder: 2 },
      },
    },
    verticalAlignment: {
      editor: 'select',
      displayName: 'Column Vertical Alignment',
      sortOrder: 3,
      choices: {
        start: { displayName: 'Top', sortOrder: 0 },
        center: { displayName: 'Center (default)', sortOrder: 1 },
        end: { displayName: 'Bottom', sortOrder: 2 },
      },
    },
  },
});
