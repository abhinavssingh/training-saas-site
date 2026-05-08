/**
 * Optimizely CMS SDK initialization
 *
 * This module initializes all Optimizely registries. Import this file
 * in your root layout or instrumentation file to ensure registries
 * are set up before any CMS content is rendered.
 */
import {
  BlankExperienceContentType,
  initContentTypeRegistry,
  initDisplayTemplateRegistry,
} from '@optimizely/cms-sdk';
import { initReactComponentRegistry } from '@optimizely/cms-sdk/react/server';
import * as components from '@/components';
// This loads all the content types from the /content-types/index.ts file.
import * as contentTypes from '@/content-types';
import * as displayTemplates from '@/display-templates';

// Initialize content type registry with all content types
const allContentTypes = [...Object.values(contentTypes), BlankExperienceContentType];
initContentTypeRegistry(allContentTypes);

// Initialize display template registry
initDisplayTemplateRegistry([...Object.values(displayTemplates)]);

// Initialize React component registry for server-side rendering
initReactComponentRegistry({
  resolver: {
    // Pages
    ArticlePage: components.ArticlePage,
    PersonPage: components.PersonPage,
    // Experiences
    BlankExperience: components.BlankExperience,
    LandingPageExperience: components.LandingPageExperience,
    // Sections
    BlankSection: components.BlankSection,
    LayoutContainerSection: components.LayoutContainerSection,
    ContentContainerSection: components.ContentContainerSection,
    // Elements
    PersonElement: components.PersonElement,
    TextElement: components.TextElement,
    RichTextElement: components.RichTextElement,
    ImageElement: components.ImageElement,
    BannerElement: components.BannerElement,
    CallToActionElement: components.CallToActionElement,
    CardBlock: components.CardBlock,
    Header: components.Header,
    Footer: components.Footer,
    HeroEyebrowElement: components.HeroEyebrowElement,
    HeroHeadingElement: components.HeroHeadingElement,
    HeroStatsElement: components.HeroStatsElement,
    HeroMediaCardElement: components.HeroMediaCardElement,
    DropdownElement: components.DropdownElement,
    TimelineSelectorElement: components.TimelineSelectorElement,
  },
});
