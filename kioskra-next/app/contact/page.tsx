"use client";

import React, { useState } from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import Toast from "@/components/Toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    venue: "",
    stallSize: "36 - 60 sqm",
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const triggerToast = (msg: string, type: "success" | "error") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        clientName: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        eventCity: formData.venue,
        requirement: `Exhibition Contact Form - Size: ${formData.stallSize}`,
        message: formData.notes,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit project brief.");
      }

      setStatus("success");
      triggerToast("Your project brief has been recorded successfully!", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setStatus("error");
      triggerToast(msg, "error");
    }
  };

  return (
    <div className="pt-24 min-h-screen pb-24 sm:pb-32">
      {/* Header Banner */}
      <Section className="pb-8">
        <Heading
          badge="Direct Commission & Inquiries"
          sansPrefix="Initiate Your"
          serifAccent="Spatial"
          sansSuffix="Project"
          subtitle="Partner with KIOSKRA for your upcoming exhibition stall, pavilion architecture, or international trade fair presence."
          size="xl"
        />
      </Section>

      {/* 2-Column Contact & Form Scaffold */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Studio Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-brand-deepBlack text-brand-warmOffWhite space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-brand-electricBlue font-bold block">
                  Studio Headquarters
                </span>
                <h3 className="text-2xl font-bold font-sans text-white">
                  KIOSKRA Spatial Architecture
                </h3>
              </div>

              <div className="space-y-4 pt-2 text-sm text-brand-softStone/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-electricBlue flex-shrink-0 mt-0.5" />
                  <span>
                    Global Exhibition Services & Fabrication Units (India, UAE, Germany)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-electricBlue flex-shrink-0" />
                  <span>inquiries@kioskra.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-electricBlue flex-shrink-0" />
                  <span>+91 96433 78735</span>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-charcoal space-y-3">
                <div className="flex items-center gap-2 text-xs text-brand-softStone/60">
                  <Clock className="w-4 h-4 text-brand-electricBlue" />
                  <span>Initial architectural review within 24 business hours.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-softStone/60">
                  <ShieldCheck className="w-4 h-4 text-brand-electricBlue" />
                  <span>Non-Disclosure & Confidentiality Assured.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spatial Inquiry Form */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-brand-softStone shadow-sm text-center flex flex-col items-center justify-center min-h-[450px] gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-bounce">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-brand-deepBlack">Project Brief Received!</h3>
                <p className="text-sm text-brand-charcoal/70 max-w-sm">
                  Our exhibition design team is processing your requirements. We will contact you within 24 business hours with initial structural renders and space-utilization concepts.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      venue: "",
                      stallSize: "36 - 60 sqm",
                      notes: "",
                    });
                  }}
                  className="mt-4 px-6 py-3 rounded-full bg-brand-deepBlack text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-colors cursor-pointer"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-brand-softStone shadow-sm space-y-6"
              >
                <h3 className="text-xl font-bold text-brand-deepBlack font-sans mb-2">
                  Spatial Brief & Project Details
                </h3>

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. eleanor@company.com"
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 96433 78735"
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                      Organization / Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Aerospace"
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    Exhibition / Venue *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g. Pragati Maidan, Delhi / Hannover Messe 2025"
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    Estimated Stall Size & Format
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["36 - 60 sqm", "60 - 120 sqm", "120 - 250 sqm", "Double Decker / 250+"].map(
                      (size, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center justify-center p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all text-center ${
                            formData.stallSize === size
                              ? "border-brand-electricBlue bg-brand-electricBlue/10 text-brand-electricBlue"
                              : "border-brand-softStone bg-brand-warmOffWhite/40 text-brand-charcoal hover:border-brand-electricBlue"
                          }`}
                        >
                          <input
                            type="radio"
                            name="stallSize"
                            value={size}
                            checked={formData.stallSize === size}
                            onChange={() => setFormData({ ...formData, stallSize: size })}
                            suppressHydrationWarning
                            className="hidden"
                          />
                          <span>{size}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-2">
                    Project Notes & Brief Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Outline your booth dimensions, design goals, target completion date, or specific brand materials..."
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-brand-warmOffWhite/60 border border-brand-softStone text-brand-deepBlack text-sm focus:outline-none focus:border-brand-electricBlue transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    withArrow
                    className="w-full"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Submitting Brief..." : "Submit Project Brief"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>

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
