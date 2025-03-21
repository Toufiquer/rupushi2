import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '../../productModel';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// PERMANENTLY DELETE a product
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    // Permanently delete the product from the database
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Product permanently deleted',
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
