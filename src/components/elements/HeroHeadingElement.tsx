import type { JSX } from 'react';
import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { HeroHeadingElementCT } from '@/content-types/elements/HeroHeadingElement';
import { HeroHeadingElementDisplayTemplate } from '@/display-templates/elements/HeroHeadingElementDisplayTemplate';

type Props = {
  content: ContentProps<typeof HeroHeadingElementCT>;
  displaySettings?: ContentProps<typeof HeroHeadingElementDisplayTemplate>;
};

const sizeClasses: Record<string, string> = {
  large: 'text-4xl md:text-5xl lg:text-6xl',
  medium: 'text-3xl md:text-4xl lg:text-5xl',
  small: 'text-2xl md:text-3xl lg:text-4xl',
};

const accentClasses: Record<string, string> = {
  amber: 'text-amber-600',
  primary: 'text-primary',
  gold: 'text-yellow-700',
  none: '',
};

/**
 * Splits the heading at the first occurrence of accentText (case-sensitive).
 * Returns three parts so we can wrap only the middle in an accent span.
 */
function splitOnAccent(heading: string, accent?: string): [string, string, string] {
  if (!accent) return [heading, '', ''];
  const idx = heading.indexOf(accent);
  if (idx === -1) return [heading, '', ''];
  return [
    heading.slice(0, idx),
    heading.slice(idx, idx + accent.length),
    heading.slice(idx + accent.length),
  ];
}

export default function HeroHeadingElement({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  const Tag = (displaySettings?.headingTag ?? 'h1') as keyof JSX.IntrinsicElements;
  const sizeClass = sizeClasses[displaySettings?.size ?? 'large'];
  const accentColor = displaySettings?.accentColor ?? 'amber';
  const accentClass = accentClasses[accentColor];

  const [before, accent, after] = splitOnAccent(content.heading ?? '', content.accentText ?? '');

  return (
    <Tag
      className={`leading-tight font-bold tracking-tight text-neutral-900 ${sizeClass}`}
      {...pa('heading')}
    >
      {before}
      {accent && accentClass ? <span className={accentClass}>{accent}</span> : accent}
      {after}
    </Tag>
  );
}
