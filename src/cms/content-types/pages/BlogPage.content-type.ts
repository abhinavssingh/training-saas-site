import { contentType } from '@optimizely/cms-sdk';
import { BasePageCT } from '../base/BasePage.content-type';

/**
 * Blog Page Content Type
 * Container page for listing blog articles
 * Inherits common page properties and SEO/Open Graph metadata
 */
export const BlogPageCT = contentType({
  key: 'BlogPage',
  baseType: '_page',
  displayName: 'Blog Page',
  description: 'A blog container page that lists articles',
  mayContainTypes: ['ArticlePage', '_self'],
  properties: {
    ...BasePageCT.properties,
    articlesPerPage: {
      type: 'integer',
      displayName: 'Articles Per Page',
      description: 'Number of articles to display per page',
      group: 'siteContent',
      minimum: 1,
      maximum: 100,
    },
    enableCategory: {
      type: 'boolean',
      displayName: 'Enable Categories',
      description: 'Allow filtering articles by category',
      group: 'siteContent',
    },
    enableSearch: {
      type: 'boolean',
      displayName: 'Enable Search',
      description: 'Enable search functionality on blog page',
      group: 'siteContent',
    },
  },
});
