import express from 'express';
import TeamModel from '../models/team.ts';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await TeamModel.find().lean();
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load teams.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const team = await TeamModel.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create team.' });
  }
});

export default router;
