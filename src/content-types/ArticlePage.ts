import { contentType } from '@optimizely/cms-sdk';
import { BasePageCT } from './base/BasePage';
import { LandingPageCT } from './LandingPage';

/**
 * Article Page Content Type
 * Individual blog article with metadata and related content
 * Inherits common page properties and SEO/Open Graph metadata
 */
export const ArticlePageCT = contentType({
  key: 'ArticlePage',
  baseType: '_page',
  displayName: 'Article Page',
  description: 'A single blog article with metadata and related articles',
  group: 'training',
  mayContainTypes: [LandingPageCT],
  properties: {
    ...BasePageCT.properties,
    author: {
      type: 'string',
      displayName: 'Author',
      description: 'Name of the article author',
      group: 'siteContent',
      localized: true,
    },
    category: {
      type: 'string',
      displayName: 'Category',
      description: 'Article category or topic',
      group: 'siteContent',
      enum: [
        { value: 'news', displayName: 'News' },
        { value: 'tutorial', displayName: 'Tutorial' },
        { value: 'guide', displayName: 'Guide' },
        { value: 'case-study', displayName: 'Case Study' },
        { value: 'insight', displayName: 'Insight' },
      ],
    },
    publishDate: {
      type: 'dateTime',
      displayName: 'Published Date',
      description: 'Article publication date',
      group: 'siteContent',
      required: true,
    },
    estimatedReadTime: {
      type: 'integer',
      displayName: 'Estimated Read Time',
      description: 'Estimated reading time in minutes',
      group: 'siteContent',
      minimum: 1,
      maximum: 120,
    },
    relatedArticles: {
      type: 'array',
      displayName: 'Related Articles',
      description: 'Other related articles to display',
      group: 'siteContent',
      items: {
        type: 'content',
        allowedTypes: ['_self'],
      },
      maxItems: 5,
    },
    tags: {
      type: 'array',
      displayName: 'Tags',
      description: 'Article tags for organization and search',
      group: 'siteContent',
      items: { type: 'string' },
      maxItems: 10,
    },
  },
});
