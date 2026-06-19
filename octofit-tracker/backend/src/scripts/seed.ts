import mongoose from 'mongoose';
import UserModel from '../models/user.ts';
import TeamModel from '../models/team.ts';
import ActivityModel from '../models/activity.ts';
import LeaderboardEntryModel from '../models/leaderboard.ts';
import WorkoutModel from '../models/workout.ts';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);

  try {
    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      { name: 'Ava Chen', email: 'ava.chen@example.com' },
      { name: 'Noah Patel', email: 'noah.patel@example.com' },
      { name: 'Mia Garcia', email: 'mia.garcia@example.com' },
    ]);

    const workouts = await WorkoutModel.create([
      {
        title: 'Morning Power Circuit',
        description: 'High-intensity circuit workout with bodyweight exercises.',
        durationMinutes: 30,
        difficulty: 'Intermediate',
      },
      {
        title: 'Endurance Run',
        description: 'Steady paced run designed to improve cardio endurance.',
        durationMinutes: 45,
        difficulty: 'Advanced',
      },
      {
        title: 'Recovery Yoga Flow',
        description: 'Gentle flexibility and mobility routine for post-workout recovery.',
        durationMinutes: 25,
        difficulty: 'Beginner',
      },
    ]);

    const teams = await TeamModel.create([
      {
        name: 'OctoFit Sprinters',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Endurance Alliance',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    const activities = await ActivityModel.create([
      {
        user: users[0]._id,
        type: 'Power Circuit',
        durationMinutes: 30,
        caloriesBurned: 320,
      },
      {
        user: users[1]._id,
        type: 'Endurance Run',
        durationMinutes: 45,
        caloriesBurned: 540,
      },
      {
        user: users[2]._id,
        type: 'Recovery Yoga',
        durationMinutes: 25,
        caloriesBurned: 140,
      },
    ]);

    const leaderboard = await LeaderboardEntryModel.create([
      { user: users[1]._id, score: 1160, rank: 1 },
      { user: users[0]._id, score: 1045, rank: 2 },
      { user: users[2]._id, score: 980, rank: 3 },
    ]);

    console.log('Inserted sample data:');
    console.log(`  users: ${users.length}`);
    console.log(`  teams: ${teams.length}`);
    console.log(`  workouts: ${workouts.length}`);
    console.log(`  activities: ${activities.length}`);
    console.log(`  leaderboard entries: ${leaderboard.length}`);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
