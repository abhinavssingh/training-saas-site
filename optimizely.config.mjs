import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: ['./src/components/**/*.tsx'],
    propertyGroups: [
    {
      key: 'seo',
      displayName: 'SEO',
      sortOrder: 2,
    },
    {
      key: 'openGraph',
      displayName: 'Open Graph',
      sortOrder: 3,
    },
    {
        key: 'training',
        displayName: 'Training',
        sortOrder: 1,
    }
  ],
});