# Mega Menu Pattern

The mega menu is the canonical pattern for any nav item with `children`. It's open-for-extension: drop new categories or sub-items into `Header.Data.ts` and they render automatically — no component edits required.

Reference implementation: `src/components/layout/Header/MegaMenu.tsx` and `MenuItemDesktop.tsx`.

## Schema

`MenuItem` in `Header.Data.ts`:

```typescript
export interface MenuItem {
  label: string;
  href: string;

  /** Short blurb shown in mega menu cards. */
  description?: string;

  /** Emoji or short glyph used as a lightweight icon in mega menu cards. */
  icon?: string;

  /** Optional promo card rendered as the last column of a mega menu. */
  featured?: {
    eyebrow?: string;
    title: string;
    description: string;
    href: string;
    cta?: string;
  };

  children?: MenuItem[];
}
```

**Why this schema:**

- `description` and `icon` are optional. Any new entry can opt in.
- `featured` is optional. A category without a promo just gets its items full-width.
- No `mega: true` flag. The presence of `children` is the only signal needed. This was the explicit refactor — boolean flags turned out to be redundant with the data the component already had access to.

## Component contract

```tsx
interface Props {
  item: MenuItem;
  /** Called when a child Link is clicked, so the popover can close itself. */
  onNavigate?: () => void;
}
```

The parent (a Headless UI Popover) passes its render-prop `close` as `onNavigate`. This makes the panel close cleanly on link click, matching the rest of the app.

## Adaptive layout

The panel adapts to the data:

| Data shape             | Layout                                             |
| ---------------------- | -------------------------------------------------- |
| `featured` present     | 2/3 items + 1/3 promo card (`grid-cols-[2fr_1fr]`) |
| `featured` absent      | items take full panel (`grid-cols-1`)              |
| `children.length <= 2` | items rendered as single column                    |
| `children.length > 2`  | items rendered as 2-column grid                    |

Implementation:

```tsx
const outerGrid = featured ? 'grid grid-cols-1 gap-8 p-6 lg:grid-cols-[2fr_1fr] lg:p-8' : 'grid grid-cols-1 gap-8 p-6 lg:p-8';

const itemsGrid = children.length <= 2 ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-1 gap-2 sm:grid-cols-2';
```

## Item card structure

Each child renders as an icon-tile + label + description card:

```tsx
<li>
  <Link href={child.href} onClick={onNavigate} className="...">
    <span aria-hidden="true" className="flex h-10 w-10 ...">
      {child.icon ?? '•'}
    </span>
    <span>
      <span className="block text-sm font-semibold">{child.label}</span>
      {child.description && <span className="mt-0.5 block text-xs">{child.description}</span>}
    </span>
  </Link>
</li>
```

**Graceful degradation:**

- Missing `icon` → neutral bullet (`•`) so column rhythm stays consistent.
- Missing `description` → row gets shorter, layout doesn't break.
- Missing both → just label, still readable.

## Featured promo card

```tsx
<Link href={featured.href} onClick={onNavigate} className="...gradient...rounded-xl...">
  <div>
    {featured.eyebrow && <span className="...badge...">{featured.eyebrow}</span>}
    <h3 className="mt-3 text-lg font-semibold">{featured.title}</h3>
    <p className="mt-2 text-sm">{featured.description}</p>
  </div>
  {featured.cta && (
    <span className="mt-6 inline-flex items-center gap-1">
      {featured.cta}
      <svg className="rtl:rotate-180 ..." />
    </span>
  )}
</Link>
```

The whole card is the link target. The CTA arrow flips in RTL (`rtl:rotate-180`).

## Adding a category

To add a new mega-menu category, edit `Header.Data.ts` only:

```typescript
{
  label: "Knowledge Hub",
  href: "/en/knowledge",
  featured: {
    eyebrow: "Featured",
    title: "Q4 Investor Pulse",
    description: "Quarterly briefing for institutional investors.",
    href: "/en/knowledge/pulse",
    cta: "Read the briefing",
  },
  children: [
    {
      label: "Reports & Whitepapers",
      href: "/en/knowledge/reports",
      icon: "📄",
      description: "In-depth analysis of investment opportunities.",
    },
    // ...add as many as you like
  ],
},
```

The Header automatically renders it with the same look as Sectors and Setup & Licensing. Zero component changes.

## When NOT to use a mega menu

- Nav items without children (`Why Choose US`, `Incentives`, `Insights`, `Events`, `About US`) — render as plain `<Link>`.
- Action menus (logout, settings, user profile) — use Headless UI `Menu` instead.
- Selection lists (filter dropdowns, sort orders) — use `Listbox` or `Combobox`.

The mega menu is specifically for marketing/IA-style category browsing where each child has its own meaningful label, description, and visual identity.
