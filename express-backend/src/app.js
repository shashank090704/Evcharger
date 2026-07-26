const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const chargersRouter = require('../routes/chargers');           // legacy static route (kept)
const authRouter = require('../routes/auth');
const usersRouter = require('../routes/users');
const chargingStationRouter = require('../routes/chargingStation');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Match Spring's server.port=5000

app.use(cors());
app.use(express.json());

// ── MongoDB connection ──────────────────────────────────────────────────────
// Mirror: spring.data.mongodb.uri=mongodb://localhost:27017/boot
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/boot';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected:', MONGO_URI))
  .catch((err) => console.error('MongoDB connection error:', err));

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'EvoCharge Express Backend' });
});

// ── Auth routes (Spring: AuthController) ───────────────────────────────────
// POST /api/auth/signUp   → Spring: POST /signUp
// POST /api/auth/signIn   → Spring: POST /signIn
app.use('/api/auth', authRouter);

// ── User routes (Spring: UserControllers) ──────────────────────────────────
// GET  /api/users/greeting  → Spring: GET /greeting
// POST /api/users/user      → Spring: POST /user
// PUT  /api/users/user/:id  → Spring: PUT /user/{id}
app.use('/api/users', usersRouter);

// ── ChargingStation routes (Spring: ChargingStationController) ─────────────
// POST /api/chargingStation/post      → Spring: POST /chargingStation/post
// GET  /api/chargingStation/allList   → Spring: GET /chargingStation/allList
app.use('/api/chargingStation', chargingStationRouter);

// ── Legacy static charger routes (kept for backward compat) ────────────────
app.use('/api/chargers', chargersRouter);

// ── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
