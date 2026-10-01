import React from 'react';
import { clients } from '../../data/clients';

export const Marquee = () => {
  // Duplicate the list once to guarantee seamless looping
  const tickerItems = [...clients, ...clients];

  return (
    <section className="py-14 bg-[#141312] border-y border-[#292623] overflow-hidden text-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
          Trusted by Industry Leaders & Developers
        </span>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max items-center gap-12 animate-marquee hover:[animation-play-state:paused]">
          {tickerItems.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex items-center gap-4 px-6 py-3 rounded-xl bg-[#1F1D1B] border border-[#332F2A] hover:border-[#C5A880]/50 transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
              <div>
                <span className="font-serif text-sm tracking-widest text-[#FAF8F5] uppercase font-semibold">
                  {client.logoText}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-[#857B6F]">
                  {client.tagline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};