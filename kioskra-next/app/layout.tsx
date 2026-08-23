import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kioskra.com"),
  title: "Kioskra Exhibitions | Premium Exhibition Stall Design & Turnkey Fabrication Pan-India",
  description:
    "Award-winning exhibition stall designers and turnkey booth fabricators based in Delhi, executing bespoke spatial structures across India.",
  keywords: [
    "exhibition design",
    "booth fabrication",
    "3D visualization",
    "exhibition solutions",
    "Delhi exhibitions",
    "trade show booths",
    "exhibition contractor",
    "event design India",
  ],
  alternates: {
    canonical: "https://kioskra.com",
  },
  icons: {
    icon: "/images/LOGOS/Kioskra Transparent.png",
    shortcut: "/images/LOGOS/Kioskra Transparent.png",
    apple: "/images/LOGOS/Kioskra Transparent.png",
  },
  openGraph: {
    type: "website",
    url: "https://kioskra.com",
    title: "Kioskra Exhibitions | Premium Exhibition Stall Design & Turnkey Fabrication Pan-India",
    description:
      "Award-winning exhibition stall designers and turnkey booth fabricators based in Delhi, executing bespoke spatial structures across India.",
    siteName: "Kioskra Exhibitions",
    images: [
      {
        url: "/images/LOGOS/Kioskra Transparent.png",
        width: 800,
        height: 800,
        alt: "Kioskra Exhibitions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kioskra Exhibitions | Premium Exhibition Stall Design & Turnkey Fabrication Pan-India",
    description:
      "Award-winning exhibition stall designers and turnkey booth fabricators based in Delhi, executing bespoke spatial structures across India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="bg-brand-warmOffWhite text-brand-deepBlack antialiased min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingContactWidget />
      </body>
    </html>
  );
}
