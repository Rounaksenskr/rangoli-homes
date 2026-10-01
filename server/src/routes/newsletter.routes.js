import { Router } from 'express';
import { subscribeNewsletter } from '../controllers/newsletter.controller.js';
import { validateNewsletter } from '../middleware/validate.js';
import { formLimiter } from '../middleware/rateLimit.js';

const router = Router();

// POST /api/newsletter/subscribe -> rate limit, validate email, save subscriber
router.post('/subscribe', formLimiter, validateNewsletter, subscribeNewsletter);

export default router;