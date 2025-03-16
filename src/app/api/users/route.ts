import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).select('-password');
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('ইউজার তথ্য আনতে সমস্যা হয়েছে:', error);
    return NextResponse.json(
      { success: false, message: 'ইউজার তথ্য আনতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();

    // এই ইমেইল দিয়ে ইউজার আছে কিনা চেক করা
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'এই ইমেইল দিয়ে ইতিমধ্যে একাউন্ট আছে' },
        { status: 400 }
      );
    }

    // নতুন ইউজার তৈরি করা
    const user = await User.create(body);
    
    // পাসওয়ার্ড বাদ দিয়ে ইউজার অবজেক্ট পাঠানো
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('ইউজার তৈরিতে সমস্যা হয়েছে:', error);
    return NextResponse.json(
      { success: false, message: 'ইউজার তৈরিতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
} 