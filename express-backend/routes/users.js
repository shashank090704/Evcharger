const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * GET /api/users/greeting
 * Equivalent of Spring's UserControllers.greeting()
 */
router.get('/greeting', (req, res) => {
  res.send('Hello World!!');
});

/**
 * POST /api/users/user
 * Equivalent of Spring's UserControllers.saveUser()
 * Saves (or updates) a user document and returns the userId
 */
router.post('/user', async (req, res) => {
  try {
    const user = await User.create(req.body);
    // Mirror: return userService.saveUser(user) → userId
    res.status(200).json(user._id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * PUT /api/users/user/:id
 * Equivalent of Spring's UserControllers.updateUser()
 * Updates brand/model fields only (mirrors the Spring partial-update logic)
 */
router.put('/user/:id', async (req, res) => {
  try {
    const { brand, model } = req.body;

    // Mirror: userService.findById(id)
    const user = await User.findById(req.params.id);

    if (!user) {
      // Mirror: return new ResponseEntity<>("User Not found", HttpStatus.NOT_FOUND)
      return res.status(404).send('User Not found');
    }

    // Mirror: if(user.getBrand()!= null) dbUser.setBrand(...)
    if (brand != null) user.brand = brand;
    if (model != null) user.model = model;

    await user.save();

    // Mirror: return new ResponseEntity<>("User Updated", HttpStatus.OK)
    res.status(200).send('User Updated');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
