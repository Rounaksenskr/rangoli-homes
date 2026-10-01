import React from 'react';

export const ServiceGrid = ({ title, subtitle, items = [], onSelectProject }) => {
  return (
    <section className="py-20 bg-[#FAF8F5] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          {subtitle && (
            <span className="text-xs uppercase tracking-[0.25em] text-[#B09265] font-semibold block mb-2">
              {subtitle}
            </span>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight">
            {title}
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative h-64 overflow-hidden bg-[#EAE5DE]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {item.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#1A1A1A]">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#1A1A1A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E665D] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {onSelectProject && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(item)}
                    className="text-left text-xs uppercase tracking-widest font-semibold text-[#B09265] hover:text-[#1A1A1A] transition-colors"
                  >
                    Request Similar Design →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};