import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import Auth from '../utils/auth';
import { useMutation, useQuery, useLazyQuery, gql } from '@apollo/client';
import { UPDATE_LOCATION } from '../utils/mutations';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import breadMarker from '../assets/bread.svg';

const Map = () => {
  const navigate = useNavigate();
  const [sendLocation] = useMutation(UPDATE_LOCATION);
  const apiKey = import.meta.env.VITE_API_KEY;

  const [center, setCenter] = useState({ lat: 5.6219868, lng: -0.23223 });
  const [locations, setLocations] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [friends, setFriends] = useState([]);
  const [friendProfiles, setFriendProfiles] = useState({});
  const [currentFriendIndex, setCurrentFriendIndex] = useState(0);

  const [getFriendProfile] = useLazyQuery(QUERY_SINGLE_PROFILE, {
    onCompleted: (data) => {
      console.log('Friend profile data received:', data);
      setFriendProfiles(prev => ({ ...prev, [data.profile._id]: data.profile }));
      // Fetch next friend profile after current one is received
      if (currentFriendIndex < friends.length - 1) {
        setCurrentFriendIndex(currentFriendIndex + 1);
      }
    },
    fetchPolicy: 'network-only'
  });

  const profile = Auth.getProfile();
  const profileId = profile?.data?._id;
  if (!profileId) {
    console.error('No profileId found. User might not be logged in properly.');
  } else {
    console.log(`Fetching profile for ID: ${profileId}`);
  }

  const { loading, error, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
    skip: !profileId,
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (!Auth.loggedIn()) {
      console.log('User not logged in');
      navigate('/login');
      return;
    }

    if (loading) {
      console.log('Loading profile...');
      return;
    }

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    if (data) {
      console.log('Query data received:', data);
      setCurrentUser(data.profile?.name || '');
      setCurrentId(data.profile?._id || '');
      setFriends(data.profile?.friends || []);
    } else {
      console.log('No data received from the query');
    }

    const updateLocation = async (currentUser, position) => {
      let location = { lat: position.coords.latitude, lng: position.coords.longitude };
      setCenter(location);
      setLocations(prevLocations => ({
        ...prevLocations,
        [currentUser]: location
      }));

      if (!currentId) {
        console.error('Current ID is not set. Cannot update location.');
        return;
      }

      try {
        const response = await sendLocation({
          variables: {
            profileId: currentId,
            lat: location.lat,
            lon: location.lng
          }
        });

        if (response.data) {
          console.log("Location updated successfully", response.data);
        }
      } catch (error) {
        console.error("Error updating location", error);
      }
    };

    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => updateLocation(currentUser, position),
          error => {
            console.error(`Geolocation Error: ${error.code} - ${error.message}`);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
      if (data && data.profile && data.profile.friends) {
        setFriends(data.profile.friends);
        if (data.profile.friends.length > 0) {
          setCurrentFriendIndex(0);
        }
      }
    };


    getLocation();
    const locationUpdateInterval = setInterval(getLocation, 5000);

    return () => clearInterval(locationUpdateInterval);
  }, [loading, error, data, sendLocation, currentId, currentUser, getFriendProfile]);
  useEffect(() => {
    if (friends.length > 0 && currentFriendIndex < friends.length) {
      const friendId = friends[currentFriendIndex];
      console.log('Fetching profile for friend:', friendId);
      getFriendProfile({ variables: { profileId: friendId } });
    }
  }, [friends, currentFriendIndex, getFriendProfile]);

  const Marker = ({ title, lat, lng, isFriend }) => {
    return (
      <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)', textAlign: 'center' }}>
        <img
          style={{ height: isFriend ? '35px' : '50px' }}
          src={isFriend ? breadMarker : breadMarker}
          alt={title}
        />
        <h3>{title}</h3>
      </div>
    );
  };

  let locationMarker = (
    <Marker
      key={currentId}
      title={`${currentUser}'s location`}
      lat={locations[currentUser]?.lat}
      lng={locations[currentUser]?.lng}
    />
  );

  return (
    <div>
      <div className='maps_container' style={{ position: "relative", width: "100%", height: "400px", marginTop: "5rem" }}>
        <GoogleMap
          bootstrapURLKeys={{ key: apiKey }}
          center={center}
          zoom={18}
          style={{ width: '100%', height: '400px' }}
        >
          {locationMarker}
          {Object.values(friendProfiles).map(friend => (
            <Marker
              key={friend._id}
              title={`${friend.name}'s location`}
              lat={friend.location?.lat}
              lng={friend.location?.lon}
              isFriend={true}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
