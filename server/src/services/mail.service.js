import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465,
  auth: env.smtp.user && env.smtp.pass ? {
    user: env.smtp.user,
    pass: env.smtp.pass,
  } : undefined,
});

/**
 * Reads an HTML template and replaces mustache placeholders like {{key}}
 */
const renderTemplate = (templateName, data) => {
  const filePath = path.resolve(__dirname, `../templates/${templateName}`);
  let content = fs.readFileSync(filePath, 'utf-8');

  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(regex, value ?? '');
  }

  return content;
};

/**
 * Dispatch email alert to admin team regarding a new inquiry
 */
export const sendAdminInquiryNotification = async (inquiry) => {
  try {
    const html = renderTemplate('adminInquiry.html', inquiry);
    await transporter.sendMail({
      from: `"RangoliHomes System" <${env.adminEmail}>`,
      to: env.adminEmail,
      subject: `[New Lead Alert] Inquiry from ${inquiry.name} - ${inquiry.service}`,
      html,
    });
    console.log(`✉️ Admin notification email sent for lead: ${inquiry.email}`);
  } catch (error) {
    console.warn(`⚠️️ Failed to send admin email alert (${error.message}). Continuing gracefully.`);
  }
};

/**
 * Dispatch confirmation email to client for an inquiry
 */
export const sendUserInquiryConfirmation = async (inquiry) => {
  try {
    const html = renderTemplate('userConfirmation.html', inquiry);
    await transporter.sendMail({
      from: `"RangoliHomes" <${env.adminEmail}>`,
      to: inquiry.email,
      subject: 'Thank you for contacting RangoliHomes',
      html,
    });
    console.log(`✉️ User confirmation email sent to: ${inquiry.email}`);
  } catch (error) {
    console.warn(`⚠️ Failed to send user confirmation email (${error.message}). Continuing gracefully.`);
  }
};

/**
 * Dispatch consultation confirmation email to client
 */
export const sendBookingConfirmation = async (booking) => {
  try {
    const html = renderTemplate('bookingConfirmation.html', booking);
    await transporter.sendMail({
      from: `"RangoliHomes Consultations" <${env.adminEmail}>`,
      to: booking.email,
      subject: `Consultation Confirmed: ${booking.date} at ${booking.slot}`,
      html,
    });
    console.log(`✉️️ Booking confirmation email sent to: ${booking.email}`);
  } catch (error) {
    console.warn(`⚠️ Failed to send booking confirmation email (${error.message}). Continuing gracefully.`);
  }
};