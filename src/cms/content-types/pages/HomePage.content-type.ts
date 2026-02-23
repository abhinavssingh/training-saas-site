import { contentType } from '@optimizely/cms-sdk';
import { BasePageCT } from '../base/BasePage.content-type';
import { FolderCT } from '../folders/Folder.content-type';
import { BlogPageCT } from './BlogPage.content-type';
import { LandingPageCT } from './LandingPage.content-type';
import { ArticlePageCT } from './ArticlePage.content-type';

/**
 * Home Page Content Type
 * The main landing page for the website
 * Inherits common page properties and SEO/Open Graph metadata
 */
export const HomePageCT = contentType({
  key: 'HomePage',
  baseType: '_page',
  displayName: 'Home Page',
  description: 'The main landing page for the website',
  mayContainTypes: [FolderCT,BlogPageCT,ArticlePageCT,LandingPageCT],
  properties: {
    ...BasePageCT.properties,
    featuredSection: {
      type: 'contentReference',
      displayName: 'Featured Section',
      description: 'Featured content component to display on home page',
      group: 'siteContent',
      allowedTypes: ['_component'],
    },
    heroCallToAction: {
      type: 'link',
      displayName: 'Hero CTA',
      description: 'Hero section call-to-action link',
      group: 'siteContent',
    },
    showLatestPosts: {
      type: 'boolean',
      displayName: 'Show Latest Posts',
      description: 'Display latest blog posts section',
      group: 'siteContent',
    },
  },
});
