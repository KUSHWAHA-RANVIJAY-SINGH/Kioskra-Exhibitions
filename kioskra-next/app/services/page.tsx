import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import {
  Sparkles,
  Layers,
  Wrench,
  Palette,
} from "lucide-react";

export default function ServicesPage() {
  const serviceCategories = [
    {
      num: "01",
      title: "Bespoke Exhibition Pavilions",
      desc: "Custom-designed double decker and single-tier stands engineered for maximum brand presence and footprint utilization at premier global expos.",
      features: [
        "Architectural 3D Concept Modeling",
        "Structural Load Calculations & Certifications",
        "High-End Material Selection & Textures",
        "Integrated Audio-Visual & Kinetic Displays",
      ],
      icon: Sparkles,
    },
    {
      num: "02",
      title: "Modular & Reusable Spatial Systems",
      desc: "Sustainable architectural frameworks engineered for multi-city trade fair roadshows with rapid deployment and zero aesthetic compromise.",
      features: [
        "Precision Aluminum Modular Grid Systems",
        "Flat-Pack Transport Optimization",
        "Reconfigurable Geometry for Variable Booth Sizes",
        "Sustainable Carbon-Conscious Fabrication",
      ],
      icon: Layers,
    },
    {
      num: "03",
      title: "Turnkey On-Ground Execution",
      desc: "Comprehensive project management from initial venue permits to in-house workshop fabrication, freight, assembly, and post-event teardown.",
      features: [
        "Dedicated Site Architect & Project Manager",
        "Exhibition Hall Authority Liaison & Approvals",
        "24/7 Handover Guarantee Prior to Expo Opening",
        "On-Site Technical Support During Expo Days",
      ],
      icon: Wrench,
    },
    {
      num: "04",
      title: "Spatial Lighting & Material Craft",
      desc: "Specialized architectural lighting design, acoustic fabric tensioning, and bespoke millwork crafted by master artisans.",
      features: [
        "Directional CCT Controlled LED Illumination",
        "Seamless Tension Fabric & Monolithic Cladding",
        "Custom Reception Desks & Lounge Millwork",
        "Tactile Flooring & Raised Platform Systems",
      ],
      icon: Palette,
    },
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Header Banner */}
      <Section className="pb-8">
        <Heading
          badge="End-To-End Capabilities"
          sansPrefix="Spatial"
          serifAccent="Services"
          sansSuffix="& Engineering"
          subtitle="From conceptual architectural sketches to turnkey on-site assembly, we handle all facets of international exhibition design."
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
                className="p-8 sm:p-12 rounded-3xl bg-white/70 backdrop-blur-sm border border-brand-softStone hover:border-brand-electricBlue/40 transition-all duration-300 shadow-sm hover:shadow-md"
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
                    <h3 className="text-2xl sm:text-3xl font-bold font-sans text-brand-deepBlack">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-brand-deepBlack font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-electricBlue mt-1.5 flex-shrink-0" />
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
        <div className="mt-16 p-8 rounded-2xl bg-brand-softStone/50 border border-brand-softStone text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-brand-deepBlack">
              Need a custom spatial inquiry or multi-city plan?
            </h4>
            <p className="text-xs sm:text-sm text-brand-charcoal/70">
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
