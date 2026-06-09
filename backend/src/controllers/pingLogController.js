// src/controllers/pingLogController.js
import PingLog from '../models/PingLog.js';
import Monitor from '../models/Monitor.js';

export const getLogsForMonitor = async (req, res) => {
  try {
    // First verify the monitor belongs to the requesting user
    // Without this check, any authenticated user could read anyone's logs
    const monitor = await Monitor.findOne({
      _id: req.params.monitorId,
      userId: req.user.id,
    });

    if (!monitor) {
      return res.status(404).json({ message: 'Monitor not found' });
    }

    const limit = parseInt(req.query.limit) || 60;

    const logs = await PingLog.find({ monitorId: req.params.monitorId })
      .sort({ createdAt: -1 })
      .limit(limit);

    // Reverse so the chart reads oldest → newest left to right
    res.json(logs.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};