import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Link from 'next/link';
import { CallToActionElementCT } from '@/content-types/elements/CallToActionElement';
import { CallToActionDisplayTemplate } from '@/display-templates/elements/CallToActionElementDisplayTemplate';

type Props = {
  content: ContentProps<typeof CallToActionElementCT>;
  displaySettings?: ContentProps<typeof CallToActionDisplayTemplate>;
};

export default function CallToActionElement({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);

  const style = displaySettings?.style ?? 'link';
  const color = displaySettings?.color ?? 'dark';
  const width = displaySettings?.width ?? 'auto';

  const styleClasses: Record<string, Record<string, string>> = {
    button: {
      light: `inline-block bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold
              hover:opacity-90 transition-opacity`,
      dark: `inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold
             hover:opacity-90 transition-opacity`,

      gold: `inline-flex items-center justify-center
            bg-[#92722B] text-white
            px-6 py-3 rounded-lg font-semibold
            hover:bg-[#7c6125]
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-[#92722B]
            transition-colors`,
    },
    link: {
      light: `inline-block text-primary-foreground font-semibold underline underline-offset-4
              hover:opacity-80 transition-opacity`,
      dark: `inline-block text-primary font-semibold underline underline-offset-4
             hover:opacity-80 transition-opacity`,

      gold: `inline-block text-[#92722B] font-semibold
           underline underline-offset-4
           hover:text-[#7c6125]
           transition-colors`,
    },
  };

  const widthClasses: Record<'auto' | 'half' | 'full', string> = {
    auto: 'w-auto',
    half: 'w-full sm:w-1/2',
    full: 'w-full',
  };

  if (!content.link?.url?.default) {
    return (
      <span className={`${styleClasses[style][color]} ${widthClasses[width]}`} {...pa('link')}>
        Set link...
      </span>
    );
  }

  return (
    <Link
      href={content.link.url.default}
      className={`${styleClasses[style][color]} ${widthClasses[width]}`}
      target={content.link.target ?? undefined}
      title={content.link.title ?? undefined}
      {...pa('link')}
    >
      {content.link.text || 'Learn More'}
    </Link>
  );
}
