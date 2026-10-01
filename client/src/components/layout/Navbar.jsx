import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ onOpenBooking, onOpenInquiry }) => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `transition-colors ${isActive ? 'text-[#C5A880]' : 'hover:text-[#C5A880]'}`;
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C5A880] flex items-center justify-center bg-black/5">
            <span className="font-serif text-xs text-[#1A1A1A]">RH</span>
          </div>
          <span className="font-serif text-xl tracking-wider uppercase font-semibold text-[#1A1A1A]">
            RangoliHomes
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#524B43]">
          <Link to="/home-interiors" className={getLinkClass('/home-interiors')}>Home Interiors</Link>
          <Link to="/office-interiors" className={getLinkClass('/office-interiors')}>Commercial</Link>
          <Link to="/paint-services" className={getLinkClass('/paint-services')}>Paint & Textures</Link>
          <Link to="/clientele" className={getLinkClass('/clientele')}>Clientele</Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onOpenInquiry} className="hidden lg:block text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] hover:text-[#C5A880] transition-colors">
            Inquire
          </button>
          <button onClick={onOpenBooking} className="px-5 py-2.5 rounded-lg bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#B09265] hover:text-black transition-colors">
            Book Consult
          </button>
        </div>
      </div>
    </nav>
  );
};
