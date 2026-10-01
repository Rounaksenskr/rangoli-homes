import { dbRun, dbAll } from '../config/db.js';
import { sendAdminInquiryNotification, sendUserInquiryConfirmation } from '../services/mail.service.js';

export const createInquiry = async (req, res, next) => {
  try {
    const { name, phone, email, service, message } = req.body;

    const result = await dbRun(
      `INSERT INTO inquiries (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?)`,
      [name.trim(), phone.trim(), email.trim(), service.trim(), (message || '').trim()]
    );

    const newInquiry = {
      id: result.id,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: service.trim(),
      message: (message || '').trim(),
    };

    // Trigger emails asynchronously without blocking response
    sendAdminInquiryNotification(newInquiry).catch(() => {});
    sendUserInquiryConfirmation(newInquiry).catch(() => {});

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted. Our team will contact you shortly.',
      data: { id: result.id },
    });
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const rows = await dbAll(`SELECT * FROM inquiries ORDER BY created_at DESC`);
    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};