import { Children, cloneElement, isValidElement } from 'react';
import { ContentProps } from '@optimizely/cms-sdk';
import {
  OptimizelyGridSection,
  StructureContainerProps,
  getPreviewUtils,
} from '@optimizely/cms-sdk/react/server';
import { LayoutContainerSectionCT } from '@/content-types/sections/LayoutContainerSection';
import { LayoutContainerSectionDisplayTemplate } from '@/display-templates/sections/LayoutContainerSectionDisplayTemplate';
import { columnWidthClasses, layoutClasses } from '@/lib/constants';

type Props = {
  content: ContentProps<typeof LayoutContainerSectionCT>;
  displaySettings?: ContentProps<typeof LayoutContainerSectionDisplayTemplate>;
};

export default function LayoutContainerSection({ content, displaySettings }: Props) {
  const { pa } = getPreviewUtils(content);
  const layout = displaySettings?.layout ?? 'full';

  return (
    <section className={`relative ${layoutClasses[layout]}`} {...pa(content)}>
      <OptimizelyGridSection
        nodes={content.nodes}
        row={(props) => <Row {...props} layout={layout} />}
        column={Column}
      />
    </section>
  );
}

function Row({ children, node, layout }: StructureContainerProps & { layout: string }) {
  const { pa } = getPreviewUtils(node);

  const cols = Children.toArray(children).filter(isValidElement) as any[];

  const columnWidthClass =
    columnWidthClasses[layout as keyof typeof columnWidthClasses] ?? columnWidthClasses.full;

  return (
    <div className="flex flex-col gap-6 lg:flex-row" {...pa(node)}>
      {cols.map((col) =>
        cloneElement(col, {
          layoutWidth: columnWidthClass,
        }),
      )}
    </div>
  );
}

function Column({
  children,
  node,
  layoutWidth,
}: StructureContainerProps & {
  layoutWidth?: string;
}) {
  const { pa } = getPreviewUtils(node);

  return (
    <div className={`flex min-w-0 flex-col ${layoutWidth ?? 'flex-1'}`} {...pa(node)}>
      {children}
    </div>
  );
}
