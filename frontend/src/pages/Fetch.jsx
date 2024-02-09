import { Heading } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewWorkouts from '../components/ViewWorkouts';

const Fetch = ({ name, setName }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem('name'));
    if ((name == null) | (name == '')) {
      navigate('/');
    } else {
      setName(name);
    }
  }, [navigate, setName]);

  return (
    <div className="container mx-auto text-center max-w-max font-display m-2">
      <Heading as="h2" className="capitalize text-amber-400">
        Here are your Activities {name}
      </Heading>
      {name && <ViewWorkouts name={name} setName={setName} />}
    </div>
  );
};

export default Fetch;
