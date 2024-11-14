import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import * as Auth from '@aws-amplify/auth';
import { Navigate } from 'react-router-dom';

const ProfilePage = ({ signOut, user }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.username,
        email: user.attributes.email,
        phone: user.attributes.phone_number || 'N/A',
        createdDate: user.attributes.created_at || 'N/A',
      });
    }
  }, [user]);

  // Redirect user to home page if not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Profile Page
      </Typography>

      {userInfo ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            User Info
          </Typography>
          <Typography variant="body1">Username: {userInfo.name}</Typography>
          <Typography variant="body1">Email: {userInfo.email}</Typography>
          <Typography variant="body1">Phone: {userInfo.phone}</Typography>
          <Typography variant="body1">Account Created: {userInfo.createdDate}</Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={signOut}
            sx={{ marginTop: 2 }}
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <Typography variant="body1">Loading user information...</Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
