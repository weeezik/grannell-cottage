import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/grannellcottage1.jpg"
              alt="Grannell Cottage"
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-serif text-stone-800 mb-6">
            Welcome to Grannell Cottage
          </h1>
          <p className="text-xl text-stone-700 leading-relaxed font-serif">
            A cherished family retreat on Chebeague Island, Maine
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-serif text-stone-800 mb-4">Our History</h2>
            <p className="text-stone-700 mb-4">
              Built by Andrew Grannell, our cottage has been a family gathering place for generations.
            </p>
            <Link 
              href="/about"
              className="text-[#1a472a] hover:text-[#143620] font-medium inline-flex items-center"
            >
              Learn more
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-serif text-stone-800 mb-4">Summer Stays</h2>
            <p className="text-stone-700 mb-4">
              Family members can book their summer retreat through our members portal.
            </p>
            <Link 
              href="/login"
              className="text-[#1a472a] hover:text-[#143620] font-medium inline-flex items-center"
            >
              Book now
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-serif text-stone-800 mb-4">Photo Archive</h2>
            <p className="text-stone-700 mb-4">
              Explore our collection of family memories and cottage photographs.
            </p>
            <Link 
              href="/archive"
              className="text-[#1a472a] hover:text-[#143620] font-medium inline-flex items-center"
            >
              View gallery
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
