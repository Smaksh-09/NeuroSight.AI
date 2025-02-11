// app/api/upload/route.js
import { IncomingForm } from "formidable";
import path from "path";
import fs from "fs";
import {connectDB} from "@/app/Lib/db";
import Job from "@/app/Lib/models/Jobs";
import { enqueueJob } from "@/app/Lib/queue";
import { NextRequest, NextResponse } from "next/server";
import { IncomingMessage } from 'http';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req:NextRequest) {
  await connectDB();

  return new Promise<NextResponse>((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
    });

    // next cast needed because NextRequest is not an IncomingMessage
    form.parse(req as unknown as IncomingMessage, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return resolve(new NextResponse(JSON.stringify({ error: "Form parsing error" }), { status: 400 }));
      }

      // Assume the file field key is "file"
      let fileObj = Array.isArray(files.file) ? files.file[0] : files.file;
      // Use the new property 'filepath' if available, otherwise fallback to 'path' after casting to any
      const filePath = fileObj?.filepath || ((fileObj as any).path);
      if (!filePath) {
        return resolve(new NextResponse(JSON.stringify({ error: "File not found" }), { status: 400 }));
      }

      try {
        const newJob = new Job({
          userId: fields.userId || "anonymous", // You can pass a user ID from your frontend if available
          fileName: path.basename(filePath),
          filePath,
          status: "pending",
        });
        await newJob.save();

        // Convert ObjectId to string
        enqueueJob(newJob._id.toString(), filePath);

        resolve(new NextResponse(JSON.stringify({ jobId: newJob._id }), { status: 200 }));
      } catch (saveError) {
        console.error("Error saving job:", saveError);
        resolve(new NextResponse(JSON.stringify({ error: "Database error" }), { status: 500 }));
      }
    });
  });
}
