import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const Home = () => {

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to Tech Matchup!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Home Page</h2>
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to create a new matchup?</h2>
      </div>
    </div>
  );
};

export default Home;
