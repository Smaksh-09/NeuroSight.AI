import {connectDB} from "@/app/Lib/db";
import User from "@/app/Lib/models/Users";
import bcrypt from "bcrypt";

export async function POST(req:Request){
    try{
        const {username,email,password} = await req.json();
        if(!username || !email || !password){
            return new Response(JSON.stringify({error:"All fields are required"}), {
                status:400
            })
        }
        await connectDB();

        const existingUser = await User.findOne({email});
        if(existingUser){
            return new Response(JSON.stringify({error:"User already exists"}),{
                status:400
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });
        await newUser.save();
        return new Response(
            JSON.stringify({ success: true, user: { id: newUser._id, email: newUser.email } }),
            { status: 201 }
          );
      
    }catch(error){
        console.error("Error in SignUP");
        return new Response(JSON.stringify({ error: "Internal Server Error" }),{
            status:500
        });
    }
}