import { ContentProps } from '@optimizely/cms-sdk';
import { FooterCT } from '@/content-types/blocks/footer/Footer';
import FooterBottom from './FooterBottom';
import FooterEmiratesList from './FooterEmiratesList';
import FooterNav from './FooterNav';

type Props = {
  content: ContentProps<typeof FooterCT>;
};

export default async function Footer({ content }: Props) {
  // ✅ Optional guard: footer cannot render without content
  if (!content) {
    return null;
  }

  const hasSections = Boolean(content.sections?.length);
  const hasEmirates = Boolean(content.emirates?.length);

  return (
    <footer
      role="contentinfo"
      className="border-t border-amber-500 bg-gradient-to-b from-[#1c1f23] to-[#101215] text-neutral-300"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        {(hasSections || hasEmirates) && (
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6">
            {hasSections && <FooterNav sections={content.sections} />}

            {hasEmirates && <FooterEmiratesList emirates={content.emirates} />}
          </nav>
        )}

        <FooterBottom
          copyrightText={content.copyrightText}
          lastUpdated={content.lastUpdated}
          socialLinks={content.socialLinks}
        />
      </div>
    </footer>
  );
}
