import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, CheckCircle2, Building2 } from "lucide-react";
import Section from "@/components/Section";
import { blogPostsData } from "@/lib/blogData";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogPostsData.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Kioskra Exhibitions",
    };
  }

  return {
    title: `${post.metaTitle} | Kioskra Exhibitions`,
    description: post.metaDescription,
    keywords: [post.focusKeyword, post.category, "Kioskra Exhibitions", "Delhi NCR Trade Shows"],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: [{ url: post.heroImage }],
    },
  };
}

export default function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const post = blogPostsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPostsData
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-brand-warmOffWhite text-neutral-900">
      {/* Top Banner / Breadcrumb & Meta Header */}
      <section className="bg-neutral-950 text-white py-12 md:py-16 relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-6">
          {/* Breadcrumb Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Guides</span>
          </Link>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/70">
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {post.publishDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="text-white/80">By {post.author}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-sans tracking-tight">
            {post.title}
          </h1>

          {/* Lead Excerpt */}
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Hero Image Section */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 -mt-6 relative z-20">
        <div className="relative h-[320px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Body Content */}
      <article className="max-w-4xl mx-auto px-6 sm:px-8 py-12 md:py-16">
        <div className="bg-white p-6 sm:p-10 md:p-14 rounded-3xl border border-black/5 shadow-sm space-y-8">
          
          {/* Main HTML Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:text-neutral-700 prose-strong:text-neutral-900 prose-table:w-full prose-td:p-3 prose-th:p-3"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Interactive Callout Banner inside article */}
          <div className="my-10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-blue-950 text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center gap-3 text-blue-400 font-extrabold text-xs uppercase tracking-widest">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span>Turnkey Exhibition Services in Delhi NCR</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Exhibiting at Bharat Mandapam, Yashobhumi, or Greater Noida?
            </h3>
            
            <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
              Get an end-to-end stall solution: 3D concept designs, official hall approvals, custom fabrication, modular builds, and complete on-site management.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 transition-all group"
              >
                <span>Get Free 3D Concept & Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919643378735"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all border border-white/20"
              >
                <span>Call +91 9643378735</span>
              </a>
            </div>
          </div>

          {/* Social Share & Tag Footer */}
          <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span>Focus Keyword:</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-800 font-bold">
                {post.focusKeyword}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                <Share2 className="w-4 h-4 text-blue-600" /> Share:
              </span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20https://kioskra.com/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full hover:bg-emerald-100 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://kioskra.com/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full hover:bg-blue-100 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 sm:px-8 pb-16">
          <h3 className="text-2xl font-bold text-neutral-900 mb-8">
            Related Guides & Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPosts.map((rPost) => (
              <div
                key={rPost.id}
                className="group bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm hover:shadow-lg transition-all p-6 space-y-4"
              >
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={rPost.heroImage}
                    alt={rPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-white text-[10px] font-bold uppercase rounded-full">
                    {rPost.category}
                  </span>
                </div>
                <h4 className="font-bold text-base text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                </h4>
                <p className="text-xs text-neutral-600 line-clamp-2">
                  {rPost.excerpt}
                </p>
                <Link
                  href={`/blog/${rPost.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 uppercase"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
