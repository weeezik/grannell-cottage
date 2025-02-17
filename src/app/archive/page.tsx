import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function Archive() {
  const archiveImages = [
    { src: '/images/archive/andyworkingfilm.jpg', alt: 'Andy working with film at Grannell Cottage' },
    { src: '/images/archive/cascobaymap.jpg', alt: 'Historical map of Casco Bay' },
    { src: '/images/archive/familyporchbw.jpg', alt: 'Family gathering on the porch - black and white' },
    { src: '/images/archive/folksonporchbw.jpg', alt: 'Folks relaxing on the porch - black and white' },
    { src: '/images/archive/kianaandywalkincolor.jpg', alt: 'Kiana and Andy walking - color photo' },
    { src: '/images/archive/porchcolor.jpg', alt: 'The cottage porch in color' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-stone-800 mb-8">Archive</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archiveImages.map((image, index) => (
            <div key={index} className="relative aspect-square group">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
