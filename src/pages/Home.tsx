//import { UseAuth } from '../auth/UseAuth';
import DashboardTemplate from '../templates/dashboard/DashboardTemplate';

const Home: React.FC = () => {
  //const { user } = UseAuth();

  return (
    <>
      <DashboardTemplate />
      {/* <div>
        <h1>{user?.name}</h1>
        <h1>{user?.role}</h1>
      </div> */}
    </>
  );
};

export default Home;
