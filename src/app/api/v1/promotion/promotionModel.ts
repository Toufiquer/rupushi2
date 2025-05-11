import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema(
  {
    mainPageTitle: {
      type: String,
      trim: true,
    },
    mainPageImage1: {
      type: String,
      trim: true,
    },
    mainPageImage2: {
      type: String,
      trim: true,
    },
    mainPagePriceText: {
      type: String,
      trim: true,
    },
    mainPageText1: {
      type: String,
      trim: true,
    },
    mainPageText2: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.models.Promotion || mongoose.model('Promotion', promotionSchema);
