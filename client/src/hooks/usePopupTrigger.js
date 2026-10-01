import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'rangoli_lead_popup_dismissed';

export const usePopupTrigger = (delayMs = 10000, scrollThresholdPercent = 45) => {
  const [isOpen, setIsOpen] = useState(false);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Gracefully handle privacy modes where sessionStorage is restricted
    }
  }, []);

  const openPopup = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    // Check if user already dismissed or converted in this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
        return;
      }
    } catch {
      return;
    }

    // Trigger 1: Timed appearance
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    // Trigger 2: Scroll depth percentage
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPercent = (scrollPosition / totalHeight) * 100;

      if (scrollPercent >= scrollThresholdPercent) {
        setIsOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delayMs, scrollThresholdPercent]);

  return { isOpen, openPopup, closePopup };
};