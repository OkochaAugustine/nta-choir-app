import mongoose from "mongoose";

const choirMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nationality: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, required: true },
    part: { type: String },
    instrument: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ChoirMember ||
  mongoose.model("ChoirMember", choirMemberSchema);
