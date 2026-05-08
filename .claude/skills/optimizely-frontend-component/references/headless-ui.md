# Headless UI Patterns

`@headlessui/react` v2 is the default primitive for any interactive UI in this codebase. It's already installed (`package.json`). Use it instead of rolling your own open/close state machines.

## Why Headless UI

- Accessible by default — keyboard, focus management, ARIA, click-outside, Esc dismissal all wired correctly.
- Composable — render-prop API gives you the open/close state without owning it.
- Designed for Tailwind — `data-[open]` / `data-[closed]` attributes drive transitions via CSS variants.

## Primitive lookup table

| You need                                       | Use                                                       |
| ---------------------------------------------- | --------------------------------------------------------- |
| Click-to-open panel with arbitrary content     | `Popover` + `PopoverButton` + `PopoverPanel`              |
| Group of popovers that close each other        | wrap in `PopoverGroup`                                    |
| Expand/collapse toggle (mobile accordion, FAQ) | `Disclosure` + `DisclosureButton` + `DisclosurePanel`     |
| List of menu items (link list, action list)    | `Menu` + `MenuButton` + `MenuItems` + `MenuItem`          |
| Modal                                          | `Dialog` + `DialogPanel` + `DialogTitle`                  |
| Single-select dropdown                         | `Listbox`                                                 |
| Searchable single/multi select                 | `Combobox`                                                |
| Toggle switch                                  | `Switch`                                                  |
| Tabs                                           | `TabGroup` + `TabList` + `Tab` + `TabPanels` + `TabPanel` |

If a Headless UI primitive exists for what you're building, use it. Don't reach for `useState` + `setTimeout` to manage open/close.

## v2 specifics — read carefully

These are the patterns that have caused real bugs in this codebase. Follow them exactly.

### Use the `transition` prop on the panel — never legacy `<Transition>` with `anchor`

If you wrap a `PopoverPanel` that uses the `anchor` prop in `<Transition as={Fragment}>`, **outside-click silently breaks**. The legacy wrapper renders outside the Popover's outside-click tree, and `anchor` rendering through Floating UI puts the panel further out of reach.

**WRONG — outside-click stops working:**

```tsx
<Transition as={Fragment} ...>
  <PopoverPanel anchor={...}>...</PopoverPanel>
</Transition>
```

**CORRECT — drive transitions via the panel's `transition` prop and `data-[closed]:*` Tailwind variants:**

```tsx
<PopoverPanel transition anchor={{ to: 'bottom', gap: 8 }} className="transition duration-150 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0 ...">
  <MegaMenu item={item} onNavigate={() => close()} />
</PopoverPanel>
```

### Use the `anchor` prop instead of hand-positioning

Don't write `left-0`, `right-0`, `top-full`, `mt-1` to position popover panels. Use `anchor`. It uses Floating UI under the hood, supports `bottom start`, `bottom end`, `top`, `right end`, etc., and respects RTL automatically.

```tsx
<PopoverPanel anchor={{ to: 'bottom start', gap: 8 }} />
```

### Always close the popover when an internal link is clicked

Use the render-prop `close` argument. Otherwise, navigation can leave the panel rendered on screen during the route transition.

```tsx
<Popover>
  {({ close }) => (
    <PopoverPanel ...>
      <Link href="/x" onClick={() => close()}>...</Link>
    </PopoverPanel>
  )}
</Popover>
```

### Wrap sibling popovers in `PopoverGroup`

Opens one closes the others. Screen readers see them as a coordinated group.

```tsx
<PopoverGroup as="nav" aria-label="Primary" className="hidden items-center gap-1 lg:flex">
  {items.map((i) => (
    <MenuItemDesktop key={i.href} item={i} />
  ))}
</PopoverGroup>
```

## Annotated example: nav item with mega menu

The full pattern, drawn from `src/components/layout/Header/MenuItemDesktop.tsx`:

```tsx
'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from 'next/link';
import { MenuItem } from './Header.Data';
import { MegaMenu } from './MegaMenu';

export function MenuItemDesktop({ item }: { item: MenuItem }) {
  // Items without children render as a plain Link.
  if (!item.children || item.children.length === 0) {
    return (
      <Link href={item.href} className="...">
        {item.label}
      </Link>
    );
  }

  // Items with children render as a Headless UI Popover.
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <PopoverButton className={`... ${open ? 'text-black' : ''}`}>
            {item.label}
            <ChevronDown className={open ? 'rotate-180' : ''} />
          </PopoverButton>

          <PopoverPanel transition anchor={{ to: 'bottom', gap: 8 }} className="z-50 w-screen max-w-3xl rounded-xl transition duration-150 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0 ...">
            <MegaMenu item={item} onNavigate={() => close()} />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
```

What this gives you for free:

- Esc closes the panel.
- Click-outside closes the panel.
- Tab from the button enters the panel, Shift-Tab back to the button.
- Arrow keys focus-cycle inside the panel where appropriate.
- `aria-expanded` / `aria-controls` / `aria-haspopup` are wired on the button.
- `id` linkage between button and panel is automatic.
- Focus is restored to the button on close.

## Annotated example: mobile accordion

Mobile nav items use `Disclosure` instead of a custom `useState` toggle. Drawn from `src/components/layout/Header/MenuItemMobile.tsx`:

```tsx
<Disclosure as="div" className="border-b border-neutral-100 last:border-b-0">
  {({ open }) => (
    <>
      <DisclosureButton className="flex w-full items-center justify-between ...">
        <span>{item.label}</span>
        <Chevron className={open ? 'rotate-180' : ''} />
      </DisclosureButton>

      <DisclosurePanel as="ul" role="list" className="ms-4 border-s-2 border-amber-400 bg-neutral-50">
        {item.children!.map((child) => (
          <li key={child.href}>...</li>
        ))}
      </DisclosurePanel>
    </>
  )}
</Disclosure>
```

`DisclosureButton` exposes `aria-expanded` automatically. The `as="ul" role="list"` on the panel makes the screen-reader announcement match the visual structure.

## Tailwind 4 + Headless UI

- Drive enter/leave transitions from `data-[open]` / `data-[closed]` — don't compute classes from React state.
- `group-hover:*`, `peer-focus:*`, `rtl:*`, `dark:*` variants compose with `data-[closed]:*` cleanly.
- Headless UI sets `data-headlessui-state="open"` etc. on the rendered DOM; you can target it with `data-[headlessui-state~='open']:...` if needed, but the panel's own `data-open` / `data-closed` is usually enough.
