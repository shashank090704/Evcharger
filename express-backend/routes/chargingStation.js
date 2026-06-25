const express = require('express');
const router = express.Router();
const ChargingStation = require('../models/ChargingStation');

/**
 * POST /api/chargingStation/post
 * Equivalent of Spring's ChargingStationController.postStation()
 * Saves the station and returns the stationId
 */
router.post('/post', async (req, res) => {
  try {
    const station = await ChargingStation.create(req.body);
    // Mirror: return chargingStationService.postStation() → stationId
    res.status(200).json(station.stationId ?? station._id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * GET /api/chargingStation/allList
 * Equivalent of Spring's ChargingStationController.getStationList()
 * Returns full list from MongoDB
 */
router.get('/allList', async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    // Mirror: return chargingStationService.getStationList()
    res.status(200).json(stations.map((s) => s.toJSON()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
