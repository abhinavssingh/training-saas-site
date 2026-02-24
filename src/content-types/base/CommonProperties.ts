/**
 * SEO Properties for composition into content types
 * These properties provide SEO metadata without being a standalone content type
 */
export const SEOProperties = {
  metaTitle: {
    type: 'string' as const,
    displayName: 'Meta Title',
    description: 'SEO meta title (50-60 characters)',
    maxLength: 60,
    group: 'seo',
    localized: true,
    indexingType: 'searchable' as const,
  },
  metaDescription: {
    type: 'string' as const,
    displayName: 'Meta Description',
    description: 'SEO meta description (150-160 characters)',
    maxLength: 160,
    group: 'seo',
    localized: true,
    indexingType: 'searchable' as const,
  },
  metaKeywords: {
    type: 'string' as const,
    displayName: 'Meta Keywords',
    description: 'Comma-separated keywords for SEO',
    group: 'seo',
    localized: true,
  },
  canonicalUrl: {
    type: 'url' as const,
    displayName: 'Canonical URL',
    description: 'Canonical URL to prevent duplicate content issues',
    group: 'seo',
  },
};

/**
 * Open Graph Properties for social media sharing
 * These properties provide rich metadata for social sharing
 */
export const OpenGraphProperties = {
  ogTitle: {
    type: 'string' as const,
    displayName: 'OG Title',
    description: 'Open Graph title for social media sharing',
    group: 'seo',
    localized: true,
  },
  ogDescription: {
    type: 'string' as const,
    displayName: 'OG Description',
    description: 'Open Graph description for social media sharing',
    maxLength: 160,
    group: 'seo',
    localized: true,
  },
  ogImage: {
    type: 'url' as const,
    displayName: 'OG Image',
    description: 'Open Graph image for social media sharing',
    group: 'seo',
  },
};

/**
 * Common base properties shared across page types
 */
export const CommonPageProperties = {
  heading: {
    type: 'string' as const,
    displayName: 'Page Heading',
    description: 'Main page heading',
    group: 'siteContent',
    required: true,
    localized: true,
    indexingType: 'searchable' as const,
  },
  subheading: {
    type: 'string' as const,
    displayName: 'Subheading',
    description: 'Secondary heading or tagline',
    group: 'siteContent',
    localized: true,
    indexingType: 'searchable' as const,
  },
  body: {
    type: 'richText' as const,
    displayName: 'Body Content',
    description: 'Main content body',
    group: 'siteContent',
    required: true,
    localized: true,
    indexingType: 'searchable' as const,
  },
  image: {
    type: 'contentReference' as const,
    displayName: 'Featured Image',
    description: 'Featured image for the page',
    group: 'siteContent',
  },
  url: {
    type: 'url' as const,
    displayName: 'Page URL',
    description: 'Custom page URL or external link',
    group: 'siteContent',
  },
};
