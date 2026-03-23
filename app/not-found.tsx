import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-20 h-20 text-white mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-blue-100 mb-8">
          Sorry, the page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
