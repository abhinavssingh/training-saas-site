'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { TimelineSelectorElementCT } from '@/content-types/elements/TimelineSelectorElement';
import { cn } from '@/lib/cn';

type Props = {
  content: ContentProps<typeof TimelineSelectorElementCT>;
};

export default function TimelineSelectorElement({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const [value, setValue] = useState<string | null>(null);
  const options = Array.isArray(content.options) ? content.options : [];
  return (
    <div {...pa(content)} className="w-full">
      {/* ✅ Label */}
      <RadioGroup value={value} onChange={setValue}>
        <RadioGroup.Label className="mb-1 block text-sm font-medium text-neutral-800">
          {content.title}
        </RadioGroup.Label>

        {/* ✅ Segmented control */}
        <div className="inline-flex rounded-md border border-neutral-300 bg-white p-1">
          {options.map((option) => (
            <RadioGroup.Option
              key={option}
              value={option}
              className={({ checked }) =>
                cn(
                  'cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                  checked ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100',
                )
              }
            >
              {option}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {/* ✅ Helper text */}
      {content.helperText && <p className="mt-1 text-xs text-neutral-500">{content.helperText}</p>}
    </div>
  );
}
