const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s+\-()]{8,15}$/;

export const validateInquiry = (req, res, next) => {
  const { name, phone, email, service } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Please provide a valid name (at least 2 characters).' });
  }

  if (!phone || !phoneRegex.test(phone.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid phone number.' });
  }

  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (!service || typeof service !== 'string' || service.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Please specify the service you require.' });
  }

  next();
};

export const validateBooking = (req, res, next) => {
  const { name, phone, email, service, date, slot } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Please enter your name.' });
  }

  if (!phone || !phoneRegex.test(phone.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid phone number.' });
  }

  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (!service) {
    return res.status(400).json({ success: false, message: 'Please select an interior or paint service.' });
  }

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ success: false, message: 'Please select a valid consultation date (YYYY-MM-DD).' });
  }

  if (!slot || typeof slot !== 'string') {
    return res.status(400).json({ success: false, message: 'Please choose an available consultation time slot.' });
  }

  next();
};

export const validateNewsletter = (req, res, next) => {
  const { email } = req.body;

  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  next();
};