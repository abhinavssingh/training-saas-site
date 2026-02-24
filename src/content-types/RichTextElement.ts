import { contentType } from '@optimizely/cms-sdk';

export const RichTextElementCT = contentType({
  key: 'RichTextElement',
  displayName: 'Rich Text Element',
  description: 'A reusable rich text element for formatted content',
  group: 'training',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    content: {
      type: 'richText',
      displayName: 'Content',
      required: true,
      localized: true,
    },
  },
});
