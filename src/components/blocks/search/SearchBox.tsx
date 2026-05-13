import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  onClose?: () => void;
  showDropdown?: boolean;
};

export default function SearchBox({ onClose, showDropdown = true }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${value}`);
      const data = await res.json();

      setResults(data.items || []);
    } catch {
      setResults([]);
    }
  };

  const handleSubmit = () => {
    if (!query.trim()) return;
    onClose?.(); // ✅ close modal FIRST
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative w-full">
      {/* Input + Button */}
      <div className="flex gap-3">
        <input
          autoFocus
          className="flex-1 border px-5 py-3 rounded-xl text-lg outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />

        <button
          onClick={handleSubmit}
          className="bg-amber-500 text-white px-5 rounded-xl hover:bg-amber-600"
        >
          Search
        </button>
      </div>

      {/* Results dropdown */}

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg max-h-80 overflow-auto">
          {results.map((item) => (
            <Link
              key={item.id}
              href={item.url || '/'}
              onClick={() => onClose?.()}
              className="block px-4 py-3 hover:bg-amber-50 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
