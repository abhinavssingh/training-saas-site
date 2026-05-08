'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Link from 'next/link';

export function MenuItemMobile({ item }: { item: any }) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block px-4 py-3 text-base text-neutral-800 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Disclosure as="div" className="border-b border-neutral-100 last:border-b-0">
      {({ open }) => (
        <>
          <DisclosureButton className="flex w-full items-center justify-between px-4 py-3 text-base text-neutral-800 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none">
            <span>{item.label}</span>
            <Chevron
              className={`h-4 w-4 text-neutral-500 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </DisclosureButton>

          <DisclosurePanel
            as="ul"
            role="list"
            className="ms-4 border-s-2 border-amber-400 bg-neutral-50"
          >
            {item.children!.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="flex items-start gap-3 px-6 py-2.5 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {child.icon && (
                    <span aria-hidden="true" className="text-base">
                      {child.icon}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block font-medium">{child.label}</span>
                    {child.description && (
                      <span className="mt-0.5 block text-xs text-neutral-500">
                        {child.description}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

function Chevron({ className }: { className?: string }) {
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
