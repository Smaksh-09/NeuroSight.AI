// app/api/auth/login/route.js
import {connectDB} from '@/app/Lib/db';
import User from '@/app/Lib/models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';


const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(request:NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // Generate JWT token (expires in 1 hour)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return new Response(
      JSON.stringify({ success: true, token, user: { id: user._id, email: user.email } }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
