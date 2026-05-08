import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="px-4 text-center">
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <p className="mb-8 text-xl text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/en"
          className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
