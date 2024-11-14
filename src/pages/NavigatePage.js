import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, IconButton, TextField, Button } from '@mui/material';
import { GoogleMap, LoadScript, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocation } from 'react-router-dom'; // to get user's location
import devices from '../data/devicesData'; // Your devices data

const NavigatePage = () => {
  const [quantities, setQuantities] = useState(devices.reduce((acc, device) => {
    acc[device.Name] = 0;
    return acc;
  }, {}));
  
  const [collectors, setCollectors] = useState([]); // State for storing nearby e-waste collectors
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  
  // Google Maps API and Geolocation Setup
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Add your API key here
    libraries: ['places'], // Include places library for geolocation
  });
  
  // Getting user's geolocation using browser API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        findNearbyCollectors(latitude, longitude); // Fetch nearby collectors
      });
    }
  }, []);
  
  const findNearbyCollectors = (latitude, longitude) => {
    // Example: You would call a backend service to fetch nearby e-waste collectors
    // For now, we'll use static data for nearby collectors
    const nearbyCollectors = [
      { name: 'Collector 1', lat: latitude + 0.01, lng: longitude + 0.01 },
      { name: 'Collector 2', lat: latitude - 0.01, lng: longitude - 0.01 },
    ];
    setCollectors(nearbyCollectors);
  };

  const handleQuantityChange = (deviceName, change) => {
    const newQuantity = Math.max(0, quantities[deviceName] + change); // Prevent negative values
    setQuantities({
      ...quantities,
      [deviceName]: newQuantity,
    });

    // Set the selected device when quantity is updated
    if (newQuantity > 0) {
      setSelectedDevice(deviceName);
    } else {
      setSelectedDevice(null); // Deselect if quantity becomes 0
    }
  };

  const calculateTotal = () => {
    let totalWeight = 0;
    let totalCO2 = 0;
    devices.forEach((device) => {
      const deviceQuantity = quantities[device.Name];
      const deviceWeight = device.weight * deviceQuantity / 1000; // Convert to kg
      totalWeight += deviceWeight;
      totalCO2 += deviceWeight * 0.9; // CO2 savings per kg
    });
    return { totalWeight, totalCO2 };
  };

  const { totalWeight, totalCO2 } = calculateTotal();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        E-Waste Recycling Calculator
      </Typography>

      {/* Map and Collectors Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Find Nearby E-Waste Collectors
        </Typography>
        {isLoaded && userLocation && (
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={userLocation}
              zoom={14}
            >
              {/* Display user's location */}
              <Marker position={userLocation} label="You" />
              
              {/* Display nearby e-waste collectors */}
              {collectors.map((collector, index) => (
                <Marker key={index} position={{ lat: collector.lat, lng: collector.lng }} label={collector.name}>
                  <InfoWindow>
                    <Typography variant="body2">{collector.name}</Typography>
                  </InfoWindow>
                </Marker>
              ))}
            </GoogleMap>
          </LoadScript>
        )}
      </Box>

      {/* Device Quantity Section */}
      <Typography variant="h6" gutterBottom>
        Select Devices for Recycling
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={3} key={device.Name}>
            <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                {device.Name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => handleQuantityChange(device.Name, -1)} sx={{ backgroundColor: 'white', borderRadius: '50%' }}>
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={quantities[device.Name]}
                  onChange={(e) => handleQuantityChange(device.Name, parseInt(e.target.value) || 0)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 60, textAlign: 'center' }}
                />
                <IconButton onClick={() => handleQuantityChange(device.Name, 1)} sx={{ backgroundColor: 'white', borderRadius: '50%' }}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Total CO2 and Weight */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">
          Total E-Waste Collected: {totalWeight.toFixed(2)} kg
        </Typography>
        <Typography variant="h6">
          CO2 Saved: {totalCO2.toFixed(2)} kg
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
          Confirm and Get Coupons
        </Button>
      </Box>
    </Box>
  );
};

export default NavigatePage;
