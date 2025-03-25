import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    allProducts: [
      {
        uniqueProductId: {
          type: String,
          required: [true, 'Unique product id is required'],
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
      },
    ],
    deliveryCharge: {
      type: Number,
      required: true,
      min: [0, 'Delivery charge cannot be negative'],
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Total cannot be negative'],
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
