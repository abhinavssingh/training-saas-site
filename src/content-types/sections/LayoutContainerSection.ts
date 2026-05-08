import { contentType } from '@optimizely/cms-sdk';

export const LayoutContainerSectionCT = contentType({
  key: 'LayoutContainerSection',
  displayName: 'Layout Container',
  description: 'Generic layout container with fixed column width presets',
  baseType: '_section',
  compositionBehaviors: ['sectionEnabled'],
});
