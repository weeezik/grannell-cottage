import { Booking } from '@/hooks/useBookings';

export function checkOverlappingBookings(
  startDate: Date,
  endDate: Date,
  existingBookings: Booking[],
  currentBookingId?: string
): boolean {
  return existingBookings.some(booking => {
    if (booking.id === currentBookingId) return false;
    
    const bookingStart = new Date(booking.start);
    const bookingEnd = new Date(booking.end);

    return (
      (startDate >= bookingStart && startDate <= bookingEnd) ||
      (endDate >= bookingStart && endDate <= bookingEnd) ||
      (startDate <= bookingStart && endDate >= bookingEnd)
    );
  });
}
