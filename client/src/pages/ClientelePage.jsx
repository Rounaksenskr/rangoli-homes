import React from 'react';
import { clients } from '../data/clients';

export const ClientelePage = ({ onOpenInquiry, onOpenBooking }) => {
  const caseStudies = [
    {
      title: 'Vanguard Headquarters Executive Wing',
      client: 'Vanguard Capital',
      scope: 'Turnkey Commercial Interior & Boardroom Suite',
      area: '18,500 sq.ft',
      timeline: '55 Days',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      description: 'End-to-end fit-out including bespoke acoustic paneling, fluted timber partitions, and custom executive conference tables.',
    },
    {
      title: 'DLF Crest Duplex Sanctuary',
      client: 'Private Residence',
      scope: 'Full Japandi Turnkey Residential Renovation',
      area: '4,200 sq.ft',
      timeline: '42 Days',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      description: 'Complete home transformation featuring bespoke modular ash wood cabinetry, lime-wash mineral feature walls, and zero-VOC coatings.',
    },
    {
      title: 'Nexus Innovation Hub',
      client: 'Nexus Digital',
      scope: 'Biophilic Agile Workspace & Town Hall',
      area: '12,000 sq.ft',
      timeline: '48 Days',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      description: 'Dynamic breakout pods, integrated ergonomic desking systems, and bespoke architectural cove illumination.',
    },
  ];

  return (
    <main className="pt-24 bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#1B1917] text-[#FAF8F5] relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-3">
            Partners & Collaborations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
            Trusted by Discerning Clients & Developers
          </h1>
          <p className="text-sm sm:text-base text-[#C2B7A8] max-w-2xl mx-auto leading-relaxed mb-8">
            From luxury residential towers to enterprise corporate offices, we deliver spaces marked by precision craftsmanship and deadline integrity.
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-7 py-3 rounded-full bg-[#C5A880] text-[#141312] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Initiate Corporate RFQ
            </button>
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-7 py-3 rounded-full border border-white/30 text-xs uppercase tracking-widest text-[#FAF8F5] hover:bg-white hover:text-black transition-colors"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Partners Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-2">
            Client Directory
          </span>
          <h2 className="font-serif text-3xl font-light text-[#1A1A1A]">
            Selected Corporate & Real Estate Engagements
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="p-6 rounded-2xl bg-white border border-[#E8E2D8] flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-[#F4F0EA] flex items-center justify-center text-[#B09265] font-serif text-base font-semibold mb-3">
                {client.logoText.slice(0, 2)}
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-1">
                {client.logoText}
              </h3>
              <p className="text-xs text-[#82786B] uppercase tracking-wider">
                {client.tagline}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 bg-[#F4F0EA] border-t border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-2">
              Demonstrated Delivery
            </span>
            <h2 className="font-serif text-3xl font-light text-[#1A1A1A]">
              Featured Project Case Studies
            </h2>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 h-72 lg:h-full min-h-[300px] overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="lg:col-span-6 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#B09265] font-semibold">
                      {study.client}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] mt-1 mb-4">
                      {study.title}
                    </h3>
                    <p className="text-sm text-[#6E665D] leading-relaxed mb-6">
                      {study.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#F4F0EA] mb-6">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#82786B]">Project Scope</span>
                        <span className="text-xs font-semibold text-[#1A1A1A]">{study.scope}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#82786B]">Floor Area</span>
                        <span className="text-xs font-semibold text-[#1A1A1A]">{study.area}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#82786B]">Delivery</span>
                        <span className="text-xs font-semibold text-[#1A1A1A]">{study.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="self-start text-xs uppercase tracking-widest font-semibold text-[#B09265] hover:text-[#1A1A1A] transition-colors"
                  >
                    Request Case Study Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};