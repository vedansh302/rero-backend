const User = require('../models/User');
const Recommendation = require('../models/Recommendation');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recommendations', error: err.message });
  }
};
