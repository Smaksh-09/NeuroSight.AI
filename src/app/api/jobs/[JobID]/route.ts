// app/api/jobs/[jobId]/route.js
import {connectDB} from "@/app/Lib/db";
import Job from "@/app/Lib/models/Jobs";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest, { params }: { params: { jobId: string } }) {
  await connectDB();
  const { jobId } = params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ job }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error retrieving job" }), { status: 500 });
  }
}
