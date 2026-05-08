import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: [
    './src/content-types/**/*.ts',
    './src/display-templates/**/*.ts',
    './src/components/**/*.tsx',
  ],
  propertyGroups: [
    { key: 'media', displayName: 'Media', sortOrder: 200 },
    { key: 'seo', displayName: 'SEO', sortOrder: 300 },
    { key: 'socialMedia', displayName: 'Social Media', sortOrder: 400 },
  ],
});
