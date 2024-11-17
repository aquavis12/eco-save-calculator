import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, TextField, Divider, Grid, Button } from '@mui/material';
import devices from '../data/devicesData.js'; // Assuming device data is imported
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CalculatorPage = () => {
  const [quantities, setQuantities] = useState(devices.reduce((acc, device) => {
    acc[device.Name] = 0;
    return acc;
  }, {}));

  const navigate = useNavigate(); // Initialize navigate function

  // Assuming this is in the same component where quantities are managed
  const handleQuantityChange = (deviceName, change) => {
    const newQuantity = Math.max(0, quantities[deviceName] + change); // Prevent negative values
    setQuantities({
      ...quantities,
      [deviceName]: newQuantity,
    });
  };

  const handleQuantityInputChange = (deviceName, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setQuantities({
        ...quantities,
        [deviceName]: parsedValue,
      });
    }
  };

  // Function to navigate and pass quantities to the CO2ProgressPage
  const handleRecycleClick = () => {
    navigate('/co2progress', { state: { quantities } }); // Pass quantities via state
  };

  // Define category colors
  const categoryColors = {
    'IT Equipment': '#ADD8E6', // Light Blue
    'Mobile Equipment': '#90EE90', // Light Green
    'Home Equipment': '#FFE4E1', // Light Pink
    'Batteries': '#FFEC8B', // Light Yellow
  };

  // Segregate devices based on their category
  const deviceCategories = {
    'IT Equipment': devices.filter(device => device.category === 'IT Equipment'),
    'Mobile Equipment': devices.filter(device => device.category === 'Mobile Equipment'),
    'Home Equipment': devices.filter(device => device.category === 'Home Equipment'),
    'Batteries': devices.filter(device => device.category === 'Batteries'),
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h2" gutterBottom align="center" sx={{
        fontWeight: 'bold',
        padding: '15px',
        backgroundColor: '#00cc99',
        color: '#ffffff',
        borderRadius: '8px',
        boxShadow: 3
      }}>
        E-Waste Recycling Calculator
      </Typography>

      {/* IT Equipment Section */}
      {Object.keys(deviceCategories).map((category) => {
        const categoryDevices = deviceCategories[category];
        const categoryColor = categoryColors[category];

        return (
          <Box key={category} sx={{ marginBottom: 4 }}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 'bold',
                backgroundColor: categoryColor,
                padding: '15px',
                borderRadius: '8px',
                boxShadow: 2,
                marginBottom: '10px',
              }}
            >
              {category}
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {/* Card layout for device cards in this category */}
            <Grid container spacing={3} justifyContent="center">
              {categoryDevices.map((device) => {
                return (
                  <Grid item key={device.Name} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={{
                        height: '100%',
                        backgroundColor: '#ffffff',
                        boxShadow: 3,
                        borderRadius: '10px',
                        '&:hover': { boxShadow: 8 },
                        transition: 'box-shadow 0.3s ease',
                      }}
                    >
                      <CardContent>
                        {/* Device Name and Image */}
                        <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
                          {device.Name}
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                          <img
                            src={device.image} // Assume each device has an image property
                            alt={device.Name}
                            style={{
                              width: '40%',
                              height: 'auto',
                              marginBottom: '10px',
                              borderRadius: '5px',
                            }}
                          />
                        </Box>

                        {/* Quantity Selector */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <IconButton
                            onClick={() => handleQuantityChange(device.Name, -1)}
                            sx={{
                              backgroundColor: '#ffcccc',
                              borderRadius: '50%',
                              '&:hover': { backgroundColor: '#f0f0f0' },
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <TextField
                            value={quantities[device.Name]}
                            onChange={(e) =>
                              handleQuantityInputChange(device.Name, e.target.value)
                            }
                            variant="outlined"
                            size="small"
                            sx={{ width: 60, textAlign: 'center', marginX: 1 }}
                          />
                          <IconButton
                            onClick={() => handleQuantityChange(device.Name, 1)}
                            sx={{
                              backgroundColor: '#ccffcc',
                              borderRadius: '50%',
                              '&:hover': { backgroundColor: '#f0f0f0' },
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}

      {/* Total CO2, Weight, and Material Breakdown */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        {/* Confirm and Get Coupons Button */}
        <Button
          variant="contained"
          color="secondary"
          sx={{
            padding: '12px 30px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderRadius: '30px',
            backgroundColor: '#2ecc71',
            '&:hover': { backgroundColor: '#54b1c9' },
            boxShadow: 3,
          }}
          onClick={handleRecycleClick} // Use handleRecycleClick function here
        >
          Let's Recycle
        </Button>
      </Box>
    </Box>
  );
};

export default CalculatorPage;
