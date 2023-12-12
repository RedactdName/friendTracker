import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import Auth from '../utils/auth';
import { useMutation, gql } from '@apollo/client';
import { UPDATE_LOCATION } from '../utils/mutations';

const Map = () => {
  const [sendLocation] = useMutation(UPDATE_LOCATION);
  const apiKey = import.meta.env.VITE_API_KEY;

  const [center, setCenter] = useState({ lat: 5.6219868, lng: -0.23223 });
  const [locations, setLocations] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    if (!Auth.loggedIn()) {
      console.log('User not logged in');
      return;
    }

    const profile = Auth.getProfile();
    setCurrentUser(profile.data.name);
    setCurrentId(profile.data._id);

    const updateLocation = async (currentUser, position) => {
      let location = { lat: position.coords.latitude, lng: position.coords.longitude };
      setCenter(location);
      setLocations(prevLocations => ({
        ...prevLocations,
        [currentUser]: location
      }));

      try {
        const response = await sendLocation({
          variables: {
            profileId:profile.data._id,
            lat: location.lat,
            lon: location.lng 
          }
        });
    

        if (response.data) {
          console.log("Location updated successfully ", response.data);
        }
      } catch (error) {
        console.error("Error updating location", error); 
        console.log(JSON.stringify(error, null, 2));

      }
    };

    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            updateLocation(currentUser, position);
          },
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
    };

    getLocation();

    const locationUpdateInterval = setInterval(getLocation, 5000);

    return () => {
      clearInterval(locationUpdateInterval);
    };
  }, [currentUser, sendLocation, currentId]);

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
      lat={locations.lat}
      lng={locations.lng}
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
