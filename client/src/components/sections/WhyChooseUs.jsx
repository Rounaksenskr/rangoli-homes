import React from 'react';

export const WhyChooseUs = () => {
  const pillars = [
    {
      step: '01',
      title: 'Precision 3D & VR Previews',
      description: 'Experience your exact layout, natural lighting, and finishes in photorealistic renders before construction begins.',
      icon: '📐',
    },
    {
      step: '02',
      title: '45-Day Move-In Guarantee',
      description: 'Rigorous project management with daily milestone tracking ensures zero unexpected handover delays.',
      icon: '⏱️',
    },
    {
      step: '03',
      title: '10-Year Structural Warranty',
      description: 'German hardware, commercial-grade termite-treated ply, and certified water-resistant cabinetry cores.',
      icon: '🛡️',
    },
    {
      step: '04',
      title: 'Transparent Bill of Quantities',
      description: 'Clear pricing with zero hidden charges. Every screw, board, and finish code is specified upfront.',
      icon: '📋',
    },
  ];

  return (
    <section className="py-24 bg-[#F4F0EA] text-[#1A1A1A] border-y border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-3">
              The Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] tracking-tight">
              Why Homeowners Choose RangoliHomes
            </h2>
          </div>
          <p className="text-sm text-[#6E665D] max-w-md">
            Eliminating traditional contractor guesswork through rigorous architectural discipline and full material transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.step}
              className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#E8E2D8] hover:border-[#C5A880] transition-colors relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl">{pillar.icon}</span>
                  <span className="font-serif text-sm text-[#B09265] tracking-widest">{pillar.step}</span>
                </div>
                <h3 className="font-serif text-xl font-normal text-[#1A1A1A] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#6E665D] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};