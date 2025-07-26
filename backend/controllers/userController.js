const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          phone: user.phone,
          role: user.role,
          status: user.status,
          totalSessions: user.totalSessions,
          totalSpent: user.totalSpent,
          rating: user.rating,
          reviewCount: user.reviewCount,
          professionalRequest: user.professionalRequest,
          createdAt: user.createdAt
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

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;

    const user = await User.updateById(req.user._id, updateData);
    
    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          phone: user.phone,
          role: user.role
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

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided.'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'consultly/avatars',
      width: 300,
      height: 300,
      crop: 'fill'
    });

    // Update user avatar
    const user = await User.updateById(req.user._id, { avatar: result.secure_url });

    res.json({
      success: true,
      message: 'Avatar uploaded successfully.',
      data: {
        avatar: result.secure_url,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          role: user.role
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

// Submit professional request
exports.submitProfessionalRequest = async (req, res) => {
  try {
    const {
      isServiceProvider,
      expertise,
      title,
      bio,
      education,
      certifications,
      workExperience,
      hourlyRate,
      availability,
      languages,
      portfolio
    } = req.body;

    if (!isServiceProvider) {
      return res.status(400).json({
        success: false,
        error: 'isServiceProvider must be true to submit professional request.'
      });
    }

    const professionalRequest = {
      isServiceProvider: true,
      status: 'pending',
      submittedAt: new Date(),
      expertise: expertise || [],
      title: title || '',
      bio: bio || '',
      education: education || [],
      certifications: certifications || [],
      workExperience: workExperience || [],
      hourlyRate: hourlyRate || 0,
      availability: availability || {},
      languages: languages || [],
      portfolio: portfolio || {}
    };

    const user = await User.updateById(req.user._id, { professionalRequest });

    res.json({
      success: true,
      message: 'Professional request submitted successfully.',
      data: {
        professionalRequest: user.professionalRequest
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

// Update professional request
exports.updateProfessionalRequest = async (req, res) => {
  try {
    const {
      expertise,
      title,
      bio,
      education,
      certifications,
      workExperience,
      hourlyRate,
      availability,
      languages,
      portfolio
    } = req.body;

    const currentRequest = req.user.professionalRequest;
    
    if (!currentRequest.isServiceProvider) {
      return res.status(400).json({
        success: false,
        error: 'No professional request found.'
      });
    }

    if (currentRequest.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Cannot update approved professional request.'
      });
    }

    const updateData = {
      'professionalRequest.expertise': expertise || currentRequest.expertise,
      'professionalRequest.title': title || currentRequest.title,
      'professionalRequest.bio': bio || currentRequest.bio,
      'professionalRequest.education': education || currentRequest.education,
      'professionalRequest.certifications': certifications || currentRequest.certifications,
      'professionalRequest.workExperience': workExperience || currentRequest.workExperience,
      'professionalRequest.hourlyRate': hourlyRate || currentRequest.hourlyRate,
      'professionalRequest.availability': availability || currentRequest.availability,
      'professionalRequest.languages': languages || currentRequest.languages,
      'professionalRequest.portfolio': portfolio || currentRequest.portfolio
    };

    const user = await User.updateById(req.user._id, updateData);

    res.json({
      success: true,
      message: 'Professional request updated successfully.',
      data: {
        professionalRequest: user.professionalRequest
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

// Get professional request status
exports.getProfessionalRequestStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      data: {
        professionalRequest: user.professionalRequest
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