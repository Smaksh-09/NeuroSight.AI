import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/Lib/db';
import Job from '@/app/Lib/models/Jobs';
import { verifyAuth } from '@/app/Lib/auth';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    //@ts-ignore
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const job = await Job.findOne({ _id: params.id, userId });
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    await job.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete history item' },
      { status: 500 }
    );
  }
} 