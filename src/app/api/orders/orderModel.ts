import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    orderId: {
      type: Number,
      required: [true, 'Order Id is required'],
      trim: true,
    },
    'product-code': {
      type: String,
      required: [true, 'product-code is required'],
      trim: true,
    },
    img: {
      type: String,
      required: [true, 'image is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    deliveryCharge: {
      type: Number,
      required: true,
      min: [0, 'Delivery charge cannot be negative'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'TotalPrice cannot be negative'],
    },
    address: {
      type: String,
      required: [true, 'Shipping address is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\+?[0-9\s\-\(\)]{6,20}$/, 'Please enter a valid phone number'],
    },
    shippingArea: {
      type: String,
      enum: {
        values: ['inside Dhaka', 'outside Dhaka'],
        message: 'Shipping area must be either "inside Dhaka" or "outside Dhaka"',
      },
      default: 'inside Dhaka',
    },
    note: {
      type: String,
      trim: true,
      maxLength: [500, 'Note cannot exceed 500 characters'],
    },
    orderStatus: {
      type: String,
      trim: true,
      maxLength: [500, 'Note cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.models.Order || mongoose.model('Orders', orderSchema);
