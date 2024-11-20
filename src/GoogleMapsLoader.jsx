import React, { memo } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from './config';
// Separate the libraries array to avoid recreating on each render
const libraries = ['places'];

const GoogleMapsLoader = ({ children }) => {
  // Get API key from environment variable
  const googleMapsApiKey =GOOGLE_API_KEY;

  if (!googleMapsApiKey) {
    console.error('Google Maps API key is not defined');
    return null;
  }

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={libraries}
      loadingElement={<div>Loading...</div>}
    >
      {children}
    </LoadScript>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(GoogleMapsLoader);
