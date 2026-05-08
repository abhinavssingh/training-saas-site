import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { HeroStatsElementCT } from '@/content-types/elements/HeroStatsElement';
import { HeroStatsElementDisplayTemplate } from '@/display-templates/elements/HeroStatsElementDisplayTemplate';

type Props = {
  content: ContentProps<typeof HeroStatsElementCT>;
  displaySettings?: ContentProps<typeof HeroStatsElementDisplayTemplate>;
};

const colsClasses: Record<string, string> = {
  cols2: 'grid-cols-2 sm:grid-cols-2',
  cols3: 'grid-cols-2 sm:grid-cols-3',
  cols4: 'grid-cols-2 sm:grid-cols-4',
};

const accentClasses: Record<string, string> = {
  amber: 'text-amber-600',
  primary: 'text-primary',
  neutral: 'text-neutral-900',
};

export default function HeroStatsElement({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  const values = content.values ?? [];
  const labels = content.labels ?? [];
  const count = Math.min(values.length, labels.length);
  if (count === 0) return null;

  const cols = colsClasses[displaySettings?.columns ?? 'cols4'];
  const accent = accentClasses[displaySettings?.accentColor ?? 'amber'];

  return (
    <dl className={`grid gap-x-8 gap-y-6 ${cols}`} {...pa('values')}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="min-w-0">
          <dt className={`text-3xl leading-none font-bold md:text-4xl ${accent}`}>{values[i]}</dt>
          <dd className="mt-2 text-xs leading-snug text-neutral-600">{labels[i]}</dd>
        </div>
      ))}
    </dl>
  );
}
