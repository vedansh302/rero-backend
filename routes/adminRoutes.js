const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');

// Optional: Add role check middleware if needed later
router.get('/users', verifyToken, adminController.getAllUsers);
router.get('/recommendations', verifyToken, adminController.getAllRecommendations);

module.exports = router;
