import { useQuery } from '@apollo/client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';
import DucksInAPark from '../components/images/DucksInAPark.png'

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        
          {loading ? (
            <div>Loading...</div>
          ) : (
            < img src= {DucksInAPark} alt="Rubber Ducks set in a serene park background" className='center img-fluid'/>
          )}
      </div>
    </main>
  );
};

export default Home;
