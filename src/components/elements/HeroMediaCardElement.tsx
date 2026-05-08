import { ContentProps, damAssets } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Image from 'next/image';
import { HeroMediaCardElementCT } from '@/content-types/elements/HeroMediaCardElement';
import { HeroMediaCardElementDisplayTemplate } from '@/display-templates/elements/HeroMediaCardElementDisplayTemplate';

type Props = {
  content: ContentProps<typeof HeroMediaCardElementCT>;
  displaySettings?: ContentProps<typeof HeroMediaCardElementDisplayTemplate>;
};

const aspectClasses: Record<string, string> = {
  ratio16x9: 'aspect-[16/9]',
  ratio4x3: 'aspect-[4/3]',
  ratio1x1: 'aspect-square',
  ratio3x4: 'aspect-[3/4]',
};

const badgeStackClasses: Record<string, string> = {
  topEnd: 'top-4 end-4 items-end',
  topStart: 'top-4 start-4 items-start',
  bottomEnd: 'bottom-4 end-4 items-end',
};

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="ms-0.5 h-6 w-6">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function HeroMediaCardElement({ content, displaySettings }: Props) {
  const { pa, src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);

  const imageSrc = src(content.image);
  if (!imageSrc) return null;

  const aspect = aspectClasses[displaySettings?.aspectRatio ?? 'ratio16x9'];
  const badgePos = badgeStackClasses[displaySettings?.badgePosition ?? 'topEnd'];
  const videoHref =
    typeof content.videoUrl === 'string' ? content.videoUrl : (content.videoUrl?.default ?? '');
  const hasVideo = !!videoHref;
  const badges = content.badgeLabels ?? [];

  return (
    <figure
      className={`relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 ${aspect}`}
      {...pa('image')}
    >
      <Image
        src={imageSrc}
        alt={getAlt(content.image, content.altText ?? '')}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover"
      />

      {/* Bottom gradient for caption legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />

      {/* Play button overlay (only when videoUrl is set) */}
      {hasVideo && (
        <a
          href={videoHref || '#'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Play video: ${content.title ?? content.altText}`}
          className="absolute start-6 bottom-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-amber-700 shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          <PlayIcon />
        </a>
      )}

      {/* Badge stack */}
      {badges.length > 0 && (
        <ul
          role="list"
          aria-label="Highlights"
          className={`absolute flex flex-col gap-2 ${badgePos}`}
        >
          {badges.map((b) => (
            <li key={b}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 shadow-sm backdrop-blur-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {b}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Caption */}
      {(content.title || content.subtitle) && (
        <figcaption className="absolute end-4 bottom-4 max-w-[60%] text-end text-white">
          {content.title && (
            <span className="block text-sm leading-snug font-semibold">{content.title}</span>
          )}
          {content.subtitle && (
            <span className="block text-xs text-white/80">{content.subtitle}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
