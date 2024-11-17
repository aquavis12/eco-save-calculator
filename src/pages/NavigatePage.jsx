import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom'; // For location state (quantities, totals, ecoPoints)
import GoogleMapsLoader from '../GoogleMapsLoader'; // Import the new loader
const NavigatePage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: ''
  });
  const location = useLocation();
  const { quantities, totals, ecoPoints } = location.state || {}; // Destructure ecoPoints from location state

  // Getting user's geolocation using browser API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (quantities && totals) {
      console.log('Quantities:', quantities);
      console.log('Totals:', totals);
      console.log('Eco Points:', ecoPoints); // Log ecoPoints for debugging
    }
  }, [quantities, totals, ecoPoints]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <GoogleMapsLoader>
    <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      
      {/* Quantities and Totals Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
          E-Waste Quantities and Totals
        </Typography>

        {quantities && totals && (
          <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: '8px', boxShadow: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Selected Quantities</Typography>
            <Grid container spacing={2}>
              {Object.entries(quantities).map(([device, quantity]) => (
                <Grid item xs={12} sm={6} key={device}>
                  <Typography variant="body1">
                    {device}: {quantity}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>Total Weights</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Total Weight: {totals.totalWeight} g</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Lead: {totals.totalLeadWeight} g</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Plastic: {totals.totalPlasticWeight} g</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Copper: {totals.totalCopperWeight} g</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Aluminum: {totals.totalAluminumWeight} g</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Eco Points Earned: {totals.ecoPoints}</Typography>
              </Grid>
            </Grid>

            {/* Display ecoPoints from the location state */}
            {ecoPoints && (
              <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
                Eco Points from CO2 Progress Page: {ecoPoints} g
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Map Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
          Find Nearby E-Waste Collectors
        </Typography>
        {userLocation && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px', borderRadius: '8px' }}
            center={userLocation}
            zoom={14}
          >
            <Marker position={userLocation} label="You" />
          </GoogleMap>
        )}
      </Box>

      {/* User Information Form */}
      <Card sx={{ maxWidth: '100%', padding: 4, backgroundColor: '#fff', borderRadius: '8px', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '24px' }}>
            Your Information
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  sx={{ backgroundColor: '#f7f7f7' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  sx={{ backgroundColor: '#f7f7f7' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  sx={{ backgroundColor: '#f7f7f7' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  sx={{ backgroundColor: '#f7f7f7' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  sx={{ backgroundColor: '#f7f7f7' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  sx={{ backgroundColor: '#f7f7f7' }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ borderRadius: '30px', padding: '12px 30px', fontWeight: 'bold' }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
    </GoogleMapsLoader>
  );
};

export default NavigatePage;
