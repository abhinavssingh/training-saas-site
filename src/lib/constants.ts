// columnClasses, rowLayoutClasses, layoutClasses
export type ColumnWidthKey = keyof typeof columnWidthClasses;
export type RowLayoutKey = keyof typeof rowLayoutClasses;

export const columnWidthClasses = {
  full: 'w-full',
  half: 'w-full lg:basis-1/2',
  oneThird: 'w-full lg:basis-1/3',
  twoThirds: 'w-full lg:basis-2/3',
  oneQuarter: 'w-full lg:basis-1/4',
  oneFifth: 'w-full lg:basis-1/5',
  oneSixth: 'w-full lg:basis-1/6',
} as const;

export const rowLayoutClasses = {
  single: 'grid-cols-1',
  full: 'grid-cols-1', // full = let columns control width
  half: 'grid-cols-1 lg:grid-cols-2',
  twoThirds: 'grid-cols-[2fr_1fr]',
  oneThird: 'grid-cols-[1fr_2fr]',
  oneQuarter: 'grid-cols-1 lg:grid-cols-4',
  oneFifth: 'grid-cols-1 lg:grid-cols-5',
  oneSixth: 'grid-cols-1 lg:grid-cols-6',
} as const;

export const layoutClasses = {
  full: 'w-full',
  half: 'max-w-[50%] mx-auto',
  oneThird: 'max-w-[33.333333%] mx-auto',
  twoThirds: 'max-w-[66.666667%] mx-auto',
  oneQuarter: 'max-w-[25%] mx-auto',
  oneFifth: 'max-w-[20%] mx-auto',
  oneSixth: 'max-w-[16.666667%] mx-auto',
} as const;

export const sectionSpacingMap: Record<string, string> = {
  small: 'py-8 md:py-12',
  medium: 'py-12 md:py-16',
  large: 'py-16 md:py-24 lg:py-28',
};

export const colorSchemeMap: Record<string, string> = {
  light: 'bg-white text-neutral-900',
  gradient: 'bg-gradient-to-b from-amber-50/40 via-white to-white text-neutral-900',
  gold: 'bg-hero-radial-gold from-amber-50/40 via-white to-white text-neutral-900',
  dark: 'bg-neutral-900 text-white',
};

export const verticalAlignMap: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
};

/**
 * Resolves the Tailwind width class for a column based on:
 * - column index
 * - total columns in the row
 * - row layout preset
 *
 * Mobile-first: columns always stack on mobile (`w-full`).
 * Desktop behavior is controlled via `lg:*` utilities.
 */
export function resolveColumnWidth(index: number, total: number, layout: RowLayoutKey): string {
  // Single column → always full width
  if (total === 1 || layout === 'single' || layout === 'full') {
    return columnWidthClasses.full;
  }

  switch (layout) {
    case 'half':
      return columnWidthClasses.half;

    case 'twoThirds':
      return index === 0 ? columnWidthClasses.twoThirds : columnWidthClasses.oneThird;

    case 'oneThird':
      return index === 0 ? columnWidthClasses.oneThird : columnWidthClasses.twoThirds;

    case 'oneQuarter':
      return columnWidthClasses.oneQuarter;

    case 'oneFifth':
      return columnWidthClasses.oneFifth;

    case 'oneSixth':
      return columnWidthClasses.oneSixth;

    default:
      return columnWidthClasses.full;
  }
}
