import { Heading } from '@radix-ui/themes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddGoal from '../components/AddGoal';

const Goal = ({ name, setName }) => {
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
      <Heading
        as="h2"
        className="capitalize m-2 text-amber-400 hover:text-amber-200 hover:cursor-pointer"
      >
        Add Your Goals {name}
      </Heading>
      <AddGoal name={name} setName={setName} />
      {/* {name && <ViewGoals name={name} setName={setName} />} */}
    </>
  );
};

export default Goal;
