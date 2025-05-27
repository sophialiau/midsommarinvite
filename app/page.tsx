import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
            Midsommar Dinner Party
          </h1>
          <p className="text-xl text-amber-700 mb-8">
            Join us for a magical celebration of summer solstice
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/rsvp" className="btn-primary">
              RSVP Now
            </Link>
            <Link href="/vote" className="btn-secondary">
              Vote for Date
            </Link>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">When</h2>
            <p className="text-gray-700">
              June 20th or 21st, 2024<br />
              (Date to be determined by popular vote)
            </p>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">What to Bring</h2>
            <p className="text-gray-700">
              Sign up to bring your favorite summer flowers and a bottle of your choice
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">RSVP</h3>
            <p className="text-gray-600">Let us know if you can make it</p>
          </div>
          <div className="card text-center">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">Date Vote</h3>
            <p className="text-gray-600">Help choose the perfect date</p>
          </div>
          <div className="card text-center">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">Contributions</h3>
            <p className="text-gray-600">Sign up for flowers & drinks</p>
          </div>
        </div>
      </div>
    </main>
  )
} 