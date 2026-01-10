// models/Announcement.ts
import mongoose, { Schema, models } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

const Announcement =
  models.Announcement || mongoose.model("Announcement", AnnouncementSchema);

export default Announcement;
