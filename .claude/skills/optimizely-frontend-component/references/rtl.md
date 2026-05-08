# RTL Support

The site exists in EN and AR. Every layout component must mirror correctly when `<html dir="rtl">` is set. Don't bolt RTL on later; build it in.

## The single source of truth

`<html dir>` and `<html lang>` set by the language toggle. **Never hand-write `dir="rtl"` on individual elements.**

## Logical Tailwind classes

Tailwind 4 supports CSS logical properties out of the box. Use them everywhere instead of directional ones.

| Avoid                          | Use                            | What it maps to                              |
| ------------------------------ | ------------------------------ | -------------------------------------------- |
| `left-0`, `right-0`            | `start-0`, `end-0`             | `inset-inline-start`, `inset-inline-end`     |
| `ml-2`, `mr-2`                 | `ms-2`, `me-2`                 | `margin-inline-start`, `margin-inline-end`   |
| `pl-4`, `pr-4`                 | `ps-4`, `pe-4`                 | `padding-inline-start`, `padding-inline-end` |
| `border-l`, `border-r`         | `border-s`, `border-e`         | `border-inline-start`, `border-inline-end`   |
| `border-l-2`, `border-r-2`     | `border-s-2`, `border-e-2`     | logical border width                         |
| `rounded-l-md`, `rounded-r-md` | `rounded-s-md`, `rounded-e-md` | logical border-radius                        |
| `text-left`, `text-right`      | `text-start`, `text-end`       | `text-align: start`/`end`                    |
| `float-left`, `float-right`    | `float-start`, `float-end`     | logical float                                |

`gap-*`, `space-y-*`, `space-x-*`, `mx-*`, `my-*`, `px-*`, `py-*`, `m-*`, `p-*`, `mt-*`, `mb-*`, `pt-*`, `pb-*` are all already direction-neutral — keep using them.

## When there's no logical equivalent

Some properties have no logical version (transforms, rotations, animations that imply direction). For those, use the `rtl:` Tailwind variant:

```tsx
<svg className="transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
```

The mega menu's "Read the report →" arrow does this — the chevron rotates 180° in RTL so it always points at the start-of-line direction the reader is moving toward.

## What to flip and what NOT to flip

| Element                                                  | Flip in RTL?                                  |
| -------------------------------------------------------- | --------------------------------------------- |
| Nav arrow / forward chevron / "next" button              | Yes — `rtl:rotate-180`                        |
| Down chevron on dropdowns                                | No — the dropdown still opens downward        |
| Decorative geometric flourishes                          | Usually not                                   |
| Logos, brand marks                                       | Never                                         |
| Numbers, dates, code, English text within Arabic content | Never (handled by the Unicode bidi algorithm) |

## The `useDocumentLanguage` hook

Wire the document direction once, in a top-level utility component. The Header's `HeaderTopBar.tsx` shows the canonical pattern:

```tsx
'use client';

import { useEffect, useState } from 'react';

type Lang = 'en' | 'ar';

function useDocumentLanguage(): [Lang, (next: Lang) => void] {
  const [lang, setLang] = useState<Lang>('en');

  // On mount, read whatever <html lang> already says (avoids hydration flicker
  // if the server rendered "ar").
  useEffect(() => {
    const current = document.documentElement.lang?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    setLang(current);
  }, []);

  const change = (next: Lang) => {
    setLang(next);
    const root = document.documentElement;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
  };

  return [lang, change];
}
```

Consumers call it like a normal `useState`:

```tsx
const [lang, setLang] = useDocumentLanguage();
// <button onClick={() => setLang("ar")} aria-pressed={lang === "ar"}>AR</button>
```

## Verification

Set `<html dir="rtl">` in DevTools. Confirm:

1. The layout mirrors with no overlap, no off-canvas elements.
2. Text aligns to the start (right edge in RTL).
3. Direction-implying icons (back arrows, forward arrows, "next" chevrons) flip via `rtl:rotate-180`.
4. Direction-neutral icons (down chevrons, X close icons, hamburger lines) **do not** flip.
5. Borders, paddings, margins all flip — `border-s-2` becomes a right-side border in RTL automatically.
6. Headless UI's `anchor` prop respects direction (`bottom start` becomes the right side of the trigger in RTL).

If something doesn't mirror, the most common cause is a directional class (`left-*`, `right-*`, `ml-*`, `mr-*`, `pl-*`, `pr-*`) that should be its logical equivalent.
