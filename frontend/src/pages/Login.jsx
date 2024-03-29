import { Button, Heading } from '@radix-ui/themes';

const Login = ({ name, handleSubmit, handleChange, error, loading }) => {
  return (
    <div>
      <div>
        <div className="m-2">
          <Heading as="h1" className="text-amber-400">
            Fitness Tracker App
          </Heading>
          <Heading as="h2">Register / Login</Heading>
          <p className="capitalize m-2">
            Either use the test username <br /> or create a new one
          </p>
          <p className="text-xl mb-2">
            username: <mark className="p-1">test</mark>
          </p>
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
            className="font-semibold text-lg hover:cursor-pointer"
            onClick={() => handleSubmit(name)}
            disabled={loading}
            style={loading ? { cursor: 'not-allowed' } : {}}
          >
            {loading ? (
              <span>
                Connecting <span className="animate-pulse">...</span>
              </span>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </div>
        {!!error && <p className="text-md m-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
