"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";

export default function FloatingContactWidget() {
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  const message =
    "Hi Kioskra Team, I am interested in designing and fabricating an exhibition stall for an upcoming trade show. Please share your portfolio and pricing details.";
  const whatsappUrl = `https://wa.me/919643378735?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 items-end">
      {/* Phone Call Button */}
      <div className="relative flex items-center">
        {/* Tooltip */}
        <span
          className={`absolute right-14 bg-neutral-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-neutral-700 shadow-xl whitespace-nowrap transition-all duration-200 pointer-events-none ${
            showPhoneTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          Call Exhibition Team
        </span>
        <a
          href="tel:+919643378735"
          onMouseEnter={() => setShowPhoneTooltip(true)}
          onMouseLeave={() => setShowPhoneTooltip(false)}
          className="bg-neutral-900 text-white hover:bg-neutral-800 p-3.5 rounded-full shadow-2xl border border-neutral-700 transition-transform duration-200 hover:scale-110 flex items-center justify-center cursor-pointer"
          aria-label="Call Kioskra Exhibition Team"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* WhatsApp Button */}
      <div className="relative flex items-center">
        {/* Tooltip */}
        <span
          className={`absolute right-14 bg-neutral-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-neutral-700 shadow-xl whitespace-nowrap transition-all duration-200 pointer-events-none ${
            showWhatsAppTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          Chat on WhatsApp
        </span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
          className="bg-[#25D366] text-white hover:bg-[#20bd5a] p-3.5 rounded-full shadow-2xl transition-transform duration-200 hover:scale-110 flex items-center justify-center cursor-pointer relative"
          aria-label="Chat with Kioskra on WhatsApp"
        >
          {/* Animated Notification Badge (Ping) */}
          <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          {/* SVG WhatsApp Logo */}
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.016 14.062 1 11.457 1c-5.44 0-9.866 4.372-9.87 9.802 0 1.672.43 3.302 1.246 4.757L1.817 21.9l6.595-1.716c.007-.003.012-.005.016-.008zM17.472 14.382c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.828 1.04-1.014 1.25-.187.21-.374.24-.694.08-.32-.16-1.353-.5-2.578-1.593-.952-.85-1.595-1.9-1.782-2.22-.187-.32-.02-.493.14-.653.144-.144.32-.374.48-.56.16-.188.213-.32.32-.533.107-.213.054-.4-.027-.56-.08-.16-.723-1.743-.99-2.387-.26-.625-.526-.54-.723-.55-.186-.01-.4-.01-.613-.01-.213 0-.56.08-.853.4-.294.32-1.124 1.1-1.124 2.68 0 1.583 1.15 3.11 1.31 3.32.16.21 2.264 3.456 5.485 4.848.766.33 1.363.528 1.83.676.77.244 1.47.21 2.023.128.617-.092 1.89-.772 2.157-1.48.266-.707.266-1.315.187-1.44-.08-.124-.293-.204-.613-.364z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
