import { ContentProps } from '@optimizely/cms-sdk';
import {
  OptimizelyGridSection,
  StructureContainerProps,
  getPreviewUtils,
} from '@optimizely/cms-sdk/react/server';
import { ContentContainerSectionCT } from '@/content-types/sections/ContentContainerSection';
import { ContentContainerSectionDisplayTemplate } from '@/display-templates/sections/ContentContainerSectionDisplayTemplate';
import {
  colorSchemeMap,
  columnWidthClasses,
  sectionSpacingMap,
  verticalAlignMap,
} from '@/lib/constants';

type Props = {
  content: ContentProps<typeof ContentContainerSectionCT>;
  displaySettings?: ContentProps<typeof ContentContainerSectionDisplayTemplate>;
};

export default function ContentContainerSection({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  const colorScheme = colorSchemeMap[displaySettings?.colorScheme ?? 'light'];
  const sectionSpacing = sectionSpacingMap[displaySettings?.sectionSpacing ?? 'large'];
  const vAlign = verticalAlignMap[displaySettings?.verticalAlignment ?? 'center'];

  return (
    <section
      className={`vb:grid relative w-full overflow-visible px-4 md:px-6 lg:px-8 ${sectionSpacing} ${colorScheme}`}
      {...pa(content)}
    >
      <div className="mx-auto w-full max-w-7xl">
        <OptimizelyGridSection
          nodes={content.nodes}
          row={(props) => <Row {...props} vAlign={vAlign} />}
          column={Column}
        />
      </div>
    </section>
  );
}

function Row({ children, node, vAlign }: StructureContainerProps & { vAlign: string }) {
  const { pa } = getPreviewUtils(node);

  return (
    <div className={`vb:row flex flex-col gap-8 lg:flex-row lg:gap-12 ${vAlign}`} {...pa(node)}>
      {children}
    </div>
  );
}

function Column({ children, node }: StructureContainerProps) {
  const { pa } = getPreviewUtils(node);
  const layout = node.displaySettings?.layout ?? 'full';
  const heroWidth = columnWidthClasses[layout] ?? columnWidthClasses.full;

  return (
    <div className={`vb:col flex min-w-0 flex-col gap-5 ${heroWidth}`} {...pa(node)}>
      {children}
    </div>
  );
}
