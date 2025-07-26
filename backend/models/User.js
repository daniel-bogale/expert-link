const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  username: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  
  // Role and Status
  role: {
    type: String,
    enum: ['client', 'expert', 'admin'],
    default: 'client'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  
  // Profile Information
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  avatar: { type: String }, // Cloudinary URL
  phone: { type: String },
  
  // Professional Request (for clients wanting to become experts)
  professionalRequest: {
    isServiceProvider: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    submittedAt: { type: Date },
    reviewedAt: { type: Date },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rejectionReason: { type: String },
    
    // Professional fields
    expertise: [{
      category: {
        type: String,
        enum: ['law', 'health', 'business', 'technology', 'finance', 'education', 'consulting', 'other']
      },
      subcategory: { type: String },
      yearsOfExperience: { type: Number, min: 0 },
      description: { type: String, maxlength: 500 }
    }],
    title: { type: String, maxlength: 100 },
    bio: { type: String, maxlength: 2000 },
    education: [{
      degree: { type: String },
      institution: { type: String },
      year: { type: Number }
    }],
    certifications: [{
      name: { type: String },
      issuer: { type: String },
      year: { type: Number },
      certificateUrl: { type: String } // Cloudinary URL
    }],
    workExperience: [{
      position: { type: String },
      company: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }],
    hourlyRate: {
      type: Number,
      min: 10,
      max: 10000
    },
    availability: {
      timezone: { type: String },
      workingHours: {
        monday: { start: String, end: String, available: { type: Boolean, default: true } },
        tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
        wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
        thursday: { start: String, end: String, available: { type: Boolean, default: true } },
        friday: { start: String, end: String, available: { type: Boolean, default: true } },
        saturday: { start: String, end: String, available: { type: Boolean, default: false } },
        sunday: { start: String, end: String, available: { type: Boolean, default: false } }
      }
    },
    languages: [{ type: String }],
    portfolio: {
      description: { type: String, maxlength: 1000 },
      links: [{
        title: { type: String },
        url: { type: String }
      }]
    }
  },
  
  // Platform Stats
  totalSessions: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1, status: 1 });
userSchema.index({ 'professionalRequest.status': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find experts
userSchema.statics.findExperts = function(filters = {}) {
  const query = { role: 'expert', status: 'active' };
  return this.find({ ...query, ...filters });
};

// Static method to find pending professional requests
userSchema.statics.findPendingRequests = function() {
  return this.find({ 
    'professionalRequest.isServiceProvider': true,
    'professionalRequest.status': 'pending'
  });
};

const User = mongoose.model('User', userSchema);

// Export methods
exports.create = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.findByEmail = async (email) => {
  return await User.findByEmail(email);
};

exports.findById = async (id) => {
  return await User.findById(id);
};

exports.findExperts = async (filters) => {
  return await User.findExperts(filters);
};

exports.findPendingRequests = async () => {
  return await User.findPendingRequests();
};

exports.updateById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteById = async (id) => {
  return await User.findByIdAndDelete(id);
}; 