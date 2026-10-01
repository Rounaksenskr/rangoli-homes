import React from 'react';
import { ServiceGrid } from '../components/sections/ServiceGrid';

export const HomeInteriors = ({ onOpenInquiry, onOpenBooking, setSelectedProject }) => {
  const residentialProjects = [
    {
      id: 'res-1',
      title: 'The Wabi-Sabi Penthouse',
      category: 'Full Residence',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      description: 'Oak veneer slat partitions, fluted marble accents, and recessed cove lighting across 3,200 sq.ft.',
    },
    {
      id: 'res-2',
      title: 'Minimalist Modular Kitchen',
      category: 'Kitchen & Dining',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      description: 'Handleless matte acrylic shutters, quartz waterfall counters, and integrated Blum soft-close mechanics.',
    },
    {
      id: 'res-3',
      title: 'Japandi Primary Sanctuary',
      category: 'Master Suite',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      description: 'Low-profile platform bed, cane-weave wardrobe panels, and textured lime-wash feature wall.',
    },
    {
      id: 'res-4',
      title: 'Serene Zen Dining Alcove',
      category: 'Dining Lounge',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      description: 'Solid ash wood dining bench, washi paper pendant fixtures, and customized floating credenza.',
    },
    {
      id: 'res-5',
      title: 'Bespoke Walk-in Wardrobe',
      category: 'Storage Architecture',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80',
      description: 'Smoked glass aluminum profile doors with motion-activated warm LED strip lighting and velvet drawer inserts.',
    },
    {
      id: 'res-6',
      title: 'Warm Minimalist Foyer & Entry',
      category: 'Entrance',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      description: 'Shoji-inspired slatted entryway screen, concealed shoe console, and microcement textured floor perimeter.',
    },
  ];

  const handleSelectProject = (project) => {
    if (setSelectedProject) setSelectedProject(project.title);
    onOpenInquiry();
  };

  const workflowSteps = [
    { num: '01', title: 'Consultation & Site Scan', desc: 'Laser measurement of floor dimensions and architectural lifestyle mapping.' },
    { num: '02', title: 'Photorealistic 3D Renders', desc: 'Material boards, light studies, and virtual walkthroughs approved before procurement.' },
    { num: '03', title: 'Precision Factory Fabrication', desc: 'High-precision German CNC cutting of marine-grade plywood and modular joinery.' },
    { num: '04', title: '45-Day Site Handover', desc: 'Dust-free assembly, quality inspection checklist, and handover with 10-year warranty.' },
  ];

  return (
    <main className="pt-24 bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Editorial Hero Header */}
      <section className="py-16 md:py-24 bg-[#1E1C1A] text-[#FAF8F5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
            alt="Home Interiors Showcase"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-3">
            Turnkey Residential Practice
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight max-w-3xl mb-6">
            Bespoke Home Interiors Designed for Mindful Living
          </h1>
          <p className="text-sm sm:text-base text-[#C2B8AA] max-w-2xl leading-relaxed mb-8">
            Complete turnkey solutions from living areas and ergonomic modular kitchens to master bedrooms. Built using BWP-grade materials, German hardware, and Japandi principles.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-7 py-3 rounded-full bg-[#C5A880] text-[#141312] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Book Design Session
            </button>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-7 py-3 rounded-full border border-white/30 text-xs uppercase tracking-widest text-[#FAF8F5] hover:bg-white hover:text-black transition-colors"
            >
              Get Estimated BOQ
            </button>
          </div>
        </div>
      </section>

      {/* Residential Portfolio Grid */}
      <ServiceGrid
        subtitle="Completed Residential Spaces"
        title="Curated Homes & Bespoke Modules"
        items={residentialProjects}
        onSelectProject={handleSelectProject}
      />

      {/* Execution Workflow */}
      <section className="py-20 bg-[#F4F0EA] border-t border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-2">
              The Journey
            </span>
            <h2 className="font-serif text-3xl font-light text-[#1A1A1A]">
              Turnkey Execution in 4 Defined Phases
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.num} className="p-6 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
                <span className="font-serif text-2xl text-[#B09265] block mb-2 font-normal">
                  {step.num}
                </span>
                <h3 className="font-serif text-lg text-[#1A1A1A] mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-[#6E665D] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};