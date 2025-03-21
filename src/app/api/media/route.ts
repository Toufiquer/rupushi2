import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Media from './mediaModel';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// GET all media
export async function GET() {
  try {
    await connectDB();
    const mediaItems = await Media.find({});
    return NextResponse.json({ data: mediaItems, message: 'মিডিয়া সফলভাবে লোড হয়েছে' });
  } catch {
    // Removed unused 'error' variable
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// CREATE media
export async function POST(req: Request) {
  try {
    await connectDB();
    const mediaData = await req.json();
    const newMedia = await Media.create(mediaData);
    return NextResponse.json(
      { data: newMedia, message: 'মিডিয়া সফলভাবে তৈরি হয়েছে' },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// UPDATE media
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();
    const updatedMedia = await Media.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMedia) {
      return NextResponse.json({ message: 'মিডিয়া খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedMedia, message: 'মিডিয়া সফলভাবে আপডেট হয়েছে' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// DELETE media
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedMedia = await Media.findByIdAndDelete(id);

    if (!deletedMedia) {
      return NextResponse.json({ message: 'মিডিয়া খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ message: 'মিডিয়া সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
