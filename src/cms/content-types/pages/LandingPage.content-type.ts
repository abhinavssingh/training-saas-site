import { contentType } from '@optimizely/cms-sdk';
import { BasePageCT } from '../base/BasePage.content-type';

/**
 * Landing Page Content Type
 * Specialized page for campaigns and lead generation
 * Inherits common page properties and SEO/Open Graph metadata
 */
export const LandingPageCT = contentType({
  key: 'LandingPage',
  baseType: '_page',
  displayName: 'Landing Page',
  description: 'Specialized landing page for campaigns and lead generation',
  mayContainTypes: ['_self'],
  properties: {
    ...BasePageCT.properties,
    callToActionText: {
      type: 'string',
      displayName: 'CTA Button Text',
      description: 'Call-to-action button text',
      group: 'siteContent',
      localized: true,
    },
    callToActionLink: {
      type: 'link',
      displayName: 'CTA Link',
      description: 'Call-to-action button destination',
      group: 'siteContent',
    },
    enableFeaturedSection: {
      type: 'boolean',
      displayName: 'Show Featured Section',
      description: 'Enable featured section below main content',
      group: 'siteContent',
    },
    featuredContent: {
      type: 'contentReference',
      displayName: 'Featured Content',
      description: 'Featured content to display',
      group: 'siteContent',
      allowedTypes: ['_component'],
    },
  },
});
