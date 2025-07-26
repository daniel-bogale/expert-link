const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Booking Information
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Participants
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
  
  // Session Details
  sessionType: {
    type: String,
    enum: ['video', 'audio', 'chat'],
    default: 'video'
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 480 // 8 hours max
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  
  // Pricing
  hourlyRate: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  
  // Payment
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  
  // Session Details
  topic: { type: String, maxlength: 200 },
  description: { type: String, maxlength: 1000 },
  
  // Meeting Details
  meetingUrl: { type: String },
  meetingId: { type: String },
  
  // Cancellation
  cancelledBy: {
    type: String,
    enum: ['client', 'expert', 'system']
  },
  cancelledAt: { type: Date },
  cancellationReason: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ clientId: 1 });
bookingSchema.index({ expertId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ scheduledAt: 1 });

// Pre-save middleware to generate booking ID
bookingSchema.pre('save', function(next) {
  if (this.isNew && !this.bookingId) {
    this.bookingId = 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

// Static method to find upcoming bookings
bookingSchema.statics.findUpcoming = function(userId, role = 'client') {
  const query = role === 'client' ? { clientId: userId } : { expertId: userId };
  return this.find({
    ...query,
    status: 'confirmed',
    scheduledAt: { $gt: new Date() }
  }).populate('clientId', 'firstName lastName email avatar')
    .populate('expertId', 'firstName lastName email avatar')
    .sort({ scheduledAt: 1 });
};

// Static method to find past bookings
bookingSchema.statics.findPast = function(userId, role = 'client') {
  const query = role === 'client' ? { clientId: userId } : { expertId: userId };
  return this.find({
    ...query,
    status: { $in: ['completed', 'cancelled', 'no_show'] }
  }).populate('clientId', 'firstName lastName email avatar')
    .populate('expertId', 'firstName lastName email avatar')
    .sort({ scheduledAt: -1 });
};

// Static method to find conflicting bookings
bookingSchema.statics.findConflicts = function(expertId, startTime, endTime, excludeBookingId = null) {
  const query = {
    expertId: expertId,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      {
        scheduledAt: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  };
  
  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }
  
  return this.find(query);
};

const Booking = mongoose.model('Booking', bookingSchema);

// Export methods
exports.create = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

exports.findById = async (id) => {
  return await Booking.findById(id)
    .populate('clientId', 'firstName lastName email avatar')
    .populate('expertId', 'firstName lastName email avatar');
};

exports.findByBookingId = async (bookingId) => {
  return await Booking.findOne({ bookingId })
    .populate('clientId', 'firstName lastName email avatar')
    .populate('expertId', 'firstName lastName email avatar');
};

exports.findUpcoming = async (userId, role) => {
  return await Booking.findUpcoming(userId, role);
};

exports.findPast = async (userId, role) => {
  return await Booking.findPast(userId, role);
};

exports.findConflicts = async (expertId, startTime, endTime, excludeBookingId) => {
  return await Booking.findConflicts(expertId, startTime, endTime, excludeBookingId);
};

exports.updateById = async (id, updateData) => {
  return await Booking.findByIdAndUpdate(id, updateData, { new: true });
};

exports.updateStatus = async (id, status, additionalData = {}) => {
  return await Booking.findByIdAndUpdate(id, {
    status: status,
    ...additionalData
  }, { new: true });
};

exports.deleteById = async (id) => {
  return await Booking.findByIdAndDelete(id);
}; 