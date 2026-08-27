import React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import connectDB from "@/lib/db";
import Exhibition from "@/lib/models/Exhibition";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Exhibitions Calendar 2026 - 2027 | Kioskra Exhibitions",
  description: "Plan your trade show stall design and turnkey fabrication. Explore major upcoming B2B exhibitions in Delhi, Noida, Mumbai, and Bengaluru with Kioskra.",
  keywords: [
    "upcoming exhibitions India",
    "exhibitions calendar 2026",
    "exhibitions calendar 2027",
    "trade show calendar India",
    "exhibition stall design Pragati Maidan",
    "booth builder India Expo Mart",
    "BIEC Bengaluru stall fabricator",
  ],
};

const fallbackExhibitions = [
  {
    _id: "mock-1",
    title: "ACETECH Delhi 2026",
    slug: "acetech-delhi-2026",
    startDate: new Date("2026-12-10T00:00:00.000Z"),
    endDate: new Date("2026-12-13T00:00:00.000Z"),
    location: "New Delhi",
    venue: "Pragati Maidan",
    descriptionMarkdown: "ACETECH is Asia's leading exhibition on architecture, building materials, art, and design. It brings together architectural innovators and premium suppliers from across the globe.",
    featuredImage: "/images/Designs/52.png",
    metaTitle: "Exhibition Stall Design for ACETECH Delhi 2026 | Kioskra",
    metaDescription: "Fabricate a custom exhibition stall for ACETECH Delhi 2026 with Kioskra. Premium 3D design and turnkey fabrication at Pragati Maidan.",
    status: "Published",
  },
  {
    _id: "mock-2",
    title: "Auto Expo 2027",
    slug: "auto-expo-2027",
    startDate: new Date("2027-01-14T00:00:00.000Z"),
    endDate: new Date("2027-01-18T00:00:00.000Z"),
    location: "Greater Noida",
    venue: "India Expo Mart",
    descriptionMarkdown: "The Auto Expo is India's flagship automotive exhibition, showcasing new vehicles, mobility solutions, green energy concepts, and manufacturing technologies.",
    featuredImage: "/images/Designs/1 (2).png",
    metaTitle: "Premium Booth Construction for Auto Expo 2027 | Kioskra",
    metaDescription: "Partner with Kioskra for bespoke booth fabrication at Auto Expo 2027, India Expo Mart. Get a customized 3D design quote.",
    status: "Published",
  },
  {
    _id: "mock-3",
    title: "Plastindia 2027",
    slug: "plastindia-2027",
    startDate: new Date("2027-02-05T00:00:00.000Z"),
    endDate: new Date("2027-02-10T00:00:00.000Z"),
    location: "New Delhi",
    venue: "Pragati Maidan",
    descriptionMarkdown: "Plastindia is a major global plastics forum showcasing the entire plastics industry ecosystem, polymer research, processing equipment, and sustainable recycling techniques.",
    featuredImage: "/images/Designs/51.png",
    metaTitle: "Exhibition Stall Fabricator for Plastindia 2027 | Kioskra",
    metaDescription: "Custom booth design & structural fabrication for Plastindia 2027 at Pragati Maidan. Design your spatial journey with Kioskra.",
    status: "Published",
  },
  {
    _id: "mock-4",
    title: "IMTEX 2027",
    slug: "imtex-2027",
    startDate: new Date("2027-01-21T00:00:00.000Z"),
    endDate: new Date("2027-01-27T00:00:00.000Z"),
    location: "Bengaluru",
    venue: "BIEC",
    descriptionMarkdown: "IMTEX showcases the latest advances in metal-cutting machine tools, manufacturing automation, and industrial robotics in South Asia, drawing cutting-edge engineering firms globally.",
    featuredImage: "/images/Designs/1 (1).png",
    metaTitle: "Turnkey Stall Construction for IMTEX 2027 | Kioskra",
    metaDescription: "Exhibiting at IMTEX 2027, BIEC Bengaluru? Get top-tier exhibition design and turnkey fabrication with Kioskra. Enquire now.",
    status: "Published",
  }
];

function formatDateRange(start: Date, end: Date): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = startDate.toLocaleDateString("en-IN", { month: "short" });
  const endMonth = endDate.toLocaleDateString("en-IN", { month: "short" });
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startYear !== endYear) {
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
  }
  
  if (startMonth !== endMonth) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
  }

  if (startDay !== endDay) {
    return `${startMonth} ${startDay} - ${endDay}, ${startYear}`;
  }

  return `${startMonth} ${startDay}, ${startYear}`;
}

export default async function ExhibitionsPage() {
  let exhibitions = [];

  try {
    await connectDB();
    const dbExhibitions = await Exhibition.find({ status: "Published" }).sort({ startDate: 1 });
    exhibitions = JSON.parse(JSON.stringify(dbExhibitions));
  } catch (error) {
    console.error("Database connection or fetch failed for exhibitions, using fallback data:", error);
  }

  // Fallback to static exhibitions if DB query yields no results
  if (!exhibitions || exhibitions.length === 0) {
    exhibitions = JSON.parse(JSON.stringify(fallbackExhibitions));
  }

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-[#F5F4F1] text-brand-charcoal pb-20">
      {/* Editorial Header Section */}
      <Section className="pb-4">
        <Heading
          badge="Exhibitions Portfolio 2026 - 2027"
          sansPrefix="Upcoming"
          serifAccent="Trade Shows &"
          sansSuffix="Exhibitions"
          subtitle="Explore the upcoming premium B2B exhibitions pan-India. Partner with Kioskra to secure custom 3D spatial renders and turnkey modular fabrication compliant with specific venue regulations."
          size="xl"
          align="left"
        />
      </Section>

      {/* Grid listing section */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibitions.map((exhibition: any) => {
            const formattedDateRange = formatDateRange(exhibition.startDate, exhibition.endDate);

            return (
              <div
                key={exhibition._id || exhibition.slug}
                className="group bg-[#191A1A] rounded-3xl border border-white/5 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-white"
              >
                {/* Featured Image */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={exhibition.featuredImage || "/images/Designs/1 (1).png"}
                    alt={exhibition.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191A1A] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta (Date / Time) */}
                  <div className="flex items-center gap-2 text-[#2F6BFF] text-xs font-bold uppercase tracking-wider mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDateRange}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold tracking-tight mb-2 group-hover:text-[#2F6BFF] transition-colors duration-200 text-white">
                    {exhibition.title}
                  </h3>

                  {/* Venue info */}
                  <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold mb-4">
                    <MapPin className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                    <span>{exhibition.venue}, {exhibition.location}</span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-white/60 leading-relaxed mb-6 line-clamp-3">
                    {exhibition.descriptionMarkdown ? exhibition.descriptionMarkdown.replace(/[*#`_\-]/g, "") : ""}
                  </p>

                  {/* CTA link */}
                  <Link
                    href={`/exhibitions/${exhibition.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white hover:text-[#2F6BFF] transition-colors mt-auto self-start group/link"
                  >
                    <span>View Details & Plan Stall</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-250" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
