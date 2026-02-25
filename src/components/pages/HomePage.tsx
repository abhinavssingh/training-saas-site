import { ContentProps } from '@optimizely/cms-sdk'
import { RichText } from '@optimizely/cms-sdk/react/richText'
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server'
import { OptimizelyComponent } from '@optimizely/cms-sdk/react/server'
import { HomePageCT } from '@/content-types'
import Image from 'next/image'

type Props = {
  content: ContentProps<typeof HomePageCT>
}

export default function HomePage({ content }: Props) {
  const { pa, src } = getPreviewUtils(content)

  const imagePresent =
    !!content?.image &&
    // supports either Graph URL or media item URL
    (content?.image?.url?.default || (content as any)?.image?.item?.Url)

  return (
    <main>
      {/* Hero */}
      <section className="prose">
        {imagePresent && (
          <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={src(imagePresent)}
              alt={content?.heading || 'Hero'}
              fill
              className="object-cover"
              {...pa('image')}
            />
          </div>
        )}

        <div className="hero-content">
          <h1 className="text-3xl md:text-4xl font-bold" {...pa('heading')}>
            {content?.heading ?? ''}
          </h1>
          {content?.subheading && (
            <h2 className="text-xl md:text-2xl mt-2 text-gray-600" {...pa('subheading')}>
              {content.subheading}
            </h2>
          )}
        </div>

        {content?.heroCallToAction?.href && content?.heroCallToAction?.text && (
          <a
            href={content.heroCallToAction.href}
            className="btn btn-primary mt-4 inline-block"
            {...pa('heroCallToAction')}
          >
            {content.heroCallToAction.text}
          </a>
        )}
      </section>

      {/* Body */}
      {(content?.body?.json || content?.body) && (
        <section className="prose-p:my-4" {...pa('body')}>
          {content?.body?.json ? (
            <div className="prose max-w-none">
              <RichText content={content.body.json} />
            </div>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: String(content?.body ?? '') }}
            />
          )}
        </section>
      )}

      {/* Featured Section */}
      {content?.featuredSection && (
        <section className="featured my-8" {...pa('featuredSection')}>
          <OptimizelyComponent content={content.featuredSection} />
        </section>
      )}

      {/* Latest Posts */}
      {content?.showLatestPosts && (
        <section className="latest-posts my-8">
          <h2 className="text-2xl font-semibold">Latest Blog Posts</h2>
          {/* TODO: Render posts feed here */}
        </section>
      )}
    </main>
  )
}