import { Router } from 'express';
import { getSlots, createBooking } from '../controllers/booking.controller.js';
import { validateBooking } from '../middleware/validate.js';
import { formLimiter } from '../middleware/rateLimit.js';

const router = Router();

// GET /api/bookings/slots?date=YYYY-MM-DD -> list available slots
router.get('/slots', getSlots);

// POST /api/bookings -> rate limit, validate input, book consultation
router.post('/', formLimiter, validateBooking, createBooking);

export default router;