import { contentType } from '@optimizely/cms-sdk';
import { BlogPageCT } from '../pages/BlogPage.content-type';
import { LandingPageCT } from '../pages/LandingPage.content-type';
import { ArticlePageCT } from '../pages/ArticlePage.content-type';

/**
 * Folder Content Type
 * Organizational container for grouping pages and other content
 * Authors can create pages and subfolders within this folder
 */
export const FolderCT = contentType({
  key: 'Folder',
  baseType: '_folder',
  displayName: 'Folder',
  description: 'A folder for organizing and grouping pages and content',
  mayContainTypes: [
    BlogPageCT,
    ArticlePageCT,
    LandingPageCT,
    '_self', // Allow nested folders
  ],
  properties: {
    folderNotes: {
      type: 'string',
      displayName: 'Folder Notes',
      description: 'Optional notes for this folder',
      group: 'siteContent',
      localized: true,
    },
  },
});
