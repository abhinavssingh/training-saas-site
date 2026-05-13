import Link from 'next/link';

type Item = {
  label: string;
  url?: string;
};

type Props = {
  items: Item[];
};

export default function Breadcrumb({ items }: Props) {
  if (!items?.length) return null;

  // ✅ Generate Schema.org JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url || '',
    })),
  };

  return (
    <>
      {/* ✅ SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* ✅ UAE Style Breadcrumb */}
      <div className="border-t border-gray-200 bg-[#f5f5f5]">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 py-2">
          <ol className="flex flex-wrap items-center text-xs text-gray-500">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {/* separator */}
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}

                {/* link or active */}
                {item.url && index !== items.length - 1 ? (
                  <Link href={item.url} className="hover:text-gray-700 transition">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-gray-800">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
