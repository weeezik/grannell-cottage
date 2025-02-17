import Image from "next/image";
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4">
        <Image
          src="/images/grannellcottage1.jpg"
          alt="Grannell Cottage"
          width={500}
          height={300}
          priority
          className="rounded-lg shadow-lg mx-auto hover:shadow-xl transition-shadow duration-300"
        />
      </main>
    </div>
  );
}
