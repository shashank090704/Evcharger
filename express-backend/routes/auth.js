const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * POST /api/auth/signUp
 * Equivalent of Spring's AuthController.registerUser()
 * - Checks if email already in use → 400
 * - Hashes password with bcrypt (11 rounds, same as Spring's BCryptPasswordEncoder(11))
 * - Returns { userId }
 */
router.post('/signUp', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Mirror: userRepository.existsByEmail(signupRequest.getEmail())
    const exists = await User.exists({ email });
    if (exists) {
      // Mirror: throw new EmailAlreadyUseException("Email is already in use!")
      return res.status(400).json({
        statusCode: 400,
        timestamp: new Date().toISOString(),
        message: 'Email is already in use!',
        description: 'The email address you provided is already associated with an existing account. Please choose a different email address or log in to your existing account.',
      });
    }

    // Mirror: passwordEncoder.encode(signupRequest.getPassword()) — 11 rounds
    const hashedPassword = await bcrypt.hash(password, 11);

    const user = await User.create({ firstName, lastName, email, password: hashedPassword });

    // Mirror: return ResponseEntity.ok(new SignUpResponse(userId))
    res.status(200).json({ userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

/**
 * POST /api/auth/signIn
 * Equivalent of Spring's AuthController.signInUser()
 * - Finds user by email → 400 if not found
 * - Verifies bcrypt password → 400 if wrong
 * - Returns full user object (mirrors SignInResponse wrapping User)
 */
router.post('/signIn', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mirror: userRepository.findByEmail(signInRequest.getEmail())
    const user = await User.findOne({ email });
    if (!user) {
      // Mirror: return ResponseEntity.badRequest().body("Error:User not exits")
      return res.status(400).json({ error: 'Error:User not exits' });
    }

    // Mirror: passwordEncoder.matches(signInRequest.getPassword(), user.getPassword())
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      // Mirror: return ResponseEntity.badRequest().body("Error:Login Unsuccessful")
      return res.status(400).json({ error: 'Error:Login Unsuccessful' });
    }

    // Mirror: return ResponseEntity.ok(new SignInResponse(user))
    res.status(200).json({ user: user.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
