import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createApp } from './src/app.js';
import { startScheduler } from './src/jobs/pingScheduler.js';

dotenv.config();

const app = createApp();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    startScheduler();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1);
  }
};

start();
