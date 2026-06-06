import authRoutes    from './routes/authRoutes.js';
import monitorRoutes from './routes/monitorRoutes.js';
import pingLogRoutes from './routes/pingLogRoutes.js';

app.use('/api/auth',     authRoutes);
app.use('/api/monitors', monitorRoutes);
app.use('/api/pinglogs', pingLogRoutes);