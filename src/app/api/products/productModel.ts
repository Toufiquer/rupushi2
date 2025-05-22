import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      unique: false,
    },
    'product-code': {
      type: String,
      required: [true, 'Product code is required'],
      trim: true,
      unique: true,
    },
    img: {
      type: String,
      required: false,
      trim: true,
    },
    realPrice: {
      type: String,
      required: [true, 'Real price is required'],
      trim: true,
    },
    discountedPrice: {
      type: String,
      required: false,
      trim: true,
    },
    offer: {
      type: String,
      required: [true, 'Offer is required'],
      trim: true,
      default: '0',
    },
    stock: {
      type: String,
      required: [true, 'Stock quantity is required'],
      trim: true,
    },
    'description-top': {
      type: String,
      required: [true, 'Top description is required'],
      trim: true,
    },
    'description-bottom': {
      type: String,
      required: false,
      trim: true,
    },
    material: {
      type: String,
      required: false,
      trim: true,
    },
    design: {
      type: String,
      required: false,
      trim: true,
    },
    color: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    weight: {
      type: String,
      required: false,
      trim: true,
    },
    'chain length': {
      type: String,
      required: false,
      trim: true,
    },
    style: {
      type: String,
      required: false,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isArrival: {
      type: Boolean,
      default: true,
    },
    isNew: {
      type: String,
    },
    greenBox: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    allImages: [{ type: String, required: false }],
    descriptionData: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
