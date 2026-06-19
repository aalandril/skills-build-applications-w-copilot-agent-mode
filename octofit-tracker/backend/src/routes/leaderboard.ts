import express from 'express';
import LeaderboardEntryModel from '../models/leaderboard.ts';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find().sort({ score: -1 }).lean();
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const entry = await LeaderboardEntryModel.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create leaderboard entry.' });
  }
});

export default router;
