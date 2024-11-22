// ThanksPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ThanksPage = () => {
  const navigate = useNavigate();

  // Redirect to home page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to the home page, adjust the path if needed
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
        Thank you for your submission!
        <br />
        You will be redirected to the home page shortly.
      </Typography>
    </Box>
  );
};

export default ThanksPage;
