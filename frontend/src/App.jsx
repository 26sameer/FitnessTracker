import { Navigate, useNavigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import axios from 'axios';
import Workout from './pages/Workout';
import { useState } from 'react';
import Fetch from './pages/Fetch';
import Goal from './pages/Goal';
import Progress from './pages/Progress';

function App() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = e => {
    e.preventDefault();
    const username = e.target.value;
    setName(username);
    localStorage.setItem('name', JSON.stringify(username));
  };

  const handleSubmit = async name => {
    await axios
      .post('https://fitness-tracker-603w.onrender.com/users/add', {
        username: name,
      })
      .then(res => {
        res;
        setError('');
        navigate('/workout');
      })
      .catch(err => {
        if (err.response.data.includes('E11000')) {
          setError('');
          navigate('/workout');
        } else if (err.response.data.includes('ValidationError')) {
          setError('Username is Required');
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <div className="container mx-auto text-center max-w-max font-display">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              name={name}
              error={error}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/workout"
          element={<Workout name={name} setName={setName} />}
        />
        <Route
          path="/fetch"
          element={<Fetch name={name} setName={setName} />}
        />
        <Route
          path="/progress"
          element={<Progress name={name} setName={setName} />}
        />
        <Route path="/goal" element={<Goal name={name} setName={setName} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
