import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeCollectionResponse } from '../api.ts';
import type { LeaderboardEntry } from '../types.ts';

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getApiEndpoint('leaderboard'))
      .then((response) => response.json())
      .then((data) => {
        setEntries(normalizeCollectionResponse<LeaderboardEntry>(data));
      })
      .catch(() => {
        setError('Unable to load leaderboard from the API.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && <p>No leaderboard entries found.</p>}
      {!loading && !error && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.rank}</td>
                  <td>{entry.user}</td>
                  <td>{entry.score}</td>
                  <td>{new Date(entry.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
