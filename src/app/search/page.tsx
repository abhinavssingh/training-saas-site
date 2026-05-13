'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBox from '@/components/blocks/search/SearchBox';

export default function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();

  const initialQuery = params.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch results when query changes
  useEffect(() => {
    if (!initialQuery) return;

    setQuery(initialQuery);
    fetchResults(initialQuery);
  }, [initialQuery]);

  const fetchResults = async (value: string) => {
    if (!value) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${value}`);
      const data = await res.json();

      setResults(data.items || []);
    } catch {
      setResults([]);
    }

    setLoading(false);
  };

  // ✅ Handle input change
  const handleSearchChange = (value: string) => {
    setQuery(value);
    fetchResults(value);
  };

  // ✅ Submit updates URL (no reload)
  const handleSubmit = () => {
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ✅ Search box at top */}
      <div className="mb-6">
        <SearchBox
          value={query}
          onChange={handleSearchChange}
          onSubmit={handleSubmit}
          showDropdown={false}
        />
      </div>

      <h1 className="text-2xl font-semibold mb-4">Results for "{query}"</h1>

      {loading && <p>Searching...</p>}

      {!loading && results.length === 0 && <p>No results found.</p>}

      {/* ✅ Results list */}
      <ul className="space-y-4">
        {results.map((item) => (
          <li key={item.id}>
            <Link
              key={item.id}
              href={item.url || '/'}
              className="block px-4 py-3 hover:bg-amber-50 transition"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
