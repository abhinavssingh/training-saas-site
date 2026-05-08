import { displayTemplate } from '@optimizely/cms-sdk';

export const HeroHeadingElementDisplayTemplate = displayTemplate({
  key: 'HeroHeadingElementDisplayTemplate',
  isDefault: true,
  displayName: 'Hero Heading Style',
  contentType: 'HeroHeadingElement',
  settings: {
    headingTag: {
      editor: 'select',
      displayName: 'Heading Level',
      sortOrder: 0,
      choices: {
        h1: { displayName: 'H1 (default)', sortOrder: 0 },
        h2: { displayName: 'H2', sortOrder: 1 },
        h3: { displayName: 'H3', sortOrder: 2 },
      },
    },
    size: {
      editor: 'select',
      displayName: 'Size',
      sortOrder: 1,
      choices: {
        large: { displayName: 'Large (default)', sortOrder: 0 },
        medium: { displayName: 'Medium', sortOrder: 1 },
        small: { displayName: 'Small', sortOrder: 2 },
      },
    },
    accentColor: {
      editor: 'select',
      displayName: 'Accent Color',
      sortOrder: 2,
      choices: {
        amber: { displayName: 'Amber (default)', sortOrder: 0 },
        primary: { displayName: 'Primary', sortOrder: 1 },
        gold: { displayName: 'Gold', sortOrder: 2 },
        none: { displayName: 'None (no accent)', sortOrder: 3 },
      },
    },
  },
});
