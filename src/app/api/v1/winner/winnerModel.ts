import mongoose from 'mongoose';

const winnersSchema = new mongoose.Schema(
  {
    winnerTitle: {
      type: String,
      trim: true,
    },
    winnerName: {
      type: String,
      trim: true,
    },
    winnerImage1: {
      type: String,
      trim: true,
    },
    winnerAddress: {
      type: String,
      trim: true,
    },
    winnerMobile: {
      type: String,
      trim: true,
    },
    winnerText1: {
      type: String,
      trim: true,
    },
    winnerText2: {
      type: String,
      trim: true,
    },
    winnerText3: {
      type: String,
      trim: true,
    },
    productCode: {
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

export default mongoose.models.Winners || mongoose.model('Winners', winnersSchema);
