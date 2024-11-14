import React from 'react';
import { Box, Typography} from '@mui/material';
import CO2ProgressBar from '../components/CO2ProgressBar'; // Assuming CO2 progress bar component is available
import devices from '../data/devicesData.js'; // Device data

const CO2ProgressPage = ({ quantities }) => {
  const calculateTotal = () => {
    let totalWeight = 0;
    let totalCO2 = 0;
    let totalLeadWeight = 0;
    let totalPlasticWeight = 0;
    let totalCopperWeight = 0;
    let totalaluminumWeight=0;

    devices.forEach((device) => {
      const deviceQuantity = quantities[device.Name];
      const deviceWeight = device.weight * deviceQuantity / 1000; // Convert to kg

      totalWeight += deviceWeight;
      totalCO2 += deviceWeight * 0.9; // CO2 savings per kg (adjust as needed)
      totalLeadWeight += (device.materials.lead * deviceQuantity) /1000; // Lead weight in kg
      totalPlasticWeight += (device.materials.plastic * deviceQuantity) /1000; // Plastic weight in kg
      totalCopperWeight += (device.materials.copper * deviceQuantity) /1000; // Copper weight in kg
      totalaluminumWeight += (device.materials.aluminum * deviceQuantity) /1000; // Al weight in kg
    });

    return { totalWeight, totalCO2, totalLeadWeight, totalPlasticWeight, totalCopperWeight ,totalaluminumWeight};
  };

  const { totalWeight, totalCO2, totalLeadWeight, totalPlasticWeight, totalCopperWeight, totalaluminumWeight } = calculateTotal();

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Recycling Progress
      </Typography>

      <CO2ProgressBar totalCO2={totalCO2} />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total E-Waste Collected: {totalWeight.toFixed(2)} kg
      </Typography>
      <Typography variant="h6">
        CO2 Saved: {totalCO2.toFixed(2)} kg
      </Typography>
      <Typography variant="h6">
        Lead Weight: {totalLeadWeight.toFixed(2)} kg
      </Typography>
      <Typography variant="h6">
        Plastic Weight: {totalPlasticWeight.toFixed(2)} kg
      </Typography>
      <Typography variant="h6">
        Copper Weight: {totalCopperWeight.toFixed(2)} kg
      </Typography>
      <Typography variant="h6">
        Copper Weight: {totalaluminumWeight.toFixed(2)} kg
      </Typography>
    </Box>
  );
};

export default CO2ProgressPage;
