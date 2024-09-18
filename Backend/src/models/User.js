const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  businessName: String,
  businessAddress: String,
  abnAcn: String,
  subscription: {
    tier: { type: String, enum: ['basic', 'pro', 'enterprise'], default: 'basic' },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
    paymentDetails: {
      cardNumber: String,
      expiryDate: String,
      cvv: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
