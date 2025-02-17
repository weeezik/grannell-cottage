import { useEffect, useState } from 'react';
import { ref, onValue, push, remove } from 'firebase/database';
import { database } from '@/lib/firebase';

export interface Booking {
  id: string;
  title: string;
  start: string;
  end: string;
  member: string;
  notes?: string;
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookingsRef = ref(database, 'bookings');
    
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const bookingsList = Object.entries(data).map(([id, booking]) => ({
          id,
          ...(booking as Omit<Booking, 'id'>)
        }));
        setBookings(bookingsList);
      } else {
        setBookings([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    try {
      const bookingsRef = ref(database, 'bookings');
      await push(bookingsRef, booking);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to add booking' 
      };
    }
  };

  const deleteBooking = async (bookingId: string) => {
    try {
      const bookingRef = ref(database, `bookings/${bookingId}`);
      await remove(bookingRef);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete booking' 
      };
    }
  };

  return {
    bookings,
    loading,
    addBooking,
    deleteBooking
  };
}
