import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Promotion from './promotionModel';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// GET all promotion
export async function GET() {
  try {
    await connectDB();
    const promotionItems = await Promotion.find({});
    return NextResponse.json({ data: promotionItems, message: 'Promotion সফলভাবে লোড হয়েছে' });
  } catch {
    // Removed unused 'error' variable
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// CREATE promotion
export async function POST(req: Request) {
  try {
    await connectDB();
    const promotionData = await req.json();
    const newPromotion = await Promotion.create(promotionData);
    return NextResponse.json(
      { data: newPromotion, message: 'Promotion সফলভাবে তৈরি হয়েছে' },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// UPDATE promotion
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();
    const updatedPromotion = await Promotion.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPromotion) {
      return NextResponse.json({ message: 'Promotion খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedPromotion, message: 'Promotion সফলভাবে আপডেট হয়েছে' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// DELETE promotion
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedPromotion = await Promotion.findByIdAndDelete(id);

    if (!deletedPromotion) {
      return NextResponse.json({ message: 'Promotion খুঁজে পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Promotion সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
