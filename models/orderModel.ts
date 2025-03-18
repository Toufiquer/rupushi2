import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
  product: string;
  quantity: number;
  price: number;
  status: string;
}

const orderSchema: Schema = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
