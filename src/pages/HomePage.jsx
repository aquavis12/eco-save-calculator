import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f4f9' }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#2c3e50',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
          }}
        >
          Welcome to E-Waste Recycling
        </Typography>
        <Typography
          variant="h5"
          paragraph
          sx={{
            color: '#24c5ae',
            fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.6rem' },
          }}
        >
          Recycle your old electronics, save the environment, and earn rewards!
        </Typography>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#34495e', mb: 3, textAlign: 'center' }}>
          How It Works
        </Typography>
        <Card sx={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#7edecd' }}>
          <CardContent>
            <Typography sx={{ color: '#7f8c8d', fontSize: '1.4rem' }}>
              <ul style={{ paddingLeft: '10px', color: '#7f8c8d', maxWidth: '600px',margin: '0 auto' }}>
                <li>Select the devices you want to recycle</li>
                <li>Calculate the totalewaste and harmful materials </li>
                <li>Earn rewards and contribute to a greener planet</li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Motivational Section */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#34495e', fontWeight: 'bold', mb: 3 }}>
          Find all those electronics that you don’t use anymore.
        </Typography>
        <Card sx={{ maxWidth: 900, margin: '0 auto', backgroundColor: '#7edecd' }}>
          <CardContent>
            <Typography sx={{ color: '#7f8c8d', fontSize: '1.4rem' }}>
              Collect your old electronics, and start contributing to a cleaner environment today.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Image Section */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <img
          src="https://amplify-eco-images-2024.s3.us-east-2.amazonaws.com/image1.jpg" // Replace with the correct image URL or local path
          alt="Electronics"
          style={{
            width: '50%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* What We Offer Section */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#34495e', mb: 3 }}>
          What We Offer
        </Typography>
        <Card sx={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#7edecd' }}>
          <CardContent>
            <Typography sx={{ color: '#7f8c8d', lineHeight: 1.8, fontSize: '1.2rem' , fontWeight :'bold' }}>
              For every 1000 eco points, you’ll receive exciting coupons! Start recycling today and earn rewards for your efforts in protecting the environment.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
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

      {/* Benefits Section */}
      <Box sx={{ mb: 8, backgroundColor: '#ecf0f1', py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#34495e', mb: 3, textAlign: 'center' ,fontSize: '1.6rem'}}>
          Why Recycle with Us?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
          <Card sx={{ maxWidth: 300, backgroundColor: '#7edecd' }}>
            <CardContent>
              <Typography sx={{ fontWeight: 'bold', color: '#34495e',fontSize: '1.2rem' }}>Eco-Friendly</Typography>
              <Typography sx={{ color: '#7f8c8d' }}>Help reduce the environmental impact by recycling your old devices.</Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 300, backgroundColor: '#7edecd' }}>
            <CardContent>
              <Typography sx={{ fontWeight: 'bold', color: '#34495e', fontSize: '1.2rem'}}>Easy Process</Typography>
              <Typography sx={{ color: '#7f8c8d' }}>Recycle in just a few simple steps and start earning rewards instantly.</Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 300, backgroundColor: '#7edecd' }}>
            <CardContent>
              <Typography sx={{ fontWeight: 'bold', color: '#34495e',fontSize: '1.2rem' }}>Rewards</Typography>
              <Typography sx={{ color: '#7f8c8d' }}>Earn exciting rewards and coupons while helping the environment.</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
