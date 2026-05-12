import { ContentProps } from '@optimizely/cms-sdk';
import Image from 'next/image';
import Link from 'next/link';
import { FooterCT } from '@/content-types/blocks/footer/Footer';

type Props = {
  copyrightText: string;
  lastUpdated: string;
  socialLinks: ContentProps<typeof FooterCT>['socialLinks'];
};

export default async function FooterBottom({ copyrightText, lastUpdated, socialLinks }: Props) {
  const CURRENT_YEAR = new Date().getFullYear();
  const pa = () => ({});

  return (
    <>
      <div className="my-10 border-t border-white/10" />

      <div className="flex flex-col gap-4 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {CURRENT_YEAR} {copyrightText}
          <br className="sm:hidden" />
          <span className="sm:ms-2">
            Last updated{' '}
            <time dateTime={new Date(lastUpdated).toISOString()}>
              {new Date(lastUpdated).toLocaleString()}
            </time>
          </span>
        </p>

        <ul role="list" aria-label="Social media" className="flex items-center gap-3">
          {socialLinks?.map((social, index) => (
            <li key={`${social.href}-${index}`}>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full
                  border border-white/20 text-neutral-300 transition
                  hover:border-white/40 hover:text-white
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-amber-500"
              >
                <Image
                  src={social.iconPath}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
