import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import {
  Sparkles,
  Layers,
  Wrench,
  Palette,
  CheckCircle,
  Shield,
  Truck,
  Megaphone,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibition Services & Capabilities | Kioskra Exhibitions",
  description: "Discover Kioskra's premium exhibition capabilities: 3D Spatial Visualization, Custom Stall Fabrication, Turnkey Pan-India Delivery, and targeted RWA Campaigns.",
  keywords: [
    "exhibition services",
    "3D stall design",
    "booth fabrication Delhi",
    "turnkey exhibition company",
    "RWA brand activations",
    "exhibition transport India",
  ],
};

export default function ServicesPage() {
  const serviceCategories = [
    {
      num: "01",
      title: "3D Spatial Visualization",
      desc: "High-fidelity, architectural-grade 3D rendering and virtual walkthroughs that allow you to step inside your brand pavilion long before fabrication begins.",
      features: [
        "Parametric CAD Concepts & Modeling",
        "Photorealistic Texturing & Lighting Simulation",
        "360-Degree Virtual Reality Walkthroughs",
        "Exact Material & Texture Specification Mapping",
      ],
      icon: Sparkles,
    },
    {
      num: "02",
      title: "Custom Stall Fabrication",
      desc: "Tailor-made structural exhibition booths constructed using premium acrylics, high-gloss laminates, master carpentry, and custom millwork.",
      features: [
        "Artisan Woodworking & Custom Millwork",
        "Structural Engineering Audits & Load Rating",
        "Precision CNC Milling & Laser Cutting",
        "Fire-Retardant Fabric & Paint Finishes",
      ],
      icon: Palette,
    },
    {
      num: "03",
      title: "Turnkey Pan-India Delivery",
      desc: "Comprehensive project management from hall drawing approvals to shipping, on-site assembly, electrical connections, and active expo support.",
      features: [
        "Liaison with Exhibition Organizers & Authorities",
        "Secure Logistics & Freight to Major Trade Cities",
        "24-Hour Handover Guarantee Prior to Expo Opening",
        "On-Ground Site Supervisor & Event Day Technical Support",
      ],
      icon: Truck,
    },
    {
      num: "04",
      title: "RWA Campaigns & Activations",
      desc: "Direct-to-consumer housing society kiosks, pop-up events, and hyper-local brand activations designed to engage target audiences directly where they live.",
      features: [
        "RWA Liaison, Approvals & Permission Handovers",
        "High-Durability Weatherproof Modular Kiosks",
        "Promo Staffing, Lead Capture & Interactive Assets",
        "Multi-Location Sync & Logistics Execution",
      ],
      icon: Megaphone,
    },
  ];

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-brand-warmOffWhite pb-20">
      {/* Header Banner */}
      <Section className="pb-8">
        <Heading
          badge="End-To-End Capabilities"
          sansPrefix="Spatial"
          serifAccent="Services"
          sansSuffix="& Engineering"
          subtitle="From photorealistic 3D concepts to premium wood fabrication and multi-city campaign deployments, we execute with absolute precision."
          size="xl"
        />
      </Section>

      {/* Services List Scaffold */}
      <Section className="pt-0">
        <div className="space-y-8">
          {serviceCategories.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="p-8 sm:p-12 rounded-3xl bg-white border border-brand-softStone hover:border-brand-electricBlue/35 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number & Title */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold text-brand-electricBlue bg-brand-electricBlue/10 px-3 py-1 rounded-full">
                        {service.num}
                      </span>
                      <Icon className="w-5 h-5 text-brand-charcoal/60" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-sans text-brand-deepBlack leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Right Column: Features Checklist */}
                  <div className="lg:col-span-7 bg-brand-softStone/30 rounded-2xl p-6 border border-brand-softStone/60">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-brand-charcoal/60 mb-4">
                      Key Deliverables & Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-deepBlack font-semibold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-electricBlue mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-16 p-8 rounded-3xl bg-brand-softStone/50 border border-brand-softStone text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-brand-deepBlack">
              Need a custom spatial campaign or multi-city plan?
            </h4>
            <p className="text-xs sm:text-sm text-brand-charcoal/70 mt-1">
              Speak directly with our spatial design team to discuss floor plans and technical venue guidelines.
            </p>
          </div>
          <Button href="/contact" variant="primary" withArrow className="flex-shrink-0">
            Request Service Proposal
          </Button>
        </div>
      </Section>
    </div>
  );
}
