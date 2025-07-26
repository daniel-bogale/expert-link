const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all available expert categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *             example:
 *               success: true
 *               data:
 *                 - id: "507f1f77bcf86cd799439011"
 *                   name: "Technology"
 *                   description: "Technology and software development"
 *                   icon: "💻"
 *                   expertCount: 45
 *                 - id: "507f1f77bcf86cd799439012"
 *                   name: "Business"
 *                   description: "Business consulting and strategy"
 *                   icon: "💼"
 *                   expertCount: 32
 *                 - id: "507f1f77bcf86cd799439013"
 *                   name: "Health"
 *                   description: "Healthcare and wellness"
 *                   icon: "🏥"
 *                   expertCount: 28
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', expertController.getCategories);

/**
 * @swagger
 * /categories/{id}/experts:
 *   get:
 *     summary: Get experts by category
 *     description: Retrieve all experts within a specific category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of experts per page
 *       - in: query
 *         name: minRate
 *         schema:
 *           type: number
 *         description: Minimum hourly rate
 *       - in: query
 *         name: maxRate
 *         schema:
 *           type: number
 *         description: Maximum hourly rate
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         description: Minimum rating
 *     responses:
 *       200:
 *         description: Experts in category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Expert'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 45
 *                     pages:
 *                       type: integer
 *                       example: 5
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id/experts', expertController.getExpertsByCategory);

module.exports = router; 