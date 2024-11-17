import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Correct import for v6
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import devices from '../data/devicesData.js'; // Device data
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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

  const calculateTotal = () => {
    let totalWeight = 0;
    let totalLeadWeight = 0;
    let totalPlasticWeight = 0;
    let totalCopperWeight = 0;
    let totalAluminumWeight = 0;

    devices.forEach((device) => {
      if (device && device.Name && device.materials) {
        const deviceQuantity = quantities[device.Name] || 0;

        // Sum of material weights
        const materialWeight = (device.materials.lead + device.materials.plastic + device.materials.copper + device.materials.aluminum) * deviceQuantity;

        totalWeight += materialWeight;
        totalLeadWeight += (device.materials.lead * deviceQuantity);
        totalPlasticWeight += (device.materials.plastic * deviceQuantity);
        totalCopperWeight += (device.materials.copper * deviceQuantity);
        totalAluminumWeight += (device.materials.aluminum * deviceQuantity);
      } else {
        console.error(`Device or materials not found for: ${device?.Name}`);
      }
    });

    return { totalWeight, totalLeadWeight, totalPlasticWeight, totalCopperWeight, totalAluminumWeight };
  };

  const { totalWeight, totalLeadWeight, totalPlasticWeight, totalCopperWeight, totalAluminumWeight } = calculateTotal();

  const ecoPoints = Math.floor((totalWeight / 1000) * 100);

  const handleFindCollectors = () => {
    const selectedDevices = Object.entries(quantities)
    .filter(([deviceName, quantity]) => quantity > 0) // Only include devices with quantities > 0
    .reduce((acc, [deviceName, quantity]) => {
      acc[deviceName] = quantity; // Build a new object with selected devices
      return acc;
    }, {});

    // Pass quantities and totals to the next page as state
    navigate('/E-Points', {
      state: {
        quantities: selectedDevices,
        totals: {
          totalWeight,
          totalLeadWeight,
          totalPlasticWeight,
          totalCopperWeight,
          totalAluminumWeight,
          ecoPoints,
        },
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
                {/* Lead */}
                <Grid item xs={12} md={6} lg={4}>
                  <Card sx={{ backgroundColor: "#ffeb3b", padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <Typography variant="h5" component="div">Lead</Typography>
                    <Card sx={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px', color: '#fff', marginTop: '10px' }}>
                      <Typography variant="h4">Pb</Typography>
                    </Card>
                    <Typography variant="body2" color="text.secondary" fontSize='30px'>
                      {totalLeadWeight.toFixed(0)} g
                    </Typography>
                  </Card>
                </Grid>

                {/* Plastic */}
                <Grid item xs={12} md={6} lg={4}>
                  <Card sx={{ backgroundColor: "#c8e6c9", padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <Typography variant="h5" component="div">Plastic</Typography>
                    <Card sx={{ backgroundColor: '#4caf50', padding: '20px', borderRadius: '8px', color: '#fff', marginTop: '10px' }}>
                      <Typography variant="h4">{symbols.plastic}</Typography>
                    </Card>
                    <Typography variant="body2" color="text.secondary" fontSize='30px'>
                      {totalPlasticWeight.toFixed(0)} g
                    </Typography>
                  </Card>
                </Grid>

                {/* Copper */}
                <Grid item xs={12} md={6} lg={4}>
                  <Card sx={{ backgroundColor: "#ffcc80", padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <Typography variant="h5" component="div">Copper</Typography>
                    <Card sx={{ backgroundColor: '#8b4513', padding: '20px', borderRadius: '8px', color: '#fff', marginTop: '10px' }}>
                      <Typography variant="h4">Cu</Typography>
                    </Card>
                    <Typography variant="body2" color="text.secondary" fontSize='30px'>
                      {totalCopperWeight.toFixed(0)} g
                    </Typography>
                  </Card>
                </Grid>

                {/* Aluminum */}
                <Grid item xs={12} md={6} lg={4}>
                  <Card sx={{ backgroundColor: "#bbdefb", padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <Typography variant="h5" component="div">Aluminum</Typography>
                    <Card sx={{ backgroundColor: '#1976d2', padding: '20px', borderRadius: '8px', color: '#fff', marginTop: '10px' }}>
                      <Typography variant="h4">Al</Typography>
                    </Card>
                    <Typography variant="body2" color="text.primary" fontSize='30px'>
                      {totalAluminumWeight.toFixed(0)} g
                    </Typography>
                  </Card>
                </Grid>
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
