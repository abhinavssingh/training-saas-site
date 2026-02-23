import { contentType } from '@optimizely/cms-sdk';
import { SEOProperties, OpenGraphProperties, CommonPageProperties } from './CommonProperties';

/**
 * Base Page Content Type
 * Provides common properties and SEO/Open Graph metadata for all page types
 * This is not meant to be used directly in the CMS, but inherited by specific page types
 */
export const BasePageCT = contentType({
  key: 'BasePage',
  baseType: '_page',
  displayName: 'Base Page',
  description: 'Base page type with common properties and SEO metadata',
  properties: {
    // Common page properties
    ...CommonPageProperties,
    // SEO properties
    ...SEOProperties,
    // Open Graph properties
    ...OpenGraphProperties,
  },
});
