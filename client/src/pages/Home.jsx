import React from 'react';
import { Hero } from '../components/sections/Hero';
import { ServiceCards } from '../components/sections/ServiceCards';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { Marquee } from '../components/sections/Marquee';
import { Testimonials } from '../components/sections/Testimonials';

export const Home = ({ onOpenBooking, onOpenInquiry }) => {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Editorial Japandi Hero */}
      <Hero onOpenBooking={onOpenBooking} onOpenInquiry={onOpenInquiry} />

      {/* Corporate Marquee Partner Banner */}
      <Marquee />

      {/* 3 Core Service Verticals */}
      <ServiceCards />

      {/* Four Guarantees & Differentiators */}
      <WhyChooseUs />

      {/* Mid-page Consultation Banner */}
      <section className="py-20 bg-[#1F1D1B] text-[#FAF8F5] relative overflow-hidden border-y border-[#332F2A]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-3">
            Bespoke Architecture & Finishes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Ready to design your personal sanctuary?
          </h2>
          <p className="text-sm sm:text-base text-[#B0A79C] leading-relaxed max-w-2xl mx-auto mb-8">
            Schedule a 45-minute studio or virtual consultation with our principal interior designers. We review your floor plans and provide transparent BOQ projections.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C5A880] text-[#141312] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Select Consultation Slot
            </button>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#FAF8F5]/30 text-xs uppercase tracking-widest text-[#FAF8F5] hover:bg-white hover:text-black transition-colors"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Real Reviews & Social Proof */}
      <Testimonials />
    </main>
  );
};