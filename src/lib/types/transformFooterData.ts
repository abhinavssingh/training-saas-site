/**
 * Transforms raw CMS footer response data to match frontend component expectations
 * Handles nested structures for sections, emirates, and social links
 */

type FooterLink = {
  _id?: string;
  id?: string;
  label?: string;
  href?: string | { default?: string };
};

type FooterSection = {
  _id?: string;
  id?: string;
  title?: string;
  links?: FooterLink[] | null;
};

type FooterEmirati = {
  _id?: string;
  id?: string;
  name?: string;
  subtitle?: string;
};

type FooterSocialLink = {
  _id?: string;
  id?: string;
  label?: string;
  href?: string | { default?: string };
  iconPath?: string;
};

type RawFooterData = {
  _id?: string;
  sections?: FooterSection[] | null;
  emirates?: FooterEmirati[] | null;
  socialLinks?: FooterSocialLink[] | null;
  [key: string]: any;
};

type TransformedFooterLink = {
  id?: string;
  label?: string;
  href?: string;
};

type TransformedFooterSection = {
  id?: string;
  title?: string;
  links?: TransformedFooterLink[] | null;
};

type TransformedFooterEmirati = {
  id?: string;
  name?: string;
  subtitle?: string;
};

type TransformedFooterSocialLink = {
  id?: string;
  label?: string;
  href?: string;
  iconPath?: string;
};

type TransformedFooterData = {
  id?: string;
  sections?: TransformedFooterSection[] | null;
  emirates?: TransformedFooterEmirati[] | null;
  socialLinks?: TransformedFooterSocialLink[] | null;
  [key: string]: any;
};

/**
 * Normalize a single href value - handles both string and object format
 */
function normalizeHref(href: string | { default?: string } | undefined): string | undefined {
  if (!href) return undefined;
  if (typeof href === 'string') return href;
  return href.default;
}

/**
 * Transform footer sections with nested links
 */
function transformSection(section: FooterSection): TransformedFooterSection {
  return {
    id: section._id || section.id,
    title: section.title,
    links:
      section.links?.map((link) => ({
        id: link._id || link.id,
        label: link.label,
        href: normalizeHref(link.href),
      })) ?? null,
  };
}

/**
 * Transform emirates data
 */

function transformEmirati(emirati: FooterEmirati): TransformedFooterEmirati {
  return {
    id: emirati._id || emirati.id,
    name: emirati.name,
    subtitle: emirati.subtitle,
  };
}

/**
 * Transform social links
 */

function transformSocialLink(social: FooterSocialLink): TransformedFooterSocialLink {
  return {
    id: social._id || social.id,
    label: social.label,
    href: normalizeHref(social.href),
    iconPath: social.iconPath,
  };
}

/**
 * Transform footer data from CMS GraphQL response to component props format
 */
export function transformFooterData(footerData: RawFooterData): TransformedFooterData {
  if (!footerData) {
    return { sections: null, emirates: null, socialLinks: null };
  }

  return {
    ...footerData,
    id: footerData._id,
    sections: footerData.sections?.map(transformSection) ?? null,
    emirates: footerData.emirates?.map(transformEmirati) ?? null,
    socialLinks: footerData.socialLinks?.map(transformSocialLink) ?? null,
  };
}
