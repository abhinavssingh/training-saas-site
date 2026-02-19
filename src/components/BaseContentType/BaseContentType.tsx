import { contentType } from '@optimizely/cms-sdk';
import { SEOContentType } from './SEOContentType';
import { OpenGraphContentType } from './OpenGraphContentType';

export const BasePageContentType = contentType({
  key: 'BasePage', // A unique key for your base type
  baseType: '_page', // Designates this as a page content type
  displayName: 'Training Base Page',
  properties: {
    ...SEOContentType.properties, // Inherit SEO properties
    ...OpenGraphContentType.properties, // Inherit Open Graph properties
    heading: {
      type: 'string',
      displayName: 'Heading',
      group: 'training',
      indexingType: 'searchable',
    },
    body: {
      type: 'richText',
      displayName: 'Body',
      group: 'training',
      indexingType: 'searchable',
    },
  },
});
