import { NextResponse } from 'next/server';
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

// GET all deleted products
export async function GET() {
  try {
    await connectDB();
    // Only return products that are deleted
    const deletedProducts = await Product.find({ isDeleted: true });
    return NextResponse.json({
      data: deletedProducts,
      message: 'Deleted products fetched successfully',
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching deleted products' }, { status: 500 });
  }
}
