"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { BlogPost } from "@/lib/blogData";

interface BlogCatalogClientProps {
  posts: BlogPost[];
}

export default function BlogCatalogClient({ posts }: BlogCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Exhibitor Guides",
    "Cost Guide",
    "Design Tips",
    "Planning",
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.focusKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(
    (p) => p.slug === "upcoming-exhibitions-2026-delhi-ncr-pragati-maidan-yashobhumi-greater-noida"
  ) || posts[0];

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-black/5 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                    : "bg-black/5 text-neutral-700 hover:bg-black/10 hover:text-black"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search exhibitions, venues, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-neutral-100 border border-transparent rounded-full text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-bold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Featured Headline Guide Card (If showing 'All' and no search filter) */}
      {selectedCategory === "All" && !searchQuery && featuredPost && (
        <div className="relative group overflow-hidden rounded-3xl bg-neutral-900 text-white border border-white/10 shadow-2xl transition-all hover:shadow-blue-900/20">
          <Link href={`/blog/${featuredPost.slug}`} className="block">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Image Side */}
              <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-[420px] overflow-hidden">
                <Image
                  src={featuredPost.heroImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent" />
                
                <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Featured Guide 2026</span>
                </div>
              </div>

              {/* Details Side */}
              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-white/60">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {featuredPost.publishDate}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {featuredPost.readTime}
                    </span>
                    <span>•</span>
                    <span className="text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-sans group-hover:text-blue-300 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed font-normal">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">
                    By {featuredPost.author}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Main Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>All Articles ({filteredPosts.length})</span>
          </h3>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-black/5 p-8">
            <p className="text-neutral-500 font-medium text-sm">
              No blog posts found matching your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[11px] font-medium text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          {post.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          {post.readTime}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-neutral-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h4>

                      <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-neutral-500">
                        By {post.author}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
