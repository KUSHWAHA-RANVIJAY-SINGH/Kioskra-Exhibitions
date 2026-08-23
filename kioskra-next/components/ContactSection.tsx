"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock, Shield } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    eventCity: "",
    stallRequirement: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry. Please try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        eventCity: "",
        stallRequirement: "",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-warm text-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Information Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone text-dark text-[11px] font-bold uppercase tracking-widest w-fit border border-black/5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block" />
              Get In Touch
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Start Your <span className="font-serif-italic text-accent-blue">Project</span> Inquiry
            </h2>

            <p className="text-sm text-dark/75 leading-relaxed font-medium">
              Fill out the form to request a free 3D design consultation and pricing quote for your upcoming exhibition stall anywhere in India.
            </p>

            {/* Direct Details Card */}
            <div className="p-8 rounded-3xl bg-dark text-white flex flex-col gap-6 shadow-xl border border-white/10 mt-2">
              <h3 className="text-xs uppercase tracking-widest text-accent-blue font-bold">
                Kioskra Headquarters
              </h3>
              <div className="flex flex-col gap-4 text-xs text-white/80 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                  <span>L2/86, Shastri Nagar, New Delhi – 110052</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-blue flex-shrink-0" />
                  <a href="mailto:info@kioskra.com" className="hover:text-accent-blue transition-colors">
                    info@kioskra.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent-blue flex-shrink-0" />
                  <a href="tel:+919643378735" className="hover:text-accent-blue transition-colors">
                    +91 9643378735
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent-blue" />
                  24h Response
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-accent-blue" />
                  NDAs Respected
                </span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone shadow-xl">
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
                    className="mt-4 px-6 py-2.5 rounded-full bg-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-charcoal transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-extrabold text-dark mb-2">
                    Spatial Consultation Form
                  </h3>

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        suppressHydrationWarning
                        className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                        suppressHydrationWarning
                        className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        suppressHydrationWarning
                        className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        suppressHydrationWarning
                        className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                        Exhibition / Event City
                      </label>
                      <input
                        type="text"
                        name="eventCity"
                        value={formData.eventCity}
                        onChange={handleChange}
                        placeholder="e.g. Delhi, Mumbai, Bengaluru"
                        suppressHydrationWarning
                        className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                        Stall Dimension / Size
                      </label>
                      <select
                        name="stallRequirement"
                        value={formData.stallRequirement}
                        onChange={handleChange}
                        suppressHydrationWarning
                        className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                      >
                        <option value="">Select Stall Requirement</option>
                        <option value="10x10 (100 sq ft)">10×10 sq ft (Basic)</option>
                        <option value="20x20 (400 sq ft)">20×20 sq ft (Custom Stall)</option>
                        <option value="30x30 (900 sq ft)">30×30 sq ft (Pavilion)</option>
                        <option value="Double Decker Pavilion">Double Decker Pavilion</option>
                        <option value="Custom Requirement">Custom Requirement</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-dark">
                      Message / Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your event dates, budget, or specific 3D design preferences..."
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-accent-blue text-white font-bold text-xs py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    <span>{status === "submitting" ? "Sending Inquiry..." : "Submit Inquiry"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
