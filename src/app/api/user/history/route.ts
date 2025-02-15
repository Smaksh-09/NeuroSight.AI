import { NextResponse } from 'next/server';
import { connectDB } from '@/app/Lib/db';
import Job from '@/app/Lib/models/Jobs';
import { verifyAuth } from '@/app/Lib/auth';

export async function GET(req: Request) {
  try {
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