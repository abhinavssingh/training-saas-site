# Header — Annotated Walkthrough

The Header at `src/components/layout/Header/` is one of the two canonical implementations of every principle in this skill (the other is the Footer — see `footer-reference.md`). It's the reference for interactive layout chrome: state-owning shell, Headless UI primitives, RTL toggle, mega menu pattern, mobile drawer.

## What each file demonstrates

### `Header.tsx`

The top-level shell pattern. Owns shared client-side state (`mobileOpen`) and composes the rest. Sticky positioning + responsive grid. The mobile drawer is conditionally rendered from this state, and the toggle button's `aria-controls="mobile-nav"` matches the drawer's `id`.

Demonstrates: shell pattern, owning state at the top, server-first composition where possible.

### `Header.Data.ts`

The open-for-extension schema. `MenuItem` interface with optional `description`, `icon`, `featured`, `children`. The `menuItems` array drives both desktop and mobile nav.

Demonstrates: data colocation, exported interface, optional fields that progressively enhance the UI.

### `HeaderTopBar.tsx`

The black utility bar with the EN/AR toggle. Hosts the `useDocumentLanguage` hook that flips `<html dir>` and `<html lang>` when the user clicks AR.

Demonstrates: single source of truth for direction, the canonical RTL toggle pattern, group-of-buttons ARIA (`role="group" aria-label="Language"` + `aria-pressed`).

### `HeaderAi.tsx`

The Ask-AI pill (desktop) and burger button (mobile). The burger has full ARIA wiring for the panel it controls.

Demonstrates: dynamic `aria-label`, `aria-expanded`, `aria-controls` on a non-Headless-UI toggle. Also `type="button"` on every `<button>` outside a form.

### `DesktopNav.tsx`

`PopoverGroup as="nav" aria-label="Primary"` wrapping the desktop items. Sibling popovers coordinate automatically — opening one closes the others.

Demonstrates: `PopoverGroup` for sibling coordination, `aria-label` on the nav landmark.

### `MobileNav.tsx`

Plain `<nav id="mobile-nav" aria-label="Primary mobile">` over `MenuItemMobile`. Stays a Server Component because it has no state.

Demonstrates: `id` matching `aria-controls` on the toggle, server-first when state isn't owned here.

### `MenuItemDesktop.tsx`

The Headless UI Popover with `transition` prop (NOT the legacy `<Transition>` wrapper — that broke click-outside) and `anchor={{ to: "bottom", gap: 8 }}`. Falls back to a plain `<Link>` when the item has no children. Always renders the panel through `<MegaMenu>`.

Demonstrates: Headless UI v2 transition pattern, `anchor` instead of hand-positioning, render-prop `close` for closing on link click.

### `MenuItemMobile.tsx`

Headless UI `Disclosure` instead of custom `useState`. `DisclosureButton` exposes `aria-expanded` automatically.

Demonstrates: Disclosure pattern, `as="ul" role="list"` on the panel for proper list semantics, `border-s-2 border-amber-400 ms-4` for RTL-safe accent border.

### `MegaMenu.tsx`

Adaptive layout that reacts to data shape — single column when `children.length <= 2`, 2-column when more, with or without a featured promo column.

Demonstrates: open-for-extension data, `aria-hidden` on the icon tile, `rtl:rotate-180` on the directional CTA arrow.

## Header refactor fix log

For posterity, here's what was broken in the first pass and got fixed during the Header overhaul:

| File                           | Bug                                                                                                                                                             | Fix                                                                                                                                                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MenuItemDesktop.tsx`          | Hand-rolled hover + `setTimeout` open/close state. No keyboard support, no click-outside, no Esc dismissal.                                                     | Headless UI `Popover` with `PopoverButton` / `PopoverPanel`.                                                                                                                                                      |
| `MenuItemDesktop.tsx`          | Click-outside silently broke after the migration.                                                                                                               | Root cause was wrapping `PopoverPanel` in legacy `<Transition as={Fragment}>` while using the v2 `anchor` prop. Switched to the v2 `transition` prop directly on the panel + `data-[closed]:*` Tailwind variants. |
| `MenuItemDesktop.tsx`          | Only the `Sectors` item was a mega menu; `Setup & Licensing` was a simple text dropdown. Adding children to other items would have meant editing the component. | Removed the `mega: true` flag entirely. Every item with children now routes through the `MegaMenu` component, so future additions get the same UI for free.                                                       |
| `MenuItemMobile.tsx`           | Hand-rolled `useState` toggle without `aria-expanded`.                                                                                                          | Headless UI `Disclosure`.                                                                                                                                                                                         |
| `HeaderAi.tsx` (mobile burger) | No `aria-expanded`, no `aria-controls`, no `aria-label` — just an icon.                                                                                         | Wired all three; matched `aria-controls="mobile-nav"` to the panel id.                                                                                                                                            |
| `HeaderTopBar.tsx` (EN/AR)     | Plain spans, no toggle, no document-direction wiring.                                                                                                           | `<button aria-pressed>` pair under `<span role="group" aria-label="Language">`, `useDocumentLanguage` hook flips `<html dir>` and `<html lang>`.                                                                  |
| Multiple files                 | `left-*`, `right-*`, `ml-*`, `mr-*` directional classes.                                                                                                        | Replaced with logical equivalents (`start-*`, `end-*`, `ms-*`, `me-*`).                                                                                                                                           |

## When to use the Header pattern

Use this pattern as a starting point for any chrome that:

- Owns interactive state at the top level (open/closed, language, theme).
- Has both desktop and mobile representations that must stay mutually exclusive at the breakpoint.
- Needs Headless UI for keyboard, focus, and click-outside semantics.
- Needs to flip with `<html dir>` for RTL.
- Has nav items where children may grow over time.

For static, non-interactive chrome (the Footer, sub-footer, breadcrumb bars), see `footer-reference.md` instead — those don't need state and stay as Server Components.
