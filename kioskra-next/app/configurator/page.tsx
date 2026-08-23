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
    <div className="pt-32 md:pt-40 min-h-screen bg-warm text-dark pb-24 sm:pb-32">
      {/* Header Banner */}
      <Section className="pb-4">
        <Heading
          badge="Interactive 3D Spatial Tool"
          sansPrefix="3D Stall"
          serifAccent="Real-Time"
          sansSuffix="Configurator"
          subtitle="Customize booth layout, dimensions, structural accessories, and brand theme colors in real-time 3D to generate instant quotes."
          size="xl"
        />
      </Section>

      {/* Configurator Scaffold */}
      <BoothConfigurator />
    </div>
  );
}
