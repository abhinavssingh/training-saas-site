// cms/content-types/global/NavItem.ts
import { contentType } from '@optimizely/cms-sdk';
import { NavPromoCardCT } from './NavPromoCard';

export const NavItemCT = contentType({
  key: 'NavItem',
  displayName: 'Navigation Item',
  baseType: '_component',
  properties: {
    label: { type: 'string', isRequired: true, isLocalized: true, indexingType: 'searchable' },
    href: { type: 'url' },
    description: { type: 'string', isLocalized: true, indexingType: 'searchable' },
    icon: { type: 'string' },
    children: {
      type: 'array',
      items: { type: 'content', allowedTypes: ['_self'] },
    },
    featured: {
      type: 'content',
      allowedTypes: [NavPromoCardCT],
    },
  },
});
