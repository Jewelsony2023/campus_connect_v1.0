export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 text-neutral-900 px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-br from-black to-neutral-600 bg-clip-text text-transparent">
          Campus Connect
        </h1>
        <p className="mt-4 text-lg text-neutral-700">
          Your exclusive hub for events, clubs, workshops, and campus news.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a href="/events" className="px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 transition">
            Browse Events
          </a>
          <a href="/calendar" className="px-6 py-3 rounded-full border border-neutral-300 text-neutral-700 hover:bg-white transition">
            View Calendar
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900">Events</h3>
            <p className="text-neutral-600 mt-2">Discover what’s happening on campus.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900">Forum</h3>
            <p className="text-neutral-600 mt-2">Discuss, ask, and connect with peers.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900">Gallery</h3>
            <p className="text-neutral-600 mt-2">Relive moments from every occasion.</p>
          </div>
        </div>
      </div>
    </main>
  );
}