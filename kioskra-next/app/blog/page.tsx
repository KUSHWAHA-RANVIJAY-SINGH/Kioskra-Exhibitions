import React from "react";
import { Metadata } from "next";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import BlogCatalogClient from "@/components/BlogCatalogClient";
import { blogPostsData } from "@/lib/blogData";
import connectDB from "@/lib/db";
import Blog from "@/lib/models/Blog";

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

export default async function BlogListingPage() {
  let posts: any[] = [];

  try {
    await connectDB();
    let blogs = await Blog.find({}).sort({ createdAt: -1 });
    if (blogs && blogs.length > 0) {
      const parsed = JSON.parse(JSON.stringify(blogs));
      posts = parsed.map((item: any) => ({
        ...item,
        id: item.id || item._id || item.slug,
        heroImage: item.heroImage && item.heroImage.trim() !== "" ? item.heroImage : "/images/hero_slider_1.png",
      }));
    } else {
      try {
        await Blog.insertMany(blogPostsData);
      } catch (seedErr) {
        console.warn("Seeding DB blog posts warning:", seedErr);
      }
      posts = blogPostsData;
    }
  } catch (err) {
    console.error("Failed to load blogs from DB, using fallback static data:", err);
    posts = blogPostsData;
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    posts = blogPostsData;
  }

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-brand-warmOffWhite">
      {/* Header Banner Section */}
      <Section className="py-6 sm:py-8 pb-2 sm:pb-3">
        <Heading
          badge="Exhibition Insights & Guides"
          sansPrefix="Trade Show"
          serifAccent="Exhibitor"
          sansSuffix="Knowledge Base"
          subtitle="Comprehensive guides, 2026 event schedules across Pragati Maidan, Yashobhumi & Greater Noida, pricing benchmarks, and spatial booth design strategy."
          size="xl"
          className="mb-2 sm:mb-4"
        />
      </Section>

      {/* Interactive Catalog Section */}
      <Section className="pt-0 pb-12 sm:pb-16">
        <BlogCatalogClient posts={posts} />
      </Section>
    </div>
  );
}
