const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  input: {
    consumption: Number,
    area: Number,
    location: String
  },
  weatherData: Object,
  mlResponse: Object,
  selectedOption: String
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
