// app/admin/api/upload-song/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/mongodb"; // ✅ Named import
import Song from "@/models/Song"; // ✅ Model imported from separate file

export const POST = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read form data
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const lyrics = formData.get("lyrics") as string;
    const audioFile = formData.get("audio") as File;

    if (!title || !artist || !audioFile) {
      return NextResponse.json(
        { error: "Title, Artist, and Audio file are required" },
        { status: 400 }
      );
    }

    // ✅ Validate size (max 15MB)
    if (audioFile.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large — max 15MB allowed" },
        { status: 400 }
      );
    }

    // ✅ Validate file type (MP3, WAV, M4A, AAC)
    const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/mp4", "audio/aac"];
    if (!validTypes.includes(audioFile.type)) {
      return NextResponse.json(
        { error: "Invalid file type — upload only audio files" },
        { status: 400 }
      );
    }

    // Save file to public/uploads
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${audioFile.name.replace(/ /g, "_")}`;
    const filePath = path.join(uploadsDir, fileName);

    const buffer = Buffer.from(await audioFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const audioUrl = `/uploads/${fileName}`;

    // Save song to MongoDB
    const song = await Song.create({
      title,
      artist,
      url: audioUrl,
      lyrics,
      postedBy: "Admin",
    });

    return NextResponse.json({ success: true, song });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
};
