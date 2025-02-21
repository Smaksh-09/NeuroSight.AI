import { connectDB } from "@/app/Lib/db";
import Reminder from "@/app/Lib/models/reminder";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req:NextRequest, res:NextResponse) {
    if (req.method === "POST") {
        //@ts-ignore
      const { userId, subscription } = req.body;
  
      try {
        await connectDB();
        await Reminder.updateOne({ userId }, { subscription }, { upsert: true });
            //@ts-ignore
        res.status(201).json({ message: "Subscribed successfully!" });
      } catch (error) {
            //@ts-ignore
        res.status(500).json({ error: "Database error" });
      }
    } else {
            //@ts-ignore
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  