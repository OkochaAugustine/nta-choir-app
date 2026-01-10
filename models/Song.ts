// models/Song.ts
import mongoose, { Schema, models } from "mongoose";

const SongSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String },
    url: { type: String }, // optional: for link to audio or video
    lyrics: { type: String }, // optional: for lyrics or notes
    postedBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

const Song = models.Song || mongoose.model("Song", SongSchema);

export default Song;
