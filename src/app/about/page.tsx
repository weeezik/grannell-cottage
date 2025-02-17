import Navigation from '@/components/Navigation';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-stone-800 mb-6">About Us</h1>
        {/* Content will go here */}
      </main>
    </div>
  );
}
