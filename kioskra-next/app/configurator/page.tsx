import React from "react";
import type { Metadata } from "next";
import BoothConfigurator from "@/components/BoothConfigurator";
import Section from "@/components/Section";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "Interactive 3D Stall Configurator | Kioskra Exhibitions",
  description:
    "Design and visualize your custom exhibition stall in real-time 3D. Pick layouts, dimensions, features, and brand colors with instant starting cost estimates.",
};

export default function ConfiguratorPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-warm text-dark pb-16 sm:pb-20">
      {/* Header Banner */}
      <Section className="py-6 sm:py-8 pb-2 sm:pb-3">
        <Heading
          badge="Interactive 3D Spatial Tool"
          sansPrefix="3D Stall"
          serifAccent="Real-Time"
          sansSuffix="Configurator"
          subtitle="Customize booth layout, dimensions, structural accessories, and brand theme colors in real-time 3D to generate instant quotes."
          size="xl"
          className="mb-2 sm:mb-4"
        />
      </Section>

      {/* Configurator Scaffold */}
      <BoothConfigurator />
    </div>
  );
}
