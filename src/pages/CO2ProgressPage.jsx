import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import devices from '../data/devicesData.js';

// Material Symbols (using emojis or icons as placeholder)
const symbols = {
  plastic: '♻️', // Plastic symbol (can replace with image/icon)
  cu: '🟤', // Copper symbol (can replace with image/icon)
  pb: '⚫', // Lead symbol (can replace with image/icon)
  al: '🔵', // Aluminum symbol (can replace with image/icon)
};

const CO2ProgressPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function here
  const { quantities } = location.state || {};

  useEffect(() => {
    if (quantities) {
      console.log('Quantities received in CO2ProgressPage:', quantities);
    }
  }, [quantities]);

  // Function to calculate total material weight
  const calculateMaterialWeights = () => {
    let totals = {
      totalWeight: 0,
      totalLeadWeight: 0,
      totalPlasticWeight: 0,
      totalCopperWeight: 0,
      totalAluminumWeight: 0,
    };

    devices.forEach((device) => {
      if (device && device.Name && device.materials) {
        const deviceQuantity = quantities[device.Name] || 0;

        // Calculate individual material weights
        totals.totalWeight += (device.materials.lead + device.materials.plastic + device.materials.copper + device.materials.aluminum) * deviceQuantity;
        totals.totalLeadWeight += device.materials.lead * deviceQuantity;
        totals.totalPlasticWeight += device.materials.plastic * deviceQuantity;
        totals.totalCopperWeight += device.materials.copper * deviceQuantity;
        totals.totalAluminumWeight += device.materials.aluminum * deviceQuantity;
      }
    });

    return totals;
  };

  const { totalWeight, totalLeadWeight, totalPlasticWeight, totalCopperWeight, totalAluminumWeight } = calculateMaterialWeights();
  const ecoPoints = Math.floor((totalWeight / 1000) * 100);

  // Handle the navigation to find collectors page
  const handleFindCollectors = () => {
    // Filter the selected devices to only include those with a quantity > 0
    const selectedDevices = Object.entries(quantities)
      .filter(([deviceName, quantity]) => quantity > 0)  // Only include devices with quantities > 0
      .map(([deviceName]) => deviceName);  // Create an array of device names
  
    // Build an object with quantities for each selected device
    const updatedQuantities = Object.entries(quantities)
      .filter(([deviceName, quantity]) => quantity > 0)  // Only include devices with quantities > 0
      .reduce((acc, [deviceName, quantity]) => {
        acc[deviceName] = quantity;  // Set the quantity for each device
        return acc;
      }, {});
  
    // Log the results for debugging purposes
    console.log("Selected Devices:", selectedDevices);
    console.log("Quantities:", updatedQuantities);
  

    // Navigate with quantities and totals as state
    navigate('/E-Points', {
      state: {
        selectedDevices,
        updatedQuantities,
        totalWeight,
        totalLeadWeight,
        totalPlasticWeight,
        totalCopperWeight,
        totalAluminumWeight,
        ecoPoints,
      },
    });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: '100vh', padding: '20px' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Card sx={{ maxWidth: '100%', padding: '20px' }}>
            <CardContent>
              <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: '20px', color:"green" }}>
                Recycling Progress
              </Typography>

              <Typography variant="h5" gutterBottom align="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                You collected a total of {totalWeight.toFixed(0)} g of e-waste.
              </Typography>

              {/* Selected Devices Card */}
              <Card sx={{ backgroundColor: "#e0f7fa", padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Selected Devices and Quantities:
                </Typography>
                <ul>
                  {Object.entries(quantities)
                    .filter(([, quantity]) => quantity > 0) // Only include devices with quantities > 0
                    .map(([deviceName, quantity]) => (
                      <li key={deviceName}>
                        <Typography variant="body1">
                          {deviceName}: {quantity} units
                        </Typography>
                      </li>
                    ))}
                </ul>
              </Card>

              <Grid container spacing={2} justifyContent="center">
                {/* Material-specific cards */}
                {[
                  { label: 'Lead', symbol: symbols.pb, total: totalLeadWeight, bgColor: '#ffeb3b', symbolColor: '#333' },
                  { label: 'Plastic', symbol: symbols.plastic, total: totalPlasticWeight, bgColor: '#c8e6c9', symbolColor: '#4caf50' },
                  { label: 'Copper', symbol: symbols.cu, total: totalCopperWeight, bgColor: '#ffcc80', symbolColor: '#8b4513' },
                  { label: 'Aluminum', symbol: symbols.al, total: totalAluminumWeight, bgColor: '#bbdefb', symbolColor: '#1976d2' }
                ].map(({ label, symbol, total, bgColor, symbolColor }, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card sx={{ backgroundColor: bgColor, padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                      <Typography variant="h5" component="div">{label}</Typography>
                      <Card sx={{ backgroundColor: symbolColor, padding: '20px', borderRadius: '8px', color: '#fff', marginTop: '10px' }}>
                        <Typography variant="h4">{symbol}</Typography>
                      </Card>
                      <Typography variant="body2" color="text.secondary" fontSize="30px">
                        {total.toFixed(0)} g
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ marginTop: '30px', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: "green", fontSize: "40px" }}>
                  Eco Points Earned
                </Typography>
                <Typography variant="body1" fontSize="25px">
                  You have earned {ecoPoints} eco points for your recycling efforts.
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', fontSize: "25px", color: "greenyellow", fontWeight: 'bold' }}>
                  Once you reach 1000 eco points, you can win exciting vouchers!
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: '12px 30px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    backgroundColor: '#2ecc71',
                    '&:hover': { backgroundColor: '#54b1c9' },
                    boxShadow: 3,
                  }}
                  onClick={handleFindCollectors}
                >
                  Proceed Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CO2ProgressPage;
