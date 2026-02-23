import { buildConfig } from '@optimizely/cms-sdk';

export default buildConfig({
  components: ['./src/cms/content-types/**/*.content-type.ts', './src/components/**/*.tsx'],
  propertyGroups: [
    {
      key: 'siteContent',
      displayName: 'Site Content',
      sortOrder: 1,
    },
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
  ],
});