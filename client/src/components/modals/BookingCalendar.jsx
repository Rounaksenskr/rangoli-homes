import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const BookingCalendar = ({ isOpen, onClose }) => {
  const getTodayString = () => new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [step, setStep] = useState(1); // 1 = Pick Slot, 2 = Contact Details
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Turnkey Home Interiors',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  // Fetch slots whenever selectedDate changes
  useEffect(() => {
    if (!isOpen || !selectedDate) return;

    let isMounted = true;
    setLoadingSlots(true);
    setSelectedSlot('');

    api.getAvailableSlots(selectedDate)
      .then((res) => {
        if (isMounted) {
          setAvailableSlots(res.slots || []);
          setLoadingSlots(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load slots:', err);
          setLoadingSlots(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedDate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      await api.createBooking({
        ...formData,
        date: selectedDate,
        slot: selectedSlot,
      });

      setStatus({ loading: false, error: '', success: true });
      setTimeout(() => {
        setStatus({ loading: false, error: '', success: false });
        setStep(1);
        onClose();
      }, 3000);
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || 'Booking conflict or error. Please choose another slot.',
        success: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E8E2D8] rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAE5DE] text-[#6E665D] hover:text-[#1A1A1A] flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {status.success ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#C5A880]/20 text-[#9E7B4F] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              ✓
            </div>
            <h3 className="font-serif text-3xl text-[#1A1A1A] mb-2">Consultation Confirmed</h3>
            <p className="text-sm text-[#6E665D] max-w-md mx-auto leading-relaxed">
              Your design session is scheduled for <strong className="text-[#1A1A1A]">{selectedDate}</strong> at <strong className="text-[#1A1A1A]">{selectedSlot}</strong>. A calendar invite has been sent to {formData.email}.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-1">
                Virtual / Studio Appointment
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                Schedule Design Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#6E665D] mt-1">
                Step {step} of 2: {step === 1 ? 'Choose Date & Time Slot' : 'Confirm Your Details'}
              </p>
            </div>

            {status.error && (
              <div className="p-3 mb-4 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {status.error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-2">
                    Select Consultation Date
                  </label>
                  <input
                    type="date"
                    min={getTodayString()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-2">
                    Available Time Windows (IST)
                  </label>
                  {loadingSlots ? (
                    <div className="py-8 text-center text-xs text-[#82786B]">Checking availability...</div>
                  ) : availableSlots.length === 0 ? (
                    <div className="py-8 text-center text-xs text-rose-600 bg-rose-50 rounded-lg">
                      No slots available for this date. Please pick another day.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {availableSlots.map((s) => (
                        <button
                          key={s.slot}
                          type="button"
                          disabled={!s.available}
                          onClick={() => setSelectedSlot(s.slot)}
                          className={`px-4 py-3 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                            !s.available
                              ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed line-through'
                              : selectedSlot === s.slot
                              ? 'bg-[#1A1A1A] text-[#FAF8F5] border-[#1A1A1A] shadow-md scale-[1.01]'
                              : 'bg-white text-[#1A1A1A] border-[#DCD5CB] hover:border-[#B09265]'
                          }`}
                        >
                          <span>{s.slot}</span>
                          <span className="text-[10px] uppercase tracking-wider opacity-75">
                            {s.available ? (selectedSlot === s.slot ? 'Selected' : 'Available') : 'Booked'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t border-[#E8E2D8]">
                  <button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-lg bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#B09265] hover:text-black transition-colors disabled:opacity-40"
                  >
                    Continue to Details →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D8] text-xs flex justify-between items-center text-[#524B43]">
                  <span>📅 <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong></span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#B09265] underline uppercase tracking-wider font-semibold text-[10px]"
                  >
                    Change Slot
                  </button>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Mehta"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@example.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                    Service Focus
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                  >
                    <option value="Turnkey Home Interiors">Turnkey Home Interiors</option>
                    <option value="Commercial & Office Spaces">Commercial & Office Spaces</option>
                    <option value="Artisanal Paint & Textures">Artisanal Paint & Textures</option>
                    <option value="Modular Kitchen & Closets">Modular Kitchen & Closets</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D8]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider text-[#6E665D] hover:text-[#1A1A1A]"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="px-6 py-2.5 rounded-lg bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#B09265] hover:text-black transition-colors disabled:opacity-50"
                  >
                    {status.loading ? 'Syncing with Calendar...' : 'Confirm Consultation'}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};