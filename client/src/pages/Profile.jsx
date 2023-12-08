import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import SkillsList from '../components/SkillsList';
// import SkillForm from '../components/SkillForm';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL, execute the `QUERY_ME` query for the logged-in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  const profile = Auth.getProfile();

  // If not logged in, redirect to home page or login page
  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to personal profile page if username is yours
  if (profile.data._id === profileId) {
    return <Navigate to="/me" replace />;
  }

  // Check if there is profile data
  if (!profile?.data) {
    return (
      <h4>
        There was an error loading the profile. Please try again.
      </h4>
    );
  }

  return (
    <div>
      <h2 className="card-header">
        {profileId ? `${profile.data.name}'s` : 'Your'} friends have endorsed these skills...
      </h2>

      {/* {profile.skills?.length > 0 && (
        <SkillsList
          skills={profile.skills}
          isLoggedInUser={!profileId && true}
        />
      )} */}

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        {/* <SkillForm profileId={profile.data._id} /> */}
      </div>
    </div>
  );
};

export default Profile;
