import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['brain', 'lung', 'skin']
    },
    result: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: { 
        type: Date,
        default: Date.now 
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    fileName: { type: String, required: false },

});

// Middleware to update `updatedAt` before saving
JobSchema.pre("save", function(next) {
    this.updatedAt = new Date();
    next();
});

// ✅ Prevent model overwrite by checking if already compiled
const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
