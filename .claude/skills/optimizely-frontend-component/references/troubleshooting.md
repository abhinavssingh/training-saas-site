# Troubleshooting

Common bugs, in roughly the order they tend to appear in this codebase.

## Click-outside doesn't close the popover

**Symptom:** Mega menu opens, but clicking outside it does nothing. Pressing Esc still works. Clicking the trigger button toggles it correctly.

**Cause:** The `PopoverPanel` is wrapped in legacy `<Transition as={Fragment}>` while also using the v2 `anchor` prop. With `anchor`, the panel renders through Floating UI; the legacy `<Transition>` wrapper sits outside the Popover's outside-click tree, so the click-outside handler never sees the panel.

**Fix:** Drop the wrapper. Use the `transition` prop on the panel directly with `data-[closed]:*` Tailwind variants:

```tsx
<PopoverPanel transition anchor={{ to: 'bottom', gap: 8 }} className="transition duration-150 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0 ...">
  ...
</PopoverPanel>
```

## Mega menu doesn't close on link click

**Symptom:** User clicks a link inside the mega menu, navigation happens, but the panel stays open during the route transition.

**Cause:** Forgot to call `close()` from the Popover's render-prop on link click.

**Fix:** Pass `close` down to the panel content and wire `onClick`:

```tsx
<Popover>
  {({ close }) => (
    <PopoverPanel ...>
      <MegaMenu item={item} onNavigate={() => close()} />
    </PopoverPanel>
  )}
</Popover>
```

`MegaMenu` then forwards `onNavigate` to every internal `<Link>`'s `onClick`.

## Layout doesn't mirror in RTL

**Symptom:** Set `<html dir="rtl">`, layout looks broken — overlapping elements, content off-canvas, accent borders on the wrong side.

**Cause:** Directional Tailwind classes (`left-*`, `right-*`, `ml-*`, `mr-*`, `pl-*`, `pr-*`, `border-l`, `border-r`, `rounded-l-*`, `rounded-r-*`, `text-left`, `text-right`).

**Fix:** Replace with logical equivalents (`start-*`, `end-*`, `ms-*`, `me-*`, `ps-*`, `pe-*`, `border-s`, `border-e`, `rounded-s-*`, `rounded-e-*`, `text-start`, `text-end`). See `references/rtl.md` for the full table.

A fast way to find them: `grep -rE '\b(left|right|ml|mr|pl|pr|border-l|border-r|rounded-l|rounded-r|text-left|text-right)-' src/components/layout/`.

## Tab stops are invisible

**Symptom:** Tab key advances focus, but you can't see where the focus is.

**Cause:** Component has hover styles but no `:focus-visible` styles. Or someone added `outline-none` and never replaced it.

**Fix:** Every interactive element needs:

```
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500
```

This was the largest single fix in the Footer audit — every link in `FooterColumn.tsx` was invisible to keyboard users until focus rings were added.

## Screen reader announces gibberish for icons

**Symptom:** Social icon row announces something like "x in ig y t" with no context.

**Cause:** The icon labels are abbreviations (`x`, `in`) shown as visible text. There's no `aria-label` providing the full platform name.

**Fix:** Replace text-as-icon with real SVG icons + `aria-label`:

```tsx
<a href={href} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="..." />
  </svg>
</a>
```

Don't put both visible text AND `aria-label` for icons — the SVG carries `aria-hidden="true"` and the link carries the full name.

## Span looks clickable but isn't

**Symptom:** Hover style on an element suggests it's a link, but clicking does nothing.

**Cause:** `<span>` or `<div>` with hover styles instead of `<a>` / `<Link>`.

**Fix:** Use the right element. If it navigates, it's an `<a>` / `next/link`. If it triggers an action, it's a `<button type="button">`. Never click-handlers on `<div>` / `<span>`.

This was `SocialIcons.tsx` before the Footer audit.

## List doesn't announce as a list

**Symptom:** Screen reader reads list items as separate paragraphs without "list of N items" framing.

**Cause:** Implicit list role is stripped by Safari when `list-style: none` is applied via CSS.

**Fix:** Add explicit `role="list"` to every `<ul>` you styled:

```tsx
<ul role="list" className="space-y-2">
  ...
</ul>
```

Both `FooterColumn.tsx` and `EmiratesGrid.tsx` got this fix.

## Heading not associated with its list

**Symptom:** Screen reader reads each footer column heading and list as if unrelated.

**Cause:** No programmatic association between `<h3>` and `<ul>`.

**Fix:** Give the heading a stable id and reference it from the list:

```tsx
<h3 id="footer-col-the-ministry">The Ministry</h3>
<ul role="list" aria-labelledby="footer-col-the-ministry">...</ul>
```

`FooterColumn.tsx` slugifies the title into the id.

## Date is a string, not a `<time>` element

**Symptom:** Date shows correctly but isn't machine-readable. Screen readers, browsers, and search engines can't parse it.

**Fix:** Wrap it:

```tsx
<time dateTime="2026-04-22T09:07">22/04/2026, 09:07</time>
```

`FooterBottomBar.tsx` does this for "Last updated".

## Mobile burger button has no announced purpose

**Symptom:** Screen reader reads the burger button as just "button" with no indication it controls a panel or what state that panel is in.

**Fix:** Wire all three:

```tsx
<button type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={onToggle}>
  {open ? <CloseIcon /> : <MenuIcon />}
</button>
```

The `aria-controls` value must match the `id` on the `<nav>` it controls.

## Headless UI gives a hydration warning

**Symptom:** "Hydration failed" or "did not match" warning involving Headless UI.

**Cause:** Either (a) a Headless UI primitive used in a Server Component without `"use client"`, or (b) `<html lang>` / `<html dir>` mismatched between server-render and the first client effect.

**Fix:**

- (a) Add `"use client"` to the file using the Headless UI primitive.
- (b) Read the existing `document.documentElement.lang` in `useEffect` before changing state, and don't write `dir`/`lang` unless they actually differ. The `useDocumentLanguage` hook in `HeaderTopBar.tsx` does this.

## Footer / link grid stacks single-file on mobile

**Symptom:** A multi-column section (footer link grid, card grid, side-by-side metrics) renders as a tall single column on mobile, wasting horizontal space, even though it has multiple narrow children.

**Cause:** The outer grid is `grid-cols-1` on mobile. That's the right default for full-width cards, but it's wrong for narrow link sections that comfortably fit two-up.

**Fix:** Make the mobile default match the content density. For a footer with four narrow link columns:

```tsx
<nav className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6">
  <FooterColumns />
  <EmiratesGrid />
</nav>
```

Then any section that's wider than a single mobile column gets `col-span-2`:

```tsx
<div className="col-span-2 lg:col-span-2">...EmiratesGrid...</div>
```

`gap-x-6 gap-y-10` lets you keep rows generously spaced while the side-by-side columns stay tight enough to not feel crammed at small widths.

This was the last Footer fix — the layout had perfect a11y and RTL support but was still visually wrong because mobile was stacking everything single-file.

## File got truncated on overwrite

**Symptom:** TypeScript errors like "JSX element 'div' has no corresponding closing tag" or "Unterminated string literal" after editing an existing file. The file's last bytes are partial.

**Cause:** The Edit/Write tool can leave trailing data when the new content is shorter than the old, especially on Windows-mounted filesystems.

**Fix:** Rewrite the file via bash heredoc instead:

```bash
cat > path/to/file.tsx << 'EOF'
...new content...
```

Or strip null bytes if that's the form the corruption took:

```bash
python3 -c "p='path'; d=open(p,'rb').read().replace(b'\x00',b''); open(p,'wb').write(d)"
```
