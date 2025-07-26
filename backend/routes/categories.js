const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

// Public routes - no authentication required
router.get('/', expertController.getCategories);
router.get('/:id/experts', expertController.getExpertsByCategory);

module.exports = router; 