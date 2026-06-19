import './style.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl, codespaceName } from './api.ts';

function Home() {
  return (
    <section>
      <h2>OctoFit Tracker Dashboard</h2>
      <p>Use the navigation links to view users, teams, activities, leaderboard, and workouts.</p>
      <div className="alert alert-info">
        <p className="mb-1">
          API base URL: <strong>{apiBaseUrl}</strong>
        </p>
        <p className="mb-0">
          {codespaceName
            ? 'Using Codespaces API host.'
            : 'VITE_CODESPACE_NAME is not defined. Falling back to localhost API. Define VITE_CODESPACE_NAME in .env.local to use Codespaces.'}
        </p>
      </div>
      <div className="alert alert-secondary mt-3">
        <strong>Note:</strong> Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code> when running in GitHub Codespaces.
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">React 19 presentation tier for the multi-tier application.</p>
        </header>

        <nav className="mb-4">
          <div className="nav nav-tabs">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/teams">
              Teams
            </NavLink>
            <NavLink className="nav-link" to="/activities">
              Activities
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="nav-link" to="/workouts">
              Workouts
            </NavLink>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
