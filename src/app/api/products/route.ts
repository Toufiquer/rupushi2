import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from './productModel';

// Connect to MongoDB (keep connection details as needed)
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// GET all products (excluding deleted ones)
export async function GET() {
  try {
    await connectDB();
    // Only return products that are not deleted
    const products = await Product.find({ isDeleted: { $ne: true } });
    return NextResponse.json({ data: products, message: 'Products fetched successfully' });
  } catch {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

// CREATE product
export async function POST(req: Request) {
  try {
    await connectDB();
    const productData: Record<string, unknown> = await req.json();
    const newProduct = await Product.create(productData);
    return NextResponse.json(
      { data: newProduct, message: 'Product created successfully' },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: 'Error creating product' }, { status: 400 });
  }
}

// UPDATE product
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData }: { id: string; [key: string]: unknown } = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedProduct, message: 'Product updated successfully' });
  } catch {
    return NextResponse.json({ message: 'Error updating product' }, { status: 400 });
  }
}

// DELETE product
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id }: { id: string } = await req.json();
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch {
    return NextResponse.json({ message: 'Error deleting product' }, { status: 400 });
  }
}
