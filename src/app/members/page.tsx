'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/styles/calendar.css';
import Navigation from '@/components/Navigation';
import { useBookings } from '@/hooks/useBookings';
import { checkOverlappingBookings } from '@/utils/bookingUtils';
import Notification from '@/components/Notification';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface BookingFormProps {
  onSubmit: (booking: { name: string; notes: string; startDate: Date; endDate: Date }) => void;
  onCancel: () => void;
  initialStartDate: Date;
  initialEndDate: Date;
  onDateChange: (type: 'start' | 'end', date: Date) => void;
}

function BookingForm({ onSubmit, onCancel, initialStartDate, initialEndDate, onDateChange }: BookingFormProps) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  // Helper function to handle timezone issues
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to parse date strings without timezone issues
  const parseInputDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day, 12); // Set to noon to avoid timezone issues
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      notes,
      startDate,
      endDate
    });
  };

  const handleDateChange = (type: 'start' | 'end', dateString: string) => {
    const date = parseInputDate(dateString);
    
    if (type === 'start') {
      setStartDate(date);
      if (date > endDate) {
        setEndDate(date);
        onDateChange('end', date);
      }
    } else {
      setEndDate(date);
      if (date < startDate) {
        setStartDate(date);
        onDateChange('start', date);
      }
    }
    onDateChange(type, date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-xl w-full relative">
        <h2 className="text-4xl font-serif text-stone-800 mb-6">Book Your Stay</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-xl text-stone-800 mb-2 font-medium">
                Start Date
              </label>
              <input
                type="date"
                value={formatDateForInput(startDate)}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent text-lg text-stone-800"
              />
            </div>
            
            <div>
              <label className="block text-xl text-stone-800 mb-2 font-medium">
                End Date
              </label>
              <input
                type="date"
                value={formatDateForInput(endDate)}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#1a472a] focus:border-transparent text-lg text-stone-800"
                min={formatDateForInput(startDate)}
              />
            </div>
          </div>

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
  booking: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    member: string;
    notes?: string;
  };
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
}

function BookingDetails({ booking, onClose, onDelete }: BookingDetailsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setIsDeleting(true);
      await onDelete(booking.id);
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-xl w-full relative">
        <h2 className="text-4xl font-serif text-stone-800 mb-6">Booking Details</h2>
        
        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-xl text-stone-800 font-medium mb-2">Dates</h3>
            <p className="text-lg text-stone-600">
              {format(new Date(booking.start), 'MMMM d, yyyy')} - {format(new Date(booking.end), 'MMMM d, yyyy')}
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

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="w-full bg-stone-200 text-stone-800 py-4 px-6 rounded-lg text-xl hover:bg-stone-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full bg-red-600 text-white py-4 px-6 rounded-lg text-xl hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MembersArea() {
  const { status } = useSession();
  const router = useRouter();
  const { bookings, loading: bookingsLoading, addBooking, deleteBooking } = useBookings();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  
  interface BookingType {
    id: string;
    title: string;
    start: Date;
    end: Date;
    member: string;
    notes?: string;
  }
  
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    console.log('Current bookings:', bookings);
  }, [bookings]);

  interface SlotInfo {
    start: Date;
    end: Date;
    slots: Date[];
    action: 'select' | 'click' | 'doubleClick';
  }

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (!selectedRange.start) {
      setSelectedRange({
        start: slotInfo.start,
        end: null
      });
    } else if (!selectedRange.end) {
      setSelectedRange(prev => ({
        start: prev.start,
        end: slotInfo.start
      }));
      setShowBookingForm(true);
    }
  };

  const handleSelectEvent = (event: BookingType) => {
    setSelectedBooking(event);
    setShowBookingDetails(true);
  };

  const handleBookingSubmit = async (bookingDetails: {
    name: string;
    notes: string;
    startDate: Date;
    endDate: Date;
  }) => {
    try {
      // Check for overlapping bookings
      const hasOverlap = checkOverlappingBookings(
        bookingDetails.startDate,
        bookingDetails.endDate,
        bookings
      );

      if (hasOverlap) {
        setNotification({
          type: 'error',
          message: 'This date range overlaps with an existing booking'
        });
        return;
      }

      const result = await addBooking({
        title: `Booked by ${bookingDetails.name}`,
        start: bookingDetails.startDate.toISOString(),
        end: endOfDay(bookingDetails.endDate).toISOString(),
        member: bookingDetails.name,
        notes: bookingDetails.notes
      });

      if (result.success) {
        setShowBookingForm(false);
        setSelectedRange({ start: null, end: null });
        setNotification({
          type: 'success',
          message: 'Booking created successfully!'
        });
      } else {
        setNotification({
          type: 'error',
          message: 'Failed to create booking. Please try again.'
        });
      }
    } catch (_err) {
      console.error('Error submitting booking:', _err);
      setNotification({
        type: 'error',
        message: 'An error occurred while submitting the booking. Please try again later.'
      });
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const result = await deleteBooking(bookingId);
      if (result.success) {
        setNotification({
          type: 'success',
          message: 'Booking deleted successfully!'
        });
      } else {
        setNotification({
          type: 'error',
          message: 'Failed to delete booking. Please try again.'
        });
      }
    } catch (_) {
      setNotification({
        type: 'error',
        message: 'An error occurred while deleting the booking.'
      });
    }
  };

  const dayPropGetter = (date: Date) => {
    if (!selectedRange.start) return {};
    
    const isSelected = selectedRange.start && 
      date >= startOfDay(selectedRange.start) && 
      (selectedRange.end ? date <= endOfDay(selectedRange.end) : date <= endOfDay(selectedRange.start));

    if (isSelected) {
      return {
        className: 'selected-day',
        style: {
          backgroundColor: '#1a472a20',
          borderRadius: '0',
        }
      };
    }
    return {};
  };

  if (status === 'loading' || bookingsLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7f0] flex items-center justify-center">
        <div className="text-xl text-stone-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f0]">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-stone-800 mb-8">Members Area</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Calendar
            localizer={localizer}
            events={bookings.map(booking => ({
              ...booking,
              start: new Date(booking.start),
              end: new Date(booking.end)
            }))}
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
              onDateChange={(type, date) => {
                setSelectedRange(prev => ({
                  ...prev,
                  [type]: date
                }));
              }}
            />
          )}

          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}

          {showBookingDetails && selectedBooking && (
            <BookingDetails
              booking={selectedBooking}
              onClose={() => {
                setShowBookingDetails(false);
                setSelectedBooking(null);
              }}
              onDelete={handleDeleteBooking}
            />
          )}
        </div>
      </main>
    </div>
  );
} 