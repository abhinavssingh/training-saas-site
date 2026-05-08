'use client';

import { ContentProps } from '@optimizely/cms-sdk';
import Link from 'next/link';
import { NavItemCT } from '@/content-types/blocks/header/NavItem';

type Props = {
  item: ContentProps<typeof NavItemCT>;
  onNavigate?: () => void;
};

/**
 * Full-width mega menu used by EVERY desktop dropdown.
 *
 * Layout adapts to the data:
 *   - With a `featured` promo  → 2/3 + 1/3 split (items / promo)
 *   - Without a `featured`     → items take the full panel
 *   - Items grid is 1 col on small, 2 cols on sm+ — visually fine for
 *     anywhere from 1 to ~8 entries.
 *
 * Logical CSS properties (start/end, ms/me) are used so the menu
 * mirrors automatically when html[dir="rtl"].
 */
export function MegaMenu({ item, onNavigate }: Props) {
  const children = item.children ?? [];
  const featured = item.featured;

  const outerGrid = featured
    ? 'grid grid-cols-1 gap-8 p-6 lg:grid-cols-[2fr_1fr] lg:p-8'
    : 'grid grid-cols-1 gap-8 p-6 lg:p-8';

  // For categories with very few items, a single column reads better.
  const itemsGrid =
    children.length <= 2 ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-1 gap-2 sm:grid-cols-2';

  return (
    <div className={outerGrid}>
      {/* Items grid */}
      <ul role="list" className={itemsGrid}>
        {children.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              onClick={onNavigate}
              className="group flex items-start gap-3 rounded-lg p-3 transition hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-amber-50 text-xl ring-1 ring-amber-100 group-hover:bg-amber-100"
              >
                {child.icon ?? '•'}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-neutral-900 group-hover:text-amber-700">
                  {child.label}
                </span>
                {child.description && (
                  <span className="mt-0.5 block text-xs leading-relaxed text-neutral-600">
                    {child.description}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Featured promo (optional) */}
      {featured && (
        <Link
          href={featured.href}
          onClick={onNavigate}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-6 text-white shadow-sm transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          <div>
            {featured.eyebrow && (
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wider uppercase">
                {featured.eyebrow}
              </span>
            )}
            <h3 className="mt-3 text-lg leading-snug font-semibold">{featured.title}</h3>
            <p className="mt-2 text-sm text-amber-50/90">{featured.description}</p>
          </div>
          {featured.cta && (
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">
              {featured.cta}
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.97-3.97a.75.75 0 1 1 1.06-1.06l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06l3.97-3.97H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </Link>
      )}
    </div>
  );
}
