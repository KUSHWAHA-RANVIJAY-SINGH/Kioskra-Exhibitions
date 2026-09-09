"use client";

import { useEffect, useState, useRef } from "react";

export default function VisitorToast() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasProcessedRef.current) return;
    hasProcessedRef.current = true;

    async function initVisitorToast() {
      try {
        const storedVisitorId = localStorage.getItem("visitorId");
        let firstTime = false;
        let finalCount = 1;

        if (!storedVisitorId) {
          // Unique new visitor visit on this browser
          const newVisitorId =
            "visitor_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11);
          localStorage.setItem("visitorId", newVisitorId);
          firstTime = true;

          // Call global API to atomically increment server count
          const res = await fetch("/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "increment" }),
          });
          const data = await res.json();

          if (data?.success && typeof data.count === "number") {
            finalCount = data.count;
          } else {
            const cached = parseInt(localStorage.getItem("visitorCount") || "1", 10);
            finalCount = isNaN(cached) || cached === 200 ? 1 : cached;
          }
        } else {
          // Returning visit on this browser (refresh or revisit)
          firstTime = false;

          // Fetch latest global count from API without incrementing
          const res = await fetch("/api/visitors", { method: "GET" });
          const data = await res.json();

          if (data?.success && typeof data.count === "number") {
            finalCount = data.count;
          } else {
            const cached = parseInt(localStorage.getItem("visitorCount") || "1", 10);
            finalCount = isNaN(cached) || cached === 200 ? 1 : cached;
          }
        }

        localStorage.setItem("visitorCount", finalCount.toString());
        setVisitorCount(finalCount);
        setIsFirstVisit(firstTime);
        setShowToast(true);

        // Auto-hide timer: slide out after 4 seconds
        const hideTimer = setTimeout(() => {
          setIsHiding(true);
          setTimeout(() => {
            setShowToast(false);
          }, 400); // 400ms slide-out animation
        }, 4000);

        return () => clearTimeout(hideTimer);
      } catch (err) {
        console.error("Error initializing VisitorToast:", err);
      }
    }

    initVisitorToast();
  }, []);

  const handleClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      setShowToast(false);
    }, 400);
  };

  if (!showToast || visitorCount === null) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-xs w-[calc(100vw-3rem)] transition-all ${
        isHiding ? "animate-slide-out-right" : "animate-slide-in-right"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-blue-500/30 rounded-xl p-4 shadow-2xl backdrop-blur-md text-white overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest">
              KIOSKRA EXHIBITIONS
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1 text-xs font-bold leading-none cursor-pointer"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-white tracking-tight">
            {isFirstVisit ? "Welcome Aboard" : "Welcome Back"}
          </h3>

          {/* Visitor Count Display */}
          <div className="bg-slate-800/60 rounded-lg p-3 border border-blue-400/20">
            <p className="text-[10px] text-gray-300 mb-1 uppercase tracking-wider font-semibold">
              📊 TOTAL VISITOR COUNT
            </p>
            <p className="text-3xl font-extrabold text-blue-400 tracking-tight">
              #{visitorCount}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              You're visitor #{visitorCount}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 text-center pt-1 font-light">
            Step into the future of exhibition design ✨
          </p>
        </div>

        {/* 4-Second Progress Bar */}
        <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 animate-shrink-width" />
        </div>
      </div>
    </div>
  );
}
