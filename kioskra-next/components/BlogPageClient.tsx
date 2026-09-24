"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, ArrowUpRight, BookOpen, Tag, User } from "lucide-react";
import { BlogPost, blogPostsData } from "@/lib/blogData";

interface BlogPageClientProps {
  posts: BlogPost[];
}

const CATEGORIES = ["All", "Exhibitor Guides", "Cost Guide", "Design Tips", "Planning"];

const CATEGORY_COLORS: Record<string, string> = {
  "Exhibitor Guides": "#2e66ff",
  "Cost Guide": "#059669",
  "Design Tips": "#7c3aed",
  "Planning": "#d97706",
};

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const safePosts = useMemo(
    () =>
      (Array.isArray(posts) && posts.length > 0 ? posts : blogPostsData).map((p, idx) => ({
        id: p?.id || (p as any)?._id || p?.slug || `post-${idx}`,
        slug: p?.slug || `post-${idx}`,
        title: p?.title || "Exhibition Guide",
        category: p?.category || "Exhibitor Guides",
        publishDate: p?.publishDate || "September 2026",
        readTime: p?.readTime || "5 min read",
        author: p?.author || "Kioskra Team",
        heroImage:
          p?.heroImage && p.heroImage.trim() !== ""
            ? p.heroImage
            : "/images/hero_slider_1.webp",
        excerpt: p?.excerpt || "",
      })),
    [posts]
  );

  const filteredPosts = useMemo(
    () =>
      safePosts.filter((post) => {
        const matchCat =
          selectedCategory === "All" || post.category === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q);
        return matchCat && matchSearch;
      }),
    [safePosts, selectedCategory, searchQuery]
  );

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen" style={{ background: "#f5f2ee", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0b0d10 0%, #111827 60%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
          paddingTop: 100,
          paddingBottom: 80,
        }}
      >
        {/* Dot grid bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(47,107,255,.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px", opacity: 0.1,
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute", top: -80, left: "30%",
          width: 500, height: 300,
          background: "rgba(46,102,255,.18)",
          borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 6vw" }}>
          <p style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "#2e66ff", fontSize: 11, fontWeight: 800,
            letterSpacing: "0.18em", textTransform: "uppercase",
            marginBottom: 20, background: "rgba(46,102,255,.12)",
            padding: "6px 14px", borderRadius: 999,
            border: "1px solid rgba(46,102,255,.25)",
          }}>
            <BookOpen style={{ width: 12, height: 12 }} />
            Kioskra Exhibition Journal
          </p>

          <h1
            style={{
              fontFamily: "'Space Grotesk', Georgia, serif",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              fontSize: "clamp(52px, 7vw, 100px)",
              marginBottom: 22,
              color: "#fff",
              maxWidth: 700,
            }}
          >
            In-depth{" "}
            <em style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#2e66ff", fontWeight: 400 }}>
              exhibitor
            </em>
            <br />knowledge base.
          </h1>

          <p style={{ maxWidth: 560, color: "#b0b4bb", fontSize: 17, lineHeight: 1.75, marginBottom: 32 }}>
            Practical guides, cost breakdowns, design insights and planning strategies for brands exhibiting at trade shows across India.
          </p>

          {/* Stats strip */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {[
              { num: `${safePosts.length}+`, label: "Articles Published" },
              { num: "4", label: "Topic Categories" },
              { num: "Delhi NCR", label: "Primary Focus" },
            ].map((s) => (
              <div key={s.label} style={{ paddingRight: 24, borderRight: "1px solid rgba(255,255,255,.1)" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{s.num}</div>
                <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TOOLBAR ────────────────────────────────────── */}
      <div style={{ position: "sticky", top: 70, zIndex: 40, background: "rgba(245,242,238,.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,0,0,.07)", boxShadow: "0 2px 20px rgba(0,0,0,.05)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 6vw", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, minHeight: 64 }}>
          {/* Category tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "7px 16px", borderRadius: 999, fontSize: 11, fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: "0.06em",
                  border: "none", cursor: "pointer", transition: "all .2s",
                  background: selectedCategory === cat ? "#2e66ff" : "rgba(0,0,0,.07)",
                  color: selectedCategory === cat ? "#fff" : "#4b5563",
                  boxShadow: selectedCategory === cat ? "0 4px 14px rgba(46,102,255,.35)" : "none",
                  transform: selectedCategory === cat ? "scale(1.04)" : "scale(1)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative", width: 260 }}>
            <Search style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#9ca3af" }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%", paddingLeft: 40, paddingRight: 16,
                paddingTop: 9, paddingBottom: 9,
                background: "#fff", border: "1px solid rgba(0,0,0,.1)",
                borderRadius: 999, font: "600 12px 'DM Sans', sans-serif",
                color: "#101112", outline: "none", transition: "border-color .2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#2e66ff")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,.1)")}
            />
          </div>
        </div>
      </div>

      {/* ── ARTICLES CONTENT ──────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 6vw 100px" }}>

        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#74716c" }}>
            <BookOpen style={{ width: 48, height: 48, margin: "0 auto 16px", color: "#d1d5db" }} />
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No articles found</p>
            <p style={{ fontSize: 14, marginBottom: 24 }}>Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              style={{ padding: "10px 22px", background: "#2e66ff", color: "#fff", border: "none", borderRadius: 999, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* ── FEATURED ARTICLE (first result) ─────────────── */}
            {featuredPost && selectedCategory === "All" && !searchQuery && (
              <FeaturedCard post={featuredPost} />
            )}

            {/* ── ARTICLE GRID ─────────────────────────────────── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 28,
                marginTop: selectedCategory === "All" && !searchQuery ? 48 : 0,
              }}
            >
              {(selectedCategory === "All" && !searchQuery ? restPosts : filteredPosts).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── BOTTOM CTA ────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0b0d10, #1a1f2e)",
          padding: "72px 6vw",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#2e66ff", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
          READY TO EXHIBIT?
        </p>
        <h2 style={{ fontFamily: "'Space Grotesk', Georgia, serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.04em", lineHeight: 0.93, marginBottom: 24, color: "#fff" }}>
          Let us build your{" "}
          <em style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#2e66ff", fontWeight: 400 }}>
            perfect stand.
          </em>
        </h2>
        <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          From 3D concept to turnkey execution, Kioskra handles every detail of your exhibition stand.
        </p>
        <a
          href="mailto:info@kioskra.com"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 28px", background: "#2e66ff", borderRadius: 999,
            color: "#fff", fontSize: 13, fontWeight: 800,
            letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", transition: "background .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#174ee5")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2e66ff")}
        >
          Start a conversation <ArrowUpRight style={{ width: 16, height: 16 }} />
        </a>
      </section>
    </div>
  );
}

// ── Featured Article Card ───────────────────────────────────
function FeaturedCard({ post }: { post: ReturnType<typeof mapPost> }) {
  const [hovered, setHovered] = useState(false);
  const catColor = CATEGORY_COLORS[post.category] || "#2e66ff";

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,.07)",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,.12)" : "0 8px 32px rgba(0,0,0,.06)",
          transform: hovered ? "translateY(-4px)" : "none",
          transition: "all .35s",
          background: "#fff",
          minHeight: 360,
        }}
      >
        {/* Image side */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 320 }}>
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform .6s" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(0,0,0,.5) 0%, transparent 60%)" }} />
          <span style={{
            position: "absolute", top: 20, left: 20,
            padding: "6px 14px", background: catColor,
            color: "#fff", fontSize: 10, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.1em", borderRadius: 999,
          }}>
            {post.category}
          </span>
          <span style={{
            position: "absolute", bottom: 20, left: 20,
            padding: "5px 12px", background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)",
            color: "#fff", fontSize: 10, fontWeight: 700,
            borderRadius: 999, display: "flex", alignItems: "center", gap: 5,
          }}>
            ✦ FEATURED
          </span>
        </div>

        {/* Content side */}
        <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, fontSize: 12, color: "#74716c" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Calendar style={{ width: 13, height: 13, color: catColor }} />
              {post.publishDate}
            </span>
            <span>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Clock style={{ width: 13, height: 13, color: catColor }} />
              {post.readTime}
            </span>
          </div>

          <h2 style={{
            margin: "0 0 14px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 30px)",
            lineHeight: 1.2, letterSpacing: "-0.03em",
            color: hovered ? catColor : "#101112",
            transition: "color .2s",
          }}>
            {post.title}
          </h2>

          <p style={{ margin: "0 0 24px", fontSize: 14, color: "#74716c", lineHeight: 1.7 }}>
            {post.excerpt}
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid rgba(0,0,0,.07)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9ca3af" }}>
              <User style={{ width: 13, height: 13 }} />
              {post.author}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", background: catColor, color: "#fff", borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Read Article <ArrowUpRight style={{ width: 13, height: 13 }} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

type PostItem = {
  id: string; slug: string; title: string; category: string;
  publishDate: string; readTime: string; author: string;
  heroImage: string; excerpt: string;
};
function mapPost(p: PostItem) { return p; }

// ── Standard Article Card ───────────────────────────────────
function ArticleCard({ post }: { post: PostItem }) {
  const [hovered, setHovered] = useState(false);
  const catColor = CATEGORY_COLORS[post.category] || "#2e66ff";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", background: "#fff",
        borderRadius: 20, border: "1px solid rgba(0,0,0,.06)", overflow: "hidden",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,.1)" : "0 4px 18px rgba(0,0,0,.05)",
        transform: hovered ? "translateY(-5px)" : "none",
        transition: "all .3s",
      }}
    >
      <Link href={`/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", flex: 1, textDecoration: "none", color: "inherit" }}>
        {/* Cover image */}
        <div style={{ position: "relative", height: 210, background: "#e5e7eb", overflow: "hidden", flexShrink: 0 }}>
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform .55s" }}
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 50%)` }} />

          {/* Category badge */}
          <span style={{
            position: "absolute", top: 14, left: 14,
            padding: "5px 12px", background: catColor,
            color: "#fff", fontSize: 9, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.12em", borderRadius: 999,
          }}>
            {post.category}
          </span>

          {/* Read time on image */}
          <span style={{
            position: "absolute", bottom: 14, right: 14,
            padding: "4px 10px", background: "rgba(0,0,0,.65)", backdropFilter: "blur(8px)",
            color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 999,
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <Clock style={{ width: 10, height: 10 }} />
            {post.readTime}
          </span>
        </div>

        {/* Card body */}
        <div style={{ padding: "20px 22px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Date + author */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#9ca3af" }}>
            <Calendar style={{ width: 12, height: 12, color: catColor }} />
            <span>{post.publishDate}</span>
            <span style={{ color: "#d1d5db" }}>•</span>
            <User style={{ width: 12, height: 12 }} />
            <span>{post.author}</span>
          </div>

          {/* Title */}
          <h3 style={{
            margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 17, lineHeight: 1.3,
            letterSpacing: "-0.02em",
            color: hovered ? catColor : "#101112",
            transition: "color .2s",
          }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p style={{
            margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.65,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.excerpt}
          </p>

          {/* Footer */}
          <div style={{
            marginTop: "auto", paddingTop: 14,
            borderTop: "1px solid rgba(0,0,0,.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#9ca3af" }}>
              <Tag style={{ width: 11, height: 11 }} />
              {post.category}
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              color: catColor, fontSize: 11, fontWeight: 800,
              textTransform: "uppercase", letterSpacing: "0.06em",
              opacity: hovered ? 1 : 0.7, transition: "opacity .2s",
            }}>
              Read <ArrowUpRight style={{ width: 13, height: 13 }} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
