import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
}

function decrypt(hash: { iv: string; content: string }) {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString();
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    passCode: { type: String, required: true },
    alias: { type: String, required: true },
    role: {
      type: String,
      required: false,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
  },
  { timestamps: true },
);  

userSchema.pre('save', function (next) {
  if (this.isModified('passCode')) {
    const encryptedPassCode = encrypt(this.passCode);
    this.passCode = JSON.stringify(encryptedPassCode);
  }
  next();
});

userSchema.methods.decryptPassCode = function () {
  const encryptedPassCode = JSON.parse(this.passCode);
  return decrypt(encryptedPassCode);
};

export default mongoose.models.User || mongoose.model('User', userSchema);
