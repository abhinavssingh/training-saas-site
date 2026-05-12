'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from 'next/link';
import MegaMenu from './MegaMenu';

type MenuItem = {
  label?: string | null;
  href?: string | null;
  children?: MenuItem[] | null;
};

export default function MenuItemDesktop({ item }: { item?: MenuItem | null }) {
  const linkClasses =
    'rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500';

  // ✅ Hard guard: nothing usable
  if (!item || !item.label) {
    return null;
  }

  const children = item.children ?? [];
  const hasChildren = Array.isArray(children) && children.length > 0;

  // ✅ Leaf node (safe Link render)
  if (!hasChildren && item.href) {
    return (
      <Link href={item.href} className={linkClasses}>
        {item.label}
      </Link>
    );
  }

  // ✅ Fallback: no href & no children → render nothing
  if (!hasChildren) {
    return null;
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
            className="z-50 w-screen max-w-3xl rounded-xl border border-neutral-200 bg-white shadow-xl ring-1 ring-black/5 transition duration-150 ease-out
            data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            {/* ✅ MegaMenu always receives valid data */}
            <MegaMenu item={{ ...item, children }} onNavigate={() => close()} />
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
