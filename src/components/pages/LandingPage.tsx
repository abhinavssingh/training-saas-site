import { ContentProps } from '@optimizely/cms-sdk'
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server'
import { OptimizelyComponent } from '@optimizely/cms-sdk/react/server'
import { LandingPageCT } from '@/content-types'
import Image from 'next/image'

type Props = {
  content: ContentProps<typeof LandingPageCT>
}

export default function LandingPage({ content }: Props) {
  const { pa, src } = getPreviewUtils(content)

  const heroImage = (content?.image?.url?.default as unknown as string) ?? null
  const heading = content?.heading ?? ''
  const subheading = content?.subheading ?? ''
  const ctaLink = content?.callToActionLink ?? null
  const ctaText = content?.callToActionText ?? ''
  const bodyContent = content?.body ?? null
  const enableFeatured = !!content?.enableFeaturedSection
  const featuredContent = content?.featuredContent ?? null

  return (
    <main>
      <section>       
        {heroImage && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={src(heroImage)}
              alt={heading || 'Hero'}
              fill
              className="object-cover"
              {...pa('image')}
            />
          </div>
        )} 

        <h1 {...pa('heading')}>{heading}</h1>
        {subheading && <h2 {...pa('subheading')}>{subheading}</h2>}

        {ctaLink?.href && ctaText && (
          <a href={ctaLink.href} {...pa('callToActionLink')}>
            {ctaText}
          </a>
        )}
      </section>

      {bodyContent && (
        <section {...pa('body')}>
          <OptimizelyComponent content={bodyContent} />
        </section>
      )}

      {enableFeatured && featuredContent && (
        <section {...pa('featuredContent')}>
          <OptimizelyComponent content={featuredContent} />
        </section>
      )}
    </main>
  )
}