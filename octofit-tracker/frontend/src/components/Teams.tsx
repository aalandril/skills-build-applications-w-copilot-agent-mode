import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeCollectionResponse } from '../api.ts';
import type { Team } from '../types.ts';

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const endpointPath = '/api/teams/';

  useEffect(() => {
    fetch(getApiEndpoint(endpointPath))
      .then((response) => response.json())
      .then((data) => {
        setTeams(normalizeCollectionResponse<Team>(data));
      })
      .catch(() => {
        setError('Unable to load teams from the API.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && teams.length === 0 && <p>No teams found.</p>}
      {!loading && !error && teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>{team.members.length}</td>
                  <td>{new Date(team.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Teams;
