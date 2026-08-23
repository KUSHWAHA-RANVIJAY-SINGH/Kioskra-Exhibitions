import React from "react";
import type { Metadata } from "next";
import BoothConfigurator from "@/components/BoothConfigurator";
import Section from "@/components/Section";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "Interactive 2D Booth Configurator | Kioskra Exhibitions",
  description:
    "Design and visualize your custom exhibition stall in real-time. Pick layouts, dimensions, features, and brand colors with instant starting cost estimates.",
};

export default function ConfiguratorPage() {
  return (
    <div className="pt-24 min-h-screen bg-warm text-dark">
      {/* Header Banner */}
      <Section className="pb-4">
        <Heading
          badge="Interactive Architectural Tool"
          sansPrefix="2D Booth"
          serifAccent="Spatial"
          sansSuffix="Configurator"
          subtitle="Select booth dimensions, shape, features, and brand colors to generate real-time top-down blueprints and instant pricing estimates."
          size="xl"
        />
      </Section>

      {/* Configurator Scaffold */}
      <BoothConfigurator />
    </div>
  );
}
