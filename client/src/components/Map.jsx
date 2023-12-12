import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import Auth from '../utils/auth';
import { useMutation, useQuery, gql } from '@apollo/client';
import { UPDATE_LOCATION } from '../utils/mutations';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';

const Map = () => {
  const [sendLocation] = useMutation(UPDATE_LOCATION);
  const apiKey = import.meta.env.VITE_API_KEY;

  const [center, setCenter] = useState({ lat: 5.6219868, lng: -0.23223 });
  const [locations, setLocations] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [friends, setFriends] = useState([]);

  // Extract profileId and check its validity
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
      if(data){
        setFriends(data.profile.friends)
        console.log(friends)
      }
      
    };

    getLocation();
    const locationUpdateInterval = setInterval(getLocation, 5000);

    return () => clearInterval(locationUpdateInterval);
  }, [loading, error, data, sendLocation, currentId, currentUser]);

  const Marker = ({ title, lat, lng }) => (
    <div style={{ height: '50px', width: '50px', marginTop: '-50px' }}>
      <img style={{ height: '75%' }} src="https://res.cloudinary.com/og-tech/image/upload/v1545236805/map-marker_hfipes.png" alt={title} />
      <h3>{title}</h3>
    </div>
  );

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
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
