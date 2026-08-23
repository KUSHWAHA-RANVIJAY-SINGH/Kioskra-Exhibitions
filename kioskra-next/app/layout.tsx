import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: "Kioskra Exhibitions – Premium Exhibition Design & Execution in India",
  description:
    "Kioskra Exhibitions offers premium, futuristic exhibition design, 3D visualization, booth fabrication, and turnkey solutions. Serving India with office in Delhi.",
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
  icons: {
    icon: "/images/LOGOS/Kioskra Transparent.png",
    shortcut: "/images/LOGOS/Kioskra Transparent.png",
    apple: "/images/LOGOS/Kioskra Transparent.png",
  },
  openGraph: {
    type: "website",
    url: "https://kioskra.com",
    title: "Kioskra Exhibitions – Premium Exhibition Design & Execution",
    description:
      "Design-first approach with seamless execution for premium exhibition experiences.",
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
    title: "Kioskra Exhibitions – Premium Exhibition Solutions",
    description:
      "Premium exhibition design, 3D visualization, and booth fabrication services in Delhi and pan-India.",
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
    >
      <body className="bg-brand-warmOffWhite text-brand-deepBlack antialiased min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
