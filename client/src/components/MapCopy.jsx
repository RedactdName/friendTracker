import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import axios from 'axios';
import Auth from '../utils/auth';

const apiKey = import.meta.env.VITE_API_KEY;
console.log(`This is the Api key: ${apiKey}`);

const zoomLevel = 18
const mapStyles = { width: '100%', height: '400px' };
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "400px",
  marginTop: "5rem"
};
const markerStyle = { height: '50px', width: '50px', marginTop: '-50px' };
const imgStyle = { height: '75%' };

const Marker = ({ title, lat, lng }) => (
  <div style={markerStyle}>
    <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/v1545236805/map-marker_hfipes.png" alt={title} />
    <h3>{title}</h3>
  </div>
);

const Map = () => {
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
    const username = profile.data.name;
    const id = profile.data._id
    setCurrentUser(username);

    const updateLocation = (currentUser, position) => {
      let location = { lat: position.coords.latitude, lng: position.coords.longitude };
      setCenter(location);
      setLocations(prevLocations => ({
        ...prevLocations,
        [currentUser]: location
      }));

      axios.post("http://localhost:3001/update-location", {
        username: username,
        location: location
      })
      .then(res => {
        if (res.status === 200) {
          console.log("Location updated successfully");
        }
        setLocations(location)
      })
      .catch(err => console.error(err));
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
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation(); // Initial location fetch

    const locationUpdateInterval = setInterval(getLocation, 5000); // Update location every 5 seconds

    return () => {
      clearInterval(locationUpdateInterval); // Cleanup interval on component unmount
    };
  }, [currentUser]);

  let locationMarker =  (
    <Marker
      key={currentId}
      title= {`${currentUser}'s location`}
      lat={locations.lat}
      lng={locations.lng}
    />
  );

  return (
    <div>
      <div className='maps_container' style={containerStyle}>
        <GoogleMap
          style={mapStyles}
          bootstrapURLKeys={{ key: apiKey }}
          containerStyle={containerStyle}
          center={center}
          zoom={zoomLevel}
        >
          {locationMarker}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
