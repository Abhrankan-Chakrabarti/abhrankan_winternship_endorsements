import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import Member from "./models/Member.js";
import Endorsement from "./models/Endorsement.js";

dotenv.config();

/* -------------------- Config -------------------- */
const CONFIG_PATH = "./endorsement_network.config.json";

if (!fs.existsSync(CONFIG_PATH)) {
  throw new Error("Config file missing: endorsement_network.config.json");
}

const { rootInternId: ROOT_ID } = JSON.parse(
  fs.readFileSync(CONFIG_PATH, "utf-8")
);

if (!ROOT_ID) {
  throw new Error("rootInternId missing in config file");
}

const INDIRECT_JSON_PATH = "./endorsement_network.indirect.json";

const indirectLinks = fs.existsSync(INDIRECT_JSON_PATH)
  ? JSON.parse(fs.readFileSync(INDIRECT_JSON_PATH, "utf-8"))
  : [];

const MEMBERS_JSON_PATH = "./endorsement_network.members.json";

/* -------------------- DB Setup -------------------- */
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
    console.log("📂 Using DB:", mongoose.connection.db.databaseName);
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
}

/* -------------------- Seed Logic -------------------- */
const seed = async () => {
  try {
    console.log("🌱 Seeding started...");

    await Member.deleteMany({});
    await Endorsement.deleteMany({});

    if (!fs.existsSync(MEMBERS_JSON_PATH)) {
      throw new Error(`Members JSON file not found at ${MEMBERS_JSON_PATH}`);
    }

    const members = JSON.parse(fs.readFileSync(MEMBERS_JSON_PATH, "utf-8"));
    console.log(`📦 Loaded ${members.length} members from JSON`);

    if (members.length === 0) {
      throw new Error("Members JSON is empty, cannot seed.");
    }

    const insertedMembers = await Member.insertMany(members);
    console.log(`✅ Inserted ${insertedMembers.length} members`);

    const nameById = (id) =>
      members.find((m) => m.internId === id)?.name || "Unknown";

    const indirectChildren = new Set(
      indirectLinks.map(link => link.childId)
    );

    let order = 1;
    const endorsements = [];

    // Direct endorsements from ROOT
    for (const member of members) {
      if (
        member.internId === ROOT_ID ||
        indirectChildren.has(member.internId)
      )
        continue;

      endorsements.push({
        parentId: ROOT_ID,
        parentName: nameById(ROOT_ID),
        childId: member.internId,
        childName: member.name,
        action: "Endorse",
        order,
        createdAt: new Date(2024, 0, 1, 0, 0, order++),
      });
    }

    // Indirect endorsements
    for (const link of indirectLinks) {
      if (!nameById(link.parentId) || !nameById(link.childId)) {
        throw new Error(`Invalid indirect link: ${JSON.stringify(link)}`);
      }
      endorsements.push({
        parentId: link.parentId,
        parentName: nameById(link.parentId),
        childId: link.childId,
        childName: nameById(link.childId),
        action: "Endorse",
        order,
        createdAt: new Date(2024, 0, 1, 0, 0, order++)
      });
    }

    const insertedEndorsements = await Endorsement.insertMany(endorsements);
    console.log(`✅ Inserted ${insertedEndorsements.length} endorsements`);

    // Log counts and sample endorsements
    const countMembers = await Member.countDocuments();
    const countEndorsements = await Endorsement.countDocuments();
    const sampleEndorsements = await Endorsement.find().limit(5);

    console.log("📊 Summary:");
    console.log({ countMembers, countEndorsements });
    console.log("📝 Sample endorsements (first 5):");
    console.table(
      sampleEndorsements.map(e => ({
        parentId: e.parentId,
        parentName: e.parentName,
        childId: e.childId,
        childName: e.childName,
        action: e.action,
        order: e.order,
        createdAt: e.createdAt.toISOString(),
      }))
    );

    console.log("🎉 Seeding completed successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

/* -------------------- Run -------------------- */
await connectDB();
await seed();
