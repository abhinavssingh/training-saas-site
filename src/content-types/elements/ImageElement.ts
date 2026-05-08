import { contentType } from '@optimizely/cms-sdk';

export const ImageElementCT = contentType({
  key: 'ImageElement',
  displayName: 'Image Element',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    image: {
      type: 'contentReference',
      displayName: 'Image',
      isRequired: true,
      allowedTypes: ['_image'],
    },
    altText: {
      type: 'string',
      displayName: 'Alt Text',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
    },
    caption: {
      type: 'string',
      displayName: 'Caption',
      isLocalized: true,
      indexingType: 'searchable',
    },
  },
});
