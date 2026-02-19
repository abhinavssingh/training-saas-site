import { contentType } from '@optimizely/cms-sdk';

export const OpenGraphContentType = contentType({
  key: 'OpenGraphContentType', // A unique key for your base type
  baseType: '_page', // Designates this as a page content type
  displayName: 'Training Open Graph',
  properties: {
    // Define properties that all pages should inherit
    ogTitle: {
      type: 'string',
      displayName: 'Open Graph Title',
      indexingType: 'searchable',
      group: 'openGraph',
    },
    ogDescription: {
      type: 'string',
      displayName: 'Open Graph Description',
      indexingType: 'searchable',
        group: 'openGraph',
    },
    ogImage: {
      type: 'contentReference', 
      allowedTypes: ['_image'],
      displayName: 'Open Graph Image URL',
      group: 'openGraph',
    }},
});