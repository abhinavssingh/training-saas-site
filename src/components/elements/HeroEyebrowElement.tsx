import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { HeroEyebrowElementCT } from '@/content-types/elements/HeroEyebrowElement';
import { HeroEyebrowElementDisplayTemplate } from '@/display-templates/elements/HeroEyebrowElementDisplayTemplate';

type Props = {
  content: ContentProps<typeof HeroEyebrowElementCT>;
  displaySettings?: ContentProps<typeof HeroEyebrowElementDisplayTemplate>;
};

const variantClasses: Record<string, string> = {
  outlined: 'border border-amber-500/40 bg-white/60 text-amber-700 backdrop-blur-sm',
  filled: 'bg-amber-500 text-white',
  subtle: 'bg-amber-50 text-amber-700',
};

export default function HeroEyebrowElement({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  const variant = variantClasses[displaySettings?.variant ?? 'outlined'];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide ${variant}`}
      {...pa('text')}
    >
      {content.icon && (
        <span aria-hidden="true" className="text-sm">
          {content.icon}
        </span>
      )}
      {content.text}
    </span>
  );
}
