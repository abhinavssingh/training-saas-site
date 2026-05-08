import { contentType } from '@optimizely/cms-sdk';

export const TimelineSelectorElementCT = contentType({
  key: 'TimelineSelectorElement',
  displayName: 'Timeline Selector',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    title: {
      type: 'string',
      isRequired: true,
      indexingType: 'searchable',
      description: 'Label for the timeline selector element',
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
      description: 'Optional helper text below the control',
      indexingType: 'searchable',
    },
  },
});
