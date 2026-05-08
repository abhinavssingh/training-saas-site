import { CloseIcon } from './Ai Assistant/CloseIcon';
import { MenuIcon } from './Ai Assistant/MenuIcon';

interface Props {
  mobileOpen: boolean;
  onToggle: () => void;
}

export function HeaderAi({ mobileOpen, onToggle }: Props) {
  return (
    <>
      <button
        type="button"
        className="hidden items-center gap-2 rounded-full border border-amber-500 px-5 py-2 text-sm text-amber-700 transition hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 lg:flex"
      >
        ✧ Ask AI – &ldquo;Port &amp; Logistics JV under Belt &amp; Road&rdquo;
      </button>

      <button
        type="button"
        className="rounded-md p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 lg:hidden"
        onClick={onToggle}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>
    </>
  );
}
