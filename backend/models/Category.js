const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  // Category Information
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  
  // Category Details
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  description: {
    type: String,
    maxlength: 500,
    trim: true
  },
  
  // Category Hierarchy
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  
  // Category Type
  type: {
    type: String,
    enum: ['main', 'subcategory'],
    default: 'main'
  },
  
  // Category Status
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  
  // Category Metadata
  icon: { type: String },
  color: { type: String },
  
  // Statistics
  stats: {
    expertCount: { type: Number, default: 0 },
    sessionCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    averagePrice: { type: Number, default: 0 }
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes
categorySchema.index({ slug: 1 });
categorySchema.index({ parentId: 1 });
categorySchema.index({ type: 1 });
categorySchema.index({ status: 1 });

// Pre-save middleware to generate slug
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

// Static method to find main categories
categorySchema.statics.findMainCategories = function(filters = {}) {
  return this.find({
    type: 'main',
    status: 'active',
    ...filters
  }).sort({ 'stats.expertCount': -1, name: 1 });
};

// Static method to find subcategories
categorySchema.statics.findSubcategories = function(parentId, filters = {}) {
  return this.find({
    parentId: parentId,
    type: 'subcategory',
    status: 'active',
    ...filters
  }).sort({ name: 1 });
};

// Static method to find category tree
categorySchema.statics.findCategoryTree = function() {
  return this.aggregate([
    {
      $match: { status: 'active' }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: 'parentId',
        as: 'subcategories'
      }
    },
    {
      $match: { type: 'main' }
    },
    {
      $sort: { 'stats.expertCount': -1, name: 1 }
    }
  ]);
};

const Category = mongoose.model('Category', categorySchema);

// Export methods
exports.create = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

exports.findById = async (id) => {
  return await Category.findById(id);
};

exports.findBySlug = async (slug) => {
  return await Category.findOne({ slug });
};

exports.findMainCategories = async (filters) => {
  return await Category.findMainCategories(filters);
};

exports.findSubcategories = async (parentId, filters) => {
  return await Category.findSubcategories(parentId, filters);
};

exports.findCategoryTree = async () => {
  return await Category.findCategoryTree();
};

exports.updateById = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteById = async (id) => {
  return await Category.findByIdAndDelete(id);
};

// Seed data for initial categories
exports.seedCategories = async () => {
  const categories = [
    {
      name: 'Law',
      description: 'Legal consultation and advice',
      type: 'main',
      icon: '⚖️',
      color: '#3B82F6'
    },
    {
      name: 'Health',
      description: 'Medical and wellness consultation',
      type: 'main',
      icon: '🏥',
      color: '#EF4444'
    },
    {
      name: 'Business',
      description: 'Business strategy and consulting',
      type: 'main',
      icon: '💼',
      color: '#10B981'
    },
    {
      name: 'Technology',
      description: 'IT and technical consultation',
      type: 'main',
      icon: '💻',
      color: '#8B5CF6'
    },
    {
      name: 'Finance',
      description: 'Financial planning and advice',
      type: 'main',
      icon: '💰',
      color: '#F59E0B'
    },
    {
      name: 'Education',
      description: 'Educational guidance and tutoring',
      type: 'main',
      icon: '📚',
      color: '#06B6D4'
    },
    {
      name: 'Consulting',
      description: 'General consulting services',
      type: 'main',
      icon: '🎯',
      color: '#EC4899'
    }
  ];

  for (const category of categories) {
    const existing = await Category.findOne({ name: category.name });
    if (!existing) {
      await Category.create(category);
    }
  }
}; 