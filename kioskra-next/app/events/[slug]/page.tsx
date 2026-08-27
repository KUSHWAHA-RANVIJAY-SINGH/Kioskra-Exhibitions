import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import connectDB from "@/lib/db";
import Event from "@/lib/models/Event";
import EventLeadForm from "@/components/EventLeadForm";
import { Calendar, MapPin, ChevronLeft, ShieldCheck, Award, Info, Zap } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

async function getEvent(slug: string) {
  try {
    await connectDB();
    const event = await Event.findOne({ slug, status: "Published" });
    if (event) {
      return JSON.parse(JSON.stringify(event));
    }
  } catch (error) {
    console.error("Failed to fetch event from DB in dynamic page:", error);
  }

  // Fallback to static mock events
  const mockEvent = fallbackEvents.find((e) => e.slug === slug);
  return mockEvent ? JSON.parse(JSON.stringify(mockEvent)) : null;
}

export async function generateStaticParams() {
  let slugs = fallbackEvents.map((e) => ({ slug: e.slug }));
  try {
    await connectDB();
    const dbEvents = await Event.find({ status: "Published" }, { slug: 1 });
    if (dbEvents && dbEvents.length > 0) {
      slugs = dbEvents.map((e) => ({ slug: e.slug }));
    }
  } catch (error) {
    // Ignore build database connection issues
  }
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const event = await getEvent(resolvedParams.slug);

  if (!event) {
    return {
      title: "Event Not Found | Kioskra Exhibitions",
      description: "The requested trade show details could not be found.",
    };
  }

  return {
    title: event.metaTitle || `${event.title} Exhibition Stall Design & Fabrication | Kioskra`,
    description: event.metaDescription || `Looking to exhibit at ${event.title}? Kioskra specializes in turnkey fabrication, premium 3D design, and custom structures for ${event.venue}.`,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const event = await getEvent(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-brand-warmOffWhite text-brand-charcoal min-h-screen">
      {/* Cinematic Banner Header */}
      <div className="relative pt-24 pb-16 md:py-32 overflow-hidden bg-brand-charcoal text-white border-b border-white/10">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={event.featuredImage || "/images/Designs/1 (1).png"}
            alt={event.title}
            fill
            priority
            className="object-cover object-center filter blur-xs scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Back button */}
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-brand-electricBlue transition-colors font-bold uppercase tracking-wider mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Exhibitions Directory</span>
          </Link>

          <div className="max-w-3xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electricBlue/20 text-brand-electricBlue text-[10px] font-bold uppercase tracking-[0.15em] mb-4 border border-brand-electricBlue/30">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-electricBlue inline-block animate-pulse" />
              Exhibitor Alert
            </span>

            {/* Event Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white font-sans">
              {event.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-white/80 font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-electricBlue" />
                <span>Starts: {formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-electricBlue" />
                <span>{event.venue}, {event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Core Layout */}
      <Section className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          
          {/* Left Column: Event details & SEO content */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Event Overview Section */}
            <div>
              <h2 className="text-2xl font-extrabold text-brand-deepBlack tracking-tight mb-4 font-sans">
                Exhibition Overview
              </h2>
              <div 
                className="text-sm text-brand-charcoal/80 leading-relaxed space-y-4 prose prose-stone"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>

            <hr className="border-brand-softStone" />

            {/* Strategic Value Proposition */}
            <div>
              <h2 className="text-2xl font-extrabold text-brand-deepBlack tracking-tight mb-6 font-sans">
                Why Participate at {event.title}?
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-brand-softStone shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-electricBlue/10 text-brand-electricBlue flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-deepBlack mb-1">High-Impact Visibility</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                      Capture maximum footfall from qualified trade visitors looking for products and engineering capabilities in your sector.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-softStone shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-electricBlue/10 text-brand-electricBlue flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-deepBlack mb-1">Bespoke Brand Authority</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                      Stand out with a monolithic custom booth engineered specifically to project market leadership and product trust.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-softStone shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-electricBlue/10 text-brand-electricBlue flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-deepBlack mb-1">Turnkey Execution</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                      From 3D structural renders and structural calculations to on-site fabrication and handover — we handle everything.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-softStone shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-electricBlue/10 text-brand-electricBlue flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-deepBlack mb-1">Exclusive VIP Lounges</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                      Integrate private meeting environments or double-decker lounges for closed-door discussions and contract signatures.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-brand-softStone" />

            {/* Venue Fabrication Advisory Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-brand-charcoal text-brand-warmOffWhite border border-white/5 relative overflow-hidden">
              {/* Blur decorative */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-electricBlue/5 rounded-full filter blur-xl pointer-events-none" />

              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-electricBlue" />
                Venue Fabrication Advisory: {event.venue}
              </h3>
              
              <div className="text-xs text-brand-warmOffWhite/80 leading-relaxed space-y-3">
                <p>
                  Fabricating at <strong className="text-white">{event.venue}</strong> requires precise structural compliance and coordination with local trade center management. Here are key logistics Kioskra handles for your booth:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-brand-warmOffWhite/70">
                  <li>
                    <strong className="text-white">Height Approvals:</strong> Strict guidelines apply for single-tier (usually 3m - 4.5m) and double-decker structures. We obtain structural stability certificates from certified engineers.
                  </li>
                  <li>
                    <strong className="text-white">Electrical Grid Load:</strong> Power layout planning, cabling, and distribution boards are designed to handle LED video walls, lighting rigs, and machinery trials safely.
                  </li>
                  <li>
                    <strong className="text-white">Setup Schedule:</strong> Time window for installation is highly compressed (typically 48 - 72 hours). Kioskra uses pre-fabricated modular structural parts to accelerate site setup.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky high-converting Lead form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <EventLeadForm
                eventTitle={event.title}
                eventVenue={event.venue}
                eventLocation={event.location}
              />

              {/* Security trust badge below form */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-brand-charcoal/50 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NDA & Design Rights Protected</span>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
}
