import { useAuth } from '../auth/UseAuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

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