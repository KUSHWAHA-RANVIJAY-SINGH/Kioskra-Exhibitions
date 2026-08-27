import React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import connectDB from "@/lib/db";
import Event from "@/lib/models/Event";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Trade Shows & Exhibitions 2026 - 2027 | Kioskra",
  description: "Plan your trade show stall design and fabrication. Explore major upcoming exhibitions in Delhi, Mumbai, Bengaluru, and get customized 3D spatial concepts with Kioskra.",
  keywords: [
    "upcoming trade shows India",
    "exhibitions calendar 2026",
    "exhibitions calendar 2027",
    "exhibition stall fabrication Pragati Maidan",
    "stall designer India Expo Mart",
    "BIEC Bengaluru events",
    "booth design ACETECH",
    "Auto Expo booth builder",
  ],
};

const fallbackEvents = [
  {
    _id: "mock-1",
    title: "ACETECH Delhi 2026",
    slug: "acetech-delhi-2026",
    date: new Date("2026-12-10T00:00:00.000Z"),
    location: "New Delhi",
    venue: "Pragati Maidan",
    description: "ACETECH is Asia's largest exhibition on architecture, building materials, art, and design. It attracts top national and international brands from the construction and design sector.",
    featuredImage: "/images/Designs/52.png",
    metaTitle: "Exhibition Stall Design for ACETECH Delhi 2026 | Kioskra",
    metaDescription: "Fabricate a custom exhibition stall for ACETECH Delhi 2026 with Kioskra. Premium 3D design and turnkey fabrication at Pragati Maidan.",
    status: "Published",
  },
  {
    _id: "mock-2",
    title: "Auto Expo 2027",
    slug: "auto-expo-2027",
    date: new Date("2027-01-14T00:00:00.000Z"),
    location: "Greater Noida",
    venue: "India Expo Mart",
    description: "The Auto Expo is India's premier automobile exhibition, showcasing the future of mobility, electric vehicles, and latest manufacturing technologies from global giants.",
    featuredImage: "/images/Designs/1 (2).png",
    metaTitle: "Premium Booth Construction for Auto Expo 2027 | Kioskra",
    metaDescription: "Partner with Kioskra for bespoke booth fabrication at Auto Expo 2027, India Expo Mart. Get a customized 3D design quote.",
    status: "Published",
  },
  {
    _id: "mock-3",
    title: "Plastindia 2027",
    slug: "plastindia-2027",
    date: new Date("2027-02-05T00:00:00.000Z"),
    location: "New Delhi",
    venue: "Pragati Maidan",
    description: "Plastindia is the world's premier plastics exhibition, showcasing plastics machinery, raw materials, recycling tech, and innovative polymer applications.",
    featuredImage: "/images/Designs/51.png",
    metaTitle: "Exhibition Stall Fabricator for Plastindia 2027 | Kioskra",
    metaDescription: "Custom booth design & structural fabrication for Plastindia 2027 at Pragati Maidan. Design your spatial journey with Kioskra.",
    status: "Published",
  },
  {
    _id: "mock-4",
    title: "IMTEX 2027",
    slug: "imtex-2027",
    date: new Date("2027-01-21T00:00:00.000Z"),
    location: "Bengaluru",
    venue: "BIEC",
    description: "IMTEX is the flagship exhibition for metal-cutting machine tools and smart manufacturing technologies in South Asia, drawing cutting-edge engineering firms globally.",
    featuredImage: "/images/Designs/1 (1).png",
    metaTitle: "Turnkey Stall Construction for IMTEX 2027 | Kioskra",
    metaDescription: "Exhibiting at IMTEX 2027, BIEC Bengaluru? Get top-tier exhibition design and turnkey fabrication with Kioskra. Enquire now.",
    status: "Published",
  }
];

export default async function EventsPage() {
  let events = [];

  try {
    await connectDB();
    const dbEvents = await Event.find({ status: "Published" }).sort({ date: 1 });
    events = JSON.parse(JSON.stringify(dbEvents));
  } catch (error) {
    console.error("Database connection or fetch failed for events, using fallback data:", error);
  }

  // Fallback to static events if DB query yields no results
  if (!events || events.length === 0) {
    events = JSON.parse(JSON.stringify(fallbackEvents));
  }

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-brand-warmOffWhite text-brand-charcoal">
      {/* Editorial Header Section */}
      <Section className="pb-4">
        <Heading
          badge="Exhibitions Calendar 2026 - 2027"
          sansPrefix="Upcoming"
          serifAccent="Trade Shows &"
          sansSuffix="Exhibitions"
          subtitle="Explore major upcoming business expos pan-India. Partner with Kioskra for premium, spatial 3D concepts and turnkey structural fabrication tailored for these specific venues."
          size="xl"
          align="left"
        />
      </Section>

      {/* Grid listing section */}
      <Section className="pt-0 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={event._id || event.slug}
                className="group bg-white rounded-3xl border border-brand-softStone overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Featured Image */}
                <div className="relative h-56 w-full overflow-hidden bg-brand-softStone">
                  <Image
                    src={event.featuredImage || "/images/Designs/1 (1).png"}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta (Date / Time) */}
                  <div className="flex items-center gap-2 text-brand-electricBlue text-xs font-bold uppercase tracking-wider mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-brand-deepBlack tracking-tight mb-2 group-hover:text-brand-electricBlue transition-colors duration-200">
                    {event.title}
                  </h3>

                  {/* Venue info */}
                  <div className="flex items-center gap-1.5 text-brand-charcoal/70 text-xs font-semibold mb-4">
                    <MapPin className="w-3.5 h-3.5 text-brand-charcoal/50 flex-shrink-0" />
                    <span>{event.venue}, {event.location}</span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-brand-charcoal/70 leading-relaxed mb-6 line-clamp-3">
                    {event.description.replace(/<[^>]*>/g, "")}
                  </p>

                  {/* CTA link */}
                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-deepBlack hover:text-brand-electricBlue transition-colors mt-auto self-start group/link"
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
