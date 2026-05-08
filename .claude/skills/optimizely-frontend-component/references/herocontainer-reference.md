# Hero — Annotated Walkthrough

The Hero at `src/components/containers/HeroContainerSection/` is the canonical example of a **structural Section composed of Rows, Columns, and Elements** in the Optimizely SaaS CMS architecture. It is authored entirely via Visual Builder drag‑and‑drop, while layout intelligence lives exclusively in code.

Nothing in the Hero requires client-side state; it is fully server-renderable and personalization-safe at the Experience level.

---

## Conceptual structure

```
HeroContainerSection            ← _section, structural unit
└─ Row                          ← layout shell
├─ Column (content)
│   ├─ HeroEyebrowElement
│   ├─ HeroHeadingElement
│   ├─ RichTextElement
│   ├─ CallToActionElement (primary)
│   ├─ CallToActionElement (secondary)
│   └─ HeroStatsElement
└─ Column (media)
└─ HeroMediaCardElement
```

**Key principle**:  
Authors compose _what_ appears and _in what order_; the code determines _how it lays out_.

---

## What each file demonstrates

### `HeroContainerSection.tsx`

Top-level Section renderer. Receives rendered `Row` children from Optimizely and applies the section’s layout display template.

Demonstrates:

- Section-level ownership of layout
- No awareness of specific elements (fully composable)
- Server Component by default

---

### `HeroContainerSectionDisplayTemplate.ts`

Defines the **layout preset** for the entire section.

layout:

- contentMedia2to1 (default)
- mediaContent1to2
- equal
- single

Demonstrates:

- One author choice → coordinated column widths
- No per-column configuration exposed to editors
- Predictable Tailwind output

---

### `Row.tsx`

Receives children that are already `Column` components. Counts them and injects layout-derived sizing.

Key logic:

- `React.Children.count(children)`
- `widthForColumn(index, total, layout)`
- `cloneElement(child, { heroWidth })`

Demonstrates:

- Section-driven column math
- Layout injection without leaking CMS concerns into Columns
- No hard-coded assumptions about column count

---

### `Column.tsx`

Applies the injected `heroWidth` as Tailwind utility classes.

Examples:

- `lg:basis-2/3`
- `lg:basis-1/3`
- `lg:basis-1/2`
- `w-full`

Demonstrates:

- Columns are layout-agnostic
- Tailwind class derivation from a single prop
- RTL-safe logical utilities only

---

### `HeroEyebrowElement.tsx`

Small pill badge at the top of the content column.

Fields:

- `text`
- `emoji` (optional)

Demonstrates:

- Inline elements used for identity / personalization cues
- Decorative emoji treated as text, not imagery
- Badge semantics without heading inflation

---

### `HeroHeadingElement.tsx`

Renders the main hero heading with optional accent styling.

Fields:

- `heading` (string)
- `accentText` (optional substring)

Behavior:

- Renderer splits the heading string at `accentText`
- Only the matched substring is wrapped in an accent-colored `<span>`

Demonstrates:

- Accent styling without rich-text complexity
- Predictable typography
- Headings stay real headings (`<h1>`/`<h2>`), not styled paragraphs

---

### `RichTextElement`

Reused unchanged for the hero description.

Demonstrates:

- Strong reuse discipline
- Rich text kept where authors genuinely need formatting
- No hero-specific fork

---

### `CallToActionElement` (primary & secondary)

Two instances of the same element placed in the column.

Configuration:

- Primary → `style=button`, `color=dark`
- Secondary → `style=link`

Demonstrates:

- Behavioral reuse over duplication
- Layout through composition, not branching code
- The CMS controls intent; the component controls output

---

### `HeroStatsElement.tsx`

Inline stats strip rendered below the CTAs.

Fields:

- `values: string[]`
- `labels: string[]`

Behavior:

- Arrays paired by index
- Maximum of 6 entries enforced

Demonstrates:

- Working within `elementEnabled` constraints
- Avoiding a separate `HeroStatItem` content type
- One Element → one visual unit

Trade-off:

- Authors must keep arrays in sync
- Gain: zero additional content-type round-trips

---

### `HeroMediaCardElement.tsx`

Right-side media container.

Fields:

- `image`
- `videoUrl` (optional)
- `badgePills[]`

Behavior:

- Image is primary visual
- Optional play button overlays when `videoUrl` exists
- Badge pills rendered as a positioned list

Demonstrates:

- Optional enhancement without branching layouts
- Media responsibility isolated to one element
- Accessible play affordance with real ARIA labels

---

## Accessibility decisions worth noting

- All layout spacing uses logical properties (`gap-*`, `ms-*`, `me-*`)
- Decorative SVGs and flourishes use `aria-hidden="true"`
- Play button uses real `<a>` with:
  - Accessible name (`aria-label`)
  - `focus-visible` ring
- Badge stacks are real lists: `<ul role="list">`
- No content duplication across breakpoints (`hidden lg:*` used correctly)

---

## Why `_section` (not `_component`)

The Hero:

- Owns rows and columns
- Accepts arbitrary elements
- Is placed directly onto Experience pages

This makes `_section` the correct base type, aligning it with `BlankSection` and other structural units.

---

## Authoring experience in Visual Builder

Authors can:

- Drag elements in any order within a column
- Move elements between columns
- Add/remove columns freely
- Switch layouts via a single section setting

Authors cannot:

- Create mismatched column widths
- Break responsive layout
- Introduce directionality bugs

---

## Pushing to CMS

```bash
npm run cms:push-config-force
--force is required for the initial registration of new content types and their display templates.
```
