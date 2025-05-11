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
    productPageBannerImage1: {
      type: String,
      trim: true,
    },
    productPageBannerImage2: {
      type: String,
      trim: true,
    },
    productPageTitle1: {
      type: String,
      trim: true,
    },
    productPageTitle2: {
      type: String,
      trim: true,
    },
    productPageText1: {
      type: String,
      trim: true,
    },
    productPageText2: {
      type: String,
      trim: true,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    productCode: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.models.Promotion || mongoose.model('Promotion', promotionSchema);
