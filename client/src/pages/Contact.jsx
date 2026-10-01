import React, { useState } from 'react';
import { api } from '../services/api';

export const Contact = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Turnkey Home Interiors',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      await api.submitInquiry(formData);
      setStatus({ loading: false, error: '', success: true });
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Turnkey Home Interiors',
        message: '',
      });
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || 'Submission failed. Please check your network and try again.',
        success: false,
      });
    }
  };

  return (
    <main className="pt-24 bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Header */}
      <section className="py-16 bg-[#1A1917] text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-3">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mb-4">
            Connect with our Studio
          </h1>
          <p className="text-sm sm:text-base text-[#BFB5A8] max-w-xl mx-auto leading-relaxed">
            Discuss your upcoming residence, commercial fit-out, or request an in-person studio visit with our architectural team.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Studio Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#B09265] font-semibold block mb-2">
                Locations & Studios
              </span>
              <h2 className="font-serif text-3xl font-light text-[#1A1A1A] mb-4">
                RangoliHomes Design HQ
              </h2>
              <p className="text-sm text-[#6E665D] leading-relaxed">
                Visit our experience center to inspect live kitchen vignettes, wardrobe joinery mockups, and tactile lime-wash texture panels.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#E8E2D8]">
              <div className="flex items-start gap-4">
                <span className="text-xl">📍</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A1A1A]">Studio & Experience Center</h3>
                  <p className="text-xs sm:text-sm text-[#6E665D] mt-1">
                    Level 3, Signature Towers, Sector 43, Golf Course Road, Gurugram, HR 122002
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-xl">📞</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A1A1A]">Direct Phone</h3>
                  <p className="text-xs sm:text-sm text-[#6E665D] mt-1">
                    <a href="tel:+919876543210" className="hover:text-[#B09265] transition-colors">
                      +91 (0124) 456-7890
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-xl">✉️</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A1A1A]">Electronic Mail</h3>
                  <p className="text-xs sm:text-sm text-[#6E665D] mt-1">
                    <a href="mailto:support@rangolihomes.com" className="hover:text-[#B09265] transition-colors">
                      support@rangolihomes.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-xl">⏱️</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A1A1A]">Studio Timings</h3>
                  <p className="text-xs sm:text-sm text-[#6E665D] mt-1">
                    Monday to Saturday: 10:00 AM – 7:00 PM IST<br />
                    Sunday: By Prior Appointment Only
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA Card */}
            <div className="p-6 rounded-2xl bg-[#F4F0EA] border border-[#E8E2D8]">
              <h3 className="font-serif text-lg font-normal text-[#1A1A1A] mb-2">
                Prefer an instant calendar slot?
              </h3>
              <p className="text-xs text-[#6E665D] mb-4 leading-relaxed">
                Skip the back-and-forth email exchange. Pick a dedicated 45-minute virtual or studio slot directly on our calendar.
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-full bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#B09265] hover:text-black transition-colors"
              >
                Open Booking Calendar →
              </button>
            </div>
          </div>

          {/* Contact & Inquiry Form Column */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E2D8] shadow-sm">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B09265] font-semibold block mb-1">
              Project Brief
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] mb-6">
              Send an Inquiry
            </h2>

            {status.success ? (
              <div className="p-8 text-center bg-[#FAF8F5] rounded-xl border border-[#E8E2D8]">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">Thank You for Connecting</h3>
                <p className="text-sm text-[#6E665D]">
                  Your inquiry has been received. Our senior design team will review your specifications and reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status.error && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                    {status.error}
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rohan Roy"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
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
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
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
                      placeholder="rohan@example.com"
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                    Service Requirement
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                  >
                    <option value="Turnkey Home Interiors">Turnkey Home Interiors</option>
                    <option value="Modular Kitchen & Wardrobes">Modular Kitchen & Wardrobes</option>
                    <option value="Commercial & Office Spaces">Commercial & Office Spaces</option>
                    <option value="Artisanal Paint & Textures">Artisanal Paint & Textures</option>
                    <option value="Architectural Lighting & Decor">Architectural Lighting & Decor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#524B43] mb-1">
                    Space Details / Project Notes
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about the property type, square footage, current possession status, and aesthetic goals."
                    className="w-full px-4 py-2 rounded-lg bg-[#FAF8F5] border border-[#DCD5CB] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B09265]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-3.5 rounded-lg bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#B09265] hover:text-black transition-colors disabled:opacity-50"
                >
                  {status.loading ? 'Transmitting Details...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};