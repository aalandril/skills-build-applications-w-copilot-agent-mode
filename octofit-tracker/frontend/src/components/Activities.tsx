import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeCollectionResponse } from '../api.ts';
import type { Activity } from '../types.ts';

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const endpointPath = '/api/activities/';

  useEffect(() => {
    fetch(getApiEndpoint(endpointPath))
      .then((response) => response.json())
      .then((data) => {
        setActivities(normalizeCollectionResponse<Activity>(data));
      })
      .catch(() => {
        setError('Unable to load activities from the API.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && activities.length === 0 && <p>No activities found.</p>}
      {!loading && !error && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.user}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.recordedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
