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

// RESTORE a deleted product
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    // Restore the product by setting isDeleted to false and removing deletedAt
    const restoredProduct = await Product.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        $unset: { deletedAt: 1 },
      },
      { new: true },
    );

    if (!restoredProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: restoredProduct,
      message: 'Product restored successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
