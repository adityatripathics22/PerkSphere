const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Deal title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Deal description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['cloud', 'marketing', 'analytics', 'productivity', 'other'],
      lowercase: true,
    },
    partnerName: {
      type: String,
      required: [true, 'Partner name is required'],
      trim: true,
    },
    partnerLogo: {
      type: String,
      default: null,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    eligibilityConditions: {
      type: String,
      default: '',
    },
    discountInfo: {
      type: String,
      default: '',
    },
    validUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

dealSchema.index({ category: 1 });
dealSchema.index({ isLocked: 1 });

module.exports = mongoose.model('Deal', dealSchema);
