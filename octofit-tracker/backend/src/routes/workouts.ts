import express from 'express';
import WorkoutModel from '../models/workout.ts';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load workouts.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create workout.' });
  }
});

export default router;
