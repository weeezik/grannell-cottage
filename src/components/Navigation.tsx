'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Link href="/" className="text-3xl font-serif text-stone-800">
        Grannell Cottage
      </Link>
      <div className="flex gap-8 text-lg">
        <Link 
          href="/about" 
          className={`text-stone-800 hover:text-[#1a472a] transition-colors ${
            pathname === '/about' ? 'text-[#1a472a]' : ''
          }`}
        >
          About Us
        </Link>
        <Link 
          href="/login" 
          className={`text-stone-800 hover:text-[#1a472a] transition-colors ${
            pathname === '/login' ? 'text-[#1a472a]' : ''
          }`}
        >
          For Members
        </Link>
        <Link 
          href="/archive" 
          className={`text-stone-800 hover:text-[#1a472a] transition-colors ${
            pathname === '/archive' ? 'text-[#1a472a]' : ''
          }`}
        >
          Archive
        </Link>
        <Link 
          href="/contact" 
          className={`text-stone-800 hover:text-[#1a472a] transition-colors ${
            pathname === '/contact' ? 'text-[#1a472a]' : ''
          }`}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
