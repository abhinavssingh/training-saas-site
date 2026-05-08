import { displayTemplate } from '@optimizely/cms-sdk';

export const DropdownElementDisplayTemplate = displayTemplate({
  key: 'DropdownElementDisplayTemplate',
  isDefault: true,
  displayName: 'Dropdown styles',
  contentType: 'DropdownElement',
  settings: {
    density: {
      editor: 'select',
      displayName: 'Density',
      sortOrder: 0,
      choices: {
        compact: { displayName: 'Compact', sortOrder: 0 },
        comfortable: { displayName: 'Comfortable (default)', sortOrder: 1 },
      },
    },
    surface: {
      editor: 'select',
      displayName: 'Surface',
      sortOrder: 1,
      choices: {
        plain: { displayName: 'Plain', sortOrder: 0 },
        card: { displayName: 'Card (default)', sortOrder: 1 },
      },
    },
  },
});
