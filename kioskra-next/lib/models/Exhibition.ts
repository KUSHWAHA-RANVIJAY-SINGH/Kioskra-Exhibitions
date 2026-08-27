import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExhibition extends Document {
  title: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  location: string;
  venue: string;
  descriptionMarkdown: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  status: "Draft" | "Published";
  createdAt: Date;
  updatedAt: Date;
}

const ExhibitionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    venue: { type: String, required: true },
    descriptionMarkdown: { type: String, required: true },
    featuredImage: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
      required: true,
    },
  },
  { timestamps: true }
);

const Exhibition: Model<IExhibition> =
  mongoose.models.Exhibition || mongoose.model<IExhibition>("Exhibition", ExhibitionSchema);

export default Exhibition;
