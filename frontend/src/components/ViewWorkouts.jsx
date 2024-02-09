import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Heading } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import RecommendedWorkouts from './RecommendedWorkouts';

const ViewWorkouts = ({ name, setName }) => {
  const [updateWorkout, setUpdateWorkout] = useState(true);
  const [duration, setDuration] = useState(0);
  const [wname, setWname] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [success, setOnSuccess] = useState('');

  const {
    data,
    isFetching,
    error: err,
    isError,
    refetch,
    remove,
  } = useQuery({
    queryKey: ['workout'],
    queryFn: () => fetchWorkout(name),
  });

  const fetchWorkout = async name => {
    return await axios.get(`http://localhost:4000/activities/${name}`);
  };

  const logout = () => {
    setName('');
    localStorage.setItem('name', JSON.stringify(''));
    remove();
  };

  const handleChange = useCallback(e => {
    e.preventDefault();
    const wname = e.target.value;
    setWname(wname);
  }, []);

  const workoutUpdate = workout => {
    setWname(workout.description);
    setDuration(workout.duration);
    setId(workout._id);
    setUpdateWorkout(false);
    setOnSuccess('');
    setError('');
  };

  const handleSubmit = async () => {
    if (wname == '' && duration == 0) {
      setOnSuccess('');
      setError('Workout Name & Duration cannot be 0');
      return;
    } else if (wname == '') {
      setOnSuccess('');
      setError('Name of Workout cannot be Empty');
      return;
    } else if (duration == 0) {
      setOnSuccess('');
      setError('Duration Cannot be 0');
      return;
    }

    await axios
      .post(`http://localhost:4000/activities/update/${id}`, {
        username: name,
        description: wname,
        duration,
        date: new Date().toISOString(),
      })
      .then(res => {
        res;
        setError('');
        setOnSuccess('Workout Updated');
        refetch();
        setUpdateWorkout(true);
        setWname('');
        setDuration(0);
      })
      .catch(err => {
        setOnSuccess('');
        setError('Name of Workout cannot be Empty');
        err;
      });
  };

  const workoutDelete = id => {
    axios
      .delete(`http://localhost:4000/activities/${id}`)
      .then(res => {
        res;
        setError('');
        setOnSuccess('Workout Updated');
        refetch();
        setUpdateWorkout(true);
        setWname('');
        setDuration(0);
      })
      .catch(err => {
        err;
      });
  };

  const update = opr => {
    opr == '-'
      ? duration == 0
        ? setDuration(duration)
        : setDuration(duration - 10)
      : setDuration(duration + 10);
  };

  return (
    <>
      {data?.data?.length == 0 ? (
        <>
          <p className="m-2">No Workouts Found</p>
        </>
      ) : (
        <div className="flex flex-col gap-2 p-5 border-2 m-2 border-sky-200 rounded-lg">
          <label className="text-lg" htmlFor="wname">
            Update Workout
          </label>
          <input
            className="px-4 py-1 rounded-md"
            disabled={updateWorkout}
            type="text"
            name="wname"
            value={wname}
            id="wname"
            onChange={handleChange}
          />
          <label className="text-lg">Duration of Workout</label>
          <div className="flex flex-row justify-between text-center mb-2">
            <Button
              className="text-xl font-bold py-6 px-6 rounded-md hover:cursor-pointer"
              disabled={updateWorkout}
              onClick={() => update('-')}
            >
              -
            </Button>
            <p
              className="text-2xl font-semibold py-2 px-8 rounded-md"
              disabled={updateWorkout}
            >
              {duration} minutes
            </p>
            <Button
              className="text-xl font-bold py-6 px-6 rounded-md hover:cursor-pointer"
              disabled={updateWorkout}
              onClick={() => update('+')}
            >
              +
            </Button>
          </div>
          <Button
            className="font-semibold text-lg py-5 mb-2 hover:cursor-pointer"
            disabled={updateWorkout}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {success && <p className="mb-2">{success}</p>}
          {error && <p className="mb-2">{error}</p>}
          {isError && <p className="mb-2">{err}</p>}
        </div>
      )}

      {data?.data?.length > 0 && (
        <>
          <ul className="flex flex-col mb-2">
            <Heading as="h2" className="mb-2">
              Activity Log (Click Below to Edit)
            </Heading>
            {isFetching ? (
              <p className="text-lg">Loading...</p>
            ) : (
              data?.data?.map(workout => {
                return (
                  <li key={workout._id}>
                    <div className="flex flex-row gap-3 m-2 justify-between text-center">
                      <p className="text-lg">
                        <mark className="bg-sky-300 text-sky-300 rounded-sm ">
                          _
                        </mark>{' '}
                        {workout.description} - {workout.duration} minutes
                      </p>
                      <div className="flex flex-row gap-3">
                        <Button
                          className="font-semibold text-lg bg-green-300 hover:bg-green-200 hover:cursor-pointer"
                          onClick={() => workoutUpdate(workout)}
                        >
                          Update
                        </Button>
                        <Button
                          className="font-semibold text-lg bg-red-500 hover:bg-red-200 hover:cursor-pointer"
                          onClick={() => workoutDelete(workout._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </>
      )}
      <hr className="m-2 mb-4" />
      <div className="flex flex-row mb-3 gap-5 justify-between">
        <Link className="btn" to="/workout">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            Add Workouts
          </Button>
        </Link>
        <Link className="btn" to="/progress">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            Track Progress
          </Button>
        </Link>
      </div>
      <div className="flex flex-row gap-5 justify-between">
        <Link className="btn" to="/goal">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            Add Goals
          </Button>
        </Link>

        <Link className="btn" to="/" onClick={logout}>
          <Button className="font-semibold text-lg py-5 bg-red-500 hover:bg-red-200 hover:cursor-pointer">
            Logout
          </Button>
        </Link>
      </div>
      <hr className="mt-5 mb-4" />
      {data?.data?.length > 0 ? (
        <div className="flex flex-col">
          <RecommendedWorkouts data={data} />
        </div>
      ) : (
        <p className="text-lg">Add Workouts for Recommendations</p>
      )}
    </>
  );
};

export default ViewWorkouts;
