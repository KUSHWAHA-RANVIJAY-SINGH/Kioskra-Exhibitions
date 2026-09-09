import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/lib/models/Blog";
import { blogPostsData } from "@/lib/blogData";

export async function GET() {
  try {
    await connectDB();
    let blogs = await Blog.find({}).sort({ createdAt: -1 });

    // Seed default blogs if collection is empty
    if (blogs.length === 0 && blogPostsData.length > 0) {
      try {
        await Blog.insertMany(blogPostsData);
        blogs = await Blog.find({}).sort({ createdAt: -1 });
      } catch (seedErr) {
        console.warn("Blog auto-seed notice:", seedErr);
      }
    }

    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/blogs Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs from database." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      title,
      slug,
      category,
      publishDate,
      readTime,
      author,
      heroImage,
      excerpt,
      contentHtml,
      metaTitle,
      metaDescription,
      focusKeyword,
    } = body;

    if (!title || !slug || !heroImage || !excerpt || !contentHtml) {
      return NextResponse.json(
        { error: "Title, slug, hero image, excerpt, and content are required." },
        { status: 400 }
      );
    }

    const formattedPublishDate = publishDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const newBlog = await Blog.create({
      title,
      slug,
      category: category || "Exhibitor Guides",
      publishDate: formattedPublishDate,
      readTime: readTime || "5 min read",
      author: author || "Kioskra Team",
      heroImage,
      excerpt,
      contentHtml,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      focusKeyword: focusKeyword || "",
    });

    return NextResponse.json(
      { success: true, blog: newBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/blogs Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create blog post." },
      { status: 500 }
    );
  }
}
