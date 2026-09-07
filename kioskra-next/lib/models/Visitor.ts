import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVisitor extends Document {
  count: number;
  lastUpdated: Date;
}

const VisitorSchema: Schema = new Schema(
  {
    _id: { type: String, default: "kioskra-main" },
    count: { type: Number, required: true, default: 200 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Visitor: Model<IVisitor> =
  mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);

export default Visitor;
