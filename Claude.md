# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 frontend for Optimizely SaaS CMS using the Content JS SDK (`@optimizely/cms-sdk`). Deployed to Optimizely Frontend Hosting. Uses the App Router, React 19, Tailwind CSS 4, and TypeScript 5.

## Commands

```bash
npm run dev                  # Dev server with HTTPS (uses certificates/ dir)
npm run build                # Production build
npm run lint                 # ESLint (flat config, core-web-vitals + typescript)
npm run cms:login            # Authenticate with Optimizely CMS CLI
npm run cms:push-config      # Push content type definitions to CMS
npm run cms:push-config-force  # Force push (overwrites existing types)
```

Deploy via PowerShell: `.\deploy.ps1` (requires `OPTI_*` env vars in `.env`).

## Architecture

### SDK Initialization Flow

`src/optimizely.ts` is imported in the root layout and initializes three registries:

1. **Content Type Registry** — all content type definitions from `src/content-types/`
2. **Display Template Registry** — visual display options from `src/display-templates/`
3. **React Component Registry** — maps content type keys to React components

Every new content type requires registration in all three places plus `optimizely.config.mjs`.

### Content Routing

- `src/app/[...slug]/page.tsx` — Dynamic catch-all that fetches CMS content by URL path via `GraphClient.getContentByPath()` and renders with `<OptimizelyComponent>`
- `src/app/preview/page.tsx` — Visual Builder preview route for in-context editing
- `src/app/page.tsx` — Root `/` redirects to `/en`

### Content Type Definitions (`src/content-types/`)

Each file exports a `contentType()` call with a `CT` suffix (e.g., `CardBlockCT`). Two base types:

- `_page` — Page types (e.g., `ArticlePage`)
- `_component` — Blocks/elements with composition behaviors:
  - `sectionEnabled` — Can be placed in Visual Builder sections
  - `elementEnabled` — Can be placed as inline elements (restricted property types: no arrays with content, no component/json properties)

Content types are also registered as file paths (strings) in `optimizely.config.mjs` for the CMS CLI.

### Component Structure (`src/components/`)

Components are organized by their CMS role:

- `pages/` — Page type components
- `blocks/` — Reusable block components
- `elements/` — Atomic element components
- `experiences/` — Visual Builder wrappers (`BlankExperience`, `BlankSection`)
- `layout/` — Header, Footer, Logo

Barrel exports in `src/components/index.ts` must match content type keys used in `optimizely.ts` resolver.

### Component Pattern

```typescript
import { ContentProps  } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

type Props = {
  content: ContentProps <typeof SomeContentTypeCT>;
  displaySettings?: ContentProps <typeof SomeDisplayTemplate>;
};

export default function MyComponent({ content, displaySettings }: Props) {
  const { pa, src } = getPreviewUtils(opti);
  // pa('propertyName') — adds preview attributes for Visual Builder editing
  // src(content.image) — returns optimized image URL from CMS CDN
  return <div {...pa('title')}>{content.title}</div>;
}
```

### Experience Pattern

```typescript
import { BlankExperienceContentType, ContentProps } from '@optimizely/cms-sdk';
import {
  ComponentContainerProps,
  OptimizelyComposition,
  getPreviewUtils,
} from '@optimizely/cms-sdk/react/server';

type Props = {
  content: ContentProps<typeof BlankExperienceContentType>;
};

function ComponentWrapper({ children, node }: ComponentContainerProps) {
  const { pa } = getPreviewUtils(node);
  return <div className="mb-8" {...pa(node)}>{children}</div>;
}

export default function BlankExperience({ content }: Props) {
  return (
    <main className="blank-experience">
      <OptimizelyComposition
        nodes={content.composition?.nodes ?? []}
        ComponentWrapper={ComponentWrapper}
      />
    </main>
  );
}
```

### Display Templates vs Content Type Properties

Display templates (`src/display-templates/`) define **visual styling options** (alignment, heading level) shown in the CMS sidebar. Semantic data belongs in content type properties, not display templates.

## Frontend Component Conventions

Anything under `src/components/layout/**` (Header, Footer, Sidebar, Drawer) and any new interactive UI primitive (dropdown, mega menu, dialog, popover, disclosure, tabs, listbox, combobox, language switcher) MUST follow the conventions documented in `.claude/skills/optimizely-frontend-component/`. Read that skill before authoring or refactoring such components — it is the canonical source of truth.

The Header at `src/components/layout/Header/` and Footer at `src/components/layout/Footer/` are the reference implementations; mirror their structure when in doubt.

### Skill structure

`SKILL.md` is the orchestrator — a thin entry point that lists principles and points at topical references. Detail lives in `references/`:

- `references/file-layout.md` — Folder structure, data colocation, server-vs-client split, naming, TypeScript conventions.
- `references/headless-ui.md` — Primitive lookup table, v2 specifics, annotated examples for Popover and Disclosure.
- `references/accessibility.md` — A11y checklist with rationale and code patterns for each item.
- `references/rtl.md` — RTL principles, logical-property mapping, `useDocumentLanguage` hook.
- `references/mega-menu-pattern.md` — Schema and adaptive-layout rules; how to add a new category with zero component edits.
- `references/header-reference.md` — Annotated walkthrough of the Header (state-owning shell, Headless UI, RTL toggle, mega menu, mobile drawer); the Header refactor fix log.
- `references/footer-reference.md` — Annotated walkthrough of the Footer (server-rendered, content-info landmark, link grid, social icons); the Footer audit fix log; responsive-grid defaults.
- `references/troubleshooting.md` — Common bugs (click-outside, RTL mirror, span-as-link, focus rings, hydration, file truncation) and how to fix them.

