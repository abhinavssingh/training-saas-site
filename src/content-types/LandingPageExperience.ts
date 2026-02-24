import { contentType } from '@optimizely/cms-sdk';

export const LandingPageExperienceCT = contentType({
  key: 'LandingPageExperience',
  displayName: 'Landing Page Experience',
  description: 'An experience for customizing landing page layouts',
  group: 'training',
  baseType: '_experience',
  properties: {
    backgroundImage: {
      type: 'contentReference',
      displayName: 'Background Image',
      allowedTypes: ['_image'],
      group: 'media',
    },
  },
});
