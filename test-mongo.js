import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://choir_app_user:choirpass123@cluster0.flkkolx.mongodb.net/LivingSpringVoices?retryWrites=true&w=majority&appName=Cluster0";

console.log("🧩 Trying to connect to:");
console.log(MONGODB_URI.replace(/:[^:]*@/, ":****@")); // hide password

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully!"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));


