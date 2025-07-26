const Booking = require('../models/Booking');
const User = require('../models/User');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const {
      expertId,
      scheduledAt,
      duration,
      sessionType,
      topic,
      description
    } = req.body;

    // Validate required fields
    if (!expertId || !scheduledAt || !duration) {
      return res.status(400).json({
        success: false,
        error: 'Expert ID, scheduled time, and duration are required.'
      });
    }

    // Check if expert exists and is approved
    const expert = await User.findOne({
      _id: expertId,
      role: 'expert',
      status: 'active',
      'professionalRequest.status': 'approved'
    });

    if (!expert) {
      return res.status(404).json({
        success: false,
        error: 'Expert not found or not available.'
      });
    }

    // Calculate end time
    const startTime = new Date(scheduledAt);
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    // Check for booking conflicts
    const conflicts = await Booking.findConflicts(expertId, startTime, endTime);
    if (conflicts.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Expert is not available at the selected time.'
      });
    }

    // Calculate total amount
    const hourlyRate = expert.professionalRequest.hourlyRate;
    const totalAmount = (hourlyRate * duration) / 60;

    // Create booking
    const bookingData = {
      clientId: req.user._id,
      expertId: expertId,
      sessionType: sessionType || 'video',
      duration: duration,
      scheduledAt: startTime,
      endTime: endTime,
      hourlyRate: hourlyRate,
      totalAmount: totalAmount,
      topic: topic || '',
      description: description || ''
    };

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully.',
      data: {
        booking: {
          id: booking._id,
          bookingId: booking.bookingId,
          expertId: booking.expertId,
          scheduledAt: booking.scheduledAt,
          endTime: booking.endTime,
          duration: booking.duration,
          sessionType: booking.sessionType,
          totalAmount: booking.totalAmount,
          status: booking.status,
          topic: booking.topic,
          description: booking.description
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

// Get user bookings
exports.getBookings = async (req, res) => {
  try {
    const { status, role = 'client', limit = 20, page = 1 } = req.query;

    // Build filter
    const filters = {};
    if (role === 'client') {
      filters.clientId = req.user._id;
    } else if (role === 'expert') {
      filters.expertId = req.user._id;
    }

    if (status) {
      filters.status = status;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get bookings
    const bookings = await Booking.find(filters)
      .populate('clientId', 'firstName lastName email avatar')
      .populate('expertId', 'firstName lastName email avatar')
      .sort({ scheduledAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await Booking.countDocuments(filters);

    // Format response
    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      bookingId: booking.bookingId,
      client: {
        id: booking.clientId._id,
        name: `${booking.clientId.firstName || ''} ${booking.clientId.lastName || ''}`.trim(),
        email: booking.clientId.email,
        avatar: booking.clientId.avatar
      },
      expert: {
        id: booking.expertId._id,
        name: `${booking.expertId.firstName || ''} ${booking.expertId.lastName || ''}`.trim(),
        email: booking.expertId.email,
        avatar: booking.expertId.avatar
      },
      scheduledAt: booking.scheduledAt,
      endTime: booking.endTime,
      duration: booking.duration,
      sessionType: booking.sessionType,
      totalAmount: booking.totalAmount,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      topic: booking.topic,
      description: booking.description,
      meetingUrl: booking.meetingUrl,
      meetingId: booking.meetingId
    }));

    res.json({
      success: true,
      data: {
        bookings: formattedBookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalBookings: total,
          hasNext: skip + bookings.length < total,
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

// Get booking details
exports.getBookingDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate('clientId', 'firstName lastName email avatar')
      .populate('expertId', 'firstName lastName email avatar');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found.'
      });
    }

    // Check if user has access to this booking
    if (booking.clientId._id.toString() !== req.user._id.toString() && 
        booking.expertId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Access denied.'
      });
    }

    const bookingData = {
      id: booking._id,
      bookingId: booking.bookingId,
      client: {
        id: booking.clientId._id,
        name: `${booking.clientId.firstName || ''} ${booking.clientId.lastName || ''}`.trim(),
        email: booking.clientId.email,
        avatar: booking.clientId.avatar
      },
      expert: {
        id: booking.expertId._id,
        name: `${booking.expertId.firstName || ''} ${booking.expertId.lastName || ''}`.trim(),
        email: booking.expertId.email,
        avatar: booking.expertId.avatar
      },
      scheduledAt: booking.scheduledAt,
      endTime: booking.endTime,
      duration: booking.duration,
      sessionType: booking.sessionType,
      totalAmount: booking.totalAmount,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      topic: booking.topic,
      description: booking.description,
      meetingUrl: booking.meetingUrl,
      meetingId: booking.meetingId,
      cancelledBy: booking.cancelledBy,
      cancelledAt: booking.cancelledAt,
      cancellationReason: booking.cancellationReason
    };

    res.json({
      success: true,
      data: {
        booking: bookingData
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

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, description } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found.'
      });
    }

    // Check if user has access to this booking
    if (booking.clientId.toString() !== req.user._id.toString() && 
        booking.expertId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Access denied.'
      });
    }

    // Only allow updates if booking is pending or confirmed
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        error: 'Cannot update booking in current status.'
      });
    }

    const updateData = {};
    if (topic !== undefined) updateData.topic = topic;
    if (description !== undefined) updateData.description = description;

    const updatedBooking = await Booking.updateById(id, updateData);

    res.json({
      success: true,
      message: 'Booking updated successfully.',
      data: {
        booking: {
          id: updatedBooking._id,
          bookingId: updatedBooking.bookingId,
          topic: updatedBooking.topic,
          description: updatedBooking.description,
          status: updatedBooking.status
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

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found.'
      });
    }

    // Check if user has access to this booking
    if (booking.clientId.toString() !== req.user._id.toString() && 
        booking.expertId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Access denied.'
      });
    }

    // Only allow cancellation if booking is pending or confirmed
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel booking in current status.'
      });
    }

    // Determine who is cancelling
    const cancelledBy = booking.clientId.toString() === req.user._id.toString() ? 'client' : 'expert';

    const updateData = {
      status: 'cancelled',
      cancelledBy: cancelledBy,
      cancelledAt: new Date(),
      cancellationReason: reason || ''
    };

    const updatedBooking = await Booking.updateById(id, updateData);

    res.json({
      success: true,
      message: 'Booking cancelled successfully.',
      data: {
        booking: {
          id: updatedBooking._id,
          bookingId: updatedBooking.bookingId,
          status: updatedBooking.status,
          cancelledBy: updatedBooking.cancelledBy,
          cancelledAt: updatedBooking.cancelledAt,
          cancellationReason: updatedBooking.cancellationReason
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

// Get upcoming bookings
exports.getUpcomingBookings = async (req, res) => {
  try {
    const { role = 'client', limit = 10 } = req.query;

    const bookings = await Booking.findUpcoming(req.user._id, role);

    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      bookingId: booking.bookingId,
      client: {
        id: booking.clientId._id,
        name: `${booking.clientId.firstName || ''} ${booking.clientId.lastName || ''}`.trim(),
        email: booking.clientId.email,
        avatar: booking.clientId.avatar
      },
      expert: {
        id: booking.expertId._id,
        name: `${booking.expertId.firstName || ''} ${booking.expertId.lastName || ''}`.trim(),
        email: booking.expertId.email,
        avatar: booking.expertId.avatar
      },
      scheduledAt: booking.scheduledAt,
      endTime: booking.endTime,
      duration: booking.duration,
      sessionType: booking.sessionType,
      topic: booking.topic
    }));

    res.json({
      success: true,
      data: {
        bookings: formattedBookings
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

// Get past bookings
exports.getPastBookings = async (req, res) => {
  try {
    const { role = 'client', limit = 20, page = 1 } = req.query;

    const bookings = await Booking.findPast(req.user._id, role);

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedBookings = bookings.slice(skip, skip + parseInt(limit));

    const formattedBookings = paginatedBookings.map(booking => ({
      id: booking._id,
      bookingId: booking.bookingId,
      client: {
        id: booking.clientId._id,
        name: `${booking.clientId.firstName || ''} ${booking.clientId.lastName || ''}`.trim(),
        email: booking.clientId.email,
        avatar: booking.clientId.avatar
      },
      expert: {
        id: booking.expertId._id,
        name: `${booking.expertId.firstName || ''} ${booking.expertId.lastName || ''}`.trim(),
        email: booking.expertId.email,
        avatar: booking.expertId.avatar
      },
      scheduledAt: booking.scheduledAt,
      endTime: booking.endTime,
      duration: booking.duration,
      sessionType: booking.sessionType,
      status: booking.status,
      topic: booking.topic
    }));

    res.json({
      success: true,
      data: {
        bookings: formattedBookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(bookings.length / parseInt(limit)),
          totalBookings: bookings.length,
          hasNext: skip + paginatedBookings.length < bookings.length,
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