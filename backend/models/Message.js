const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // Message Information
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  
  // Sender
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Message Content
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  
  // File attachments (Cloudinary URLs)
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String }, // Cloudinary URL
    fileSize: { type: Number },
    fileType: { type: String }
  }],
  
  // Message Status
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  
  // Read receipts
  readBy: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    readAt: { type: Date, default: Date.now }
  }],
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ status: 1 });

// Static method to find messages by conversation
messageSchema.statics.findByConversation = function(conversationId, limit = 50, skip = 0) {
  return this.find({ conversationId })
    .populate('senderId', 'firstName lastName avatar')
    .populate('readBy.userId', 'firstName lastName')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to find unread messages
messageSchema.statics.findUnread = function(conversationId, userId) {
  return this.find({
    conversationId,
    senderId: { $ne: userId },
    'readBy.userId': { $ne: userId }
  }).countDocuments();
};

// Static method to mark messages as read
messageSchema.statics.markAsRead = function(conversationId, userId) {
  return this.updateMany(
    {
      conversationId,
      senderId: { $ne: userId },
      'readBy.userId': { $ne: userId }
    },
    {
      $push: {
        readBy: {
          userId: userId,
          readAt: new Date()
        }
      },
      $set: { status: 'read' }
    }
  );
};

const Message = mongoose.model('Message', messageSchema);

// Export methods
exports.create = async (messageData) => {
  const message = new Message(messageData);
  return await message.save();
};

exports.findById = async (id) => {
  return await Message.findById(id)
    .populate('senderId', 'firstName lastName avatar')
    .populate('readBy.userId', 'firstName lastName');
};

exports.findByConversation = async (conversationId, limit, skip) => {
  return await Message.findByConversation(conversationId, limit, skip);
};

exports.findUnread = async (conversationId, userId) => {
  return await Message.findUnread(conversationId, userId);
};

exports.markAsRead = async (conversationId, userId) => {
  return await Message.markAsRead(conversationId, userId);
};

exports.updateById = async (id, updateData) => {
  return await Message.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteById = async (id) => {
  return await Message.findByIdAndDelete(id);
}; 