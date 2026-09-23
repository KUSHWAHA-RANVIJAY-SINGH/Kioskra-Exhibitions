export interface ShowcaseProject {
  id: string;
  title: string;
  category: "exhibition" | "activation" | "concept";
  categoryTag: string;
  images: string[];
  desc: string;
  stallSize?: string;
  venue?: string;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "treo",
    title: "Treo",
    category: "exhibition",
    categoryTag: "Exhibition Stand",
    images: ["/assets/Treo (1).webp", "/assets/Treo (2).webp"],
    desc: "A product-focused exhibition display using illuminated shelving, compact merchandising and strong brand visibility.",
    stallSize: "12m x 8m",
    venue: "Pragati Maidan, New Delhi"
  },
  {
    id: "livguard",
    title: "Livguard",
    category: "exhibition",
    categoryTag: "Exhibition Stand",
    images: ["/assets/LivGuard.webp", "/assets/LivGuard (1).webp", "/assets/LivGuard (2).webp"],
    desc: "A large exhibition environment built around product demonstration, brand storytelling and visitor circulation.",
    stallSize: "18m x 12m",
    venue: "BIEC, Bengaluru"
  },
  {
    id: "milton-appliances",
    title: "Milton Appliances",
    category: "exhibition",
    categoryTag: "Exhibition Stand",
    images: [
      "/assets/Milton (1).webp",
      "/assets/Milton (2).webp",
      "/assets/Milton (3).webp",
      "/assets/Milton (4).webp",
      "/assets/Milton (5).webp"
    ],
    desc: "A warm retail-inspired exhibition environment combining product showcases, hospitality and strong visual branding.",
    stallSize: "15m x 10m",
    venue: "Pragati Maidan, New Delhi"
  },
  {
    id: "eurogrip-rwa",
    title: "Eurogrip RWA",
    category: "activation",
    categoryTag: "Brand Activation",
    images: [
      "/assets/Eurogrip RWA.webp",
      "/assets/Eurogrip RWA (2).webp",
      "/assets/Eurogrip RWA (3).webp",
      "/assets/Eurogrip RWA (4).webp"
    ],
    desc: "A branded roadshow activation designed to bring Eurogrip closer to its audience through a bold, mobile experience.",
    stallSize: "Mobile Activation Unit",
    venue: "Pan-India Roadshow"
  },
  {
    id: "livguard-product-exp",
    title: "Livguard — Product Experience",
    category: "activation",
    categoryTag: "Brand Activation",
    images: ["/assets/LivGuard (10).webp", "/assets/LivGuard (11).webp", "/assets/LivGuard (12).webp"],
    desc: "An interactive product presentation concept with dedicated product demonstration zones.",
    stallSize: "14m x 10m",
    venue: "HITEX, Hyderabad"
  },
  {
    id: "rupay-bobcard",
    title: "RuPay / BOBCARD",
    category: "exhibition",
    categoryTag: "Exhibition Stand",
    images: ["/assets/BOBcard (1).webp", "/assets/BOBcard (2).webp", "/assets/BOBcard (3).webp"],
    desc: "A compact branded environment designed around consultation, digital communication and visitor engagement.",
    stallSize: "9m x 6m",
    venue: "Jio World Convention Centre, Mumbai"
  },
  {
    id: "vicco",
    title: "Vicco",
    category: "exhibition",
    categoryTag: "Exhibition Stand",
    images: ["/assets/Vicco (1).webp", "/assets/Vicco (2).webp", "/assets/Vicco (3).webp"],
    desc: "A warm, product-led booth combining natural wood tones, illuminated branding and open visitor access.",
    stallSize: "12m x 9m",
    venue: "Pragati Maidan, New Delhi"
  },
  {
    id: "vicco-mobile",
    title: "Vicco — Mobile Activation",
    category: "activation",
    categoryTag: "Mobile Brand Activation",
    images: ["/assets/Vicco RWA (1).webp", "/assets/Vicco RWA (2).webp", "/assets/Vicco RWA (3).webp"],
    desc: "A mobile retail and promotional environment designed to take the brand experience beyond the exhibition floor.",
    stallSize: "Mobile Canter Unit",
    venue: "Delhi-NCR Campaign"
  },
  {
    id: "wil",
    title: "WIL",
    category: "exhibition",
    categoryTag: "Compact Exhibition Stand",
    images: ["/assets/p034.webp"],
    desc: "A compact stand concept focused on high-visibility graphics, meeting space and a clear branded identity.",
    stallSize: "6m x 6m",
    venue: "Pragati Maidan, New Delhi"
  },
  {
    id: "bobcard-32-rising",
    title: "BOBCARD — 32 & Rising",
    category: "activation",
    categoryTag: "Event / Brand Experience",
    images: [
      "/assets/Bobcard (4).webp",
      "/assets/Bobcard (5).webp",
      "/assets/Bobcard (6).webp",
      "/assets/Bobcard (7).webp"
    ],
    desc: "A family of branded event environments, stage elements and photo opportunities developed around a single campaign identity.",
    stallSize: "Event Stage & Zones",
    venue: "JW Marriott, New Delhi"
  },
  {
    id: "creative-modular-concepts",
    title: "Creative Modular Concepts",
    category: "concept",
    categoryTag: "Exhibition Concepts",
    images: ["/assets/p045.webp", "/assets/p046.webp", "/assets/p051.webp"],
    desc: "A modular family of compact exhibition structures exploring adaptable forms, integrated screens and illuminated branding.",
    stallSize: "Flexible 9m - 15m",
    venue: "3D Concept Studio"
  },
  {
    id: "concept-visitor-lounge",
    title: "Concept — Visitor Lounge",
    category: "concept",
    categoryTag: "Spatial Concept",
    images: ["/assets/p052.webp"],
    desc: "A hospitality-focused spatial concept combining a branded backdrop with a comfortable meeting zone.",
    stallSize: "8m x 6m",
    venue: "3D Architectural Render"
  },
  {
    id: "okaya",
    title: "Okaya",
    category: "exhibition",
    categoryTag: "Exhibition Stand",
    images: ["/assets/OKAYA stall 1 (1).webp", "/assets/OKAYA stall 1 (2).webp", "/assets/Okaya stall 2.webp"],
    desc: "A technology-led exhibition environment with product counters, integrated branding and a strong overhead architectural frame.",
    stallSize: "15m x 12m",
    venue: "IECC Pragati Maidan, New Delhi"
  },
  {
    id: "havells-mobile",
    title: "Havells — Mobile Activation",
    category: "activation",
    categoryTag: "Mobile Brand Activation",
    images: ["/assets/Havels (1).webp", "/assets/Havels (2).webp", "/assets/Havels (3).webp"],
    desc: "A mobile product showcase designed to bring a retail-style product experience directly to the audience.",
    stallSize: "Custom Mobile Van",
    venue: "North India Tour"
  },
  {
    id: "voltas",
    title: "Voltas",
    category: "exhibition",
    categoryTag: "Exhibition Stand",
    images: ["/assets/VOLTAS (1).webp", "/assets/VOLTAS (2).webp", "/assets/VOLTAS (3).webp"],
    desc: "A clean product display environment with strong overhead identity, open circulation and dedicated product zones.",
    stallSize: "16m x 10m",
    venue: "BIEC, Bengaluru"
  },
  {
    id: "goodyear",
    title: "Goodyear",
    category: "activation",
    categoryTag: "Mobile Brand Activation",
    images: ["/assets/Goodyear RWA.webp", "/assets/Goodyear RWA (1).webp", "/assets/Goodyear RWA (2).webp"],
    desc: "A branded mobile experience with integrated product displays and campaign graphics.",
    stallSize: "Mobile Activation Vehicle",
    venue: "Pan-India Experiential Tour"
  },
  {
    id: "nexa",
    title: "NEXA",
    category: "activation",
    categoryTag: "Automotive Brand Experience",
    images: ["/assets/p090.webp", "/assets/p091.webp"],
    desc: "An outdoor branded experience combining vehicle display, hospitality and large-format graphic communication.",
    stallSize: "20m x 15m Outdoor",
    venue: "Auto Expo, Greater Noida"
  },
  {
    id: "drive-store-activation",
    title: "Drive Store Activation",
    category: "activation",
    categoryTag: "Store Activation",
    images: [
      "/assets/Driv.webp",
      "/assets/Driv (2).webp",
      "/assets/Driv (3).webp",
      "/assets/Driv (4).webp",
      "/assets/Driv (5).webp"
    ],
    desc: "A retail activation built to bring product discovery and brand engagement into the store environment.",
    stallSize: "In-Store Experience Zone",
    venue: "Retail Outlets Pan-India"
  },
  {
    id: "flychem",
    title: "Flychem",
    category: "activation",
    categoryTag: "Brand Activation",
    images: ["/assets/Flychem.webp", "/assets/Flychem (2).webp", "/assets/Flychem (3).webp"],
    desc: "A focused Flychem brand experience with clear communication and an inviting visitor journey.",
    stallSize: "10m x 8m",
    venue: "ChemEXPO, Mumbai"
  },
  {
    id: "prayag",
    title: "Prayag",
    category: "exhibition",
    categoryTag: "Custom Exhibition Stand",
    images: ["/assets/p108.webp", "/assets/p107.webp", "/assets/p106.webp", "/assets/p105.webp"],
    desc: "A polished, visitor-focused pavilion with clear brand communication and integrated product presentation.",
    stallSize: "18m x 12m",
    venue: "Pragati Maidan, New Delhi"
  },
  {
    id: "bimstec",
    title: "BIMSTEC",
    category: "exhibition",
    categoryTag: "Exhibition Stand",
    images: ["/assets/p111.webp", "/assets/p110.webp", "/assets/p109.webp"],
    desc: "A premium exhibition space designed for discovery, product interaction and comfortable conversations.",
    stallSize: "14m x 10m",
    venue: "Vigyan Bhawan, New Delhi"
  },
  {
    id: "extra-power",
    title: "Extra Power",
    category: "exhibition",
    categoryTag: "Turnkey Exhibition Stand",
    images: ["/assets/p104.webp", "/assets/p103.webp"],
    desc: "A complete exhibition solution that balances product storytelling, visibility and visitor flow.",
    stallSize: "12m x 8m",
    venue: "BIEC, Bengaluru"
  }
];
