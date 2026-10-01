import { dbRun, dbAll } from '../config/db.js';

export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await dbAll(`SELECT id FROM newsletter WHERE email = ?`, [cleanEmail]);

    if (existing.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to our luxury design editorial!',
      });
    }

    await dbRun(`INSERT INTO newsletter (email) VALUES (?)`, [cleanEmail]);

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to RangoliHomes lookbooks and updates.',
    });
  } catch (error) {
    next(error);
  }
};