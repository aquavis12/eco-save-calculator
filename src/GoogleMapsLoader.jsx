import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsLoader = ({ children }) => {
  const googleMapsApiKey = process.env.GOOGLE_API_KEY; // Correctly prefixed environment variable

  if (!googleMapsApiKey) {
    console.error('Google Maps API Key is missing');
    return null;
  }

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={['places']} // Load the places library for Autocomplete functionality
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsLoader;
