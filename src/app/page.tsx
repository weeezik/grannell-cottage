import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-serif text-stone-800">
          Grannell Cottage
        </h1>
        <div className="flex gap-8 text-lg">
          <a href="/about" className="text-stone-800 hover:text-[#1a472a] transition-colors">about us</a>
          <a href="/history" className="text-stone-800 hover:text-[#1a472a] transition-colors">history</a>
          <a href="/members" className="text-stone-800 hover:text-[#1a472a] transition-colors">for members</a>
          <a href="/archive" className="text-stone-800 hover:text-[#1a472a] transition-colors">archive</a>
          <a href="/contact" className="text-stone-800 hover:text-[#1a472a] transition-colors">contact</a>
        </div>
      </nav>
      
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
