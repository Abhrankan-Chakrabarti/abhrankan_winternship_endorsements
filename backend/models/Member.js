// models/Member.js
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    internId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
