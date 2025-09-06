
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Event Management
            <span className="block text-gray-500 font-extralight">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Create, discover, and manage events effortlessly. 
            A clean, intuitive platform for all your event needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:bg-white/80">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V1H4v4zM15 7h5l-5-5v5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Discover Events</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Browse through upcoming events and find something that interests you.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:bg-white/80">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Create Events</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Organize your own events and share them with the community.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:bg-white/80">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Manage Events</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Keep track of all your created events in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
