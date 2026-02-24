import { contentType } from '@optimizely/cms-sdk';
import { BasePageCT } from './base/BasePage';
import { FolderCT } from './folders/Folder';
import { BlogPageCT } from './BlogPage';
import { LandingPageCT } from './LandingPage';
import { ArticlePageCT } from './ArticlePage';

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
  group: 'training',
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
