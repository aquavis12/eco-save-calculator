// GoogleMapsLoader.js
import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsLoader = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCKvGu08e8T26TiPih8JH-lyGUJcuKgILY" libraries={['places']}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapsLoader;
