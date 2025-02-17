'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/styles/calendar.css';
import Navigation from '@/components/Navigation';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface BookingEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export default function MembersArea() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-stone-800 mb-8">Members Area</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Calendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            className="mb-8"
            views={['month']}
            defaultView="month"
          />
          
          <div className="mt-8">
            <h2 className="text-2xl font-serif text-stone-800 mb-4">Book Your Stay</h2>
            {/* Booking form will go here */}
          </div>
        </div>
      </main>
    </div>
  );
}
