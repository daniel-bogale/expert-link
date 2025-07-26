const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // Payment Information
  paymentId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Related Entities
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Payment Details
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'ETB',
    enum: ['ETB']
  },
  paymentMethod: {
    type: String,
    default: 'capa',
    enum: ['capa']
  },
  
  // Platform Fees
  platformFee: {
    type: Number,
    default: 0,
    min: 0
  },
  platformFeePercentage: {
    type: Number,
    default: 0.15, // 15% platform fee
    min: 0,
    max: 1
  },
  expertAmount: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Payment Status
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  
  // Capa Payment Provider
  capaPaymentId: { type: String },
  capaRefundId: { type: String },
  
  // Refund Information
  refund: {
    amount: { type: Number },
    reason: { type: String },
    processedAt: { type: Date },
    processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
}, {
  timestamps: true
});

// Indexes
paymentSchema.index({ paymentId: 1 });
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ clientId: 1 });
paymentSchema.index({ expertId: 1 });
paymentSchema.index({ status: 1 });

paymentSchema.index({ capaPaymentId: 1 });

// Pre-save middleware to generate payment ID
paymentSchema.pre('save', function(next) {
  if (this.isNew && !this.paymentId) {
    this.paymentId = 'PAY' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});



// Static method to find payments by user
paymentSchema.statics.findByUser = function(userId, role = 'client') {
  const query = role === 'client' ? { clientId: userId } : { expertId: userId };
  return this.find(query)
    .populate('bookingId', 'scheduledAt topic duration')
    .populate('clientId', 'firstName lastName email')
    .populate('expertId', 'firstName lastName email')
    .sort({ createdAt: -1 });
};

// Static method to find payments by status
paymentSchema.statics.findByStatus = function(status) {
  return this.find({ status })
    .populate('bookingId', 'scheduledAt topic')
    .populate('clientId', 'firstName lastName email')
    .populate('expertId', 'firstName lastName email')
    .sort({ createdAt: -1 });
};

// Static method to calculate total earnings for expert
paymentSchema.statics.calculateExpertEarnings = function(expertId, startDate, endDate) {
  const matchStage = {
    expertId: mongoose.Types.ObjectId(expertId),
    status: 'completed'
  };
  
  if (startDate && endDate) {
    matchStage.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: '$expertAmount' },
        totalSessions: { $sum: 1 },
        averageEarnings: { $avg: '$expertAmount' }
      }
    }
  ]);
};

// Static method to calculate platform revenue
paymentSchema.statics.calculatePlatformRevenue = function(startDate, endDate) {
  const matchStage = { status: 'completed' };
  
  if (startDate && endDate) {
    matchStage.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$platformFee' },
        totalTransactions: { $sum: 1 },
        averageTransactionValue: { $avg: '$amount' }
      }
    }
  ]);
};

const Payment = mongoose.model('Payment', paymentSchema);

// Export methods
exports.create = async (paymentData) => {
  const payment = new Payment(paymentData);
  return await payment.save();
};

exports.findById = async (id) => {
  return await Payment.findById(id)
    .populate('bookingId', 'scheduledAt topic duration')
    .populate('clientId', 'firstName lastName email')
    .populate('expertId', 'firstName lastName email');
};

exports.findByPaymentId = async (paymentId) => {
  return await Payment.findOne({ paymentId })
    .populate('bookingId', 'scheduledAt topic duration')
    .populate('clientId', 'firstName lastName email')
    .populate('expertId', 'firstName lastName email');
};

exports.findByBookingId = async (bookingId) => {
  return await Payment.findOne({ bookingId })
    .populate('bookingId', 'scheduledAt topic duration')
    .populate('clientId', 'firstName lastName email')
    .populate('expertId', 'firstName lastName email');
};

exports.findByUser = async (userId, role) => {
  return await Payment.findByUser(userId, role);
};

exports.findByStatus = async (status) => {
  return await Payment.findByStatus(status);
};

exports.calculateExpertEarnings = async (expertId, startDate, endDate) => {
  return await Payment.calculateExpertEarnings(expertId, startDate, endDate);
};

exports.calculatePlatformRevenue = async (startDate, endDate) => {
  return await Payment.calculatePlatformRevenue(startDate, endDate);
};

exports.updateById = async (id, updateData) => {
  return await Payment.findByIdAndUpdate(id, updateData, { new: true });
};

exports.updateStatus = async (id, status, additionalData = {}) => {
  return await Payment.findByIdAndUpdate(id, {
    status: status,
    ...additionalData
  }, { new: true });
};

exports.deleteById = async (id) => {
  return await Payment.findByIdAndDelete(id);
}; 