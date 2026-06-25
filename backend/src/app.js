import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import monitorRoutes from './routes/monitorRoutes.js';
import pingLogRoutes from './routes/pingLogRoutes.js';

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/monitors', monitorRoutes);
  app.use('/api/pinglogs', pingLogRoutes);

  return app;
};
