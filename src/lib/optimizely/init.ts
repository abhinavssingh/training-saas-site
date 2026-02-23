import { initContentTypeRegistry } from '@optimizely/cms-sdk';
import { initReactComponentRegistry } from '@optimizely/cms-sdk/react/server';
import { HomePageCT } from '../../cms/content-types/pages/HomePage.content-type';
import { BlogPageCT } from '../../cms/content-types/pages/BlogPage.content-type';
import { ArticlePageCT } from '../../cms/content-types/pages/ArticlePage.content-type';
import { LandingPageCT } from '../../cms/content-types/pages/LandingPage.content-type';
import { FolderCT } from '../../cms/content-types/folders/Folder.content-type';

/**
 * Initialize Optimizely CMS SDK content type and component registries
 * This should be called once at application startup
 */
export function initializeOptimizely() {
  initContentTypeRegistry([
    FolderCT,
    HomePageCT,
    BlogPageCT,
    ArticlePageCT,
    LandingPageCT,
  ]);
}


export function registerReactComponentResolver(resolver: Record<string, any>) {
  initReactComponentRegistry({ resolver });
}
