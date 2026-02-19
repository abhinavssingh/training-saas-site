import { contentType } from '@optimizely/cms-sdk';
import { BlogPageContentType } from './Blog';


export const BlogContainerContentType = contentType({
  key: 'BlogContainer',
  displayName: ' Training Blog Container',
  baseType: '_page',
  mayContainTypes: [
    BlogPageContentType,
    '_self',
  ],
});