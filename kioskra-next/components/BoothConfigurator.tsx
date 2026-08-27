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
  tier: "octanorm" | "basic" | "premium" | "luxury";
}

export const TIERS = [
  { id: "octanorm", label: "Octanorm / Modular", price: 5500, limit: 10, desc: "Modular aluminum system" },
  { id: "basic", label: "Basic Stand", price: 7500, limit: 12, desc: "Custom wooden construction" },
  { id: "premium", label: "Premium Stand", price: 10500, limit: 12, desc: "High-end bespoke fabrication" },
  { id: "luxury", label: "Luxury Stand", price: 13000, limit: 15, desc: "Double height & top finishes" },
] as const;

export default function BoothConfigurator() {
  const [config, setConfig] = useState<BoothConfigState>({
    shape: "square",
    width: 20,
    depth: 20,
    height: 12,
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
    tier: "premium",
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

  // Base calculation logic based on selected tier and square meters area
  const { minCost, maxCost, areaSqFt, areaSqm, runningTotal, baseBoothPrice } = useMemo(() => {
    const sqft = config.width * config.depth;
    
    // Feet to meters conversion: 1 ft = 0.3048 m
    const wMeters = config.width * 0.3048;
    const dMeters = config.depth * 0.3048;
    const sqm = wMeters * dMeters;

    const tierInfo = TIERS.find((t) => t.id === config.tier) || TIERS[2];
    const basePrice = Math.round(sqm * tierInfo.price);

    let featureAddons = 0;
    if (config.features.led) featureAddons += 80000;
    if (config.features.counter) featureAddons += 25000;
    if (config.features.lounge) featureAddons += 35000;
    if (config.features.shelves) featureAddons += 15000;
    if (config.features.plants) featureAddons += 12000;
    if (config.features.touchScreen) featureAddons += 25000;

    const total = basePrice + featureAddons;
    const min = total;
    const max = Math.round(total * 1.15);

    return {
      areaSqFt: sqft,
      areaSqm: sqm,
      baseBoothPrice: basePrice,
      runningTotal: total,
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
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5.5 h-5.5 rounded-full bg-accent-blue text-white text-[10px] font-bold">1</span>
              <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
                Step 1: Booth Layout Shape
              </label>
            </div>
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

          {/* Step 2: Stall Quality Tier */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5.5 h-5.5 rounded-full bg-accent-blue text-white text-[10px] font-bold">2</span>
              <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
                Step 2: Stall Quality Tier
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIERS.map((tier) => {
                const isSelected = config.tier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      const limit = tier.limit;
                      setConfig((prev) => ({
                        ...prev,
                        tier: tier.id,
                        height: prev.height > limit ? limit : prev.height,
                      }));
                    }}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-accent-blue/10 border-accent-blue text-accent-blue shadow-sm"
                        : "bg-warm text-dark border-stone hover:bg-stone"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-extrabold">{tier.label}</div>
                      <div className="text-[10px] font-medium text-dark/60 mt-0.5">{tier.desc}</div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between w-full border-t border-stone/30 pt-1.5">
                      <span className="text-[10px] font-bold text-accent-blue">Starts from ₹{tier.price.toLocaleString("en-IN")}/sqm</span>
                      <span className="text-[9px] font-bold bg-dark/5 text-dark px-1.5 py-0.5 rounded-sm">Max {tier.limit}ft</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Dimensions & Height */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5.5 h-5.5 rounded-full bg-accent-blue text-white text-[10px] font-bold">3</span>
              <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
                Step 3: Dimensions & Height
              </label>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Width Slider Control */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-dark/60">Width: <strong className="text-dark font-extrabold">{config.width} ft</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, width: Math.max(5, prev.width - 5) }))}
                    className="w-7 h-7 rounded-lg bg-warm hover:bg-stone text-dark text-xs font-bold border border-stone flex items-center justify-center cursor-pointer select-none"
                  >
                    −
                  </button>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={config.width}
                    onChange={(e) => setConfig(prev => ({ ...prev, width: Number(e.target.value) }))}
                    className="flex-grow accent-accent-blue cursor-pointer h-1.5 bg-stone rounded-lg appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, width: Math.min(50, prev.width + 5) }))}
                    className="w-7 h-7 rounded-lg bg-warm hover:bg-stone text-dark text-xs font-bold border border-stone flex items-center justify-center cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Depth Slider Control */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-dark/60">Depth: <strong className="text-dark font-extrabold">{config.depth} ft</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, depth: Math.max(5, prev.depth - 5) }))}
                    className="w-7 h-7 rounded-lg bg-warm hover:bg-stone text-dark text-xs font-bold border border-stone flex items-center justify-center cursor-pointer select-none"
                  >
                    −
                  </button>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={config.depth}
                    onChange={(e) => setConfig(prev => ({ ...prev, depth: Number(e.target.value) }))}
                    className="flex-grow accent-accent-blue cursor-pointer h-1.5 bg-stone rounded-lg appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, depth: Math.min(50, prev.depth + 5) }))}
                    className="w-7 h-7 rounded-lg bg-warm hover:bg-stone text-dark text-xs font-bold border border-stone flex items-center justify-center cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Height dropdown (dynamically limited by selected tier) */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-dark/60 flex flex-wrap items-center gap-1">
                  <span>Height (ft)</span>
                  <span className="text-[9px] text-dark/40 font-semibold italic">*(organizer guidelines)*</span>
                </span>
                <select
                  value={config.height}
                  onChange={(e) => setConfig({ ...config, height: Number(e.target.value) })}
                  suppressHydrationWarning
                  className="w-full px-3 py-2 rounded-xl bg-warm border border-stone text-dark text-xs font-bold focus:outline-none focus:border-accent-blue h-9"
                >
                  {[8, 10, 12, 15]
                    .filter((h) => h <= (TIERS.find(t => t.id === config.tier)?.limit || 12))
                    .map((h) => (
                      <option key={h} value={h}>
                        {h} ft {h === 8 ? "(Standard)" : h === 10 ? "(Elevated)" : h === 12 ? "(High Structural)" : h === 15 ? "(Max Elevation)" : ""}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 4: Features & Branding Elements */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5.5 h-5.5 rounded-full bg-accent-blue text-white text-[10px] font-bold">4</span>
              <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
                Step 4: Features & Branding Elements
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { key: "led", label: "LED Video Wall (+₹80k)" },
                { key: "counter", label: "Reception Desk (+₹25k)" },
                { key: "lounge", label: "Discussion Lounge (+₹35k)" },
                { key: "shelves", label: "Product Displays (+₹15k)" },
                { key: "plants", label: "Green Planters (+₹12k)" },
                { key: "touchScreen", label: "Touch Kiosk (+₹25k)" },
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

            {/* Running Total Summary display */}
            <div className="mt-3 p-4 rounded-2xl border border-stone bg-warm flex flex-col gap-2 text-xs font-semibold text-dark">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-dark/50 tracking-wider">
                <span>Base Booth ({TIERS.find(t => t.id === config.tier)?.label || "Premium"})</span>
                <span>₹{toIndianFormat(baseBoothPrice)}</span>
              </div>

              {Object.entries(config.features).some(([, active]) => active) && (
                <div className="flex flex-col gap-1.5 border-t border-stone pt-2.5 text-[11px] text-dark/80">
                  {config.features.led && (
                    <div className="flex justify-between">
                      <span>• LED Video Wall Addon</span>
                      <span>+₹80,000</span>
                    </div>
                  )}
                  {config.features.counter && (
                    <div className="flex justify-between">
                      <span>• Reception Desk Addon</span>
                      <span>+₹25,000</span>
                    </div>
                  )}
                  {config.features.lounge && (
                    <div className="flex justify-between">
                      <span>• Discussion Lounge Addon</span>
                      <span>+₹35,000</span>
                    </div>
                  )}
                  {config.features.shelves && (
                    <div className="flex justify-between">
                      <span>• Product Displays Addon</span>
                      <span>+₹15,000</span>
                    </div>
                  )}
                  {config.features.plants && (
                    <div className="flex justify-between">
                      <span>• Green Planters Addon</span>
                      <span>+₹12,000</span>
                    </div>
                  )}
                  {config.features.touchScreen && (
                    <div className="flex justify-between">
                      <span>• Touch Kiosk Addon</span>
                      <span>+₹25,000</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center border-t border-stone pt-2.5 text-sm font-extrabold text-accent-blue">
                <span>Running Total Cost</span>
                <span>₹{toIndianFormat(runningTotal)}</span>
              </div>
            </div>
          </div>

          {/* Step 5: Color Swatches & Custom Picker */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5.5 h-5.5 rounded-full bg-accent-blue text-white text-[10px] font-bold">5</span>
              <label className="text-xs font-bold uppercase tracking-wider text-dark/70">
                Step 5: Primary Theme Color
              </label>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Selected Color hex preview */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone bg-warm text-dark">
                <div
                  style={{ backgroundColor: config.color }}
                  className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                />
                <span className="text-xs font-bold font-mono tracking-wide uppercase">{config.color}</span>
              </div>

              {/* Swatches selection */}
              <div className="flex items-center gap-2">
                {["#2F6BFF", "#111111", "#E11D48", "#059669", "#7C3AED"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setConfig({ ...config, color: c })}
                    style={{ backgroundColor: c }}
                    className={`w-8 h-8 rounded-full transition-all cursor-pointer border-2 ${
                      config.color.toLowerCase() === c.toLowerCase()
                        ? "scale-110 border-black shadow-md"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                    title={c}
                  />
                ))}
                {/* Custom Color Picker input */}
                <div className="relative w-8 h-8 rounded-full border border-stone hover:bg-stone flex items-center justify-center cursor-pointer overflow-hidden bg-warm">
                  <input
                    type="color"
                    value={config.color}
                    onChange={(e) => setConfig({ ...config, color: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <span className="text-xs font-bold text-dark/60">+</span>
                </div>
              </div>
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
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-deepBlack text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl hover:bg-neutral-800 transition-all shadow-md mt-2 cursor-pointer border-none"
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
                {config.width}ft × {config.depth}ft × {config.height}ft ({areaSqFt} sq ft / {areaSqm.toFixed(1)} sqm)
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
                  Estimated Stall Cost Starting From
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
