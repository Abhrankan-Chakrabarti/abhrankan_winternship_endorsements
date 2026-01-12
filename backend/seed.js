import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

const seed = async () => {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");

    const db = client.db(process.env.DB_NAME);
    const members = db.collection("members");
    const endorsements = db.collection("endorsements");

    // Clear existing data
    await members.deleteMany({});
    await endorsements.deleteMany({});

    // Insert members
    await members.insertMany([
      { internId: "WIN25625", name: "Abhrankan Chakrabarti" },
      { internId: "WIN25693", name: "Aashi" },
      { internId: "WIN25626", name: "Shalu Tiwari" }
    ]);

    // Insert endorsements
    await endorsements.insertMany([
      {
        parentId: "WIN25625",
        parentName: "Abhrankan Chakrabarti",
        childId: "WIN25693",
        childName: "Aashi",
        action: "Endorse",
        createdAt: new Date()
      },
      {
        parentId: "WIN25625",
        parentName: "Abhrankan Chakrabarti",
        childId: "WIN25626",
        childName: "Shalu Tiwari",
        action: "Endorse",
        createdAt: new Date()
      }
    ]);

    console.log("🌱 Database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
};

seed();
