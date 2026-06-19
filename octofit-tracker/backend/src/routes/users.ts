import express from 'express';
import UserModel from '../models/user.ts';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find().lean();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user.' });
  }
});

export default router;
