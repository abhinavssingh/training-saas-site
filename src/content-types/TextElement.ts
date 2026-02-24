import { contentType } from '@optimizely/cms-sdk';

export const TextElementCT = contentType({
  key: 'TextElement',
  displayName: 'Text Element',
  description: 'A reusable text element for simple string content',
  group: 'training',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    text: {
      type: 'string',
      displayName: 'Text',
      required: true,
      localized: true,
    },
  },
});
