import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from './userModel';

interface UserUpdateData {
  id: string;
  [key: string]: unknown; // Replace `any` with `unknown` for stricter typing
}

interface UserDeleteData {
  id: string;
}

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
    const users: Array<{ _id: string; name: string; email: string }> = await User.find({});
    return NextResponse.json({ data: users, message: 'Users fetched successfully' });
  } catch (error) {
    console.error(error); // Log the error to avoid unused variable
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

// CREATE user
export async function POST(req: Request) {
  try {
    await connectDB();
    const userData: Record<string, unknown> = await req.json(); // Replace `any` with a more specific type
    const newUser = await User.create({ ...userData });
    return NextResponse.json(
      { data: newUser, message: 'User created successfully' },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error(error); // Log the error to avoid unused variable
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

// UPDATE user
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData }: UserUpdateData = await req.json(); // Remove `password` and use a typed interface

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedUser, message: 'User updated successfully' });
  } catch (error: unknown) {
    console.error(error); // Log the error to avoid unused variable
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

// DELETE user
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id }: UserDeleteData = await req.json(); // Replace `any` with a typed interface
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: unknown) {
    console.error(error); // Log the error to avoid unused variable
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}
