# Footer — Annotated Walkthrough

The Footer at `src/components/layout/Footer/` is one of the two canonical implementations of every principle in this skill (the other is the Header — see `header-reference.md`). It's a server-rendered, content-info landmark that sits below every page; nothing in the Footer needs client-side state.

## What each file demonstrates

### `Footer.tsx`

`<footer role="contentinfo">` shell. The four link columns + the EmiratesGrid live inside `<nav aria-label="Footer">`. Server Component.

Demonstrates: explicit landmark roles (`contentinfo`, named `nav`), server-first for pure markup, responsive grid that lays out 2x2 on mobile and 6-up on desktop.

### `Footer.Data.ts`

Three exports: `footerSections`, `emirates`, `socialLinks`. Each backed by an exported TypeScript interface (`FooterSection`, `SocialLink`).

Demonstrates: data colocation for ALL static content — including the platforms/social links that initially lived inline in `SocialIcons.tsx` and were promoted out as part of the audit.

### `FooterColumn.tsx`

The slugify pattern that ties each `<h3>` to its `<ul>` via `aria-labelledby` and a stable id. Every `<Link>` carries a `focus-visible` ring. Server Component.

Demonstrates: heading <-> list association, focus rings on every interactive surface, `role="list"` on `<ul>` to survive Safari's list-style stripping.

### `FooterColumns.tsx`

Pure markup — just `.map` over `footerSections` rendering one `FooterColumn` per entry. Server Component.

Demonstrates: a thin renderer-shell that exists purely so the parent stays declarative.

### `EmiratesGrid.tsx`

`<ul role="list" aria-labelledby="footer-emirates-heading">` over `EmirateCard` `<li>` items. Outer wrapper has `col-span-2 lg:col-span-2` so the grid spans the full width on mobile (sits below the 2x2 link grid) and takes 2 of the 6 columns on lg.

Demonstrates: list semantics on a visual grid, heading association, mobile col-span to break out of a 2-col mobile shell.

### `EmirateCard.tsx`

Tiny presentational card — flag swatch + name + subtitle. The decorative red bar carries `aria-hidden="true"`. No state, no interactivity.

Demonstrates: `aria-hidden` on decorative content, server-component-by-default for pure markup.

### `FooterBottomBar.tsx`

Copyright line, last-updated `<time dateTime="ISO">`, social icons row. `sm:ms-2` (logical, RTL-safe) instead of `sm:ml-2`.

Demonstrates: logical Tailwind classes, machine-readable time semantics, responsive flex direction (`flex-col sm:flex-row`).

### `SocialIcons.tsx`

Real `<a target="_blank" rel="noopener noreferrer" aria-label="...">` over an SVG `<path>`. The whole row is a `<ul role="list" aria-label="Social media">`. Each link has a `focus-visible` ring. Driven by `socialLinks` from `Footer.Data.ts`.

Demonstrates: external-link ARIA, focus rings, list semantics on icon rows, data-driven rendering, real SVG icons (not `<span>` text-as-icon).

## Footer audit fix log

For posterity, here's what was broken before this skill existed and got fixed during the Footer audit:

| File                             | Bug                                                                                                                                       | Fix                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `SocialIcons.tsx`                | `<span>`s, not links. Two-letter labels (`x`, `in`, `ig`, `yt`). No focus ring.                                                           | Real `<a>`s, full platform names in `aria-label`, real SVG icons, focus rings. Data moved to `Footer.Data.ts`.         |
| `FooterColumn.tsx`               | `<Link>` had hover but no `focus-visible`. `<ul>` lacked `role="list"` (Safari quirk). No heading <-> list association.                   | Added focus rings, `role="list"`, `aria-labelledby` via slugified id.                                                  |
| `Footer.tsx` (landmarks)         | No landmark around the link columns.                                                                                                      | Wrapped in `<nav aria-label="Footer">` and added explicit `role="contentinfo"` on the footer.                          |
| `EmiratesGrid.tsx` (semantics)   | Plain `<div>` grid of cards — no list semantics.                                                                                          | Promoted to `<ul role="list">` over `<li>`s with `aria-labelledby`.                                                    |
| `EmirateCard.tsx`                | Decorative red bar not marked `aria-hidden`.                                                                                              | Added `aria-hidden="true"`.                                                                                            |
| `FooterBottomBar.tsx`            | `sm:ml-2` (RTL-unsafe). Hardcoded date with no `<time>`.                                                                                  | `sm:ms-2`, wrapped date in `<time dateTime>`.                                                                          |
| `Footer.tsx` (outer grid)        | `grid-cols-1 gap-10` made the four link sections stack single-file on mobile, wasting horizontal space.                                   | `grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6` — link sections lay out 2x2 on mobile, six columns on lg.                |
| `EmiratesGrid.tsx` (mobile span) | Was a sibling of the four FooterColumns inside the outer grid; in a 2-col mobile grid it would have squeezed into one of the two columns. | Added `col-span-2` so it sits as a full-width row below the 2x2 mobile grid; `lg:col-span-2` keeps the desktop layout. |

Each fix is a one-liner once you know what to look for. The point of this skill is to make sure the issues never appear in new code.

## Responsive-grid defaults

A general principle that fell out of the Footer audit: **`grid-cols-1` is rarely the right mobile default for a multi-section layout.** A footer with four narrow link columns should be at least 2-up on mobile so the page isn't a tall single-file list.

- **Link / menu columns** -> `grid-cols-2 lg:grid-cols-N` as the default. Use `col-span-2` on any section that's wider than a single mobile column (cards, image-heavy promo, the EmiratesGrid).
- **Use `gap-x-*` and `gap-y-*` separately** when mobile horizontal spacing should differ from vertical. `gap-x-6 gap-y-10` keeps rows generously spaced while keeping side-by-side columns from getting crammed.
- **Card grids** -> `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` is fine for full-width cards. Tight row-grids (sector pills, social icons, metric cards) start at `grid-cols-2` or higher even at the smallest width.
- **`lg` breakpoint boundary** -> desktop and mobile UIs must be mutually exclusive at the breakpoint; use `hidden lg:flex` and `lg:hidden` rather than mixing both representations of the same content into the same DOM.

## When to use the Footer pattern

Use this layout pattern as a starting point for any chrome that:

- Sits below or alongside main content as supporting navigation/info.
- Is server-renderable (no interaction state).
- Has multiple parallel link/info sections that should align as a grid.
- Needs landmarks for screen-reader navigation.

Sub-footer sections (compliance bars, cookie strips, locale switchers) usually compose into the existing `FooterBottomBar.tsx` rather than being added as new top-level grid columns.
