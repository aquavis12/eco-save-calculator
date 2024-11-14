import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#34495e', // Darker color for contrast
        color: 'white',
        padding: '40px 0',
        marginTop: '60px',
        borderTop: '2px solid #1976d2', // Adds a subtle top border for separation
      }}
    >
      <Container>
        <Grid container spacing={4} justifyContent="space-between">
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              About Us
            </Typography>
            <Typography sx={{ lineHeight: 1.8 }}>
              We aim to reduce e-waste and help protect the environment by recycling old electronics. Join us in our mission for a greener planet!
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <ul style={{ paddingLeft: '20px', color: '#bdc3c7' }}>
              <li>
                <Link href="/about" color="inherit" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" color="inherit" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" color="inherit" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Typography sx={{ lineHeight: 1.8 }}>Email: support@erecycle.com</Typography>
            <Typography sx={{ lineHeight: 1.8 }}>Phone: +91 8688108092</Typography>
          </Grid>
        </Grid>

        {/* Footer Copyright */}
        <Typography variant="body2" align="center" sx={{ mt: 4, color: '#ecf0f1' }}>
          © 2024 E-Waste Recycling. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
