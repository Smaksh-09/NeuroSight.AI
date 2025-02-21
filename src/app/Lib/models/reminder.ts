import mongoose from "mongoose";
const reminderSChema=new mongoose.Schema({
    UserId: String,
    medicineName: String,
    dosage: String,
    time: String,
    subscription: String,
})
export default mongoose.model('Reminder',reminderSChema);