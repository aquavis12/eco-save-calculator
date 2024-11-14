import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f4f9', p: 4 }}>
      <Typography
        variant="h2"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#2c3e50',
          mb: 4,
          fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
        }}
      >
        Welcome to E-Waste Recycling
      </Typography>
      <Typography
        variant="h5"
        paragraph
        align="center"
        sx={{
          color: '#24c5ae',
          maxWidth: '1000px',
          margin: '0 auto',
          mb: 5,
          fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
        }}
      >
        Recycle your old electronics, save the environment, and earn rewards!
      </Typography>

      {/* How It Works Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#34495e', mb: 3, textAlign: 'center' }}>
          How It Works
        </Typography>
        <Card sx={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#7edecd' }}>
          <CardContent>
            <Typography sx={{ color: '#7f8c8d', textAlign: 'center', fontSize: '1.4rem' }}>
              <ul style={{ paddingLeft: '10px', color: '#7f8c8d', margin: '0 auto', maxWidth: '600px' }}>
                <li>Select the devices you want to recycle</li>
                <li>Calculate the total weight and CO2 savings</li>
                <li>Earn rewards and contribute to a greener planet</li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Motivational Text Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#34495e', fontWeight: 'bold', mb: 3 }}>
          Find all those electronics that you don’t use anymore.
        </Typography>
        <Card sx={{ Width:600, height:100, margin: '0 auto', backgroundColor: '#7edecd' }}>
          <CardContent>
            <Typography sx={{ color: '#7f8c8d', fontSize: '1.5rem' }}>
              Collect your old electronics, and start contributing to a cleaner environment today. By recycling, you're not only saving the planet, but you're also earning rewards!
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Image Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <img
          src="https://amplify-eco-images.s3.us-east-1.amazonaws.com/image1.jpg" // Replace with the correct image URL or local path
          alt="Electronics"
          style={{
            width: '50%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      </Box>

      {/* What We Offer Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#34495e', mb: 3 }}>
          What We Offer
        </Typography>
        <Card sx={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#7edecd' }}>
          <CardContent>
            <Typography sx={{ color: '#7f8c8d', lineHeight: 1.8, fontSize: '1.2rem' }}>
              For every 50 kg of e-waste recycled, you’ll receive Coupons worth 50 USD! Start recycling today and earn rewards for your efforts in protecting the environment.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
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
              component={Link}
              to="/calculator"
            >
              Start Recycling Now
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default HomePage;
