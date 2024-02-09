import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Checkbox, Heading } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { Line } from 'rc-progress';
import CountUp from 'react-countup';

const ViewGoals = ({ name, setName }) => {
  const [updateGoal, setUpdateGoal] = useState(true);
  const [description, setDescription] = useState('');
  const [goalName, setGoalName] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [success, setOnSuccess] = useState('');
  const [selectedGoal, setSelectedGoal] = useState([]);

  const {
    data,
    isFetching,
    error: err,
    isError,
    refetch,
    remove,
  } = useQuery({
    queryKey: ['goal'],
    queryFn: () => fetchGoal(name),
  });

  const fetchGoal = async name => {
    return await axios.get(
      `https://fitness-tracker-603w.onrender.com/goals/${name}`
    );
  };

  const logout = () => {
    setName('');
    localStorage.setItem('name', JSON.stringify(''));
    remove();
  };

  const handleGoalChange = useCallback(e => {
    e.preventDefault();
    const goalName = e.target.value;
    setGoalName(goalName);
  }, []);

  const handleDescChange = useCallback(e => {
    e.preventDefault();
    const description = e.target.value;
    setDescription(description);
  }, []);

  const goalUpdate = goal => {
    setGoalName(goal.goalName);
    setDescription(goal.description);
    setId(goal._id);
    setUpdateGoal(false);
    setOnSuccess('');
    setError('');
  };

  const handleSubmit = async () => {
    if (goalName == '') {
      setOnSuccess('');
      setError('Name of Goal cannot be Empty');
      return;
    }

    await axios
      .post(`https://fitness-tracker-603w.onrender.com/goals/update/${id}`, {
        username: name,
        goalName,
        description,
        date: new Date().toISOString(),
      })
      .then(res => {
        res;
        setError('');
        setOnSuccess('Goal Updated');
        refetch();
        setUpdateGoal(true);
        setGoalName('');
        setDescription('');
      })
      .catch(err => {
        setOnSuccess('');
        setError('Name of Goal cannot be Empty');
        err;
      });
  };

  const goalDelete = id => {
    axios
      .delete(`https://fitness-tracker-603w.onrender.com/goals/${id}`)
      .then(res => {
        res;
        setError('');
        setOnSuccess('Goal Deleted');
        setGoalName('');
        setDescription('');
        refetch();
        setSelectedGoal(prev => {
          return prev.filter(fid => {
            return fid !== id;
          });
        });
        setSelectedGoal([]);
      })
      .catch(err => {
        setError('Internal Server Error');
        setOnSuccess('');
        err;
      });
  };

  const handleCheckbox = (val, id) => {
    let isSelected = val;
    if (isSelected) {
      setSelectedGoal([...selectedGoal, id]);
    } else {
      setSelectedGoal(prev => {
        return prev.filter(fid => {
          return fid !== id;
        });
      });
    }
  };

  const markComplete = () => {
    selectedGoal.map(goal_id => {
      axios
        .delete(`https://fitness-tracker-603w.onrender.com/goals/${goal_id}`)
        .then(res => {
          res;
          setError('');
          setOnSuccess('Goal Deleted');
          setGoalName('');
          setDescription('');
          refetch();
          setSelectedGoal(prev => {
            return prev.filter(fid => {
              return fid !== id;
            });
          });
          setSelectedGoal([]);
        })
        .catch(err => {
          setError('Internal Server Error');
          setOnSuccess('');
          err;
        });
    });
  };

  return (
    <>
      {data?.data?.length == 0 ? (
        <>
          <p className="text-lg mb-2">No Goals Found, Add Some Goals</p>
        </>
      ) : (
        <div className="flex flex-col gap-2 p-5 border-2 border-sky-200 rounded-lg mb-2">
          <label className="text-lg mb-2" htmlFor="goalName">
            Update Goal Name
          </label>
          <input
            className="px-4 py-1 rounded-md mb-2"
            disabled={updateGoal}
            type="text"
            name="goalName"
            value={goalName}
            id="goalName"
            onChange={handleGoalChange}
          />
          <label className="text-lg mb-2" htmlFor="description">
            Update Description (Optional)
          </label>
          <input
            className="px-4 py-1 rounded-md mb-2"
            disabled={updateGoal}
            type="text"
            name="description"
            value={description}
            id="description"
            onChange={handleDescChange}
          />
          <Button
            className="font-semibold text-lg py-5 mt-2 hover:cursor-pointer"
            disabled={updateGoal}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {success && <p className="mb-1">{success}</p>}
          {error && <p className="mb-1">{error}</p>}
        </div>
      )}
      {data?.data.length > 0 && (
        <Heading as="h2" className="mb-2">
          Goal Log (Click Below to Edit)
        </Heading>
      )}
      {isError && <p className="text-lg">{err}</p>}
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        data?.data?.length > 0 && (
          <ul>
            {data?.data?.map(goal => {
              return (
                <li key={goal._id}>
                  <div className="flex flex-row justify-between mb-4">
                    <div className="flex flex-row">
                      <Checkbox
                        className="bg-sky-200 py-4 px-2"
                        checked={selectedGoal?.includes(goal._id)}
                        onCheckedChange={e => handleCheckbox(e, goal._id)}
                      />
                      <p className="text-lg font-semibold ml-2 py-1 px-2 capitalize">
                        {goal.goalName}
                      </p>
                      <p className="text-lg font-semibold py-1 px-2 capitalize">
                        {goal?.description && <span>-{goal?.description}</span>}
                      </p>
                    </div>
                    <div className="flex flex-row gap-3">
                      <Button
                        className="font-semibold text-lg py-5 mb-2 bg-green-300 hover:bg-green-200 hover:cursor-pointer"
                        onClick={() => goalUpdate(goal)}
                      >
                        Update
                      </Button>
                      <Button
                        className="font-semibold text-lg py-5 mb-2 bg-red-500 hover:bg-red-200 hover:cursor-pointer"
                        onClick={() => goalDelete(goal._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
            {
              <div className="flex flex-col">
                <hr className="m-4" />
                <CountUp
                  className="flex text-3xl font-semibold justify-start"
                  start={(
                    (1 - selectedGoal?.length / data?.data?.length) *
                    100
                  ).toFixed()}
                  end={(
                    (selectedGoal?.length / data?.data?.length) *
                    100
                  ).toFixed()}
                  duration={1.5}
                  suffix="%"
                />
                <Line
                  className="mb-5"
                  percent={(
                    (selectedGoal?.length / data?.data?.length) *
                    100
                  ).toFixed()}
                  strokeWidth={4}
                  trailWidth={2}
                  strokeColor="#7ce2fe"
                  strokeLinecap="round"
                />
                <hr className="mt-3 mb-6" />
                {((selectedGoal?.length / data?.data?.length) * 100).toFixed() >
                0 ? (
                  <Button
                    className="font-semibold text-lg py-5 mb-4 hover:bg-sky-200 hover:cursor-pointer"
                    onClick={markComplete}
                  >
                    Mark as Complete
                  </Button>
                ) : (
                  ''
                )}
              </div>
            }
          </ul>
        )
      )}
      <div className="flex flex-row gap-3 mb-10">
        <Link className="btn" to="/workout">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            Add Workouts
          </Button>
        </Link>
        <Link className="btn" to="/fetch">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            View Activity Logs
          </Button>
        </Link>
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
    </>
  );
};

export default ViewGoals;
