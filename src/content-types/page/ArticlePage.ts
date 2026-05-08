import { contentType } from '@optimizely/cms-sdk';
import { SeoBlockCT } from '../blocks/SeoBlock';

export const ArticlePageCT = contentType({
  key: 'ArticlePage',
  displayName: 'Article Page',
  baseType: '_page',
  properties: {
    heading: {
      type: 'string',
      displayName: 'Heading',
      isRequired: true,
      isLocalized: true,
      indexingType: 'searchable',
      sortOrder: 10,
    },
    body: {
      type: 'richText',
      displayName: 'Body',
      isLocalized: true,
      indexingType: 'searchable',
      sortOrder: 30,
    },
    featuredImage: {
      type: 'contentReference',
      displayName: 'Featured Image',
      allowedTypes: ['_image'],
      description: 'Image shown on the top of the page',
      sortOrder: 5,
    },
    seo: {
      type: 'component',
      displayName: 'SEO Settings',
      contentType: SeoBlockCT,
      group: 'seo',
      sortOrder: 100,
    },
    ingress: {
      type: 'string',
      displayName: 'Introduction',
      sortOrder: 20,
    },
  },
});
