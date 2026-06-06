// src/jobs/pingScheduler.js
import cron from 'node-cron';
import Monitor from '../models/Monitor.js';
import PingLog from '../models/PingLog.js';
import { pingUrl } from '../services/pingService.js';
import { sendDownAlert } from '../services/alertService.js';

const checkMonitor = async (monitor) => {
  // 1. Ping the URL
  const result = await pingUrl(monitor.url);

  // 2. Save every ping result to the database
  await PingLog.create({
    monitorId: monitor._id,
    isUp:         result.isUp,
    statusCode:   result.statusCode,
    responseTime: result.responseTime,
    errorMessage: result.errorMessage,
  });

  // 3. Status-flip detection — only alert when it CHANGES
  const previousLog = await PingLog.findOne(
    { monitorId: monitor._id },
    null,
    { sort: { createdAt: -1 }, skip: 1 } // second-to-last log
  );

  const justWentDown = !result.isUp && previousLog?.isUp === true;
  const justCameBack = result.isUp  && previousLog?.isUp === false;

  if (justWentDown && monitor.alertEmail) {
    await sendDownAlert(monitor.name, monitor.url, monitor.alertEmail);
  }

  if (justCameBack) {
    console.log(`[RECOVERED] ${monitor.name} is back up`);
  }
};

export const startScheduler = () => {
  // '* * * * *' = every 1 minute
  // Format: second minute hour day month weekday
  cron.schedule('* * * * *', async () => {
    console.log('[Scheduler] Running ping cycle...');
    try {
      const monitors = await Monitor.find({ isActive: true });
      // Run all pings concurrently — Promise.all fires them at the same time
      await Promise.all(monitors.map(checkMonitor));
    } catch (error) {
      console.error('[Scheduler] Cycle error:', error.message);
    }
  });
  console.log('[Scheduler] Started — pinging every minute');
};