import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            Event Not Found
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            The event you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Back to Events
            </Link>
            
            <Link
              href="/create-event"
              className="block w-full bg-white border border-gray-200 text-gray-900 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Create New Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
