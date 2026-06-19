import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeCollectionResponse } from '../api.ts';
import type { Workout } from '../types.ts';

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const endpointPath = '/api/workouts/';

  useEffect(() => {
    fetch(getApiEndpoint(endpointPath))
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(normalizeCollectionResponse<Workout>(data));
      })
      .catch(() => {
        setError('Unable to load workouts from the API.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && workouts.length === 0 && <p>No workouts found.</p>}
      {!loading && !error && workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id}>
                  <td>{workout.title}</td>
                  <td>{workout.difficulty}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
