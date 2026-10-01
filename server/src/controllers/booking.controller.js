import { dbRun, dbAll } from '../config/db.js';
import { calculateAvailableSlots } from '../utils/slots.js';
import { createCalendarBooking } from '../services/calendar.service.js';
import { sendBookingConfirmation } from '../services/mail.service.js';

export const getSlots = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'A valid date query parameter (YYYY-MM-DD) is required.',
      });
    }

    const rows = await dbAll(`SELECT slot FROM bookings WHERE date = ?`, [date]);
    const bookedSlots = rows.map((r) => r.slot);
    const slots = calculateAvailableSlots(bookedSlots);

    return res.status(200).json({
      success: true,
      date,
      slots,
    });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { name, phone, email, service, date, slot } = req.body;

    // Check if slot was already claimed
    const existing = await dbAll(
      `SELECT id FROM bookings WHERE date = ? AND slot = ?`,
      [date, slot]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'This time slot was just booked by another client. Please select another slot.',
      });
    }

    // Schedule in Google Calendar
    const calendarEventId = await createCalendarBooking({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service: service.trim(),
      date,
      slot,
    });

    // Save into SQLite
    const result = await dbRun(
      `INSERT INTO bookings (name, phone, email, service, date, slot, calendar_event_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name.trim(), phone.trim(), email.trim(), service.trim(), date, slot, calendarEventId]
    );

    const bookingData = {
      id: result.id,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: service.trim(),
      date,
      slot,
      calendarEventId,
    };

    // Send confirmation email asynchronously
    sendBookingConfirmation(bookingData).catch(() => {});

    return res.status(201).json({
      success: true,
      message: 'Your design consultation has been successfully scheduled!',
      data: bookingData,
    });
  } catch (error) {
    next(error);
  }
};
