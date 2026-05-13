'use client';

import { usePathname } from 'next/navigation';
import Breadcrumb from './Breadcrumb';

const LOCALES = ['en', 'ar'];

export default function BreadcrumbWrapper() {
  const pathname = usePathname();

  let segments = pathname.split('/').filter(Boolean);

  // ✅ Remove locale
  if (segments.length > 0 && LOCALES.includes(segments[0])) {
    segments = segments.slice(1);
  }

  // ✅ If homepage → hide breadcrumb
  if (segments.length === 0) {
    return null;
  }

  // ✅ Build items (NOW includes Home only for inner pages)
  const items = [
    { label: 'Home', url: '/' }, // ✅ Add here instead
    ...segments.map((seg, i) => ({
      label: decodeURIComponent(seg)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      url: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  return <Breadcrumb items={items} />;
}
