// cms/content-types/global/GlobalNavigation.ts
import { contentType } from '@optimizely/cms-sdk';
import { NavItemCT } from './NavItem';

export const HeaderCT = contentType({
  key: 'Header',
  displayName: 'Header',
  baseType: '_component',
  properties: {
    menuItems: {
      type: 'array',
      isRequired: true,
      items: {
        type: 'content',
        allowedTypes: [NavItemCT],
      },
    },
    showAiButton: {
      type: 'boolean',
      isRequired: true,
    },
  },
});
