import { Heading } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewGoals from '../components/ViewGoals';

const Progress = ({ name, setName }) => {
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
    <>
      <Heading as="h2" className="capitalize m-2 mt-4 text-amber-400">
        Lets Track Your Progress {name}
      </Heading>
      {name && <ViewGoals name={name} setName={setName} />}
    </>
  );
};

export default Progress;
