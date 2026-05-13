import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Props = {
  onClick?: () => void;
};

export default function SearchButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-amber-500 border px-3 py-2 text-sm hover:bg-gray-100 transition"
      aria-label="Search"
    >
      <MagnifyingGlassIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Search</span>
    </button>
  );
}
