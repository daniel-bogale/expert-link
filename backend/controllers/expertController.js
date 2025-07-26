const User = require('../models/User');
const Category = require('../models/Category');

// Get all experts with filters
exports.getExperts = async (req, res) => {
  try {
    const {
      category,
      minRating,
      maxPrice,
      availability,
      limit = 20,
      page = 1,
      sortBy = 'rating',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filters = {
      role: 'expert',
      status: 'active',
      'professionalRequest.status': 'approved'
    };

    // Category filter
    if (category) {
      filters['professionalRequest.expertise.category'] = category;
    }

    // Rating filter
    if (minRating) {
      filters.rating = { $gte: parseFloat(minRating) };
    }

    // Price filter
    if (maxPrice) {
      filters['professionalRequest.hourlyRate'] = { $lte: parseFloat(maxPrice) };
    }

    // Availability filter (basic - can be enhanced)
    if (availability) {
      // This would need more complex logic for actual availability checking
      // For now, just check if expert has availability set
      filters['professionalRequest.availability.timezone'] = { $exists: true };
    }

    // Build sort object
    const sort = {};
    if (sortBy === 'rating') {
      sort.rating = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'price') {
      sort['professionalRequest.hourlyRate'] = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'sessions') {
      sort.totalSessions = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.rating = -1; // Default sort by rating
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get experts
    const experts = await User.find(filters)
      .select('firstName lastName avatar rating reviewCount totalSessions professionalRequest')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await User.countDocuments(filters);

    // Format response
    const formattedExperts = experts.map(expert => ({
      id: expert._id,
      name: `${expert.firstName || ''} ${expert.lastName || ''}`.trim(),
      avatar: expert.avatar,
      rating: expert.rating,
      reviewCount: expert.reviewCount,
      totalSessions: expert.totalSessions,
      title: expert.professionalRequest?.title || '',
      bio: expert.professionalRequest?.bio || '',
      hourlyRate: expert.professionalRequest?.hourlyRate || 0,
      expertise: expert.professionalRequest?.expertise || [],
      languages: expert.professionalRequest?.languages || []
    }));

    res.json({
      success: true,
      data: {
        experts: formattedExperts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalExperts: total,
          hasNext: skip + experts.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: err.message
    });
  }
};

// Search experts
exports.searchExperts = async (req, res) => {
  try {
    const { q, category, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required.'
      });
    }

    // Build search query
    const searchQuery = {
      role: 'expert',
      status: 'active',
      'professionalRequest.status': 'approved',
      $or: [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { 'professionalRequest.title': { $regex: q, $options: 'i' } },
        { 'professionalRequest.bio': { $regex: q, $options: 'i' } },
        { 'professionalRequest.expertise.subcategory': { $regex: q, $options: 'i' } }
      ]
    };

    // Add category filter if provided
    if (category) {
      searchQuery['professionalRequest.expertise.category'] = category;
    }

    // Get experts
    const experts = await User.find(searchQuery)
      .select('firstName lastName avatar rating reviewCount totalSessions professionalRequest')
      .sort({ rating: -1 })
      .limit(parseInt(limit));

    // Format response
    const formattedExperts = experts.map(expert => ({
      id: expert._id,
      name: `${expert.firstName || ''} ${expert.lastName || ''}`.trim(),
      avatar: expert.avatar,
      rating: expert.rating,
      reviewCount: expert.reviewCount,
      totalSessions: expert.totalSessions,
      title: expert.professionalRequest?.title || '',
      bio: expert.professionalRequest?.bio || '',
      hourlyRate: expert.professionalRequest?.hourlyRate || 0,
      expertise: expert.professionalRequest?.expertise || []
    }));

    res.json({
      success: true,
      data: {
        experts: formattedExperts,
        query: q,
        total: experts.length
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: err.message
    });
  }
};

// Get expert details
exports.getExpertDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const expert = await User.findOne({
      _id: id,
      role: 'expert',
      status: 'active',
      'professionalRequest.status': 'approved'
    }).select('-password');

    if (!expert) {
      return res.status(404).json({
        success: false,
        error: 'Expert not found.'
      });
    }

    // Format response
    const expertData = {
      id: expert._id,
      name: `${expert.firstName || ''} ${expert.lastName || ''}`.trim(),
      avatar: expert.avatar,
      rating: expert.rating,
      reviewCount: expert.reviewCount,
      totalSessions: expert.totalSessions,
      totalSpent: expert.totalSpent,
      professionalRequest: expert.professionalRequest
    };

    res.json({
      success: true,
      data: {
        expert: expertData
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: err.message
    });
  }
};

// Get categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findMainCategories();

    const formattedCategories = categories.map(category => ({
      id: category._id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      color: category.color,
      stats: category.stats
    }));

    res.json({
      success: true,
      data: {
        categories: formattedCategories
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: err.message
    });
  }
};

// Get experts by category
exports.getExpertsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 20, page = 1 } = req.query;

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found.'
      });
    }

    // Build filter
    const filters = {
      role: 'expert',
      status: 'active',
      'professionalRequest.status': 'approved',
      'professionalRequest.expertise.category': category.name
    };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get experts
    const experts = await User.find(filters)
      .select('firstName lastName avatar rating reviewCount totalSessions professionalRequest')
      .sort({ rating: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await User.countDocuments(filters);

    // Format response
    const formattedExperts = experts.map(expert => ({
      id: expert._id,
      name: `${expert.firstName || ''} ${expert.lastName || ''}`.trim(),
      avatar: expert.avatar,
      rating: expert.rating,
      reviewCount: expert.reviewCount,
      totalSessions: expert.totalSessions,
      title: expert.professionalRequest?.title || '',
      bio: expert.professionalRequest?.bio || '',
      hourlyRate: expert.professionalRequest?.hourlyRate || 0,
      expertise: expert.professionalRequest?.expertise || []
    }));

    res.json({
      success: true,
      data: {
        category: {
          id: category._id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          color: category.color
        },
        experts: formattedExperts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalExperts: total,
          hasNext: skip + experts.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: err.message
    });
  }
}; 