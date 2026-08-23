import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConfiguredLayout {
  shape?: string;
  width?: number;
  depth?: number;
  height?: number;
  themeColor?: string;
  features?: string[];
  estimatedPriceRange?: string;
  specsJson?: string;
}

export interface ILead extends Document {
  clientName: string;
  company?: string;
  email: string;
  phone: string;
  eventCity?: string;
  requirement?: string;
  configuredLayout?: IConfiguredLayout;
  message?: string;
  status: "New" | "Contacted" | "Closed";
  createdAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    clientName: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventCity: { type: String },
    requirement: { type: String },
    configuredLayout: {
      shape: { type: String },
      width: { type: Number },
      depth: { type: Number },
      height: { type: Number },
      themeColor: { type: String },
      features: [{ type: String }],
      estimatedPriceRange: { type: String },
      specsJson: { type: String },
    },
    message: { type: String },
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
