import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onSignOut }) => {
  return (
    <AppBar position="relative" sx={{ backgroundColor: '#00bbbb', boxShadow: 'none', borderBottom: '2px solid #34495e' }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px' }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://amplify-eco-images.s3.us-east-1.amazonaws.com/image3.jpg" // Replace with the correct image URL or local path
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

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '20px',
                '&:hover': { backgroundColor: '#34495e', borderRadius: '25px', transition: '0.3s' },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/calculator"
              color="inherit"
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '20px',
                '&:hover': { backgroundColor: '#34495e', borderRadius: '25px', transition: '0.3s' },
              }}
            >
              Calculator
            </Button>
            <Button
              component={Link}
              to="/about"
              color="inherit"
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '20px',
                '&:hover': { backgroundColor: '#34495e', borderRadius: '25px', transition: '0.3s' },
              }}
            >
              About
            </Button>

            {/* Conditionally render Profile and Sign Out based on authentication status */}
            {isAuthenticated ? (
              <>
                <Button
                  component={Link}
                  to="/profile"
                  color="inherit"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '20px',
                    '&:hover': { backgroundColor: '#34495e', borderRadius: '25px', transition: '0.3s' },
                  }}
                >
                  Profile
                </Button>
                <Button
                  onClick={onSignOut}
                  color="inherit"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '20px',
                    '&:hover': { backgroundColor: '#34495e', borderRadius: '25px', transition: '0.3s' },
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '20px',
                  '&:hover': { backgroundColor: '#34495e', borderRadius: '25px', transition: '0.3s' },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
