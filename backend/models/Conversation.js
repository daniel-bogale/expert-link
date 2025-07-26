const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  // Conversation Information
  conversationId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Participants
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['client', 'expert'],
      required: true
    },
    joinedAt: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now }
  }],
  
  // Conversation Details
  type: {
    type: String,
    enum: ['booking', 'general'],
    default: 'general'
  },
  
  // Related booking (if conversation is for a specific booking)
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  
  // Conversation Status
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  
  // Last message info
  lastMessage: {
    content: { type: String },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sentAt: { type: Date }
  },
  
  // Unread counts for each participant
  unreadCounts: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    count: { type: Number, default: 0 }
  }],
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastActivityAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes
conversationSchema.index({ conversationId: 1 });
conversationSchema.index({ 'participants.userId': 1 });
conversationSchema.index({ bookingId: 1 });
conversationSchema.index({ status: 1 });
conversationSchema.index({ lastActivityAt: -1 });

// Pre-save middleware to generate conversation ID
conversationSchema.pre('save', function(next) {
  if (this.isNew && !this.conversationId) {
    this.conversationId = 'CONV' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

// Static method to find conversations by user
conversationSchema.statics.findByUser = function(userId, filters = {}) {
  return this.find({
    'participants.userId': userId,
    ...filters
  }).populate('participants.userId', 'firstName lastName avatar role')
    .populate('lastMessage.senderId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic')
    .sort({ lastActivityAt: -1 });
};

// Static method to find conversation between two users
conversationSchema.statics.findBetweenUsers = function(userId1, userId2, type = 'general') {
  return this.findOne({
    'participants.userId': { $all: [userId1, userId2] },
    type: type,
    status: 'active'
  }).populate('participants.userId', 'firstName lastName avatar role')
    .populate('lastMessage.senderId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic');
};

// Static method to find conversation by booking
conversationSchema.statics.findByBooking = function(bookingId) {
  return this.findOne({
    bookingId: bookingId,
    type: 'booking'
  }).populate('participants.userId', 'firstName lastName avatar role')
    .populate('lastMessage.senderId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic');
};

// Static method to update last activity
conversationSchema.statics.updateLastActivity = function(conversationId, lastMessage = {}) {
  return this.findByIdAndUpdate(conversationId, {
    lastActivityAt: new Date(),
    lastMessage: lastMessage
  }, { new: true });
};

// Static method to update unread count
conversationSchema.statics.updateUnreadCount = function(conversationId, userId, increment = 1) {
  return this.updateOne(
    {
      _id: conversationId,
      'unreadCounts.userId': userId
    },
    {
      $inc: { 'unreadCounts.$.count': increment }
    }
  );
};

// Static method to reset unread count
conversationSchema.statics.resetUnreadCount = function(conversationId, userId) {
  return this.updateOne(
    {
      _id: conversationId,
      'unreadCounts.userId': userId
    },
    {
      $set: { 'unreadCounts.$.count': 0 }
    }
  );
};

const Conversation = mongoose.model('Conversation', conversationSchema);

// Export methods
exports.create = async (conversationData) => {
  const conversation = new Conversation(conversationData);
  return await conversation.save();
};

exports.findById = async (id) => {
  return await Conversation.findById(id)
    .populate('participants.userId', 'firstName lastName avatar role')
    .populate('lastMessage.senderId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic');
};

exports.findByConversationId = async (conversationId) => {
  return await Conversation.findOne({ conversationId })
    .populate('participants.userId', 'firstName lastName avatar role')
    .populate('lastMessage.senderId', 'firstName lastName avatar')
    .populate('bookingId', 'scheduledAt topic');
};

exports.findByUser = async (userId, filters) => {
  return await Conversation.findByUser(userId, filters);
};

exports.findBetweenUsers = async (userId1, userId2, type) => {
  return await Conversation.findBetweenUsers(userId1, userId2, type);
};

exports.findByBooking = async (bookingId) => {
  return await Conversation.findByBooking(bookingId);
};

exports.updateLastActivity = async (conversationId, lastMessage) => {
  return await Conversation.updateLastActivity(conversationId, lastMessage);
};

exports.updateUnreadCount = async (conversationId, userId, increment) => {
  return await Conversation.updateUnreadCount(conversationId, userId, increment);
};

exports.resetUnreadCount = async (conversationId, userId) => {
  return await Conversation.resetUnreadCount(conversationId, userId);
};

exports.updateById = async (id, updateData) => {
  return await Conversation.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteById = async (id) => {
  return await Conversation.findByIdAndDelete(id);
}; 