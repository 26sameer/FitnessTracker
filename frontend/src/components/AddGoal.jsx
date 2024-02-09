import { useCallback, useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddGoal = ({ name, setName }) => {
  const navigate = useNavigate();

  const [gname, setGname] = useState('');
  const [desc, setDesc] = useState('');
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
    if (gname == '') {
      setOnSuccess('');
      setError('Name of Goal cannot be Empty');
      return;
    }

    await axios
      .post('https://fitness-tracker-603w.onrender.com/goals/add', {
        username: name,
        goalName: gname,
        description: desc,
        date: new Date().toISOString(),
      })
      .then(res => {
        res;
        setGname('');
        setDesc('');
        setError('');
        setOnSuccess('Goal Added');
      })
      .catch(err => {
        setOnSuccess('');
        setError('Name of Goal cannot be Empty');
        err;
      });
  };

  const handleGnameChange = useCallback(e => {
    e.preventDefault();
    const gname = e.target.value;
    setGname(gname);
  }, []);

  const handleDescChange = useCallback(e => {
    e.preventDefault();
    const desc = e.target.value;
    setDesc(desc);
  }, []);

  const logout = () => {
    setName('');
    localStorage.setItem('name', JSON.stringify(''));
  };

  return (
    <div className="flex flex-col gap-2 p-5 border-2 border-sky-200 rounded-lg">
      <label className="text-lg" htmlFor="gname">
        Goal Name
      </label>
      <input
        className="px-4 py-1 rounded-md bg-gray-800"
        type="text"
        name="gname"
        value={gname}
        id="gname"
        onChange={handleGnameChange}
      />
      <label className="text-lg">Description (Optional)</label>
      <input
        className="px-4 py-1 mb-2 rounded-md bg-gray-800"
        type="text"
        name="desc"
        value={desc}
        id="desc"
        onChange={handleDescChange}
      />
      <Button
        className="font-semibold text-lg py-5 mb-2 hover:bg-sky-200 hover:cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {success && <p className="mb-2">{success}</p>}
      {error && <p className="mb-2">{error}</p>}
      <div className="flex gap-3">
        <Link className="btn" to="/workout">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            Add Workout
          </Button>
        </Link>
        <Link className="btn" to="/fetch">
          <Button className="font-semibold text-lg py-5 bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
            View Activity Log
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

export default AddGoal;
