import mongoose from 'mongoose';

export const orderStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'failed'];
const OrderSchema = new mongoose.Schema(
  {
    customerInfo: {
      customerName: {
        type: String,
        required: true,
        trim: true,
      },
      orderId: {
        type: Number,
        required: true,
        unique: true,
        index: true,
      },
      deliveryCharge: {
        type: Number,
        required: true,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      shippingArea: {
        type: String,
      },
      note: {
        type: String,
        trim: true,
      },
      orderStatus: {
        type: String,
        required: true,
        enum: orderStatus,
        default: 'pending',
      },
    },
    productInfo: [
      new mongoose.Schema(
        {
          productId: {
            type: String,
          },
          name: {
            type: String,
            required: true,
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
            required: true,
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
            required: true,
            min: 1,
          },
        },
        { _id: false },
      ),
    ],
  },
  {
    timestamps: true,
  },
);

// Create a cache for the model
let OrderModel: mongoose.Model<any>;

function getOrderModel() {
  if (!OrderModel) {
    OrderModel = mongoose.model('Order', OrderSchema);
  }
  return OrderModel;
}

export default getOrderModel;
