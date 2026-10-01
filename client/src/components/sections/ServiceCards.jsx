import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';

export const ServiceCards = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-3">
            Core Disciplines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-5 tracking-tight">
            Comprehensive Interior Craftsmanship
          </h2>
          <p className="text-sm sm:text-base text-[#6E665D] leading-relaxed">
            From complete residential architectural handovers to ergonomic enterprise suites and lime-wash textured finishes.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative h-72 overflow-hidden bg-[#EAE5DE]">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#1A1A1A]">
                  {service.tagline}
                </span>
              </div>

              {/* Content Block */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#6E665D] leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Highlights Bullet Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.highlights.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-md bg-[#FAF8F5] text-[#524B43] border border-[#E8E2D8]"
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Link */}
                <Link
                  to={service.path}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] group-hover:text-[#B09265] transition-colors"
                >
                  <span>Explore Portfolio</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};