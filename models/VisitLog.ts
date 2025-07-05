import mongoose from 'mongoose';

export interface IVisitLog extends mongoose.Document {
  ip: string;
  userAgent?: string;
  date: Date; // The date of the visit (set to midnight for uniqueness)
  visitedAt: Date; // The actual timestamp of the visit
}

const VisitLogSchema = new mongoose.Schema<IVisitLog>({
  ip: { type: String, required: true },
  userAgent: { type: String },
  date: { type: Date, required: true },
  visitedAt: { type: Date, required: true },
}, {
  timestamps: true,
});

// Ensure uniqueness for IP+date (one visit per IP per day)
VisitLogSchema.index({ ip: 1, date: 1 }, { unique: true });

export default mongoose.models.VisitLog || mongoose.model<IVisitLog>('VisitLog', VisitLogSchema); 