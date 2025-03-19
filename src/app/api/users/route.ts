import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from './userModel';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// GET all users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json({ data: users, message: 'Users fetched successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

// CREATE user
export async function POST(req: Request) {
  try {
    await connectDB();
    const userData = await req.json();
    const newUser = await User.create(userData);
    return NextResponse.json(
      { data: newUser, message: 'User created successfully' },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// UPDATE user
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedUser, message: 'User updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// DELETE user
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
