const express = require('express');
const router = express.Router();
const chargers = require('../data/chargers');

router.get('/', (req, res) => {
  res.json(chargers);
});

router.get('/:id', (req, res) => {
  const charger = chargers.find((item) => item.id === req.params.id);

  if (!charger) {
    return res.status(404).json({ error: 'Charger not found' });
  }

  res.json(charger);
});

module.exports = router;
