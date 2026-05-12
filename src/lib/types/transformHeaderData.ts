/**
 * Transforms raw CMS header response data to match frontend component expectations
 * Handles nested item structure and href normalization across all levels
 */

type HeaderMenuItem = {
  _id?: string;
  id?: string;
  label?: string;
  href?: string | { default?: string };
  children?: HeaderMenuItem[] | null;
  featured?: any | null;
};

type TransformedHeaderMenuItem = {
  id?: string;
  label?: string;
  href?: string;
  children?: TransformedHeaderMenuItem[] | null;
  featured?: any | null;
};

type RawHeaderData = {
  _id?: string;
  menuItems?: HeaderMenuItem[] | null;
  showAiButton?: boolean;
  [key: string]: any;
};

type TransformedHeaderData = {
  id?: string;
  menuItems?: TransformedHeaderMenuItem[] | null;
  showAiButton: boolean;
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
 * Transform a menu item and all its nested children recursively
 */
function transformMenuItem(item: HeaderMenuItem): TransformedHeaderMenuItem {
  return {
    id: item._id || item.id,
    label: item.label,
    href: normalizeHref(item.href),
    children: item.children?.map(transformMenuItem) || null,
    featured: item.featured
      ? {
          ...item.featured,
          id: item.featured._id,
          href: normalizeHref(item.featured.href),
        }
      : null,
  };
}

/**
 * Transform header data from CMS GraphQL response to component props format
 */
export function transformHeaderData(headerData: RawHeaderData): TransformedHeaderData {
  if (!headerData) {
    return { menuItems: null, showAiButton: false };
  }

  return {
    ...headerData,
    id: headerData._id,
    menuItems: headerData.menuItems?.map(transformMenuItem) ?? null,
    showAiButton: Boolean(headerData.showAiButton),
  };
}
