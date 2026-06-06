import express from 'express';
import { getMonitors, createMonitor, deleteMonitor } from '../controllers/monitorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // every route below this line requires a valid JWT

router.get('/',     getMonitors);
router.post('/',    createMonitor);
router.delete('/:id', deleteMonitor);

export default router;