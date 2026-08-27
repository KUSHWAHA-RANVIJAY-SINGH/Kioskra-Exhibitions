"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2 } from "lucide-react";
import Toast from "./Toast";

interface EventLeadFormProps {
  eventTitle: string;
  eventVenue: string;
  eventLocation: string;
}

interface EventLeadFormInputs {
  clientName: string;
  company: string;
  email: string;
  phone: string;
  eventCity: string;
  stallRequirement: string;
  message: string;
}

export default function EventLeadForm({
  eventTitle,
  eventVenue,
  eventLocation,
}: EventLeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventLeadFormInputs>({
    mode: "onBlur",
    defaultValues: {
      clientName: "",
      company: "",
      email: "",
      phone: "",
      eventCity: eventLocation, // Pre-fill with event location
      stallRequirement: "",
      message: "",
    },
  });

  const triggerToast = (msg: string, type: "success" | "error") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
  };

  const onSubmit = async (data: EventLeadFormInputs) => {
    setStatus("submitting");

    try {
      // Map to requirements matching backend expectations
      const payload = {
        clientName: data.clientName,
        company: data.company,
        email: data.email,
        phone: data.phone,
        eventCity: data.eventCity || eventLocation,
        requirement: `Stall Fabrication for ${eventTitle}`,
        message: data.message 
          ? `Stall Dimension: ${data.stallRequirement || "Not specified"}. Message: ${data.message}`
          : `Stall Dimension: ${data.stallRequirement || "Not specified"}. Looking for custom fabrication at ${eventVenue}.`,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead.");
      }

      setStatus("success");
      triggerToast("✓ Quote Request submitted successfully!", "success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      triggerToast("× Submission failed. Please call +91 9643378735 directly.", "error");
    }
  };

  return (
    <div className="w-full bg-brand-charcoal text-brand-warmOffWhite p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Editorial subtle light leak background */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-electricBlue/15 rounded-full filter blur-2xl pointer-events-none" />

      {status === "success" ? (
        <div className="py-8 text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-electricBlue/10 text-brand-electricBlue flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Request Received!
          </h3>
          <p className="text-xs text-white/70 max-w-sm leading-relaxed">
            Our fabrication experts are already active for <strong className="text-white">{eventVenue}</strong>. We will contact you within 24 hours with custom 3D designs.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2.5 rounded-full bg-brand-electricBlue hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-electricBlue block mb-1">
              Custom Exhibition Booths
            </span>
            <h3 className="text-lg font-extrabold text-white leading-tight">
              Need a stall for {eventTitle}?
            </h3>
            <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
              Our team specializes in premium custom fabrication at <strong className="text-white">{eventVenue}</strong>. Get a 3D design quote today.
            </p>
          </div>

          <hr className="border-white/10 my-1" />

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Full Name *
            </label>
            <input
              type="text"
              {...register("clientName", {
                required: "Name is required",
                minLength: { value: 2, message: "Must be at least 2 characters" },
              })}
              placeholder="e.g. John Doe"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-white text-xs focus:outline-none focus:border-brand-electricBlue focus:bg-white/10 transition-all ${
                errors.clientName ? "border-rose-500" : "border-white/15"
              }`}
            />
            {errors.clientName && (
              <span className="text-[9px] font-semibold text-rose-400 mt-0.5">
                {errors.clientName.message}
              </span>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Company Name
            </label>
            <input
              type="text"
              {...register("company")}
              placeholder="e.g. Acme Corporation"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-brand-electricBlue focus:bg-white/10 transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Business Email *
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="you@company.com"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-white text-xs focus:outline-none focus:border-brand-electricBlue focus:bg-white/10 transition-all ${
                errors.email ? "border-rose-500" : "border-white/15"
              }`}
            />
            {errors.email && (
              <span className="text-[9px] font-semibold text-rose-400 mt-0.5">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[\d\s+\-()]{10,}$/,
                  message: "Enter a valid phone number",
                },
              })}
              placeholder="+91 XXXXXXXXXX"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-white text-xs focus:outline-none focus:border-brand-electricBlue focus:bg-white/10 transition-all ${
                errors.phone ? "border-rose-500" : "border-white/15"
              }`}
            />
            {errors.phone && (
              <span className="text-[9px] font-semibold text-rose-400 mt-0.5">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Stall size select */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Stall Dimension *
            </label>
            <select
              {...register("stallRequirement", {
                required: "Please select a stall dimension",
              })}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-white/80 text-xs focus:outline-none focus:border-brand-electricBlue focus:bg-white/10 transition-all cursor-pointer ${
                errors.stallRequirement ? "border-rose-500" : "border-white/15"
              }`}
            >
              <option value="" className="bg-brand-charcoal text-white">Select Stall Size</option>
              <option value="10x10 sq ft (Basic)" className="bg-brand-charcoal text-white">10×10 sq ft (100 sq ft)</option>
              <option value="20x20 sq ft (Custom)" className="bg-brand-charcoal text-white">20×20 sq ft (400 sq ft)</option>
              <option value="30x30 sq ft (Pavilion)" className="bg-brand-charcoal text-white">30×30 sq ft (900 sq ft)</option>
              <option value="Double Decker Pavilion" className="bg-brand-charcoal text-white">Double Decker Pavilion</option>
              <option value="Custom Requirement" className="bg-brand-charcoal text-white">Custom Space / Other</option>
            </select>
            {errors.stallRequirement && (
              <span className="text-[9px] font-semibold text-rose-400 mt-0.5">
                {errors.stallRequirement.message}
              </span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Additional Brief / Message
            </label>
            <textarea
              {...register("message")}
              rows={3}
              placeholder="Any specific design guidelines or fabrication budget info..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-brand-electricBlue focus:bg-white/10 transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-electricBlue text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-brand-electricBlue/25 cursor-pointer disabled:opacity-50 mt-2 border-none"
          >
            <span>{status === "submitting" ? "Sending..." : "Request 3D Design"}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      {/* Toast Notification */}
      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
