import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const orderStatus = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'failed',
] as const; // Added 'as const' for type safety

const ProductInfoSchema = new Schema(
  {
    productId: {
      type: String,
    },
    name: {
      type: String,
    },
    'product-code': {
      type: String,
    },
    img: {
      type: String,
    },
    realPrice: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    offer: {
      type: String,
    },
    stock: {
      type: Number,
    },
    'description-top': String,
    'description-bottom': String,
    material: String,
    design: String,
    color: String,
    category: String,
    weight: String,
    'chain length': String,
    style: String,
    quantity: {
      type: Number,
      min: 1,
    },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    orderId: {
      type: Number,
      index: true,
    },
    totalProduct: {
      type: Number,
      index: true,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: orderStatus,
      default: 'pending',
    },
    totalPrice: {
      type: Number,
    },
    shippingArea: {
      type: String,
    },
    customerInfo: {
      customerName: {
        type: String,
        trim: true,
      },

      address: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },

      note: {
        type: String,
        trim: true,
      },
    },
    productInfo: [ProductInfoSchema],
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;

import { Document } from 'mongoose';

export interface IProductInfo {
  productId: string;
  name: string;
  'product-code': string;
  img: string;
  realPrice: number;
  discountedPrice: number;
  offer: string;
  stock: number;
  'description-top'?: string; // Optional fields marked with ?
  'description-bottom'?: string;
  material?: string;
  design?: string;
  color?: string;
  category?: string;
  weight?: string;
  'chain length'?: string;
  style?: string;
  quantity: number;
}

export interface ICustomerInfo {
  customerName: string;
  address: string;
  phone: string;
  note?: string;
}

export interface IOrder extends Document {
  // Extends Document for Mongoose methods and properties
  orderId: number;
  totalProduct: number;
  deliveryCharge: number;
  orderStatus: (typeof orderStatus)[number]; // Using typeof to ensure type safety
  totalPrice: number;
  shippingArea: string;
  customerInfo: ICustomerInfo;
  productInfo: IProductInfo[];
  createdAt: Date;
  updatedAt: Date;
}
