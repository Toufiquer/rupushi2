import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from './orderModel'; // Import the Order model

// Reuse the MongoDB connection
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// GET all orders
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({});
    return NextResponse.json({ data: orders, message: 'Orders fetched successfully' });
  } catch {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

// CREATE order
export async function POST(req: Request) {
  try {
    await connectDB();
    const orderData: Record<string, unknown> = await req.json();

    const newOrder = await Order.create(orderData);
    return NextResponse.json(
      { data: newOrder, message: 'Order created successfully' },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// UPDATE order
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData }: { id: string; [key: string]: unknown } = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedOrder, message: 'Order updated successfully' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// DELETE order
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id }: { id: string } = await req.json();
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
