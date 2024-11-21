import React, { memo, useState, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

// Separate the libraries array to avoid recreating on each render
const libraries = ['places'];

const GoogleMapsLoader = ({ children }) => {
  // Get API key from environment variable
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  if (!googleMapsApiKey) {
    console.error('Google Maps API key is not defined');
    return null;
  }

  const [map, setMap] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Define positions for HiTech City, Manikonda, and KPHB
  const locations = [
    { lat: 17.4475, lng: 78.3805, title: 'HiTech City' },
    { lat: 17.4017, lng: 78.3736, title: 'Manikonda' },
    { lat: 17.4816, lng: 78.3871, title: 'KPHB' },
  ];

  // Check if google maps API has loaded
  useEffect(() => {
    if (window.google && window.google.maps) {
      setGoogleLoaded(true);
    }
  }, []);

  // Add markers once Google Maps is loaded
  useEffect(() => {
    if (googleLoaded && map) {
      async function addMarkers() {
        try {
          const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');
          
          console.log('Marker library loaded, adding markers');

          // Clear existing markers
          map.markers = [];

          // Create new markers using AdvancedMarkerElement
          locations.forEach((location) => {
            const marker = new AdvancedMarkerElement({
              map,
              position: { lat: location.lat, lng: location.lng },
              title: location.title,
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png', // Green marker icon
              }
            });
            map.markers.push(marker);
            console.log(`Marker added at ${location.title} with position: ${location.lat}, ${location.lng}`);
          });
        } catch (error) {
          console.error('Error adding markers:', error);
        }
      }

      addMarkers();
    }
  }, [googleLoaded, map]);

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={libraries}
      loadingElement={<div>Loading...</div>}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={{ height: '50vh', width: '100%' }}
        zoom={12}
        center={locations[0]} // Center the map on HiTech City
        onLoad={(mapInstance) => {
          console.log('Map loaded successfully');
          setMap(mapInstance);
        }}
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(GoogleMapsLoader);
