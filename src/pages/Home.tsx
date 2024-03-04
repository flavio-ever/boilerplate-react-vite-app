import { UseAuth } from '../auth/UseAuth';

const Home: React.FC = () => {
  const { user } = UseAuth();

  return (
    <>
      <div>
        <h1>{user?.name}</h1>
        <h1>{user?.role}</h1>
      </div>
    </>
  );
};

export default Home;
