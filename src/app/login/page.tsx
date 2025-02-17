'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn('credentials', {
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/members');
      router.refresh();
    } else {
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-4xl font-serif text-stone-800 mb-8 text-center">Members Login</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent outline-none text-stone-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1a472a] text-white py-3 px-6 rounded-lg hover:bg-[#143620] transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
} 