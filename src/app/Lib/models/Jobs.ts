import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: 'anonymous' // Default value for unauthenticated users
    },
    fileName: { 
        type: String, 
        required: true 
    },
    fileType: {
        type: String,
        default: 'image'
    },
    status: { 
        type: String, 
        enum: ["pending", "processing", "completed", "failed"], 
        default: "pending" 
    },
    result: { 
        type: mongoose.Schema.Types.Mixed, 
        default: null 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date,
        default: Date.now 
    }
});

// Middleware to update `updatedAt` before saving
JobSchema.pre("save", function(next) {
    this.updatedAt = new Date();
    next();
});

// ✅ Prevent model overwrite by checking if already compiled
const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
