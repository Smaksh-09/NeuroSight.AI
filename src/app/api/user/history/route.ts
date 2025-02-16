import { NextResponse } from 'next/server';
import { connectDB } from '@/app/Lib/db';
import Job from '@/app/Lib/models/Jobs';
import { verifyAuth } from '@/app/Lib/auth';

export async function GET(req: Request) {
  try {
    //@ts-ignore
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const history = await Job.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3);

    return NextResponse.json({ history });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    //@ts-ignore
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { type, result } = await req.json();

    const newJob = new Job({
      userId,
      type,
      result,
      status: 'completed',
      createdAt: new Date()
    });

    await newJob.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to history:', error);
    return NextResponse.json(
      { error: 'Failed to save to history' },
      { status: 500 }
    );
  }
} 