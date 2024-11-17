// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <AppBar position="relative" sx={{ backgroundColor: '#00bbbb', boxShadow: 'none', borderBottom: '2px solid #34495e' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/image3.jpg" // Replace with the correct image URL or local path
              alt="Electronics"
              style={{
                width: '50%',
                height: 'auto',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            E-Waste Recycling
          </Typography>
        </Box>

        {/* Navigation and Language Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
            {('Home')}
          </Button>
          <Button component={Link} to="/calculator" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
            {('Calculator')}
          </Button>
          <Button component={Link} to="/about" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
            {('About')}
          </Button>
          <Button component={Link} to="/ewaste-collectors" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
            {('E-Points')}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
