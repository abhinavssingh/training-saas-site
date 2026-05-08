# Content Resolution — Annotated Walkthrough

This document explains **how content is resolved, fetched, and rendered** in a Next.js + Optimizely SaaS CMS stack. It focuses on routing, Graph resolution, Experience rendering, structural composition, and the contract between CMS content and React components.

> **Cross‑reference:** For how layout intent becomes concrete column widths and spacing, see
> **`layout-architecture.md`** (Layout Architecture — Annotated Walkthrough).

---

## 1. High‑Level Content Resolution Flow

```
Next.js App Router
├─ app/layout.tsx               ← Global chrome (Header / Footer)
├─ app/[...slug]/page.tsx       ← Route → Content resolver
│  └─ <OptimizelyComponent />   ← Universal renderer
│     └─ Experience Renderer
│        ├─ Experience components
│        ├─ Sections
│        ├─ OptimizelyGrid
│        ├─ Rows (system)
│        ├─ Columns (system)
│        └─ Elements (leaf)
```

**Key ideas**

- Next.js resolves the route and fetches content via Optimizely Graph
- `OptimizelyComponent` selects the correct React renderer
- Experiences compose Sections
- Sections delegate structural resolution to `OptimizelyGrid`

---

## 2. `page.tsx` — Route‑to‑Content Resolver

### Responsibilities

`page.tsx` is responsible for:

- Resolving a URL slug into CMS content
- Fetching content from Optimizely Graph
- Passing the resolved content into the Optimizely rendering system

Example pattern:

```ts
const content = await client.getContentByPath(`/${slug.join('/')}/`);
return <OptimizelyComponent content={content} />;
```

**Characteristics**

- Uses GraphClient with a single‑key gateway
- Resolves by path (SEO‑friendly)
- Always returns **one root CMS object** (Page or Experience)

---

## 3. `layout.tsx` — Global Application Layout

### Role

Defines application‑wide chrome and initializes CMS registries.

**Responsibilities**

- Import Optimizely registries (`import '@/optimizely'`)
- Render Header / Footer
- Apply fonts and global styling

**Guarantees**

- No CMS logic lives here
- Layout never changes per page
- CMS content flows only through `<main>`

---

## 4. Experience Layer

### What is an Experience?

An **Experience** is a CMS‑level container that:

- Owns personalization and experimentation
- Applies global decoration (backgrounds, themes)
- Composes multiple Sections

### Rendering pattern

```tsx
<OptimizelyComposition nodes={content.composition?.nodes ?? []} ComponentWrapper={ComponentWrapper} />
```

**Key points**

- Experiences never manage grids
- Experiences never manage column widths
- Experiences provide _context_, not layout

---

## 5. OptimizelyGrid — Structural Composition Engine

### What is `OptimizelyGrid`?

`OptimizelyGrid` (often used via `OptimizelyGridSection`) is a **system‑level structural resolver** provided by the Optimizely React SDK. Its job is to translate **CMS composition nodes** into a deterministic React tree.

It is **not** a visual grid. It does **not** style anything.

```
CMS composition JSON
└─ nodes[]
   ├─ row
   │  ├─ column
   │  │  ├─ element
   │  │  └─ element
   │  └─ column
   └─ row
```

Becomes:

```
<Row>
  <Column>
    <Element />
    <Element />
  </Column>
  <Column>
    <Element />
  </Column>
</Row>
```

---

### Canonical usage pattern

```tsx
<OptimizelyGridSection nodes={content.nodes} row={(props) => <Row {...props} layout={layout} vAlign={vAlign} />} column={Column} />
```

**Responsibility split**
| Layer | Responsibility |
|------|----------------|
| OptimizelyGrid | Traverse CMS structure |
| Row | Resolve layout intent |
| Column | Apply resolved width |
| Elements | Render content only |

---

### Data flow through OptimizelyGrid (real example)

#### CMS JSON

```json
{
  "type": "row",
  "displaySettings": [
    {
      "settings": { "layout": "twoThirds" }
    }
  ],
  "nodes": [
    {
      "type": "column",
      "nodes": [{ "type": "HeroHeadingElement" }]
    },
    {
      "type": "column",
      "nodes": [{ "type": "HeroMediaCardElement" }]
    }
  ]
}
```

#### Resolved React tree

```tsx
<Row layout="twoThirds">
  <Column layoutWidth="lg:basis-2/3">
    <HeroHeadingElement />
  </Column>
  <Column layoutWidth="lg:basis-1/3">
    <HeroMediaCardElement />
  </Column>
</Row>
```

Layout intent is resolved **once**, at the Row level. Columns stay dumb.

---

## 6. OptimizelyGrid vs Custom Grids (Diagram & Comparison)

### Diagram

```
OptimizelyGrid                         Custom Grid
───────────────────                  ───────────────────
CMS structure                        CMS structure
   ↓                                      ↓
OptimizelyGrid                     Custom mapping logic
   ↓                                      ↓
Row (system)                        Section inspects children
   ↓                                      ↓
Column (system)                    Column calculates layout
   ↓                                      ↓
Element                             Element
```

### Comparison

| Concern                  | OptimizelyGrid | Custom Grid         |
| ------------------------ | -------------- | ------------------- |
| Editor reordering        | ✅ Safe        | ❌ Risky            |
| Column count assumptions | ❌ None        | ✅ Often hard‑coded |
| Personalization safety   | ✅ High        | ❌ Fragile          |
| Layout logic location    | Row            | Mixed               |
| CMS preview parity       | ✅ Guaranteed  | ❌ Often broken     |

---

## 7. When **NOT** to use OptimizelyGrid

**Do NOT use OptimizelyGrid when:**

1. The layout is **purely presentational**
   - Example: a static promo band

2. The component has **no authorable structure**
   - No rows
   - No columns
   - No child element placement

3. You are building **application UI**, not CMS content
   - Dashboards
   - Wizards
   - Authenticated flows

4. The layout must be **algorithmic**
   - Masonry
   - Virtualized lists

In these cases, a plain React layout is correct.

---

## 8. Display Settings Access Pattern

### SDK Reality

`node.displaySettings` is always an **array**.

### Canonical access

```ts
const settings = node.displaySettings?.[0]?.settings;
const layout = settings?.layout ?? 'full';
```

This applies to:

- Experiences
- Sections
- Rows (system)
- Columns (system)
- Elements

---

## 9. Governance Rules

**Hard rules**

- CMS never stores Tailwind or CSS classes
- CMS content never drives layout directly
- Only Display Templates express layout intent

**Soft rules**

- Prefer Experiences for decoration
- Prefer Sections for structure
- Prefer Elements for content only

---

## 10. Final Summary

```
Next.js Route
→ Graph Content Resolver
→ OptimizelyComponent
→ Experience
→ Section
→ OptimizelyGrid
→ Row (system)
→ Column (system)
→ Element
```

If content resolution breaks, layouts never get a chance to render.
If grid resolution breaks, **CMS structure itself is compromised**.
