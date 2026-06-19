import express from 'express';
import ActivityModel from '../models/activity.ts';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await ActivityModel.find().lean();
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load activities.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = await ActivityModel.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity.' });
  }
});

export default router;
