import React from 'react';
import { ServiceGrid } from '../components/sections/ServiceGrid';

export const PaintServices = ({ onOpenInquiry, onOpenBooking, setSelectedProject }) => {
  const textureFinishes = [
    {
      id: 'pnt-1',
      title: 'Venetian Stucco Plaster',
      category: 'Artisanal Lime',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      description: 'Hand-troweled multi-layer marble dust plaster with a soft mirror sheen and subtle depth of tone.',
    },
    {
      id: 'pnt-2',
      title: 'Roman Mineral Lime-Wash',
      category: 'Breathable Mineral',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      description: 'Chalky, matte brushed limestone finish that subtly ages and develops natural character with light.',
    },
    {
      id: 'pnt-3',
      title: 'Architectural Microcement',
      category: 'Seamless Concrete',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      description: 'Continuous jointless 3mm polymer cement coating suitable for feature walls, bathrooms, and floor zones.',
    },
    {
      id: 'pnt-4',
      title: 'Fluted Earth Texture Finish',
      category: 'Tactile Relief',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      description: 'Organic combed linear ridges in warm clay tones, creating shadows and acoustic softening.',
    },
    {
      id: 'pnt-5',
      title: 'Oxidized Metallic Patina',
      category: 'Specialty Feature',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: 'Real copper and bronze metallic flakes suspended in binder and organically oxidized on-site.',
    },
    {
      id: 'pnt-6',
      title: 'Japandi Velvet Matte Coating',
      category: 'Premium Emulsion',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      description: 'Ultra-low sheen, scuff-resistant zero-VOC emulsion formulated in muted neutral earth pigments.',
    },
  ];

  const handleSelectProject = (project) => {
    if (setSelectedProject) setSelectedProject(`Texture: ${project.title}`);
    onOpenInquiry();
  };

  return (
    <main className="pt-24 bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-[#23201D] text-[#FAF8F5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80"
            alt="Wall Textures Showcase"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-3">
            Surface Artistry & Mineral Coatings
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight max-w-3xl mb-6">
            Artisanal Wall Finishes & Textured Surfaces
          </h1>
          <p className="text-sm sm:text-base text-[#C2B7A8] max-w-2xl leading-relaxed mb-8">
            Elevate walls beyond flat paint. Our master artisans hand-apply authentic Italian lime plasters, mineral washes, and seamless microcement coatings.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-7 py-3 rounded-full bg-[#C5A880] text-[#141312] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Book Texture Sampling
            </button>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-7 py-3 rounded-full border border-white/30 text-xs uppercase tracking-widest text-[#FAF8F5] hover:bg-white hover:text-black transition-colors"
            >
              Request Swatch Box
            </button>
          </div>
        </div>
      </section>

      {/* Surface Features Bar */}
      <section className="bg-[#1C1A18] text-[#FAF8F5] py-8 border-b border-[#302C28]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-2xl text-[#C5A880]">Zero VOC</div>
            <div className="text-[11px] uppercase tracking-wider text-[#A69D91] mt-1">Eco & Health Safe</div>
          </div>
          <div>
            <div className="font-serif text-2xl text-[#C5A880]">Anti-Fungal</div>
            <div className="text-[11px] uppercase tracking-wider text-[#A69D91] mt-1">Naturally Breathable</div>
          </div>
          <div>
            <div className="font-serif text-2xl text-[#C5A880]">Hand-Crafted</div>
            <div className="text-[11px] uppercase tracking-wider text-[#A69D91] mt-1">Master Applicators</div>
          </div>
          <div>
            <div className="font-serif text-2xl text-[#C5A880]">Seamless</div>
            <div className="text-[11px] uppercase tracking-wider text-[#A69D91] mt-1">Crack-Bridging Systems</div>
          </div>
        </div>
      </section>

      {/* Finishes Grid */}
      <ServiceGrid
        subtitle="Tactile Architectural Palette"
        title="Mineral Plasters & Feature Wall Coatings"
        items={textureFinishes}
        onSelectProject={handleSelectProject}
      />
    </main>
  );
};