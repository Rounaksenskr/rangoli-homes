import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: false });

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ loading: true, message: '', error: false });
    try {
      const res = await api.subscribeNewsletter(email);
      setStatus({ loading: false, message: res.message || 'Subscribed successfully.', error: false });
      setEmail('');
    } catch (err) {
      setStatus({ loading: false, message: err.message || 'Subscription failed.', error: true });
    }
  };

  return (
    <footer className="bg-[#191816] text-[#FAF8F5] pt-16 pb-12 border-t border-[#332F2A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-[#C5A880] flex items-center justify-center bg-black/60">
                <span className="font-serif text-xs text-[#C5A880]">RH</span>
              </div>
              <span className="font-serif text-xl tracking-wider uppercase font-semibold text-[#FAF8F5]">
                RangoliHomes
              </span>
            </div>
            <p className="text-sm text-[#A89F91] leading-relaxed mb-6">
              Modern Japandi aesthetics, turnkey residential interiors, bespoke modular systems, and artisanal texture coatings crafted with precision.
            </p>
            <div className="text-xs text-[#C5A880] tracking-wider uppercase font-medium">
              Gurugram • Delhi NCR • Bengaluru
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#FAF8F5] mb-5 pb-2 border-b border-[#332F2A]">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-[#A89F91]">
              <li>
                <Link to="/home-interiors" className="hover:text-[#C5A880] transition-colors">
                  Turnkey Home Interiors
                </Link>
              </li>
              <li>
                <Link to="/office-interiors" className="hover:text-[#C5A880] transition-colors">
                  Commercial & Office Spaces
                </Link>
              </li>
              <li>
                <Link to="/paint-services" className="hover:text-[#C5A880] transition-colors">
                  Artisanal Paints & Textures
                </Link>
              </li>
              <li>
                <Link to="/clientele" className="hover:text-[#C5A880] transition-colors">
                  Corporate Clientele & Work
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A880] transition-colors">
                  Contact Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#FAF8F5] mb-5 pb-2 border-b border-[#332F2A]">
              Design Studio
            </h4>
            <ul className="space-y-3 text-sm text-[#A89F91]">
              <li className="flex items-start gap-2">
                <span className="text-[#C5A880]">📍</span>
                <span>Sector 43, Golf Course Road, Gurugram, HR 122002</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C5A880]">📞</span>
                <a href="tel:+919876543210" className="hover:text-[#C5A880] transition-colors">
                  +91 (0124) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C5A880]">✉️</span>
                <a href="mailto:support@rangolihomes.com" className="hover:text-[#C5A880] transition-colors">
                  support@rangolihomes.com
                </a>
              </li>
              <li className="text-xs text-[#82786B] mt-2">
                Mon - Sat: 10:00 AM – 7:00 PM IST
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#FAF8F5] mb-5 pb-2 border-b border-[#332F2A]">
              Design Lookbook
            </h4>
            <p className="text-sm text-[#A89F91] mb-4">
              Subscribe to receive seasonal color trend forecasts and architectural project debuts.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#24221F] border border-[#3D3831] text-sm text-[#FAF8F5] placeholder-[#736B5E] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-2.5 rounded-lg bg-[#C5A880] text-[#191816] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors disabled:opacity-50"
              >
                {status.loading ? 'Subscribing...' : 'Join Journal'}
              </button>
            </form>
            {status.message && (
              <p className={`mt-2 text-xs ${status.error ? 'text-rose-400' : 'text-emerald-400'}`}>
                {status.message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262420] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7165] gap-4">
          <p>© 2026 RangoliHomes. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#A89F91] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#A89F91] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#A89F91] cursor-pointer">Warranty Coverage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};