import mongoose from 'mongoose';

// Remove or fix the incomplete interface
// interface connection {
//     MONGODB_URL: string;  // This was causing the error

const MONGODB_URL: string = process.env.MONGO_URL || '';

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error);  // More detailed error logging
        process.exit(1);
    }
}