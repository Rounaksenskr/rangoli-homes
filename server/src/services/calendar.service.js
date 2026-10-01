import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentialsPath = path.resolve(__dirname, '../../', env.google.keyPath);

/**
 * Initializes and returns an authenticated Google Calendar API client
 */
const getCalendarClient = () => {
  if (!fs.existsSync(credentialsPath)) {
    return null;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    return google.calendar({ version: 'v3', auth });
  } catch (err) {
    console.warn('⚠️ Google Calendar credentials failed to load:', err.message);
    return null;
  }
};

/**
 * Formats date and slot into ISO string range (start/end)
 */
const parseSlotToDateRange = (dateStr, slotStr) => {
  // Expected slot format: "10:00 AM - 11:00 AM"
  const [startTimePart, endTimePart] = slotStr.split(' - ').map((s) => s.trim());

  const parseTime = (tPart) => {
    const [time, modifier] = tPart.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return { hours, minutes };
  };

  const start = parseTime(startTimePart);
  const end = parseTime(endTimePart);

  const startIso = new Date(`${dateStr}T${String(start.hours).padStart(2, '0')}:${String(start.minutes).padStart(2, '0')}:00+05:30`).toISOString();
  const endIso = new Date(`${dateStr}T${String(end.hours).padStart(2, '0')}:${String(end.minutes).padStart(2, '0')}:00+05:30`).toISOString();

  return { startIso, endIso };
};

/**
 * Schedules an event in Google Calendar
 */
export const createCalendarBooking = async ({ name, email, phone, service, date, slot }) => {
  const calendar = getCalendarClient();

  if (!calendar) {
    console.log(`ℹ️ [Demo Mode] Google Calendar credentials not active. Mocking calendar event for ${name} on ${date} (${slot}).`);
    return `mock_evt_${Date.now()}`;
  }

  try {
    const { startIso, endIso } = parseSlotToDateRange(date, slot);

    const event = {
      summary: `RangoliHomes Consultation: ${name} (${service})`,
      description: `Client Consultation Booking Details:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nSlot: ${slot}`,
      start: { dateTime: startIso },
      end: { dateTime: endIso },
      attendees: [{ email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: env.google.calendarId,
      requestBody: event,
    });

    console.log(`📅 Google Calendar event scheduled: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.warn(`⚠️ Google Calendar sync failed (${error.message}). Saving appointment locally.`);
    return `local_only_${Date.now()}`;
  }
};