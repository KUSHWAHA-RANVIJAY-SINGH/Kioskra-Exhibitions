import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  date: Date;
  location: string;
  venue: string;
  description: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  status: "Draft" | "Published";
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
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

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
