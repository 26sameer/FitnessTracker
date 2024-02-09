import { Button, Heading } from '@radix-ui/themes';

const Login = ({ name, handleSubmit, handleChange, error }) => {
  return (
    <div>
      <div>
        <div className="m-2">
          <Heading as="h1" className="text-amber-400">
            Fitness Tracker App
          </Heading>
          <Heading as="h2">Register / Login</Heading>
        </div>
        <div className="flex flex-col gap-2 p-5 border-2 border-sky-200 rounded-lg">
          <label className="text-lg" htmlFor="username">
            Enter Username
          </label>
          <input
            className="px-4 py-1 rounded-md mb-2 bg-gray-800"
            id="username"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <Button
            className="font-semibold text-lg hover:bg-sky-200 hover:cursor-pointer"
            onClick={() => handleSubmit(name)}
          >
            Submit
          </Button>
        </div>
        {!!error && <p className="text-md m-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