For most tasks, read `SKILL.md` first, then load the references it points to as needed.

### Hard rules (summary)

1. **Modular file layout.** One concern per file under `src/components/layout/<Feature>/`. Subcomponents live next to the parent. Static data sits in `<Feature>.Data.ts` with an exported TypeScript interface — components consume the interface, never an implicit shape.

2. **Headless UI by default.** Use `@headlessui/react` for every interactive primitive that has an equivalent: `Popover`/`PopoverGroup` for dropdowns and mega menus, `Disclosure` for mobile accordions, `Menu` for action lists, `Dialog` for modals, `Listbox` / `Combobox` for selects, `TabGroup` for tabs, `Switch` for toggles. Do NOT roll bespoke open/close state machines.

3. **Headless UI v2 specifics.** Use the `transition` prop directly on `PopoverPanel` together with `data-[closed]:*` Tailwind variants. Do NOT wrap a panel that uses `anchor` in legacy `<Transition as={Fragment}>` — outside-click silently breaks. Use the `anchor` prop (`{ to: "bottom start", gap: 8 }`) instead of hand-positioning with `left-0`/`top-full`. Always close the popover when an internal link is clicked, via the render-prop `close` argument. Wrap sibling popovers in `PopoverGroup`.

4. **Accessibility is part of "done."** Native semantics first (`<button type="button">`, `<a>`/`Link` for navigation, never click-handlers on `<div>`). Visible focus rings (`focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500` or design-system equivalent). `aria-expanded` + `aria-controls` + dynamic `aria-label` on toggles that aren't using a Headless UI primitive. `<ul role="list">` for lists. Decorative SVG = `aria-hidden="true"`.

5. **RTL by default.** Use logical Tailwind classes — `start-*`/`end-*`, `ms-*`/`me-*`, `ps-*`/`pe-*`, `border-s-*`/`border-e-*`, `rounded-s-*`/`rounded-e-*`, `text-start`/`text-end`. Never `left-*`/`right-*`/`ml-*`/`mr-*` in new code. For directional things without a logical equivalent (transforms, rotations), use the `rtl:` variant (`rtl:rotate-180`). The single source of truth for direction is `<html dir>` — set once via the language toggle (`useDocumentLanguage` hook in `HeaderTopBar.tsx`); never hand-write `dir="rtl"` on individual elements.

6. **Open-for-extension data shapes.** Schemas should make new entries render correctly with zero component edits. Don't gate features on boolean flags (`mega: true`) when the presence of richer data already conveys intent — render the rich UI when `children` is present, render the promo when `featured` is present.

7. **Server-first, client when needed.** Add `"use client"` only when the file uses hooks, event handlers, refs, or browser-only APIs (`document`, `window`). Pure markup wrappers stay as Server Components.

### Authoring checklist

Before considering any layout/UI component done:

1. File layout follows `src/components/layout/<Feature>/` with one concern per file; static data is colocated in `<Feature>.Data.ts` with an exported interface.
2. Every interactive primitive uses Headless UI; no hand-rolled open/close state for things HUI covers.
3. `npm run lint` is clean; `npx tsc --noEmit` is clean.
4. Tab through every interactive surface — focus is always visible, Esc closes overlays, click-outside closes overlays.
5. Set `<html dir="rtl">` in DevTools and confirm the layout mirrors with no overlap, no off-canvas, and direction-implying icons (arrows) flip while neutral icons (chevrons-down) stay.
6. At the `lg` breakpoint boundary, desktop and mobile UIs are mutually exclusive.
7. Adding a new entry to the data file renders correctly with zero component edits.

## Adding a New Content Type (Checklist)

1. Create `src/content-types/NewType.ts` — define with `contentType()`, export as `NewTypeCT`
2. Export from `src/content-types/index.ts`
3. Create component in `src/components/{pages,blocks,elements}/NewType.tsx`
4. Export from `src/components/index.ts`
5. Add to resolver map in `src/optimizely.ts`
6. Add file path to `optimizely.config.mjs` components array
7. Run `npm run cms:push-config` to sync to CMS

## Environment Variables

Copy `.env.template` to `.env`. Key variables:

- `OPTIMIZELY_GRAPH_SINGLE_KEY` — Required for content fetching
- `OPTIMIZELY_CMS_URL` — CMS instance URL
- `OPTIMIZELY_GRAPH_GATEWAY` — Graph endpoint (defaults to `https://cg.optimizely.com`); handled by `src/lib/config.ts` `getGraphGatewayUrl()` which accounts for differences between local dev and Frontend Hosting runtime

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Image Domains

Remote images allowed from `*.cms.optimizely.com` and `cdn.optimizely.com` (configured in `next.config.ts`).
