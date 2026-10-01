import React from 'react';
import { ServiceGrid } from '../components/sections/ServiceGrid';

export const OfficeInteriors = ({ onOpenInquiry, onOpenBooking, setSelectedProject }) => {
  const officeProjects = [
    {
      id: 'off-1',
      title: 'Executive Boardroom & Conference Suite',
      category: 'Meeting Architecture',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      description: 'Solid walnut conference table with concealed data/power channels and acoustic felt ceiling baffles.',
    },
    {
      id: 'off-2',
      title: 'Biophilic Agile Workstations',
      category: 'Open Office',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      description: 'Modular height-adjustable desking systems, integrated planters, and low-VOC natural finishes.',
    },
    {
      id: 'off-3',
      title: 'Private Focus & Acoustic Pods',
      category: 'Focus Zones',
      image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80',
      description: 'Double-glazed sound-insulated phone and breakout pods with integrated air circulation.',
    },
    {
      id: 'off-4',
      title: 'Minimalist Corporate Reception',
      category: 'Client Experience',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      description: 'Monolithic concrete reception desk, curved timber fluting, and subtle backlit brand signage.',
    },
    {
      id: 'off-5',
      title: 'Collaborative Town Hall & Pantry',
      category: 'Social Hub',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      description: 'Tiered stadium seating, terrazzo counter islands, and warm 3000K circadian lighting systems.',
    },
    {
      id: 'off-6',
      title: 'Boutique Tech Studio Suite',
      category: 'Private Offices',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      description: 'Industrial glass partitions, black powder-coated aluminum framing, and oak veneer cabinetry.',
    },
  ];

  const handleSelectProject = (project) => {
    if (setSelectedProject) setSelectedProject(project.title);
    onOpenInquiry();
  };

  return (
    <main className="pt-24 bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Editorial Commercial Hero */}
      <section className="py-16 md:py-24 bg-[#18191A] text-[#FAF8F5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt="Office Interiors Showcase"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-3">
            Commercial & Workplace Design
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight max-w-3xl mb-6">
            High-Performance Workplaces with Architectural Caliber
          </h1>
          <p className="text-sm sm:text-base text-[#C0B9AF] max-w-2xl leading-relaxed mb-8">
            Turnkey commercial interiors built for productivity, employee well-being, and brand distinction. From 2,000 sq.ft boutique offices to multi-floor tech campuses.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-7 py-3 rounded-full bg-[#C5A880] text-[#141312] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Book Corporate Consultation
            </button>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-7 py-3 rounded-full border border-white/30 text-xs uppercase tracking-widest text-[#FAF8F5] hover:bg-white hover:text-black transition-colors"
            >
              Request Commercial RFQ
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Standards Bar */}
      <section className="bg-[#242526] text-[#FAF8F5] py-8 border-b border-[#36383A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-2xl text-[#C5A880]">NRC 0.85+</div>
            <div className="text-[11px] uppercase tracking-wider text-[#A6A097] mt-1">Acoustic Standards</div>
          </div>
          <div>
            <div className="font-serif text-2xl text-[#C5A880]">BIFMA X5.5</div>
            <div className="text-[11px] uppercase tracking-wider text-[#A6A097] mt-1">Certified Ergonomics</div>
          </div>
          <div>
            <div className="font-serif text-2xl text-[#C5A880]">LEED Aligned</div>
            <div className="text-[11px] uppercase tracking-wider text-[#A6A097] mt-1">Low-VOC Materials</div>
          </div>
          <div>
            <div className="font-serif text-2xl text-[#C5A880]">Turnkey</div>
            <div className="text-[11px] uppercase tracking-wider text-[#A6A097] mt-1">MEP & HVAC Included</div>
          </div>
        </div>
      </section>

      {/* Commercial Showcase Grid */}
      <ServiceGrid
        subtitle="Selected Commercial Fit-Outs"
        title="Workspaces Tailored to Enterprise Culture"
        items={officeProjects}
        onSelectProject={handleSelectProject}
      />
    </main>
  );
};