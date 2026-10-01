const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic request helper with automatic JSON handling and error parsing
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong. Please try again.');
    }

    return result;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, error.message);
    throw error;
  }
};

export const api = {
  // Submit an inquiry from modal, sticky buttons, or contact page
  submitInquiry: (data) =>
    request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get available consultation slots for a chosen date (YYYY-MM-DD)
  getAvailableSlots: (date) =>
    request(`/bookings/slots?date=${encodeURIComponent(date)}`, {
      method: 'GET',
    }),

  // Confirm and book a consultation slot
  createBooking: (data) =>
    request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Subscribe an email address to the newsletter
  subscribeNewsletter: (email) =>
    request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};