import { ContentProps } from '@optimizely/cms-sdk';
import Link from 'next/link';
import { FooterCT } from '@/content-types/blocks/footer/Footer';

type Props = {
  sections: ContentProps<typeof FooterCT>['sections'];
};

export default function FooterNav({ sections }: Props) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <div key={section.id ?? sectionIndex}>
          <h3 className="mb-4 text-[13px] font-medium text-white">{section.title}</h3>

          <ul className="space-y-1.5 text-[13px] leading-6 text-neutral-400">
            {section.links?.map((link, linkIndex) => (
              <li key={link.id ?? `${section.id}-${linkIndex}`}>
                <Link
                  href={link.href}
                  className="rounded-sm transition-colors hover:text-white"
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
    </>
  );
}
