import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const orderStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'failed'];

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
