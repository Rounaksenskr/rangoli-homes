import React from 'react';
import { testimonials } from '../../data/testimonials';

export const Testimonials = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-3">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] tracking-tight mb-4">
            Crafting Homes, Earning Trust
          </h2>
          <p className="text-sm sm:text-base text-[#6E665D]">
            Hear how our turnkey execution and bespoke finishes transformed spaces for our homeowners and enterprise partners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl border border-[#E8E2D8] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex gap-1 text-[#C5A880] mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[#4A4540] leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Project Metadata */}
              <div className="pt-6 border-t border-[#F4F0EA]">
                <h4 className="font-serif text-base font-medium text-[#1A1A1A]">
                  {item.name}
                </h4>
                <p className="text-xs text-[#82786B] mt-0.5">
                  {item.role}
                </p>
                <span className="inline-block mt-3 px-2.5 py-1 rounded bg-[#F4F0EA] text-[#6E665D] text-[11px] font-medium tracking-wide">
                  {item.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};