import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-8 text-center max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
