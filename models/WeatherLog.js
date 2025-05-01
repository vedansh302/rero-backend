const mongoose = require('mongoose');

const weatherLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: {
    city: String,
    lat: Number,
    lon: Number
  },
  timestamp: { type: Date, default: Date.now },
  data: {
    temp: Number,
    windSpeed: Number,
    humidity: Number,
    solarIrradiance: Number
  }
});

module.exports = mongoose.model('WeatherLog', weatherLogSchema);
