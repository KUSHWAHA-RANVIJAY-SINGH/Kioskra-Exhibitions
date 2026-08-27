import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import connectDB from "@/lib/db";
import Exhibition from "@/lib/models/Exhibition";
import ExhibitionLeadForm from "@/components/ExhibitionLeadForm";
import { Calendar, MapPin, ChevronLeft, ShieldCheck, Award, Info, Zap } from "lucide-react";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const fallbackExhibitions = [
  {
    _id: "mock-1",
    title: "ACETECH Delhi 2026",
    slug: "acetech-delhi-2026",
    startDate: new Date("2026-12-10T00:00:00.000Z"),
    endDate: new Date("2026-12-13T00:00:00.000Z"),
    location: "New Delhi",
    venue: "Pragati Maidan",
    descriptionMarkdown: `ACETECH is Asia's leading exhibition on architecture, building materials, art, and design. It brings together architectural innovators and premium suppliers from across the globe.

### Key Exhibitor Benefits
*   **High-Volume Brand Exposure:** Engage directly with over 150,000+ targeted architects, interior designers, structural engineers, developers, and hospitality procurement professionals.
*   **Networking Opportunities:** Gain exclusive entry to VIP developer roundtables, panel discussions, and collaborative spatial design workshops.
*   **Turnkey Branding Solutions:** Position your brand as a market leader with customized high-end structural stall design tailored for Pragati Maidan's strict height limits.

### Exhibitor Profile
Exhibitors showcase innovations in lighting solutions, bath fittings, smart home automation, high-performance glazing, structural cladding, tile innovations, and modular interior systems.`,
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
    descriptionMarkdown: `The Auto Expo is India's flagship automotive exhibition, showcasing new vehicles, mobility solutions, green energy concepts, and manufacturing technologies.

### Key Exhibitor Benefits
*   **Mass Media Coverage:** Leverage extensive national and global automotive press, tech bloggers, and trade channels covering product launches.
*   **Direct B2B Lead Acquisition:** Connect with distribution partners, fleet operators, component buyers, and supply chain partners visiting India Expo Mart.
*   **Interactive Spatial Displays:** Integrate heavy structural load displays, high-lumen lighting grids, LED video walls, and experiential EV simulator lounges.

### Exhibitor Profile
Exhibitors range from multinational automotive manufacturers (OEMs) to EV startups, lithium-ion battery innovators, smart charging infrastructure brands, and advanced ADAS software developers.`,
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
    descriptionMarkdown: `Plastindia is a major global plastics forum showcasing the entire plastics industry ecosystem, polymer research, processing equipment, and sustainable recycling techniques.

### Key Exhibitor Benefits
*   **Industrial Partnerships:** Close machinery purchase contracts, distribution agreements, and raw material supply mandates directly on the trade floor.
*   **Global Attendee Demographic:** Meet decision-makers, packaging designers, and manufacturing directors from over 40+ countries.
*   **Heavy Machinery Operations:** Pragati Maidan supports dynamic machinery demonstrations, power grid integration, and custom exhaust setups.

### Exhibitor Profile
Exhibiting entities present blow molding machinery, bio-degradable polymer raw materials, masterbatches, advanced recycling equipment, and engineered plastics applications.`,
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
    descriptionMarkdown: `IMTEX showcases the latest advances in metal-cutting machine tools, manufacturing automation, and industrial robotics in South Asia, drawing cutting-edge engineering firms globally.

### Key Exhibitor Benefits
*   **B2B Industrial Leads:** Interact directly with production managers, purchase officers, and defense & aerospace procurement executives.
*   **Heavy-Duty Stall Foundations:** BIEC features reinforced floor loading capabilities suitable for multi-ton CNC machining centers and laser cutters.
*   **VIP Discussion Lounges:** Plan your stall layout with elevated private conference rooms and executive catering setups to close multi-million deals in comfort.

### Exhibitor Profile
Exhibitors display CNC milling machines, industrial 3D printing equipment, precision toolings, metrology software, and smart factory IoT systems.`,
    featuredImage: "/images/Designs/1 (1).png",
    metaTitle: "Turnkey Stall Construction for IMTEX 2027 | Kioskra",
    metaDescription: "Exhibiting at IMTEX 2027, BIEC Bengaluru? Get top-tier exhibition design and turnkey fabrication with Kioskra. Enquire now.",
    status: "Published",
  }
];

async function getExhibition(slug: string) {
  try {
    await connectDB();
    const exhibition = await Exhibition.findOne({ slug, status: "Published" });
    if (exhibition) {
      return JSON.parse(JSON.stringify(exhibition));
    }
  } catch (error) {
    console.error("Failed to fetch exhibition from DB in dynamic page:", error);
  }

  // Fallback to static mock exhibitions
  const mockEx = fallbackExhibitions.find((e) => e.slug === slug);
  return mockEx ? JSON.parse(JSON.stringify(mockEx)) : null;
}

export async function generateStaticParams() {
  let slugs = fallbackExhibitions.map((e) => ({ slug: e.slug }));
  try {
    await connectDB();
    const dbExhibitions = await Exhibition.find({ status: "Published" }, { slug: 1 });
    if (dbExhibitions && dbExhibitions.length > 0) {
      slugs = dbExhibitions.map((e) => ({ slug: e.slug }));
    }
  } catch (error) {
    // Ignore build database connection issues
  }
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const exhibition = await getExhibition(resolvedParams.slug);

  if (!exhibition) {
    return {
      title: "Exhibition Not Found | Kioskra Exhibitions",
      description: "The requested exhibition details could not be found.",
    };
  }

  return {
    title: exhibition.metaTitle || `${exhibition.title} Exhibition Stall Design & Turnkey Fabrication | Kioskra`,
    description: exhibition.metaDescription || `Exhibiting at ${exhibition.title}? Kioskra specializes in turnkey fabrication, premium 3D design, and custom modular structures for ${exhibition.venue}.`,
  };
}

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

