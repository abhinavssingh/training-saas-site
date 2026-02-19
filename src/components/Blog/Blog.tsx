
import { contentType } from '@optimizely/cms-sdk';
import { HomePageContentType } from '../HomePage/HomePage';
import { BasePageContentType } from '../BaseContentType/BaseContentType';

export const BlogPageContentType = contentType({
  key: 'BlogPage',
  displayName: ' Training Blog Page',
  baseType: '_page',
  properties: {
    ...BasePageContentType.properties,
    featuredArticle: {
      type: 'content',
      allowedTypes: [HomePageContentType],
      displayName: 'Featured Article',
    },
    relatedContent: {
      type: 'content',
      restrictedTypes: ['_folder'],
      displayName: 'Related Content',
    },
  },
});