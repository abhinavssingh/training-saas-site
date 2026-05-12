import { ContentProps } from '@optimizely/cms-sdk';
import { FooterCT } from '@/content-types/blocks/footer/Footer';

type Props = {
  emirates: ContentProps<typeof FooterCT>['emirates'];
};

export default async function FooterEmiratesList({ emirates }: Props) {
  return (
    <div className="col-span-2 lg:col-span-2">
      <h3 id="footer-emirates-heading" className="mb-4 text-[13px] font-medium text-white">
        Explore the 7 Emirates
      </h3>

      <ul role="list" aria-labelledby="footer-emirates-heading" className="grid grid-cols-2 gap-3">
        {emirates?.map((e, index) => (
          <li key={`${e.name}-${index}`}>
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
  );
}