export default async function ExhibitionDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const exhibition = await getExhibition(resolvedParams.slug);

  if (!exhibition) {
    notFound();
  }

  const formattedDateRange = formatDateRange(exhibition.startDate, exhibition.endDate);

  // Schema.org Event JSON-LD structured data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": exhibition.title,
    "startDate": exhibition.startDate,
    "endDate": exhibition.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": exhibition.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": exhibition.location,
        "addressCountry": "IN"
      }
    },
    "image": [
      exhibition.featuredImage || "https://kioskra.com/images/LOGOS/Kioskra%20Transparent.png"
    ],
    "description": exhibition.metaDescription || `${exhibition.title} trade show at ${exhibition.venue}, ${exhibition.location}.`,
    "organizer": {
      "@type": "Organization",
      "name": "Kioskra Exhibitions",
      "url": "https://kioskra.com"
    }
  };

  return (
    <div className="bg-[#F5F4F1] text-brand-charcoal min-h-screen pb-20">
      {/* Dynamic JSON-LD structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cinematic Banner Header */}
      <div className="relative pt-28 pb-16 md:py-32 overflow-hidden bg-[#191A1A] text-white border-b border-white/10">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={exhibition.featuredImage || "/images/Designs/1 (1).png"}
            alt={exhibition.title}
            fill
            priority
            className="object-cover object-center filter blur-xs scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191A1A] via-[#191A1A]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Back button */}
          <Link
            href="/exhibitions"
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#2F6BFF] transition-colors font-bold uppercase tracking-wider mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Exhibitions Directory</span>
          </Link>

          <div className="max-w-3xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F6BFF]/20 text-[#2F6BFF] text-[10px] font-bold uppercase tracking-[0.15em] mb-4 border border-[#2F6BFF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F6BFF] inline-block animate-pulse" />
              Exhibitor Alert
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white font-sans">
              {exhibition.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-white/80 font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2F6BFF]" />
                <span>Date: {formattedDateRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2F6BFF]" />
                <span>{exhibition.venue}, {exhibition.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Core Layout */}
      <Section className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          
          {/* Left Column: Markdown content & value proposition */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Exhibition Overview Rendered from Markdown */}
            <div className="prose prose-stone max-w-none text-sm text-brand-charcoal/80 leading-relaxed">
              <h2 className="text-2xl font-extrabold text-brand-deepBlack tracking-tight mb-4 font-sans border-b border-brand-softStone pb-3">
                Exhibition Overview & Demographics
              </h2>
              <div className="space-y-4">
                <ReactMarkdown>
                  {exhibition.descriptionMarkdown}
                </ReactMarkdown>
              </div>
            </div>

            <hr className="border-brand-softStone" />

            {/* Value Proposition */}
            <div>
              <h2 className="text-2xl font-extrabold text-brand-deepBlack tracking-tight mb-6 font-sans">
                Secure a Premium Spatial Presence
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-brand-softStone shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 text-[#2F6BFF] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-deepBlack mb-1">Architectural Branding</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                      Transform your raw exhibit space into a premium structural statement. We build booths that project product excellence.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-softStone shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 text-[#2F6BFF] flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-deepBlack mb-1">Qualified B2B Lead Conversion</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                      Optimize layouts for visitor pathways, digital interaction centers, product testing decks, and executive lounges.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-softStone shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 text-[#2F6BFF] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-deepBlack mb-1">Logistics & Compliance Handled</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                      From structural stability certificates and layout drawings to electrical boards and site handovers — we manage all approvals.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-brand-softStone shadow-xs flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2F6BFF]/10 text-[#2F6BFF] flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-deepBlack mb-1">Modular Prefabricated Parts</h4>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                      We pre-build booth elements at our Delhi warehouse, ensuring dynamic assembly at the venue within the tight 48-72h setup window.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-brand-softStone" />

            {/* Venue Fabrication compliance Advisory */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#191A1A] text-white border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#2F6BFF]/5 rounded-full filter blur-xl pointer-events-none" />

              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#2F6BFF]" />
                Official Venue Regulations: {exhibition.venue}
              </h3>
              
              <div className="text-xs text-white/80 leading-relaxed space-y-3">
                <p>
                  Executing structural designs at <strong className="text-white">{exhibition.venue}</strong> requires compliance with official trade center protocols. Kioskra ensures full alignment with the following standards:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-white/70">
                  <li>
                    <strong className="text-white">Height Restrictions:</strong> Standard bare spaces support single-tier (usually up to 3m - 4m) or double-decker structural options (up to 6m, subject to stability approval).
                  </li>
                  <li>
                    <strong className="text-white">Electrical Grid Allocations:</strong> Custom cabling layout diagrams are engineered for specific LED video wall nodes, dynamic spotlight rigs, and heavy machine trials.
                  </li>
                  <li>
                    <strong className="text-white">Strict Construction Timelines:</strong> Handover is done in record time thanks to our pre-fabrication methodology. Booth materials are delivered, assembled, and finished on-site quickly.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky high-converting Lead form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <ExhibitionLeadForm
                exhibitionTitle={exhibition.title}
                exhibitionVenue={exhibition.venue}
                exhibitionLocation={exhibition.location}
              />

              {/* Security trust badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-brand-charcoal/50 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NDA & Stall Design Rights Reserved</span>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
}
