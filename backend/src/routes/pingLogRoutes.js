// src/routes/pingLogRoutes.js
import express from 'express';
import { getLogsForMonitor } from '../controllers/pingLogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:monitorId', protect, getLogsForMonitor);

export default router;