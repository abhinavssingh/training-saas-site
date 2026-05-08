'use client';

import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { DropdownElementCT } from '@/content-types/elements/DropdownElement';

type Props = {
  content: ContentProps<typeof DropdownElementCT>;
};

const MAX_SELECTION = 3;

export default function DropdownElement({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const [selected, setSelected] = useState<string[]>([]);
  const options = Array.isArray(content.options) ? content.options : [];

  function handleChange(values: string[]) {
    if (values.length <= MAX_SELECTION) {
      setSelected(values);
    }
  }

  return (
    <div {...pa(content)} className="w-full">
      {/* ✅ Label */}
      <label className="mb-1 block text-sm font-medium text-neutral-800">{content.title}</label>

      <Combobox multiple value={selected} onChange={handleChange}>
        {({ open }) => (
          <div className="relative">
            {/* ✅ Trigger (input look, read-only) */}
            <ComboboxInput
              readOnly
              displayValue={() => ''}
              placeholder={content.helperText ?? 'Select up to 3 options'}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            />

            {/* ✅ Chevron */}
            <ChevronIcon />

            {/* ✅ Options */}
            {open && (
              <ComboboxOptions
                static
                className="absolute z-20 mt-2 w-full rounded-md border border-neutral-200 bg-white shadow-lg"
              >
                {options.map((option) => {
                  const isSelected = selected.includes(option);
                  const limitReached = selected.length >= MAX_SELECTION && !isSelected;

                  return (
                    <ComboboxOption
                      key={option}
                      value={option}
                      disabled={limitReached}
                      className="data-bg-neutral-100 data-bg-amber-50 data-text-amber-800 data-opacity-40 data-cursor-not-allowed cursor-pointer px-4 py-2 text-sm"
                    >
                      <span>
                        {option}
                        <span className="data-inline hidden"> ✓</span>
                      </span>
                    </ComboboxOption>
                  );
                })}
              </ComboboxOptions>
            )}
          </div>
        )}
      </Combobox>

      {/* ✅ Chips (below input – matches screenshot) */}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs text-amber-800"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* ✅ Max selection hint */}
      {selected.length >= MAX_SELECTION && (
        <p className="mt-1 text-xs text-neutral-500">You can select up to 3 options</p>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-500"
    >
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
