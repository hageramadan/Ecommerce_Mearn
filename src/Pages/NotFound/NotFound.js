import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-50">
      {/* النصوص */}
      <h1 className="text-6xl font-bold text-blue-700 mb-2">Oops!</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        404 - Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        The page you’re looking for doesn’t exist, has been moved, or is
        temporarily unavailable.
      </p>

      {/* الزرار */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
