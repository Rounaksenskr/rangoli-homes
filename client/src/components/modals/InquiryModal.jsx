import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const InquiryModal = ({ isOpen, onClose, initialService = 'Turnkey Home Interiors' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService,
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: initialService }));
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      await api.submitInquiry(formData);
      setStatus({ loading: false, error: '', success: true });
      setTimeout(() => {
        setStatus({ loading: false, error: '', success: false });
        onClose();
      }, 2500);
    } catch (err) {
      setStatus({ loading: false, error: err.message || 'Submission failed. Please try again.', success: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E8E2D8] rounded-2xl shadow-2xl p-8 sm:p-10 overflow-hidden"
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
          <div className="text-center py-10">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">Inquiry Received</h3>
            <p className="text-sm text-[#6E665D] leading-relaxed">
              Thank you, {formData.name}. Our senior design specialist will reach out within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-1">
                Consult With Us
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                Request Design Estimate
              </h3>
              <p className="text-xs sm:text-sm text-[#6E665D] mt-1">
                Share your space requirements for a tailored BOQ and 3D preview consultation.
              </p>
            </div>

            {status.error && (
              <div className="p-3 mb-4 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  required
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                  Service Category *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                >
                  <option value="Turnkey Home Interiors">Turnkey Home Interiors (Full Residence)</option>
                  <option value="Modular Kitchen & Wardrobes">Modular Kitchen & Wardrobes</option>
                  <option value="Commercial & Office Spaces">Commercial & Office Spaces</option>
                  <option value="Artisanal Paint & Textures">Artisanal Paint & Lime-wash Textures</option>
                  <option value="Architectural Lighting & Decor">Architectural Lighting & Decor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                  Space Details or Notes
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g. 3BHK 1650 sq.ft apartment in Gurugram, possession next month."
                  className="w-full px-4 py-2 rounded-lg bg-white border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-3 rounded-lg bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#B09265] hover:text-black transition-colors disabled:opacity-50 mt-2"
              >
                {status.loading ? 'Submitting Details...' : 'Request Consultation Call'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};