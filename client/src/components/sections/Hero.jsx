import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = ({ onOpenBooking, onOpenInquiry }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#1E1C1A]">
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
          alt="Japandi Minimalist Interior"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform motion-safe:animate-pulse [animation-duration:12s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#1E1C1A]/60 to-[#141312]/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-[#FAF8F5]">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A880]/40 bg-black/30 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#EAD8C0] font-medium">
            Modern Japandi • Bespoke Living
          </span>
        </div>


        {/* Editorial Heading */}
        <h1 
          style={{ color: '#FAF8F5' }} 
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.15] mb-6 text-balance !text-[#FAF8F5]"
        >
          Harmonious spaces shaped by <span className="italic font-normal text-[#C5A880]">warmth</span> and quiet luxury.
        </h1>

        {/* Subtitle */}
        <p 
          style={{ color: '#E0D8CE' }} 
          className="max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-10 text-pretty !text-[#E0D8CE]"
        >
          From full-residence turnkey transformations to executive offices and artisanal mineral wall textures, we design homes that cultivate mindful daily living.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A880] text-[#141312] text-xs uppercase tracking-widest font-semibold hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            Book Free Consultation
          </button>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#FAF8F5]/30 bg-black/20 backdrop-blur-sm text-xs uppercase tracking-widest text-[#FAF8F5] hover:bg-white hover:text-black transition-all duration-300"
          >
            Quick Quote
          </button>
          <Link
            to="/home-interiors"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs uppercase tracking-widest text-[#D3C7B6] hover:text-[#FAF8F5] transition-colors"
          >
            Explore Projects →
          </Link>
        </div>

        {/* Architectural Trust Indicators */}
        <div className="pt-10 border-t border-[#38332D] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-2xl md:text-3xl text-[#C5A880] font-normal">45 Days</div>
            <div className="text-[11px] uppercase tracking-wider text-[#9C9285] mt-1">Guaranteed Handover</div>
          </div>
          <div>
            <div className="font-serif text-2xl md:text-3xl text-[#C5A880] font-normal">10-Year</div>
            <div className="text-[11px] uppercase tracking-wider text-[#9C9285] mt-1">Material Warranty</div>
          </div>
          <div>
            <div className="font-serif text-2xl md:text-3xl text-[#C5A880] font-normal">500+</div>
            <div className="text-[11px] uppercase tracking-wider text-[#9C9285] mt-1">Homes Completed</div>
          </div>
          <div>
            <div className="font-serif text-2xl md:text-3xl text-[#C5A880] font-normal">0% EMI</div>
            <div className="text-[11px] uppercase tracking-wider text-[#9C9285] mt-1">Flexible Financing</div>
          </div>
        </div>
      </div>
    </section>
  );
};