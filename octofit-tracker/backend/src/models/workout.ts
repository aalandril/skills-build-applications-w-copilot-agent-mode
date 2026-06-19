import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const WorkoutModel = model('Workout', workoutSchema);
export default WorkoutModel;
