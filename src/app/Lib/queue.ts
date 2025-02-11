import { connectDB } from "./db";
import Job from "./models/Jobs";
import { roboflowCall } from "./roboflow";

export function enqueueJob(jobId: string, filePath: string) {
    setTimeout(() => processJob(jobId, filePath), 2000);
}

async function processJob(jobId: string, filePath: string) {
    try {
        await connectDB();
        const job = await Job.findOne({ _id: jobId });
        if (!job) {
            return;
        }
        job.status = "processing";
        const result = await roboflowCall(filePath);
        job.status = "completed";
        job.result = result;
        await job.save();
    } catch (error: any) {        
        console.error("Error processing job", error);
        //@ts-ignore
        await Job.findByIdAndUpdate(jobId, { status: "error", result: { error: error.message } });
    }
}