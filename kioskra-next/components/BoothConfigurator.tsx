"use client";

import React, { useState, useMemo } from "react";
import { CheckCircle2, Download, Send, Sparkles, Layers, Sliders, ShieldCheck, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Toast from "./Toast";

const Booth3DCanvas = dynamic(() => import("./Booth3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-charcoal text-white/50 text-xs font-semibold animate-pulse">
      Initializing 3D Viewport...
    </div>
  ),
});

export interface BoothConfigState {
  shape: "square" | "l-shape" | "open-three";
  width: number;
  depth: number;
  height: number;
  color: string;
  flooring: "carpet" | "wooden" | "raised-platform";
  features: {
    led: boolean;
    counter: boolean;
    lounge: boolean;
    shelves: boolean;
    plants: boolean;
    touchScreen: boolean;
  };
}

export default function BoothConfigurator() {
  const [config, setConfig] = useState<BoothConfigState>({
    shape: "square",
    width: 20,
    depth: 20,
    height: 8,
    color: "#2F6BFF",
    flooring: "carpet",
    features: {
      led: true,
      counter: true,
      lounge: true,
      shelves: false,
      plants: true,
      touchScreen: false,
    },
  });

  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [preset, setPreset] = useState<"perspective" | "front" | "top">("perspective");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const triggerToast = (msg: string, type: "success" | "error") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
  };

  // Base calculation logic ported from configurator.js
  const { minCost, maxCost, areaSqFt } = useMemo(() => {
    const area = config.width * config.depth;
    let baseRate = 2500; // Base rate per sq ft in INR

    if (config.height === 10) baseRate *= 1.1;
    if (config.height === 12) baseRate *= 1.25;

    if (config.shape === "l-shape") baseRate *= 1.15;
    if (config.shape === "open-three") baseRate *= 1.1;

    let featureAddons = 0;
    if (config.features.led) featureAddons += 45000;
    if (config.features.counter) featureAddons += 18000;
    if (config.features.lounge) featureAddons += 35000;
    if (config.features.shelves) featureAddons += 15000;
    if (config.features.plants) featureAddons += 12000;
    if (config.features.touchScreen) featureAddons += 25000;

    if (config.flooring === "wooden") featureAddons += area * 150;
    if (config.flooring === "raised-platform") featureAddons += area * 300;

    const baseCost = area * baseRate + featureAddons;
    const min = Math.round(baseCost * 0.9);
    const max = Math.round(baseCost * 1.15);

    return {
      areaSqFt: area,
      minCost: min,
      maxCost: max,
    };
  }, [config]);

  const toIndianFormat = (num: number) => num.toLocaleString("en-IN");

  const handleFeatureToggle = (key: keyof BoothConfigState["features"]) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: !prev.features[key],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const activeFeaturesList = Object.entries(config.features)
        .filter(([, active]) => active)
        .map(([k]) => k.toUpperCase());

      // Capture 3D Canvas Snapshot
      let snapshot: string | null = null;
      if (typeof window !== "undefined") {
        const canvasEl = document.querySelector(".lg\\:col-span-6 canvas") as HTMLCanvasElement | null;
        if (canvasEl) {
          snapshot = canvasEl.toDataURL("image/png");
        }
      }

      const payload = {
        clientName: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        company: leadForm.company,
        eventCity: leadForm.city,
        requirement: `3D Configurator Inquiry - ${config.width}x${config.depth}x${config.height} ft (${config.shape})`,
        configuredLayout: {
          shape: config.shape,
          width: config.width,
          depth: config.depth,
          height: config.height,
          themeColor: config.color,
          features: activeFeaturesList,
          estimatedPriceRange: `₹${toIndianFormat(minCost)} - ₹${toIndianFormat(maxCost)}`,
          specsJson: JSON.stringify({ ...config, snapshot }, null, 2),
        },
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to record configuration specs. Please try again.");
      }

      setStatus("success");
      triggerToast("Stall specifications and 3D preview saved successfully!", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred during submission.";
      setErrorMessage(msg);
      setStatus("error");
      triggerToast(msg, "error");
    }
  };

  // Render 2D SVG preview coordinates
  const maxDim = Math.max(config.width, config.depth);
  const scale = Math.min(280 / maxDim, 7);
  const pxW = config.width * scale;
  const pxD = config.depth * scale;
  const halfW = pxW / 2;
  const halfD = pxD / 2;

  let wallPath = "";
  if (config.shape === "square") {
    wallPath = `M ${-halfW} ${halfD} L ${-halfW} ${-halfD} L ${halfW} ${-halfD}`;
  } else if (config.shape === "l-shape") {
    wallPath = `M ${-halfW} ${halfD} L ${-halfW} ${-halfD} L ${halfW} ${-halfD}`;
  } else {
    wallPath = `M ${-halfW} ${-halfD} L ${halfW} ${-halfD}`;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-2 text-accent-blue text-xs font-extrabold uppercase tracking-widest">
            <Sliders className="w-4 h-4" />
            <span>Interactive Controls</span>
          </div>

          <h2 className="text-2xl font-extrabold text-dark tracking-tight">
            Customize Booth Layout Specs
          </h2>

          {/* Step 1: Shape */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
              Step 1: Booth Layout Shape
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "square", label: "Square / Rect" },
                { id: "l-shape", label: "L-Shape Corner" },
                { id: "open-three", label: "3-Side Open" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setConfig({ ...config, shape: s.id as BoothConfigState["shape"] })}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                    config.shape === s.id
                      ? "bg-dark text-white border-dark shadow-md"
                      : "bg-warm text-dark border-stone hover:bg-stone"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Dimensions */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
              Step 2: Dimensions & Height
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-dark/60">Width (ft)</span>
                <input
                  type="number"
                  min={10}
                  max={60}
                  step={2}
                  value={config.width}
                  onChange={(e) =>
                    setConfig({ ...config, width: Math.max(10, Number(e.target.value)) })
                  }
                  suppressHydrationWarning
                  className="w-full px-3 py-2.5 rounded-xl bg-warm border border-stone text-dark text-xs font-bold focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-dark/60">Depth (ft)</span>
                <input
                  type="number"
                  min={10}
                  max={60}
                  step={2}
                  value={config.depth}
                  onChange={(e) =>
                    setConfig({ ...config, depth: Math.max(10, Number(e.target.value)) })
                  }
                  suppressHydrationWarning
                  className="w-full px-3 py-2.5 rounded-xl bg-warm border border-stone text-dark text-xs font-bold focus:outline-none focus:border-accent-blue"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-dark/60">Height (ft)</span>
                <select
                  value={config.height}
                  onChange={(e) => setConfig({ ...config, height: Number(e.target.value) })}
                  suppressHydrationWarning
                  className="w-full px-3 py-2.5 rounded-xl bg-warm border border-stone text-dark text-xs font-bold focus:outline-none focus:border-accent-blue"
                >
                  <option value={8}>8 ft (Standard)</option>
                  <option value={10}>10 ft (Elevated)</option>
                  <option value={12}>12 ft (High Structural)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Elements & Flooring */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
              Step 3: Features & Branding Elements
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { key: "led", label: "LED Video Wall" },
                { key: "counter", label: "Reception Desk" },
                { key: "lounge", label: "Discussion Lounge" },
                { key: "shelves", label: "Product Displays" },
                { key: "plants", label: "Green Planters" },
                { key: "touchScreen", label: "Touch Kiosk" },
              ].map((item) => {
                const k = item.key as keyof BoothConfigState["features"];
                const isChecked = config.features[k];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleFeatureToggle(k)}
                    className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-accent-blue/10 border-accent-blue text-accent-blue"
                        : "bg-warm border-stone text-dark/70 hover:bg-stone"
                    }`}
                  >
                    <span>{item.label}</span>
                    <CheckCircle2
                      className={`w-4 h-4 ${isChecked ? "text-accent-blue" : "text-dark/20"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Color Picker */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
              Step 4: Primary Theme Color
            </label>
            <div className="flex items-center gap-3">
              {["#2F6BFF", "#111111", "#E11D48", "#059669", "#7C3AED"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setConfig({ ...config, color: c })}
                  style={{ backgroundColor: c }}
                  className={`w-9 h-9 rounded-full transition-transform cursor-pointer border-2 ${
                    config.color === c ? "scale-110 border-black shadow-md" : "border-transparent"
                  }`}
                />
              ))}
              <input
                type="color"
                value={config.color}
                onChange={(e) => setConfig({ ...config, color: e.target.value })}
                suppressHydrationWarning
                className="w-9 h-9 rounded-full cursor-pointer border-none bg-transparent"
              />
            </div>
          </div>

          {/* High Intent CTA Button */}
          <div className="pt-4 border-t border-stone mt-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("quote-request-form");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  const nameInput = el.querySelector('input[placeholder*="Name"]') as HTMLInputElement | null;
                  if (nameInput) nameInput.focus();
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-deepBlack text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl hover:bg-neutral-800 transition-all shadow-md mt-2 cursor-pointer"
            >
              <span>Request Detailed 3D Render & Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Live 3D Real-Time Preview & Inquiry */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Live 3D Real-Time Preview Container */}
          <div className="bg-dark text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col items-center gap-6">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent-blue animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent-blue">
                  Interactive 3D Stall Preview
                </span>
              </div>
              <span className="text-[11px] text-white/50 font-mono">
                {config.width}ft × {config.depth}ft × {config.height}ft ({areaSqFt} sq ft)
              </span>
            </div>

            {/* 3D Canvas Box */}
            <div className="w-full h-80 sm:h-96 bg-charcoal rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-inner group">
              {/* 3D Guidance Badge */}
              <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[9px] font-extrabold tracking-wide text-white/70 uppercase select-none pointer-events-none z-10">
                🖱️ Drag to Rotate • Scroll to Zoom • Right-click to Pan
              </div>

              <Booth3DCanvas config={config} preset={preset} />

              {/* Floating Camera Control Panel */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-charcoal/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                {[
                  { id: "perspective", label: "Perspective 3D" },
                  { id: "front", label: "Front View" },
                  { id: "top", label: "Top View 2D" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPreset(p.id as "perspective" | "front" | "top")}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                      preset === p.id
                        ? "bg-accent-blue text-white shadow-md"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Price Range Banner */}
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 block">
                  Estimated Fabrication Range
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-accent-blue">
                  ₹{toIndianFormat(minCost)} – ₹{toIndianFormat(maxCost)}
                </span>
              </div>
              <div className="text-[11px] text-white/60 font-medium max-w-xs">
                *Includes 3D renders, modular booth structure, lighting & on-site installation.
              </div>
            </div>
          </div>

          {/* Inquiry / Quote Request Form */}
          <div id="quote-request-form" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone shadow-xl">
            {status === "success" ? (
              <div className="py-8 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-dark">Configuration Received!</h3>
                <p className="text-xs text-dark/70 max-w-sm">
                  Our exhibition architects have logged your custom booth specifications. We will send you initial 3D renders matching your size & features within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 px-6 py-2.5 rounded-full bg-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-charcoal transition-colors cursor-pointer"
                >
                  Configure Another Booth
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-extrabold text-dark">Request Official 3D Mock-up</h3>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-accent-blue">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Free Consultation</span>
                  </div>
                </div>

                {status === "error" && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Business Email *"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                  />
                  <input
                    type="text"
                    placeholder="Company / Brand Name"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-warm border border-stone text-dark text-xs focus:outline-none focus:border-accent-blue"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent-blue text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50 mt-1"
                >
                  <span>{status === "submitting" ? "Submitting Specs..." : "Send Layout Specs & Get 3D Quote"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

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
