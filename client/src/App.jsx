import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout & Overlays
import { DoorIntro } from './components/layout/DoorIntro';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StickyActions } from './components/common/StickyActions';

// Modals
import { InquiryModal } from './components/modals/InquiryModal';
import { BookingCalendar } from './components/modals/BookingCalendar';

// Custom Hooks
import { usePopupTrigger } from './hooks/usePopupTrigger';

// Pages
import { Home } from './pages/Home';
import { HomeInteriors } from './pages/HomeInteriors';
import { OfficeInteriors } from './pages/OfficeInteriors';
import { PaintServices } from './pages/PaintServices';
import { ClientelePage } from './pages/ClientelePage';
import { Contact } from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const {
    isOpen: isInquiryOpen,
    openPopup: openInquiryModal,
    closePopup: closeInquiryModal,
  } = usePopupTrigger(10000, 45);

  const [selectedServiceFocus, setSelectedServiceFocus] = useState('Turnkey Home Interiors');

  const handleOpenInquiryWithProject = (projectName) => {
    if (projectName) setSelectedServiceFocus(projectName);
    openInquiryModal();
  };

  return (
    <Router>
      <ScrollToTop />
      <DoorIntro />

      <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased selection:bg-[#C5A880] selection:text-black">
        <Navbar
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenInquiry={openInquiryModal}
        />

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpenBooking={() => setIsBookingOpen(true)}
                  onOpenInquiry={openInquiryModal}
                />
              }
            />
            <Route
              path="/home-interiors"
              element={
                <HomeInteriors
                  onOpenInquiry={openInquiryModal}
                  onOpenBooking={() => setIsBookingOpen(true)}
                  setSelectedProject={handleOpenInquiryWithProject}
                />
              }
            />
            <Route
              path="/office-interiors"
              element={
                <OfficeInteriors
                  onOpenInquiry={openInquiryModal}
                  onOpenBooking={() => setIsBookingOpen(true)}
                  setSelectedProject={handleOpenInquiryWithProject}
                />
              }
            />
            <Route
              path="/paint-services"
              element={
                <PaintServices
                  onOpenInquiry={openInquiryModal}
                  onOpenBooking={() => setIsBookingOpen(true)}
                  setSelectedProject={handleOpenInquiryWithProject}
                />
              }
            />
            <Route
              path="/clientele"
              element={
                <ClientelePage
                  onOpenInquiry={openInquiryModal}
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact
                  onOpenBooking={() => setIsBookingOpen(true)}
                />
              }
            />
          </Routes>
        </div>

        <Footer />
        <StickyActions onOpenInquiry={openInquiryModal} />

        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={closeInquiryModal}
          initialService={selectedServiceFocus}
        />

        <BookingCalendar
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      </div>
    </Router>
  );
}