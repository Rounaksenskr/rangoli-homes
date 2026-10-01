import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { errorHandler } from './middleware/errorHandler.js';

import inquiryRoutes from './routes/inquiry.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';

const app = express();

// Enable Cross-Origin Resource Sharing for Vite client
app.use(cors({
  origin: env.clientUrl,
  credentials: true,
}));

// Parse incoming JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply general rate limiting across all API endpoints
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Mount modular feature routes
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Catch 404 routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource endpoint not found.' });
});

// Centralized error handling middleware
app.use(errorHandler);

export default app;