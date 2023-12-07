import React, { useState, useEffect } from 'react';
import GoogleMap from 'google-map-react';
import axios from 'axios';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

// const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
const apiKey = "AIzaSyCkYVcXLFaRDxpnHGmxVNNqgyXdXzZ8vE0";
console.log(`This is the Api key${apiKey}`);

const mapStyles = { width: '100px', height: '400px', marginTop: '-50px' };
const containerStyle = {
  position: "relative",
  width: "50%",
  height: "400px",
  marginTop: "5rem"
};
const markerStyle = { height: '50px', width: '50px', marginTop: '-50px' };
const imgStyle = { height: '75%' };

const Marker = ({ title, lat, lng }) => (
  <div style={markerStyle}>
    <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
    <h3>{title}</h3>
  </div>
);

const Map = () => {
  const [center, setCenter] = useState({ lat: 5.6219868, lng: -0.23223 });
  const [locations, setLocations] = useState({});
  const [currentUser, setCurrentUser] = useState('');

  const { data, loading, error } = useQuery(QUERY_ME);

  useEffect(() => {
    console.log(`query is this ${data}`); // Log the data from the QUERY_ME query

    let watcher;
    if ("geolocation" in navigator) {
      watcher = navigator.geolocation.watchPosition(
        position => {
          let location = { lat: position.coords.latitude, lng: position.coords.longitude };
          setCenter(location);
          setLocations(prevLocations => ({
            ...prevLocations,
            [currentUser]: location
          }));

          axios.post("http://localhost:3001/update-location", {
            username: currentUser,
            location: location
          })
          .then(res => {
            if (res.status === 200) {
              console.log("Location updated successfully");
            }
          })
          .catch(err => console.error(err));
        },
        error => {
          console.error(`Geolocation Error: ${error.code} - ${error.message}`);
          alert(`Geolocation Error: ${error.code} - ${error.message}`);
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

    // Cleanup function
    return () => {
      if (watcher) {
        navigator.geolocation.clearWatch(watcher);
      }
    };
  }, [currentUser]); // Dependency array includes currentUser

  let locationMarkers = Object.keys(locations).map((username, id) => (
    <Marker
      key={id}
      title={username === currentUser ? 'My location' : `${username}'s location`}
      lat={locations[username].lat}
      lng={locations[username].lng}
    />
  ));

  return (
    <div>
      <div className='maps_container' style={containerStyle}>
        <GoogleMap
          style={mapStyles}
          bootstrapURLKeys={{ key: apiKey }}
          containerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          {locationMarkers}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
