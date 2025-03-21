import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '../productModel';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// GET a single product by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ data: product, message: 'Product fetched successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// UPDATE a product by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    const updateData = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: updatedProduct,
      message: 'Product updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// DELETE a product (soft delete - move to trash)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    // Instead of deleting, mark as deleted with timestamp
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true },
    );

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product moved to trash successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
