import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Endorsement from "./models/Endorsement.js";

dotenv.config();

const app = express();

/* -------------------- Middleware -------------------- */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

/* -------------------- Database -------------------- */
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  });

/* -------------------- Routes -------------------- */

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "Endorsement Network API"
  });
});

// 🔥 Used by GitHub Pages Mermaid tree
app.get("/api/endorsements", async (req, res) => {
  try {
    const endorsements = await Endorsement.find(
      { action: "Endorse" },
      {
        _id: 0,
        parentId: 1,
        parentName: 1,
        childId: 1,
        childName: 1,
        action: 1,
        order: 1
      }
    ).sort({ order: 1 });

    res.json(endorsements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch endorsements" });
  }
});

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
