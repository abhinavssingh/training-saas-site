'use client';

import { useEffect, useState } from 'react';

type Lang = 'en' | 'ar';

/**
 * Reads + writes the document language. We keep React state so the
 * EN / AR pills re-render when the language changes, and we mirror it
 * to <html lang> + <html dir> so Tailwind's `rtl:` variants and
 * logical properties (start/end, ms/me) flip automatically.
 */
function useDocumentLanguage(): [Lang, (next: Lang) => void] {
  const [lang, setLang] = useState<Lang>('en');

  // On mount, read whatever <html lang> already says (avoids hydration flicker
  // if the server rendered "ar").
  useEffect(() => {
    const current = document.documentElement.lang?.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    setLang(current);
  }, []);

  const change = (next: Lang) => {
    setLang(next);
    const root = document.documentElement;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
  };

  return [lang, change];
}

export function HeaderTopBar() {
  const [lang, setLang] = useDocumentLanguage();

  const pillBase =
    'rounded px-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400';
  const pillActive = 'font-semibold text-amber-400';
  const pillInactive = 'text-white/80 hover:text-white';

  return (
    <div className="bg-black text-sm text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <div>Federal Government Ministry of Investment</div>

        <div className="flex items-center gap-4 text-xs">
          <a href="/en/accessibility" className="hover:underline">
            Accessibility
          </a>
          <a href="/en/contact" className="hover:underline">
            Contact
          </a>

          <span role="group" aria-label="Language" className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`${pillBase} ${lang === 'en' ? pillActive : pillInactive}`}
            >
              EN
            </button>
            <span aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setLang('ar')}
              aria-pressed={lang === 'ar'}
              className={`${pillBase} ${lang === 'ar' ? pillActive : pillInactive}`}
            >
              AR
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
