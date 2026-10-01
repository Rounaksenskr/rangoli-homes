import React, { useState } from 'react';

export const DoorIntro = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setIsRemoved(true);
      if (onComplete) onComplete();
    }, 1200); // Wait for transition duration
  };

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-opacity duration-500 ${
        isOpen ? 'pointer-events-none' : ''
      }`}
      aria-label="Welcome Door Intro"
    >
      {/* Left Panel */}
      <div
        className={`w-1/2 h-full bg-[#1F1D1B] border-r border-[#C5A880]/30 shadow-2xl transition-transform duration-1000 ease-in-out relative flex items-center justify-end ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px]"></div>
        {/* Left Knob / Inlay */}
        <div className="mr-4 w-4 h-24 rounded-full bg-gradient-to-b from-[#C5A880] via-[#E5D5C0] to-[#997B55] shadow-lg opacity-80" />
      </div>

      {/* Right Panel */}
      <div
        className={`w-1/2 h-full bg-[#1F1D1B] border-l border-[#C5A880]/30 shadow-2xl transition-transform duration-1000 ease-in-out relative flex items-center justify-start ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px]"></div>
        {/* Right Knob / Inlay */}
        <div className="ml-4 w-4 h-24 rounded-full bg-gradient-to-b from-[#C5A880] via-[#E5D5C0] to-[#997B55] shadow-lg opacity-80" />
      </div>

      {/* Center Seal / Trigger Card */}
      <div
        onClick={handleOpen}
        className={`absolute z-10 flex flex-col items-center justify-center p-8 bg-[#2A2724]/90 backdrop-blur-md rounded-2xl border border-[#C5A880]/40 shadow-2xl cursor-pointer hover:scale-105 transition-all duration-500 group ${
          isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
        }`}
      >
        <div className="w-16 h-16 mb-4 rounded-full border border-[#C5A880] flex items-center justify-center bg-black/40 group-hover:border-[#E5D5C0] transition-colors">
          <span className="font-serif text-2xl text-[#C5A880] tracking-wider">RH</span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-[#FAF8F5] tracking-widest uppercase mb-1">
          RangoliHomes
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-6">
          Architectural Sanctuary
        </p>
        <button
          type="button"
          className="px-6 py-2.5 rounded-full border border-[#C5A880]/60 text-xs uppercase tracking-wider text-[#FAF8F5] group-hover:bg-[#C5A880] group-hover:text-black transition-all"
        >
          Push to Enter
        </button>
      </div>
    </div>
  );
};