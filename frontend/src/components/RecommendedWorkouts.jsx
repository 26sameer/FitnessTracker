import { Button, Card, Heading } from '@radix-ui/themes';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const RecommendedWorkouts = ({ data }) => {
  const API_KEY = '2XhItXTn2XFwFu5QFQXtSw==grca2NNu85zYOA3S';

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const {
    data: newData,
    isFetching,
    error: err,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['recommended'],
    queryFn: () =>
      fetchWorkout(
        data?.data[randomNumber(0, data?.data?.length)]?.description
      ),
    refetchOnMount: false,
    enabled: false,
  });

  const fetchWorkout = async name => {
    return axios.get(
      `https://api.api-ninjas.com/v1/exercises?name=${name}&offset=5`,
      {
        headers: { 'X-Api-Key': API_KEY },
      }
    );
  };

  return (
    <div className="flex flex-col">
      <Heading as="h3" className="mb-2">
        Recommended Workouts for You
      </Heading>
      <Button
        disabled={isFetching}
        className="font-semibold text-lg py-5 bg-violet-400 mb-3 hover:bg-violet-200 hover:cursor-pointer"
        onClick={refetch}
      >
        Fetch Recommended Workouts
      </Button>
      {isError && <p>{err}</p>}
      {isFetching ? (
        <p className="text-lg m-2">Loading...</p>
      ) : newData?.data.length == 0 ? (
        <p className="text-lg capitalize">
          Add More Exercises, so that we can suggest <br /> some good workouts
          which you like.
        </p>
      ) : (
        newData?.data &&
        newData?.data?.map((workout, index) => {
          return (
            <div key={index}>
              <br />
              <Card size="1" style={{ width: 475 }}>
                <div className="">
                  <p className="text-lg font-semibold ">{workout.name}</p>
                  <div className="flex justify-between">
                    <p className="text-md capitalize">
                      <mark className="bg-violet-400 text-violet-400 rounded-sm">
                        _
                      </mark>{' '}
                      Difficulty- {workout.difficulty}
                    </p>
                    <p className="text-md capitalize">
                      <mark className="bg-violet-400 text-violet-400 rounded-sm">
                        _
                      </mark>{' '}
                      Muscle- {workout.muscle}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecommendedWorkouts;
