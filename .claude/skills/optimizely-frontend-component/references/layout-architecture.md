# Layout Architecture — Annotated Walkthrough

This document explains **how layout is defined, expressed, and rendered** using Display Templates and Tailwind mappings in Optimizely SaaS CMS.

## 1. Layout Mental Model

**Layout intent lives in Display Templates. Rendering behavior lives in React.**

The system is layered:

```
Section (container intent)
└─ Row (distribution intent)
   └─ Column (width / visibility intent)
      └─ Element (content)
```

## 2. Section‑Level Layout

Sections define:

- Outer spacing
- Background / color scheme
- Container width constraints

Example semantic layout mappings:

```ts
export const layoutClasses = {
  full: 'w-full',
  half: 'max-w-[50%] mx-auto',
  oneThird: 'max-w-[33.333333%] mx-auto',
  twoThirds: 'max-w-[66.666667%] mx-auto',
  oneQuarter: 'max-w-[25%] mx-auto',
  oneFifth: 'max-w-[20%] mx-auto',
  oneSixth: 'max-w-[16.666667%] mx-auto',
} as const;
```

## 3. Row‑Level Layout (System Element)

Rows are system‑managed and control **column distribution** using Grid or Flex.

```ts
export const rowLayoutClasses = {
  single: 'grid-cols-1',
  half: 'grid-cols-1 lg:grid-cols-2',
  twoThirds: 'grid-cols-[2fr_1fr]',
  oneThird: 'grid-cols-[1fr_2fr]',
  oneQuarter: 'grid-cols-1 lg:grid-cols-4',
  oneFifth: 'grid-cols-1 lg:grid-cols-5',
  oneSixth: 'grid-cols-1 lg:grid-cols-6',
} as const;
```

**Rules**

- Rows never compute width
- Rows never inspect child count
- Rows apply layout once, declaratively

## 4. Column‑Level Layout (System Element)

Columns:

- Are system elements
- Accept width intent as props
- Never calculate layout

```ts
export const columnWidthClasses = {
  full: 'w-full',
  half: 'w-full lg:basis-1/2',
  oneThird: 'w-full lg:basis-1/3',
  twoThirds: 'w-full lg:basis-2/3',
  oneQuarter: 'w-full lg:basis-1/4',
  oneFifth: 'w-full lg:basis-1/5',
  oneSixth: 'w-full lg:basis-1/6',
} as const;
```

## 5. Deprecated Layout Pattern

The following pattern is permanently deprecated:

```ts
function widthForColumn(index, total, layout) { ... }
```

**Why**

- Index‑dependent
- Breaks editor reordering
- Implicit behavior
- Non‑reusable

## 6. Hero‑Specific Layout Appendix

Hero sections often require **asymmetrical layouts**, but must still use the same semantic layout keys.

| Key       | Meaning                 |
| --------- | ----------------------- |
| twoThirds | Content 2/3 + Media 1/3 |
| oneThird  | Media 1/3 + Content 2/3 |
| half      | Equal split             |
| single    | One column              |

**Application rule**

- Hero layout intent comes from its Display Template
- Column order defines content vs media
- Width assignment uses `columnWidthClasses`

## 7. Governance Rules

- CMS never stores Tailwind classes
- Display Templates define ratios, not scenarios
- Renderers map semantic keys to CSS
- System elements (Row / Column) must not be rewritten

## 8. Final Takeaway

If layout behavior requires logic, it does not belong in the CMS.
If layout intent is editorial, it belongs in a Display Template.
If it is visual, it belongs in shared Tailwind constants.
