import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GoogleMapsLoader from '../GoogleMapsLoader'; // Import the new loader
import { generateClient } from "aws-amplify/data";

const client = generateClient();

const googleMapsLibraries = ['places'];

const NavigatePage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    selectedDevices: '', // Default to empty object
    updatedQuantities:0,
    totalWeight: 0,
    totalLeadWeight: 0,
    totalPlasticWeight: 0,
    totalCopperWeight: 0,
    totalAluminumWeight: 0,
    ecoPoints: 0,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  

  // Extract props from location state with defaults if state is missing
  const {
    selectedDevices = '',
    updatedQuantities=0,
    totalWeight = 0,
    totalLeadWeight = 0,
    totalPlasticWeight = 0,
    totalCopperWeight = 0,
    totalAluminumWeight = 0,
    ecoPoints = 0,
  } = location.state || {}; // Fallback to empty object if location state is undefined

  useEffect(() => {
    // Log details for debugging purposes
    if (updatedQuantities) console.log('Quantities:', updatedQuantities);
    if (selectedDevices) console.log('Selected Devices:', selectedDevices);
    if (totalWeight || totalLeadWeight || totalPlasticWeight || totalCopperWeight || totalAluminumWeight) {
      console.log('Total Weights:', {
        totalWeight,
        totalLeadWeight,
        totalPlasticWeight,
        totalCopperWeight,
        totalAluminumWeight,
      });
    }
    console.log('Eco Points:', ecoPoints);
  }, [updatedQuantities, selectedDevices, totalWeight, totalLeadWeight, totalPlasticWeight, totalCopperWeight, totalAluminumWeight, ecoPoints]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const quantities = Object.entries(updatedQuantities).map(([device, quantity]) => ({
    device,
    quantity,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form data submitted:', formData);
  
      try {
        const { data: existingSubmission } = await client.models.FormSubmission.get({
          email: formData.email,
          phoneNumber: formData.phoneNumber,
        });
      
        if (existingSubmission) {
          // If a matching submission exists, update ecoPoints
          const existingEcoPoints = existingSubmission.ecoPoints || 0;
          const updatedEcoPoints = existingEcoPoints + ecoPoints;
      
          // Update the submission with new ecoPoints
          await client.models.FormSubmission.update({
            email: formData.email,
          phoneNumber: formData.phoneNumber,
            ecoPoints: updatedEcoPoints,
            timestamp: new Date().toISOString(),
          });
      
          console.log('Form data updated with new ecoPoints:', updatedEcoPoints);
          alert('Your details have been updated successfully.');}
      else {
      // Create a new form submission
      await client.models.FormSubmission.create({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        ecoPoints: ecoPoints, // Ensure this is the correct field name in the schema
        timestamp: new Date().toISOString(),
      });
  
      console.log('Form data saved:', { formData });
      alert('Your details have been submitted successfully.');
    }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('There was an error submitting your form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GoogleMapsLoader libraries={googleMapsLibraries}>
<Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
<Box sx={{ }}>
  {/* Conditionally render the entire Selected Quantities and Total Weights section */}
  {updatedQuantities && selectedDevices && (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
        E-Waste Quantities and Totals
      </Typography>

      {/* Parent Box wrapping both Selected Quantities and Total Weights */}
      <Box sx={{ padding: 2, backgroundColor: '#f4f6f8', borderRadius: '8px', boxShadow: 3, marginTop: 4 }}>
        
        {/* Selected Quantities Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5"sx={{ marginBottom: 2 , fontWeight: 'bold',}}>Selected Quantities</Typography>
          <Grid container spacing={2}>
            {Object.entries(updatedQuantities)
              .filter(([device, quantity]) => quantity > 0) // Only include devices with non-zero quantities
              .map(([device, quantity]) => (
                <Grid item xs={12} sm={6} key={device}>
                  <Typography variant="body1">
                    {device}: {quantity}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Box>

        {/* Total Weights Section */}
        {(totalWeight || totalLeadWeight || totalPlasticWeight || totalCopperWeight || totalAluminumWeight || ecoPoints) > 0 && (
          <Box sx={{ paddingTop: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333'}}>
              Total Weights
            </Typography>
            <Grid container spacing={2}>
              {totalWeight > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Total Weight: {totalWeight} g</Typography>
                </Grid>
              )}
              {totalLeadWeight > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Lead: {totalLeadWeight} g</Typography>
                </Grid>
              )}
              {totalPlasticWeight > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Plastic: {totalPlasticWeight} g</Typography>
                </Grid>
              )}
              {totalCopperWeight > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Copper: {totalCopperWeight} g</Typography>
                </Grid>
              )}
              {totalAluminumWeight > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Aluminum: {totalAluminumWeight} g</Typography>
                </Grid>
              )}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Eco Points Earned: {ecoPoints}</Typography>
                </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )}

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
                Enter Your Information
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      fullWidth
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
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
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 4 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </GoogleMapsLoader>
  );
};

export default NavigatePage;
