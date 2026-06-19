import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

const LeaderboardEntryModel = model('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntryModel;
