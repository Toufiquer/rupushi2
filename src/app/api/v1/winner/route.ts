import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Winner from './winnerModel';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// GET all winner
export async function GET() {
  try {
    await connectDB();
    const winnerItems = await Winner.find({});
    return NextResponse.json({ data: winnerItems, message: 'Winner সফলভাবে লোড হয়েছে' });
  } catch {
    // Removed unused 'error' variable
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// CREATE winner
export async function POST(req: Request) {
  try {
    await connectDB();
    const winnerData = await req.json();
    const newWinner = await Winner.create(winnerData);
    return NextResponse.json(
      { data: newWinner, message: 'Winner সফলভাবে তৈরি হয়েছে' },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// UPDATE winner
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();
    const updatedWinner = await Winner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedWinner) {
      return NextResponse.json({ message: 'Winner খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedWinner, message: 'Winner সফলভাবে আপডেট হয়েছে' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// DELETE winner
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedWinner = await Winner.findByIdAndDelete(id);

    if (!deletedWinner) {
      return NextResponse.json({ message: 'Winner খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Winner সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
