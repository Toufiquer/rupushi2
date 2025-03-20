import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '../../api/users/userModel';
import { generateToken, verifyToken } from '@/app/utils/jwt';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@rupushiv1.aq2wh.mongodb.net/db_users?retryWrites=true&w=majority&appName=rupushiv1`,
    );
  }
};

// CREATE user
export async function POST(req: Request) {
  try {
    let token = '';
    await connectDB();
    const userData = await req.json();

    const users = await User.find({});
    const findUser = users.find(user => user.email === userData.email);
    // Use the decryptPassCode method
    const decryptedPassCode = findUser.decryptPassCode();
    if (findUser) {
      if (decryptedPassCode === userData.passCode && findUser.alias === userData.alias) {
        // JWT টোকেন জেনারেট করা
        token = generateToken(userData.email, userData.alias);
      }
    }

    return NextResponse.json(
      { data: token, message: token ? 'Token created successfully' : 'Invalid credentials' },
      { status: token ? 201 : 401 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// টোকেন ভেরিফাই করার রাউট
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json(
      { data: decoded && true, message: 'Token verified successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
