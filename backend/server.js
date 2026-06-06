// server.js — entry point
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { startScheduler } from './src/jobs/pingScheduler.js';
import authRoutes    from './src/routes/authRoutes.js';
import monitorRoutes from './src/routes/monitorRoutes.js';
import pingLogRoutes from './src/routes/pingLogRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth',     authRoutes);
app.use('/api/monitors', monitorRoutes);
app.use('/api/pinglogs', pingLogRoutes);

const start = async () => {
  try {
    // Step 1: connect to database FIRST
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Step 2: start scheduler AFTER DB is ready
    startScheduler();

    // Step 3: start HTTP server last
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1); // crash loudly — don't run in a broken state
  }
};

start();