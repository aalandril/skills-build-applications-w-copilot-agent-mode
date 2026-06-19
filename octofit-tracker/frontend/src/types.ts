export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Team {
  _id: string;
  name: string;
  members: string[];
  createdAt: string;
}

export interface Activity {
  _id: string;
  user: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  recordedAt: string;
}

export interface LeaderboardEntry {
  _id: string;
  user: string;
  score: number;
  rank: number;
  updatedAt: string;
}

export interface Workout {
  _id: string;
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: string;
  createdAt: string;
}
