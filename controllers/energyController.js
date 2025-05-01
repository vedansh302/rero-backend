const axios = require('axios');
const Recommendation = require('../models/Recommendation');

const analyzeEnergy = async (req, res) => {
  const { location, consumption, area, userId } = req.body;

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const weatherData = weatherResponse.data;

    // ✅ Add this validation check immediately after getting weather data
    if (!weatherData || !weatherData.main) {
      return res.status(400).json({ message: "Invalid weather data received" });
    }

    const temp = weatherData.main.temp;
    const wind_speed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const condition = weatherData.weather[0].description.includes('clear') ? 'clear' :
      weatherData.weather[0].description.includes('cloud') ? 'cloudy' : 'rainy';

    const mlRes = await axios.post(`${process.env.FLASK_API_URL}/predict`, {
      location,
      weather: { temp, wind_speed, humidity, condition },
      consumption,
      area
    });

    const recommendation = await Recommendation.create({
      userId,
      input: { consumption, area, location },
      weatherData: { temp, wind_speed, humidity, condition },
      mlResponse: mlRes.data,
      selectedOption: mlRes.data.best_option
    });

    res.json({
      bestOption: mlRes.data.best_option,
      scores: mlRes.data.scores,
      weather: { temp, wind_speed, humidity, condition }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during analysis", error: error.message });
  }
};

module.exports = { analyzeEnergy };
