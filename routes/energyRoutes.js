const express = require('express');
const router = express.Router();
const { analyzeEnergy } = require('../controllers/energyController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/analyze', verifyToken, analyzeEnergy);

module.exports = router;
