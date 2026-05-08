import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import Image from 'next/image';
import Link from 'next/link';
import { FooterCT } from '@/content-types/blocks/footer/Footer';

type Props = {
  content: ContentProps<typeof FooterCT>;
};

const CURRENT_YEAR = new Date().getFullYear();

export default async function Footer({ content }: Props) {
  const { pa } = getPreviewUtils(content);

  return (
    <footer
      role="contentinfo"
      className="border-t border-amber-500 bg-gradient-to-b from-[#1c1f23] to-[#101215] text-neutral-300"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6"
          {...pa('sections')}
        >
          {content.sections.map((section) => (
            <div key={section.id} className="footer-section">
              <h3 className="mb-4 text-[13px] font-medium text-white" {...pa('sections')}>
                {section.title}
              </h3>

              <ul role="list" className="space-y-1.5 text-[13px] leading-6 text-neutral-400">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="rounded-sm transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-2" {...pa('emirates')}>
            <h3 id="footer-emirates-heading" className="mb-4 text-[13px] font-medium text-white">
              Explore the 7 Emirates
            </h3>
            <ul
              role="list"
              aria-labelledby="footer-emirates-heading"
              className="grid grid-cols-2 gap-3"
            >
              {content.emirates.map((e) => (
                <li key={e.name}>
                  <div className="flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 py-2">
                    <span aria-hidden="true" className="h-4 w-6 rounded-sm bg-red-600" />
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-white">{e.name}</p>
                      <p className="text-[11px] text-neutral-400">{e.subtitle}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="my-10 border-t border-white/10" />

        <div className="flex flex-col gap-4 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p {...pa('copyrightText')}>
            © {CURRENT_YEAR} {content.copyrightText}
            <br className="sm:hidden" />
            <span className="sm:ms-2" {...pa('lastUpdated')}>
              Last updated{' '}
              <time dateTime={new Date(content.lastUpdated).toLocaleString()}>
                {new Date(content.lastUpdated).toLocaleString()}
              </time>
            </span>
          </p>

          <ul
            role="list"
            aria-label="Social media"
            className="flex items-center gap-3"
            {...pa('socialLinks')}
          >
            {content.socialLinks.map((social) => (
              <li key={social.href}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-neutral-300 transition
                  hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-amber-500"
                >
                  <Image
                    src={social.iconPath} // Path from the public folder
                    alt="Description"
                    width={32}
                    height={32}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
