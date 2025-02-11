import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    fileName:{type:String, required:true},
    filePath:{type:String, required:true},
    status:{type:String, enum:["pending", "completed", "processing","failed",], default:"pending"},
    result:{type:mongoose.Schema.Types.Mixed, default: null},
    createdAT:{type:Date, default:Date.now},
    updatedAT:{type:Date}
});
JobSchema.pre("save",function(next){
    this.updatedAT=new Date();
    next();
});
const Job=mongoose.model("Job",JobSchema);
export default Job;