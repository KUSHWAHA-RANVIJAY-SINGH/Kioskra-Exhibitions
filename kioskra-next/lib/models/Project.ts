import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  category: "Custom Stalls" | "Double Decker" | "Turnkey Solutions" | "3D Renders";
  clientName: string;
  location: string;
  featuredImage: string;
  galleryImages: string[];
  description: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["Custom Stalls", "Double Decker", "Turnkey Solutions", "3D Renders"],
      required: true,
    },
    clientName: { type: String, required: true },
    location: { type: String, required: true },
    featuredImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
