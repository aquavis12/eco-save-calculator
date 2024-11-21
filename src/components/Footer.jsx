import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#00bbbb', // Matching the header's background color
        color: 'white',
        padding: '40px 0',
        marginTop: '60px',
        borderTop: '2px solid #34495e', // Same border color as header's bottom border
      }}
    >
      <Container>
        <Grid container spacing={4} justifyContent="space-between">
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              About Us
            </Typography>
            <Typography sx={{ lineHeight: 1.8, color: '#f0f0f0' }}>
              We aim to reduce e-waste and help protect the environment by recycling old electronics. Join us in our mission for a greener planet!
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              Quick Links
            </Typography>
            <ul style={{ paddingLeft: '20px', color: '#f0f0f0' }}>
              <li>
                <Link
                  href="/about"
                  color="inherit"
                  sx={{
                    '&:hover': { textDecoration: 'underline', color: '#34495e' }, // Subtle hover color change to match the header hover style
                    transition: 'color 0.3s ease',
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/E-points"
                  color="inherit"
                  sx={{
                    '&:hover': { textDecoration: 'underline', color: '#34495e' },
                    transition: 'color 0.3s ease',
                  }}
                >
                  E-Points
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              Contact
            </Typography>
            <Typography sx={{ lineHeight: 1.8, color: '#f0f0f0' }}>
              Email: support@erecycles.com
            </Typography>
            <Typography sx={{ lineHeight: 1.8, color: '#f0f0f0' }}>
              Phone: +91 8688108092
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Copyright */}
        <Typography variant="body2" align="center" sx={{ mt: 4, color: '#f0f0f0' }}>
          © 2024 E-Waste Recycling. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
