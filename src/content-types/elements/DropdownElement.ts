import { contentType } from '@optimizely/cms-sdk';

export const DropdownElementCT = contentType({
  key: 'DropdownElement',
  displayName: 'Dropdown (Multi-select)',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    title: {
      type: 'string',
      isRequired: true,
      indexingType: 'searchable',
    },

    options: {
      type: 'array',
      isRequired: true,
      items: {
        type: 'string',
      },
    },

    helperText: {
      type: 'string',
      indexingType: 'searchable',
    },
  },
});
