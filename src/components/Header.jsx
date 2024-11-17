// src/components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, IconButton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Menu icon for mobile and tablet

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); // For mobile screen size
  const isTablet = useMediaQuery('(max-width:1024px)'); // For tablet screen size

  // Toggle the drawer (menu) on and off
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: 2 }}>
      <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
        {'Home'}
      </Button>
      <Button component={Link} to="/calculator" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
        {'Calculator'}
      </Button>
      <Button component={Link} to="/about" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
        {'About'}
      </Button>
      <Button component={Link} to="/E-Points" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
        {'E-Points'}
      </Button>
    </Box>
  );

  return (
    <AppBar position="relative" sx={{ backgroundColor: '#00bbbb', boxShadow: 'none', borderBottom: '2px solid #34495e' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/image3.jpg" // Replace with the correct image URL or local path
            alt="Electronics"
            style={{
              width: isMobile ? '40%' : isTablet ? '45%' : '50%', // Adjust for mobile, tablet, desktop
              height: 'auto',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            E-Waste Recycling
          </Typography>
        </Box>

        {/* For Mobile and Tablet Screens, Display Menu Icon */}
        {(isMobile || isTablet) ? (
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => toggleDrawer(true)}
            sx={{ display: 'block' }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          // For larger screens, display the navigation buttons in a row
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
              {'Home'}
            </Button>
            <Button component={Link} to="/calculator" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
              {'Calculator'}
            </Button>
            <Button component={Link} to="/about" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
              {'About'}
            </Button>
            <Button component={Link} to="/E-Points" color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', textTransform: 'none' }}>
              {'E-Points'}
            </Button>
          </Box>
        )}
      </Toolbar>

      {/* Drawer for Mobile/Tablet Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {menuItems}
      </Drawer>
    </AppBar>
  );
};

export default Header;
