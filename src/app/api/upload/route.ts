// app/api/upload/route.js
import nextConnect from 'next-connect';
import multer from 'multer';
import {connectDB} from '@/app/Lib/db';
import Job from '@/app/Lib/models/Jobs';
import { roboflowCall } from '@/app/Lib/roboflow';
import type { NextApiRequest, NextApiResponse } from 'next';

// Configure multer to store file in memory
const upload = multer({
  storage: multer.memoryStorage()
});

// Create a Next.js API route using nextConnect
const apiRoute = nextConnect({
  onError(error, req, res:NextApiResponse) {
    res.status(501).json({ error: `Error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed.` });
  },
});

// Use the multer middleware for handling file uploads (expect field name "image")
apiRoute.use(upload.single('image'));

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File;
}

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const typedReq = req as NextApiRequestWithFile;
  // Connect to DB
  await connectDB();

  // Since we're not saving the file to disk, we'll take the buffer straight from typedReq.file
  const fileBuffer = typedReq.file.buffer;
  const fileName = typedReq.file.originalname;

  try {
    // Send the image directly to Roboflow.
    const inferenceResult = await roboflowCall(fileBuffer, fileName);

    // Store the inference result in MongoDB as a new Job record without storing the file locally.
    const newJob = new Job({
      userId: req.body.userId || "anonymous",  // Optional field if provided in the request body
      status: "complete",
      result: inferenceResult,
    });
    
    await newJob.save();

    // Return the Job ID (if you want the user to poll for additional info) along with the result
    res.status(200).json({ jobId: newJob._id, result: inferenceResult });
  } catch (error) {
    console.error("Error processing the image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Disable default body parser so Multer can process the incoming form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
