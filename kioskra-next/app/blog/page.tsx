import React from "react";
import { Metadata } from "next";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import BlogCatalogClient from "@/components/BlogCatalogClient";
import { blogPostsData } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Exhibition Design & Planning Blog | Kioskra Exhibitions",
  description: "Expert guides on upcoming 2026-2027 exhibitions in Delhi NCR, Pragati Maidan, Yashobhumi, India Expo Centre, booth costs, design trends, and exhibitor guides.",
  keywords: [
    "upcoming exhibitions Delhi NCR 2026",
    "Pragati Maidan exhibitions 2026",
    "Yashobhumi Dwarka exhibitions",
    "India Expo Centre Greater Noida",
    "exhibition stall cost Delhi",
    "exhibitor registration guide",
    "booth design tips"
  ],
};

export default function BlogListingPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-brand-warmOffWhite">
      {/* Header Banner Section */}
      <Section className="pb-4">
        <Heading
          badge="Exhibition Insights & Guides"
          sansPrefix="Trade Show"
          serifAccent="Exhibitor"
          sansSuffix="Knowledge Base"
          subtitle="Comprehensive guides, 2026 event schedules across Pragati Maidan, Yashobhumi & Greater Noida, pricing benchmarks, and spatial booth design strategy."
          size="xl"
        />
      </Section>

      {/* Interactive Catalog Section */}
      <Section className="pt-0 pb-20">
        <BlogCatalogClient posts={blogPostsData} />
      </Section>
    </div>
  );
}
