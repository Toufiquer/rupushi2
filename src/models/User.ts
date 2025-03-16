import { Schema, model, models } from 'mongoose';
// import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'নাম প্রয়োজন'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'ইমেইল প্রয়োজন'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'পাসওয়ার্ড প্রয়োজন'],
      minlength: [6, 'পাসওয়ার্ড অন্তত ৬ অক্ষর হতে হবে'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// এই কোড শুধুমাত্র সার্ভার সাইডে কাজ করবে কারণ মডেল শুধুমাত্র সার্ভারে পাওয়া যায়
const User = models.User || model<IUser>('User', userSchema);

export default User;
