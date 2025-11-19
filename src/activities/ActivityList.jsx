import { useState } from "react";
import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityList({ activities, syncActivities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ExerciseListItem
          key={activity.id}
          activity={activity}
          syncActivities={syncActivities}
        />
      ))}
    </ul>
  );
}

function ExerciseListItem({ activity, syncActivities }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      syncActivities();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <li>
      <p>{activity.name}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
