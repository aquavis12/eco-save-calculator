import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, Paper, Grid } from '@mui/material';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import outputs from "../amplify_outputs.json";  // Ensure this is configured correctly

Amplify.configure(outputs);

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');  // Default to an empty string

  // Sign In handler
  const handleSignIn = async (e) => {
    e.preventDefault();  // Prevent default form submission
    try {
      // Handle sign-in logic
      const user = await Auth.signIn('user@example.com', 'password123');
      console.log('User signed in:', user);
    } catch (error) {
      setErrorMessage(error.message || 'Unknown error');
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Container maxWidth="xs" sx={{ marginTop: 10 }}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, backgroundColor: '#f4f6f9' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* If user is authenticated */}
              {user ? (
                <>
                  <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 600, color: '#1976d2' }}>
                    Welcome, {user.username}
                  </Typography>
                  <Button
                    onClick={signOut}
                    variant="contained"
                    color="secondary"
                    sx={{
                      marginTop: 2,
                      backgroundColor: '#d32f2f',
                      '&:hover': { backgroundColor: '#c62828' }
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                // If user is not authenticated, show login form
                <form onSubmit={handleSignIn}>
                  <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: 600, color: '#1976d2' }}>
                    Sign In
                  </Typography>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    sx={{ borderRadius: 2 }}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    required
                    sx={{ borderRadius: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      marginTop: 2,
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' }
                    }}
                  >
                    Sign In
                  </Button>
                  {errorMessage && (
                    <Typography color="error" sx={{ marginTop: 2 }}>
                      {errorMessage}
                    </Typography>
                  )}
                </form>
              )}
            </Box>
          </Paper>
        </Container>
      )}
    </Authenticator>
  );
};

export default LoginPage;
