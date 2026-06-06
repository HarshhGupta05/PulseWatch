import mongoose from "mongoose";

const pingLogSchema = new mongoose.Schema({
  monitorId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Monitor', required: true },
  isUp:         { type: Boolean, required: true },
  statusCode:   { type: Number },
  responseTime: { type: Number }, 
  errorMessage: { type: String },
}, { timestamps: true });

// INDEX: speeds up "give me logs for monitorId X, sorted by date"
pingLogSchema.index({ monitorId: 1, createdAt: -1 });

export default mongoose.model('PingLog', pingLogSchema);