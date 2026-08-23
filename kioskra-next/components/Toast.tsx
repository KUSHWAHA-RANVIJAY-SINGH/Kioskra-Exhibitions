"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  type: "success" | "error";
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-24 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] sm:w-80 bg-neutral-900/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex items-start gap-3 text-white"
        >
          {type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-grow space-y-1">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white/50">
              {type === "success" ? "Notification" : "System Alert"}
            </h4>
            <p className="text-xs font-semibold leading-relaxed text-white/90">
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white hover:bg-white/5 p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
