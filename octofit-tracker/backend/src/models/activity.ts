import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  recordedAt: { type: Date, default: () => new Date() },
});

const ActivityModel = model('Activity', activitySchema);
export default ActivityModel;
