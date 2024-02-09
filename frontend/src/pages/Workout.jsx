import { Heading } from '@radix-ui/themes';
import AddWorkout from '../components/AddWorkout';

const Workout = ({ name, setName }) => {
  return (
    <div className="container mx-auto text-center max-w-max font-display">
      <div className="m-2">
        <Heading as="h1" className="text-amber-400">
          Welcome {name?.toUpperCase()}
        </Heading>
        <Heading as="h3">Please Add Your Workouts</Heading>
      </div>
      <AddWorkout name={name} setName={setName} />
    </div>
  );
};

export default Workout;
