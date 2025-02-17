'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Navigation from '@/components/Navigation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );
      
      console.log('Success:', result);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Detailed error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-serif text-stone-800 mb-8">Contact Us</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent outline-none text-stone-800"
            />
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent outline-none text-stone-800"
            />
          </div>

          <div>
            <label 
              htmlFor="message" 
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent outline-none resize-none text-stone-800"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-[#1a472a] text-white py-3 px-6 rounded-lg hover:bg-[#143620] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="text-green-600 text-center mt-4">
              Thank you for your message. We'll get back to you soon!
            </div>
          )}

          {status === 'error' && (
            <div className="text-red-600 text-center mt-4">
              Sorry, there was an error sending your message. Please try again later.
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
