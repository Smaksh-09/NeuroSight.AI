import { NextResponse } from "next/server";
import { connectDB } from "@/app/Lib/db";
import Job from "@/app/Lib/models/Jobs";
import { roboflowCall } from "@/app/Lib/roboflow";
import { verifyAuth } from "@/app/Lib/auth";
import multer from 'multer';
import nextConnect from 'next-connect';

const upload = multer({
  storage: multer.memoryStorage()
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('Error in upload route:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  },
  onNoMatch(req) {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  },
});

apiRoute.use(upload.single('image'));

export async function POST(req: Request) {
  try {
    // Get user ID from token
    const userId = await verifyAuth(req as any);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to DB
    await connectDB();

    const formData = await req.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Call Roboflow API
    const inferenceResult = await roboflowCall(buffer, file.name);

    // Create new job with all required fields
    const newJob = new Job({
      userId: userId,
      type: 'brain', // or 'lung' or 'skin' based on the route
      fileName: file.name,
      status: "completed",
      result: JSON.stringify(inferenceResult), // Convert object to string
      createdAt: new Date()
    });

    await newJob.save();

    return NextResponse.json(
      { jobId: newJob._id, result: inferenceResult },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing the image:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process image' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
