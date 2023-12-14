import { useQuery } from '@apollo/client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            < img src="../src/assets/DucksInAPark.png" alt="Rubber Ducks set in a serene park background" className='img-fluid mx-auto rounded h-25 d-inline-block'/>
            
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
