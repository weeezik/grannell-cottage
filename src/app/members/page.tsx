'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
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
  member: string;
  notes?: string;
}

export default function MembersArea() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingEvent | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (!selectedRange.start) {
      // First click - set start date
      setSelectedRange({
        start: slotInfo.start,
        end: null
      });
    } else if (!selectedRange.end) {
      // Second click - set end date and show form
      setSelectedRange(prev => ({
        start: prev.start,
        end: slotInfo.start
      }));
      setShowBookingForm(true);
    }
  };

  const handleDateChange = (type: 'start' | 'end', date: Date) => {
    setSelectedRange(prev => ({
      ...prev,
      [type]: date
    }));
  };

  const handleBookingSubmit = async (bookingDetails: {
    name: string;
    notes: string;
    startDate: Date;
    endDate: Date;
  }) => {
    const newBooking: BookingEvent = {
      id: Date.now().toString(),
      title: `Booked by ${bookingDetails.name}`,
      start: bookingDetails.startDate,
      end: endOfDay(bookingDetails.endDate),
      member: bookingDetails.name,
      notes: bookingDetails.notes
    };

    setEvents([...events, newBooking]);
    setShowBookingForm(false);
    setSelectedRange({ start: null, end: null });
  };

  const handleSelectEvent = (event: BookingEvent) => {
    setSelectedBooking(event);
    setShowBookingDetails(true);
  };

  // Add this function to style selected dates
  const dayPropGetter = (date: Date) => {
    if (!selectedRange.start) return {};
    
    const isSelected = selectedRange.start && 
      date >= startOfDay(selectedRange.start) && 
      (selectedRange.end ? date <= endOfDay(selectedRange.end) : date <= endOfDay(selectedRange.start));

    if (isSelected) {
      return {
        className: 'selected-day',
        style: {
          backgroundColor: '#1a472a20', // Sage green with opacity
          borderRadius: '0',
        }
      };
    }
    return {};
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#f5f7f0]">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div>Loading...</div>
        </main>
      </div>
    );
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
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            className="mb-8"
            views={['month']}
            defaultView="month"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            dayPropGetter={dayPropGetter}
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            toolbar={true}
          />

          {showBookingForm && selectedRange.start && selectedRange.end && (
            <BookingForm
              onSubmit={handleBookingSubmit}
              onCancel={() => {
                setShowBookingForm(false);
                setSelectedRange({ start: null, end: null });
              }}
              initialStartDate={selectedRange.start}
              initialEndDate={selectedRange.end}
              onDateChange={handleDateChange}
            />
          )}

          {showBookingDetails && selectedBooking && (
            <BookingDetails
              booking={selectedBooking}
              onClose={() => {
                setShowBookingDetails(false);
                setSelectedBooking(null);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

interface BookingFormProps {
  onSubmit: (bookingDetails: { 
    name: string; 
    notes: string; 
    startDate: Date; 
    endDate: Date; 
  }) => void;
  onCancel: () => void;
  initialStartDate: Date;
  initialEndDate: Date;
  onDateChange: (type: 'start' | 'end', date: Date) => void;
}

function BookingForm({ 
  onSubmit, 
  onCancel, 
  initialStartDate, 
  initialEndDate,
  onDateChange 
}: BookingFormProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      name, 
      notes,
      startDate,
      endDate
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-xl w-full relative">
        <h2 className="text-4xl font-serif text-stone-800 mb-6">Book Your Stay</h2>
        
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-xl text-stone-800 mb-2 font-medium">
              Start Date
            </label>
            <input
              type="date"
              value={format(startDate, 'yyyy-MM-dd')}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                setStartDate(newDate);
                onDateChange('start', newDate);
              }}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent text-lg text-stone-800"
            />
          </div>
          
          <div>
            <label className="block text-xl text-stone-800 mb-2 font-medium">
              End Date
            </label>
            <input
              type="date"
              value={format(endDate, 'yyyy-MM-dd')}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                setEndDate(newDate);
                onDateChange('end', newDate);
              }}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent text-lg text-stone-800"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xl text-stone-800 mb-2 font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent text-lg text-stone-800"
              required
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-xl text-stone-800 mb-2 font-medium">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent text-lg text-stone-800"
              rows={5}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-stone-200 text-stone-800 py-4 px-6 rounded-lg text-xl hover:bg-stone-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-[#1a472a] text-white py-4 px-6 rounded-lg text-xl hover:bg-[#143620] transition-colors"
            >
              Book Stay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface BookingDetailsProps {
  booking: BookingEvent;
  onClose: () => void;
}

function BookingDetails({ booking, onClose }: BookingDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-xl w-full relative">
        <h2 className="text-4xl font-serif text-stone-800 mb-6">Booking Details</h2>
        
        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-xl text-stone-800 font-medium mb-2">Dates</h3>
            <p className="text-lg text-stone-600">
              {format(booking.start, 'MMMM d, yyyy')} - {format(booking.end, 'MMMM d, yyyy')}
            </p>
          </div>

          <div>
            <h3 className="text-xl text-stone-800 font-medium mb-2">Booked By</h3>
            <p className="text-lg text-stone-600">{booking.member}</p>
          </div>

          {booking.notes && (
            <div>
              <h3 className="text-xl text-stone-800 font-medium mb-2">Notes</h3>
              <p className="text-lg text-stone-600 whitespace-pre-wrap">{booking.notes}</p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-stone-200 text-stone-800 py-4 px-6 rounded-lg text-xl hover:bg-stone-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
