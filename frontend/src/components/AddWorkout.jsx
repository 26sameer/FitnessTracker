import { useCallback, useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddWorkout = ({ name, setName }) => {
  const navigate = useNavigate();

  const [duration, setDuration] = useState(0);
  const [wname, setWname] = useState('');
  const [error, setError] = useState('');
  const [success, setOnSuccess] = useState('');

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem('name'));
    if ((name == null) | (name == '')) {
      navigate('/');
    } else {
      setName(name);
    }
  }, [navigate, setName]);

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
      .post('http://localhost:4000/activities/add', {
        username: name,
        description: wname,
        duration,
        date: new Date().toISOString(),
      })
      .then(res => {
        res;
        setError('');
        setWname('');
        setDuration(0);
        setOnSuccess('Workout Added');
      })
      .catch(err => {
        setOnSuccess('');
        setError('Name of Workout cannot be Empty');
        err;
      });
  };

  const handleChange = useCallback(e => {
    e.preventDefault();
    const wname = e.target.value;
    setWname(wname);
  }, []);

  const update = opr => {
    opr == '-'
      ? duration == 0
        ? setDuration(duration)
        : setDuration(duration - 10)
      : setDuration(duration + 10);
  };

  const logout = () => {
    setName('');
    localStorage.setItem('name', JSON.stringify(''));
  };

  return (
    <div className="flex flex-col gap-2 p-5 border-2 border-sky-200 rounded-lg">
      <label className="text-lg" htmlFor="wname">
        Name of the Workout
      </label>
      <input
        className="px-4 py-1 rounded-md bg-gray-800"
        type="text"
        name="wname"
        value={wname}
        id="wname"
        onChange={handleChange}
      />
      <label className="text-lg">Duration of Workout</label>
      <div className="flex flex-row justify-between text-center mb-2">
        <Button
          className="text-xl font-bold py-6 px-6 bg-cyan-200 text-gray-800 rounded-md hover:bg-sky-200 hover:cursor-pointer"
          onClick={() => update('-')}
        >
          -
        </Button>
        <p className="text-2xl font-semibold py-2  px-8 rounded-md">
          {duration} minutes
        </p>
        <Button
          className="text-xl font-bold py-6 px-6 bg-cyan-200 text-gray-800 rounded-md hover:bg-sky-200 hover:cursor-pointer"
          onClick={() => update('+')}
        >
          +
        </Button>
      </div>
      <Button
        className="font-semibold text-lg py-5 mb-2 hover:bg-sky-200 hover:cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {success && <p className="mb-2">{success}</p>}
      {error && <p className="mb-2">{error}</p>}
      <div className="flex flex-row gap-3">
        <Link className="btn" to="/fetch">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            View Activity Log
          </Button>
        </Link>
        <Link className="btn" to="/goal">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            Add Goals
          </Button>
        </Link>
        <Link className="btn" to="/progress">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            Track Progress
          </Button>
        </Link>
        <Link className="btn" to="/" onClick={logout}>
          <Button className="font-semibold text-lg py-5 bg-red-500 hover:bg-red-200 hover:cursor-pointer">
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AddWorkout;
