import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GoogleMapsLoader from '../GoogleMapsLoader'; // Import the new loader
import { generateClient } from "aws-amplify/data";


const client = generateClient();
const AWS = require('aws-sdk');

// Update AWS SDK configuration
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  region: process.env.REACT_APP_AWS_REGION,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

const locations = [
  { lat: 17.4475, lng: 78.3805, title: 'HiTech City' },
  { lat: 17.4017, lng: 78.3736, title: 'Manikonda' },
  { lat: 17.4816, lng: 78.3871, title: 'KPHB' },
];
const ses = new AWS.SES();
const emailSource = 'support@ewasterecycles.com'; 
const googleMapsLibraries = [locations];

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
    totalWeight: '',
    totalLeadWeight: 0,
    totalPlasticWeight: 0,
    totalCopperWeight: 0,
    totalAluminumWeight: 0,
    ecoPoints: 0,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eWasteCollectors, setEWasteCollectors] = useState([]); // This should be defined correctly

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
          // You can set a default location or handle error cases here
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
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
  }, [updatedQuantities, selectedDevices, totalWeight, totalLeadWeight, totalPlasticWeight, totalCopperWeight, totalAluminumWeight, ecoPoints]);

   // Validation for phone number to be exactly 10 digits (0-9)
   const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hasEwasteDetails = Object.values(updatedQuantities).some((quantity) => quantity > 0);
  const quantities = Object.entries(updatedQuantities).map(([device, quantity]) => ({
    device,
    quantity,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Final validation before submission
     if (!validatePhoneNumber(formData.phoneNumber)) {
      setPhoneError('Phone number must be exactly 10 digits (0-9).');
      return; // Stop form submission if the phone number is invalid
    }
     // Validate before submitting
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

          await client.models.EwasteData.create({
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            ecoPoints: ecoPoints,
            selectedDevices,
            updatedQuantities,
            totalWeight,
            totalLeadWeight,
            totalPlasticWeight,
            totalCopperWeight,
            totalAluminumWeight,
            timestamp: new Date().toISOString(),
          });  
      
          console.log('Form data updated with new ecoPoints:', updatedEcoPoints);
          alert('Your details have been updated successfully.');}
          navigate('/thanks');

          // Conditional check for selectedDevices and updatedQuantities
    if (!(selectedDevices && Object.values(updatedQuantities).some((quantity) => quantity > 0))) {
      console.log('No valid devices or quantities selected, skipping email...');
      return; // Prevent sending the email if no devices or quantities are selected
    }
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
        // Create a new device data entry
     await client.models.EwasteData.create({
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    ecoPoints: ecoPoints,
    selectedDevices,
    updatedQuantities,
    totalWeight,
    totalLeadWeight,
    totalPlasticWeight,
    totalCopperWeight,
    totalAluminumWeight,
    timestamp: new Date().toISOString(),
  });  
      console.log('Form data saved:', { formData });
      alert('Your details have been submitted successfully.');
  navigate('/thanks');
};

     // Send email via SNS
     const emailSubject = 'E-Waste Submission Details';
     const emailBody = `
Hello ${formData.name},

Thank you for submitting your e-waste details!

Selected Devices and Quantities:
${Object.entries(updatedQuantities).map(([device, quantity]) => `${device}: ${quantity}`).join('\n')}

Eco Points Earned: ${ecoPoints}
Total Weight: ${totalWeight} g
Lead: ${totalLeadWeight} g
Plastic: ${totalPlasticWeight} g
Copper: ${totalCopperWeight} g
Aluminum: ${totalAluminumWeight} g

Thank you for contributing to e-waste recycling! Our E-Waste Partner will reach out to you in 3-4 working days.

Best regards,
The E-Waste Collection Team
`;

     const sesParams = {
      Source: emailSource,
      Destination: {
        ToAddresses: [formData.email],
      },
      Message: {
        Subject: {
          Data: emailSubject,
        },
        Body: {
          Text: {
            Data: emailBody,
          },
        },
      },
    };

    await ses.sendEmail(sesParams).promise();
    console.log('Email sent successfully via SES.')

    } catch (error) {
      console.error('Error in saving data:', error);
      alert('There was an error submitting your form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                    {device}:{quantity}
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
               {ecoPoints > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Eco Points Earned: {ecoPoints}</Typography>
                </Grid>
               )}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )}
             <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
            Find Nearby E-Waste Collectors
          </Typography>
        </Box>
 
         {userLocation && (
          <GoogleMapsLoader libraries={googleMapsLibraries}>      </GoogleMapsLoader>
          )}
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
                  disabled={!hasEwasteDetails || isSubmitting} // Disable button if no e-waste details or if submitting
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
  );
};

export default NavigatePage;
