'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from 'next/link';
import { MegaMenu } from './MegaMenu';

/**
 * Top-level desktop menu item.
 *
 * Items WITHOUT children render as a plain Link.
 * Items WITH children render as a Headless UI Popover whose panel is
 * always the MegaMenu layout — that way any category we add children
 * to in the future gets the same UI for free, regardless of how many
 * entries it has.
 *
 * Headless UI gives us click-outside, Esc, focus restoration, and ARIA
 * wiring out of the box. The transition is wired via the v2
 * `<PopoverPanel transition>` API — wrapping the panel in the legacy
 * `<Transition>` component breaks click-outside when combined with the
 * `anchor` prop, because the panel is rendered through Floating UI.
 */
export function MenuItemDesktop({ item }: { item: any }) {
  const linkClasses =
    'rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500';

  if (!item.children || item.children.length === 0) {
    return (
      <Link href={item.href} className={linkClasses}>
        {item.label}
      </Link>
    );
  }

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <PopoverButton
            className={`${linkClasses} inline-flex items-center gap-1 ${open ? 'text-black' : ''}`}
          >
            {item.label}
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </PopoverButton>

          <PopoverPanel
            transition
            anchor={{ to: 'bottom', gap: 8 }}
            className="z-50 w-screen max-w-3xl rounded-xl border border-neutral-200 bg-white shadow-xl ring-1 ring-black/5 transition duration-150 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <MegaMenu item={item} onNavigate={() => close()} />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
