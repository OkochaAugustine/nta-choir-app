import mongoose, { Schema, models } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    title: String,
    content: String,
    postedBy: String,
  },
  { timestamps: true }
);

const Announcement =
  models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
export default Announcement;
