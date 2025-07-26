const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

// Public routes - no authentication required
router.get('/', expertController.getExperts);
router.get('/search', expertController.searchExperts);
router.get('/:id', expertController.getExpertDetails);

module.exports = router; 