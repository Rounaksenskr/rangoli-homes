import { Router } from 'express';
import { createInquiry, getInquiries } from '../controllers/inquiry.controller.js';
import { validateInquiry } from '../middleware/validate.js';
import { formLimiter } from '../middleware/rateLimit.js';

const router = Router();

// POST /api/inquiries -> rate limit, validate input, save inquiry
router.post('/', formLimiter, validateInquiry, createInquiry);

// GET /api/inquiries -> fetch list of inquiries
router.get('/', getInquiries);

export default router;