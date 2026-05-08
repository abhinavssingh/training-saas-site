# File Layout & Composition

How frontend layout/UI components are organised in this codebase.

## Folder structure

Every multi-file feature lives in its own folder under `src/components/layout/<Feature>/`. One concern per file. Subcomponents live next to the parent.

```
src/components/layout/<Feature>/
├── <Feature>.tsx              # Top-level shell. Owns state that crosses subcomponents.
├── <Feature>.Data.ts          # Static data + the TypeScript interfaces describing it.
├── <SubcomponentA>.tsx        # One subcomponent per file (Desktop nav, Mobile nav, TopBar...).
├── <SubcomponentB>.tsx
└── <SubcomponentItem>.tsx     # Per-row / per-cell renderers go here (e.g. MenuItemDesktop).
```

Reference: `src/components/layout/Header/` and `src/components/layout/Footer/`.

```
Header/
├── Header.tsx              # Sticky shell, mobile-open state, composes the rest
├── Header.Data.ts          # MenuItem interface + menuItems array
├── HeaderTopBar.tsx        # Black utility bar with EN/AR + Accessibility/Contact
├── HeaderAi.tsx            # Ask-AI pill + mobile burger button
├── DesktopNav.tsx          # PopoverGroup wrapper around the desktop items
├── MobileNav.tsx           # Plain nav element, conditionally rendered
├── MenuItemDesktop.tsx     # One desktop nav entry — Link OR Popover+MegaMenu
├── MenuItemMobile.tsx      # One mobile nav entry — Link OR Disclosure
└── MegaMenu.tsx            # Reusable mega menu panel for any item with children
```

Re-export the public surface through `src/components/layout/index.ts` so consumers import from a single barrel.

## Data colocation

Static configuration (menu items, footer columns, social links, emirate cards) belongs in a `<Feature>.Data.ts` next to the component that consumes it.

**Always export a TypeScript interface for each entry — components consume the interface, never an implicit shape.**

```typescript
// Header.Data.ts
export interface MenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  featured?: { eyebrow?: string; title: string; description: string; href: string; cta?: string };
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  /* ... */
];
```

### Rules

- Optional fields stay optional in the interface. The component must render correctly whether they're present or not.
- Don't gate features behind boolean flags (`mega: true`) when the presence of richer data already conveys intent. If `children` is present, render the rich UI. If `featured` is present, render the promo. The Header's mega menu does this.
- When data eventually moves to the CMS (header navigation often will), the interface still belongs here so the CMS adapter can map to it.
- Don't hardcode lists inside components. The Footer's social links lived inline in `SocialIcons.tsx` until they were moved to `Footer.Data.ts` — the same pattern applies everywhere.

## Server vs client

A file gets `"use client"` **only when it actually uses**:

- React hooks (`useState`, `useEffect`, `useRef`, `useMemo`, etc.)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Browser-only APIs (`document`, `window`, `localStorage`, `IntersectionObserver`)

Pure markup wrappers (most `<Footer>` subcomponents, `MobileNav`, layout shells that just compose children) **stay as Server Components**. Server Components are smaller, ship no JS, and stream faster.

When in doubt, write it as a Server Component first and add `"use client"` only when TypeScript or React tells you to.

### Reference patterns from the codebase

| File                  | Mode   | Why                                                            |
| --------------------- | ------ | -------------------------------------------------------------- |
| `Header.tsx`          | Client | Owns `mobileOpen` state                                        |
| `HeaderTopBar.tsx`    | Client | Uses `useDocumentLanguage` hook                                |
| `MenuItemDesktop.tsx` | Client | Headless UI Popover render-prop with state                     |
| `MenuItemMobile.tsx`  | Client | Headless UI Disclosure render-prop with state                  |
| `DesktopNav.tsx`      | Client | Wraps Headless UI `PopoverGroup` (which is a client component) |
| `MobileNav.tsx`       | Server | Pure markup                                                    |
| `Footer.tsx`          | Server | Composes children                                              |
| `FooterColumn.tsx`    | Server | Pure markup                                                    |
| `SocialIcons.tsx`     | Server | Pure markup over data                                          |

## TypeScript conventions

- Export named interfaces for any data shape (`export interface MenuItem`). Never use anonymous object types in props.
- Component props are always typed at the top of the file as `interface Props` (or `type Props`).
- Optional callbacks (`onNavigate?: () => void`) — declare them; let the parent decide whether to wire them.
- Avoid the non-null assertion (`!`) unless TypeScript can't see a guard you already wrote. The Header's `MenuItemDesktop.tsx` uses one only because the early-return guard against `!item.children` is in a different scope from the JSX render block.
- Prefer `import type { ... }` for type-only imports when the import is used purely as a type.

## Naming

| Element         | Convention                | Example                                      |
| --------------- | ------------------------- | -------------------------------------------- |
| Folder          | PascalCase, singular      | `Header/`, `Footer/`                         |
| Top-level shell | `<Folder>.tsx`            | `Header.tsx`, `Footer.tsx`                   |
| Data file       | `<Folder>.Data.ts`        | `Header.Data.ts`, `Footer.Data.ts`           |
| Subcomponents   | PascalCase                | `MenuItemDesktop.tsx`, `EmirateCard.tsx`     |
| Interfaces      | PascalCase, no `I` prefix | `MenuItem`, `FooterSection`, `SocialLink`    |
| Data exports    | camelCase plural          | `menuItems`, `footerSections`, `socialLinks` |
