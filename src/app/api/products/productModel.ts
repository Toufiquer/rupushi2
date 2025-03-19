import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    uniqueProductId: {
      type: String,
      required: [true, 'Unique product id is required'],
      trim: true,
      unique: true,
    },
    img: {
      type: String,
      required: false,
      trim: true,
    },
    realPrice: {
      type: Number,
      required: [true, 'Real price is required'],
      min: [0, 'Price cannot be negative'],
    },
    offer: {
      type: Number,
      required: [true, 'Offer percentage is required'],
      min: [0, 'Offer cannot be negative'],
      max: [100, 'Offer cannot exceed 100%'],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for calculating discounted price
productSchema.virtual('discountedPrice').get(function () {
  return this.realPrice * (1 - this.offer / 100);
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
