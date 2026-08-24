"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2 } from "lucide-react";
import Toast from "./Toast";

interface ContactFormInputs {
  clientName: string;
  company: string;
  email: string;
  phone: string;
  eventCity: string;
  stallRequirement: string;
  message: string;
}

const INDIAN_CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Noida",
  "Gurugram",
  "Greater Noida",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    mode: "onBlur",
    defaultValues: {
      clientName: "",
      company: "",
      email: "",
      phone: "",
      eventCity: "",
      stallRequirement: "",
      message: "",
    },
  });

  const watchCity = watch("eventCity") || "";

  // Handle clicking outside suggestions dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = INDIAN_CITIES.filter((city) =>
    city.toLowerCase().includes(watchCity.toLowerCase())
  );

  const triggerToast = (msg: string, type: "success" | "error") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
  };

  const onSubmit = async (data: ContactFormInputs) => {
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit.");
      }

      setStatus("success");
      triggerToast("✓ Inquiry sent! Our team will contact you within 24h", "success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      triggerToast("× Submission failed. Please try again or call +91 9643378735", "error");
    }
  };

  return (
    <div className="w-full">
      {status === "success" ? (
        <div className="py-12 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-dark">
            Inquiry Submitted Successfully!
          </h3>
          <p className="text-xs text-dark/70 max-w-md">
            Thank you for reaching out. Our exhibition specialists will review your requirements and get back to you within 24 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2.5 rounded-full bg-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-charcoal transition-colors cursor-pointer border-none"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <h3 className="text-xl font-extrabold text-dark mb-2">
            Spatial Consultation Form
          </h3>

          {/* Full Name & Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                Full Name *
              </label>
              <input
                type="text"
                suppressHydrationWarning
                {...register("clientName", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Full name must be at least 2 characters" },
                })}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-xl bg-warm border text-dark text-xs focus:outline-none focus:border-accent-blue transition-colors ${
                  errors.clientName ? "border-rose-500" : "border-stone"
                }`}
              />
              {errors.clientName && (
                <span className="text-[10px] font-bold text-rose-500 mt-0.5">
                  {errors.clientName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                Company Name
              </label>
              <input
                type="text"
                suppressHydrationWarning
                {...register("company")}
                placeholder="Your company name"
                className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue transition-colors"
              />
            </div>
          </div>

          {/* Email & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                Business Email *
              </label>
              <input
                type="email"
                suppressHydrationWarning
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="you@company.com"
                className={`w-full px-4 py-3 rounded-xl bg-warm border text-dark text-xs focus:outline-none focus:border-accent-blue transition-colors ${
                  errors.email ? "border-rose-500" : "border-stone"
                }`}
              />
              {errors.email && (
                <span className="text-[10px] font-bold text-rose-500 mt-0.5">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                Phone Number *
              </label>
              <input
                type="tel"
                suppressHydrationWarning
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[\d\s+\-()]{10,}$/,
                    message: "Enter a valid phone number (min 10 digits, numbers only)",
                  },
                })}
                placeholder="+91 XXXXXXXXXX"
                className={`w-full px-4 py-3 rounded-xl bg-warm border text-dark text-xs focus:outline-none focus:border-accent-blue transition-colors ${
                  errors.phone ? "border-rose-500" : "border-stone"
                }`}
              />
              {errors.phone && (
                <span className="text-[10px] font-bold text-rose-500 mt-0.5">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* Exhibition City & Stall Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 relative" ref={suggestionsRef}>
              <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                Exhibition / Event City
              </label>
              <input
                type="text"
                suppressHydrationWarning
                {...register("eventCity")}
                onFocus={() => setShowSuggestions(true)}
                placeholder="e.g. Delhi, Mumbai, Bengaluru"
                className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue transition-colors"
                autoComplete="off"
              />
              {showSuggestions && watchCity && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-stone rounded-xl shadow-xl max-h-48 overflow-y-auto py-1">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setValue("eventCity", city, { shouldValidate: true });
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-dark hover:bg-warm transition-colors cursor-pointer border-none bg-transparent"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                Stall Dimension / Size *
              </label>
              <select
                {...register("stallRequirement", {
                  required: "Stall dimension size is required",
                })}
                className={`w-full px-4 py-3 rounded-xl bg-warm border text-dark text-xs focus:outline-none focus:border-accent-blue transition-colors ${
                  errors.stallRequirement ? "border-rose-500" : "border-stone"
                }`}
              >
                <option value="">Select Stall Requirement</option>
                <option value="10x10 (100 sq ft)">10×10 sq ft (Basic)</option>
                <option value="20x20 (400 sq ft)">20×20 sq ft (Custom Stall)</option>
                <option value="30x30 (900 sq ft)">30×30 sq ft (Pavilion)</option>
                <option value="Double Decker Pavilion">Double Decker Pavilion</option>
                <option value="Custom Requirement">Custom Requirement</option>
              </select>
              {errors.stallRequirement && (
                <span className="text-[10px] font-bold text-rose-500 mt-0.5">
                  {errors.stallRequirement.message}
                </span>
              )}
            </div>
          </div>

          {/* Message / Requirements */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
              Message / Requirements
            </label>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="Tell us about your event dates, budget, or specific 3D design preferences..."
              className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 bg-accent-blue text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50 mt-2 border-none"
          >
            <span>{status === "submitting" ? "Sending..." : "Submit Inquiry"}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Reusable Toast Notification */}
      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
