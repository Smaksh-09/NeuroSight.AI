import webpush from "web-push";
import { connectDB } from "../Lib/db";
import Reminder from "@/app/Lib/models/reminder"

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  "YOUR_PUBLIC_VAPID_KEY",
  "YOUR_PRIVATE_VAPID_KEY"
);
//@ts-ignore
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    await connectDB();
    const currentTime = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const reminders = await Reminder.find({ time: currentTime });

    reminders.forEach(async (reminder) => {
      const payload = JSON.stringify({
        title: "Medicine Reminder",
        body: `Time to take ${reminder.medicineName}`,
      });

      try {
        //@ts-ignore
        await webpush.sendNotification(reminder.subscription, payload);
      } catch (error) {
        console.error("Push Error:", error);
      }
    });

    res.status(200).json({ message: "Notifications sent!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notifications" });
  }
}
