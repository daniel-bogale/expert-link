const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // Review Information
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  
  // Participants
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Review Details
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 1000,
    trim: true
  }
 
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes
reviewSchema.index({ bookingId: 1 }, { unique: true });
reviewSchema.index({ reviewerId: 1 });
reviewSchema.index({ reviewedId: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ status: 1 });

// Static method to find reviews by user
reviewSchema.statics.findByUser = function(userId, role = 'reviewed') {
  const query = role === 'reviewer' ? { reviewerId: userId } : { reviewedId: userId };
  return this.find({
    ...query,
    status: 'published'
  }).populate('reviewerId', 'firstName lastName avatar')
    .populate('reviewedId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic')
    .sort({ createdAt: -1 });
};

// Static method to find reviews for expert
reviewSchema.statics.findForExpert = function(expertId, filters = {}) {
  return this.find({
    reviewedId: expertId,
    status: 'published',
    ...filters
  }).populate('reviewerId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic')
    .sort({ createdAt: -1 });
};

// Static method to calculate average rating
reviewSchema.statics.calculateAverageRating = function(userId) {
  return this.aggregate([
    {
      $match: {
        reviewedId: mongoose.Types.ObjectId(userId),
        status: 'published'
      }
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);
};

// Static method to check if user can review booking
reviewSchema.statics.canReview = function(bookingId, userId) {
  return this.findOne({ bookingId, reviewerId: userId });
};

const Review = mongoose.model('Review', reviewSchema);

// Export methods
exports.create = async (reviewData) => {
  const review = new Review(reviewData);
  return await review.save();
};

exports.findById = async (id) => {
  return await Review.findById(id)
    .populate('reviewerId', 'firstName lastName avatar')
    .populate('reviewedId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic');
};

exports.findByBookingId = async (bookingId) => {
  return await Review.findOne({ bookingId })
    .populate('reviewerId', 'firstName lastName avatar')
    .populate('reviewedId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic');
};

exports.findByUser = async (userId, role) => {
  return await Review.findByUser(userId, role);
};

exports.findForExpert = async (expertId, filters) => {
  return await Review.findForExpert(expertId, filters);
};

exports.calculateAverageRating = async (userId) => {
  return await Review.calculateAverageRating(userId);
};

exports.canReview = async (bookingId, userId) => {
  return await Review.canReview(bookingId, userId);
};

exports.updateById = async (id, updateData) => {
  return await Review.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteById = async (id) => {
  return await Review.findByIdAndDelete(id);
}; 