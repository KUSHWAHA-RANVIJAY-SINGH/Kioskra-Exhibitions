import React from "react";
import { Metadata } from "next";
import BlogPageClient from "@/components/BlogPageClient";
import { blogPostsData } from "@/lib/blogData";
import connectDB from "@/lib/db";
import Blog from "@/lib/models/Blog";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Upcoming Exhibitions in Delhi NCR 2026 | Kioskra Journal",
  description:
    "Verified 2026 exhibition calendar for Delhi NCR: SEMICON India, Medicall, bauma CONEXPO INDIA, Renewable Energy India Expo and International Health & Wellness Expo. Kioskra plans, builds and delivers exhibition stands across India.",
  keywords: [
    "upcoming exhibitions Delhi NCR 2026",
    "Pragati Maidan exhibitions 2026",
    "Yashobhoomi Dwarka exhibitions",
    "India Expo Centre Greater Noida",
    "exhibition stall cost Delhi",
    "exhibitor registration guide",
    "booth design tips",
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
        heroImage:
          item.heroImage && item.heroImage.trim() !== ""
            ? item.heroImage
            : "/images/hero_slider_1.png",
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

  return <BlogPageClient posts={posts} />;
}
