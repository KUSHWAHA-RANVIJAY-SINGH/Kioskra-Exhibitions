import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  category: string;
  publishDate: string;
  readTime: string;
  author: string;
  heroImage: string;
  excerpt: string;
  contentHtml: string;
  createdAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    focusKeyword: { type: String },
    category: { type: String, required: true, default: "Exhibitor Guides" },
    publishDate: { type: String, required: true },
    readTime: { type: String, default: "5 min read" },
    author: { type: String, default: "Kioskra Team" },
    heroImage: { type: String, required: true },
    excerpt: { type: String, required: true },
    contentHtml: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
