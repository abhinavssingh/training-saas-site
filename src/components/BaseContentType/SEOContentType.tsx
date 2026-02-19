import { contentType } from '@optimizely/cms-sdk';

export const SEOContentType = contentType({
  key: 'SEOContentType', // A unique key for your base type
  baseType: '_page', // Designates this as a page content type
  displayName: 'Training SEO',
  properties: {
    // Define properties that all pages should inherit
    metaTitle: {
      type: 'string',
      displayName: 'Meta Title',
      indexingType: 'searchable',
      group: 'seo',
    },
    metaDescription: {
      type: 'string',
      displayName: 'Meta Description',
      indexingType: 'searchable',
        group: 'seo',
    },
    // Add other common properties like scripts, header/footer links, etc.
  },
});
