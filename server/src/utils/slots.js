export const DEFAULT_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM'
];

/**
 * Returns available slots for a given date by subtracting booked slots.
 * @param {string[]} bookedSlots - List of slot strings already reserved.
 * @returns {string[]} List of remaining available slots.
 */
export const calculateAvailableSlots = (bookedSlots = []) => {
  const bookedSet = new Set(bookedSlots);
  return DEFAULT_SLOTS.map((slot) => ({
    slot,
    available: !bookedSet.has(slot),
  }));
};