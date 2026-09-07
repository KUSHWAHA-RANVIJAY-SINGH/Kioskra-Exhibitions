"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Users } from "lucide-react";

export default function VisitorPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCount = localStorage.getItem("visitorCount");
    const hasVisitedFlag = localStorage.getItem("isFirstVisit");

    let currentCount = 200;
    let shouldShowPopup = false;

    if (!storedCount) {
      // First visit on this browser
      currentCount = 200;
      localStorage.setItem("visitorCount", "200");
      localStorage.setItem("isFirstVisit", "true");
      shouldShowPopup = true;
    } else {
      // Subsequent visit/page load
      const parsed = parseInt(storedCount, 10);
      currentCount = isNaN(parsed) ? 200 : parsed + 1;
      localStorage.setItem("visitorCount", currentCount.toString());

      // If isFirstVisit flag was not set yet
      if (!hasVisitedFlag) {
        localStorage.setItem("isFirstVisit", "true");
        shouldShowPopup = true;
      }
    }

    setVisitorCount(currentCount);

    if (shouldShowPopup) {
      setIsOpen(true);
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 4000);

      return () => clearTimeout(timer);
    }

    // Debounce API sync: max 1 call per 5 seconds
    const lastSync = localStorage.getItem("visitorLastSyncTime");
    const now = Date.now();
    const DEBOUNCE_INTERVAL_MS = 5000;

    if (!lastSync || now - parseInt(lastSync, 10) >= DEBOUNCE_INTERVAL_MS) {
      localStorage.setItem("visitorLastSyncTime", now.toString());

      // Non-blocking fire-and-forget request
      fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: currentCount }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && typeof data.count === "number" && data.count > currentCount) {
            localStorage.setItem("visitorCount", data.count.toString());
            setVisitorCount(data.count);
          }
        })
        .catch(() => {
          // Gracefully catch network errors
        });
    }
  }, []);

  if (!isOpen || visitorCount === null) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto">
          {/* Semi-dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-md bg-[#191A1A] text-white rounded-3xl p-7 sm:p-8 border border-white/15 shadow-2xl overflow-hidden text-center"
          >
            {/* Ambient Lighting FX */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#2F6BFF]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#2F6BFF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Manual Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Luxury Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2F6BFF]/15 border border-[#2F6BFF]/40 text-[#2F6BFF] text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#2F6BFF]" />
              <span>KIOSKRA EXHIBITIONS</span>
            </div>

            {/* Hindi Greeting */}
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-2 tracking-wide">
              स्वागत है
            </h2>

            <p className="text-sm text-gray-300 mb-6 font-light">
              Kioskra Exhibitions में आपका हार्दिक स्वागत है!
            </p>

            {/* Counter Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 backdrop-blur-xs relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
                <Users className="w-3.5 h-3.5 text-[#2F6BFF]" />
                <span>Total Visitor Count</span>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#2F6BFF] tracking-tight py-1 drop-shadow-[0_0_20px_rgba(47,107,255,0.4)] font-sans">
                #{visitorCount.toLocaleString()}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                आप हमारे <span className="text-white font-semibold">{visitorCount}</span>वें सम्मानित आगंतुक हैं
              </p>
            </div>

            {/* Tagline */}
            <p className="text-xs text-gray-400 tracking-wide font-light">
              Bespoke Spatial Structures & Luxury Stall Fabrication Pan-India
            </p>

            {/* 4-Second Progress Countdown */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-[#2F6BFF]"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
