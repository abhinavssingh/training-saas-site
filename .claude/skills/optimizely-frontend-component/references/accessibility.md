# Accessibility Checklist

Every interactive component must pass every item below before it ships.

## Native semantics first

- **Buttons that perform actions** → `<button type="button">`. Always include `type="button"` so the default `submit` doesn't accidentally trigger forms.
- **Navigation** → `<a>` or `next/link`. Never `onClick` on a `<div>`.
- **Lists** → `<ul role="list">` with `<li>` children. The explicit `role="list"` keeps Safari announcing it as a list when CSS removes the default list-style. This was the bug fix in `FooterColumn.tsx` and `EmiratesGrid.tsx`.
- **Footer landmark** → `<footer role="contentinfo">` (the role is implicit but writing it explicitly survives nested layouts in App Router).
- **External links** → `target="_blank" rel="noopener noreferrer"`. The Footer's social icons opted into this when they became real links.

## Visible focus

Every interactive element gets a visible focus ring. Default to:

```
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500
```

Replace `amber-500` with the design-system equivalent if a different palette is in play.

**Never** strip outlines without a replacement (`outline-none` without a `focus-visible:` ring is a hard fail).

This was the second-most-common bug in the Footer audit — many `<Link>`s in `FooterColumn.tsx` had hover styles but zero focus styles, making the whole footer invisible to keyboard users.

## ARIA wiring on toggles

If you're not using a Headless UI primitive, you have to wire ARIA yourself on any expand/collapse trigger:

```tsx
<button type="button" onClick={onToggle} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
  {open ? <CloseIcon /> : <MenuIcon />}
</button>
```

The `aria-controls` value must match the `id` on the panel it controls. The `aria-label` must change with state when there's no visible text. The Header's `HeaderAi.tsx` does all three.

If you ARE using a Headless UI primitive, this is wired for you — don't add redundant ARIA attributes.

## Heading and list association

Use `aria-labelledby` to tie a list to its heading. This makes the heading announce together with the list when a screen-reader user navigates by list:

```tsx
<h3 id="footer-col-the-ministry">The Ministry</h3>
<ul role="list" aria-labelledby="footer-col-the-ministry">...</ul>
```

`FooterColumn.tsx` slugifies the column title into an id automatically:

```tsx
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
const headingId = `footer-col-${slugify(title)}`;
```

## Group multi-button controls

Pairs or rows of buttons that work as a single conceptual control get `role="group" aria-label="..."`:

```tsx
<span role="group" aria-label="Language" className="flex items-center gap-2">
  <button aria-pressed={lang === 'en'}>EN</button>
  <span aria-hidden="true">|</span>
  <button aria-pressed={lang === 'ar'}>AR</button>
</span>
```

## Decorative content

Anything purely decorative gets `aria-hidden="true"` so screen readers don't speak it:

- Decorative SVGs.
- Standalone visual flourishes (the red bar in `EmirateCard.tsx`).
- Punctuation separators between buttons (the `|` between EN and AR).

A decorative SVG never gets `<title>`. A meaningful icon gets `<title>` AND a wrapping element with an accessible name.

## Lists with semantic count

When a list has a meaningful count (8 emirates, 4 social platforms), structure it as a real list so screen-readers announce "list of 8 items":

```tsx
<ul role="list" aria-label="Social media" className="flex items-center gap-3">
  {socialLinks.map(link => (
    <li key={link.href}>
      <a href={link.href} aria-label={link.label} ...>...</a>
    </li>
  ))}
</ul>
```

This was the third Footer fix. Before, the social icons were `<span>` siblings — screen readers heard four meaningless tokens with no list context.

## Don't trap focus in non-modal popovers

Headless UI's `Popover` does the right thing — focus moves into the panel on open and back to the button on close, but Tab still cycles past the panel into the rest of the page. Don't add a `FocusTrap` around it. Only `Dialog` should trap focus.

## Time and machine semantics

When you render a date or time, wrap it in `<time dateTime="ISO">`:

```tsx
<time dateTime="2026-04-22T09:07">22/04/2026, 09:07</time>
```

Browsers, screen readers, and search engines all benefit. The Footer's "Last updated" line uses this pattern.

## Manual verification

Before considering any layout/UI component done, manually verify:

1. **Tab through every interactive surface.** The focus ring must always be visible. Esc must close every overlay. Click-outside must close every overlay.
2. **Inspect the announced output.** Use VoiceOver / NVDA / Narrator on at least one path. Headings, lists, and group boundaries should be announced correctly.
3. **Check at the breakpoint boundary.** At `lg` width, the desktop and mobile UIs must be mutually exclusive — no double-rendering of the same content.
