// models/Endorsement.js
import mongoose from "mongoose";

const endorsementSchema = new mongoose.Schema(
  {
    parentId: { type: String, required: true },
    parentName: { type: String, required: true },
    childId: { type: String, required: true },
    childName: { type: String, required: true },
    action: {
      type: String,
      enum: ["Endorse", "De-Endorse"],
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Endorsement", endorsementSchema);
