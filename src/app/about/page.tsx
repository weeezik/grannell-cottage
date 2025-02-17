import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-serif text-stone-800 mb-8">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/images/cottage.jpg"
              alt="Grannell Cottage on Chebeague Island"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
          
          <div className="p-8 md:p-12">
            <p className="text-xl text-stone-700 leading-relaxed mb-8 font-serif">
              Grannell Cottage is an ancestral homestead located on Chebeague Island, Maine
              in the Casco Bay. The home serves as a summer time retreat for descendants of Andrew 
              Grannell - the home&apos;s constructor and first tenant.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-[#f5f7f0] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-serif text-stone-800 mb-4">Location</h2>
                <p className="text-stone-700 leading-relaxed">
                  Situated on Chebeague Island in Maine&apos;s picturesque Casco Bay, 
                  the cottage offers a peaceful escape from mainland life.
                </p>
              </div>
              
              <div className="bg-[#f5f7f0] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-serif text-stone-800 mb-4">Heritage</h2>
                <p className="text-stone-700 leading-relaxed">
                  Built by Andrew Grannell, the cottage has been passed down through 
                  generations, maintaining its role as a cherished family gathering place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
