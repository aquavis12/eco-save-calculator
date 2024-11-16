import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage    from './pages/LoginPage';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify with the generated outputs
import outputs from './amplify_outputs.json'; // Ensure the path is correct
Amplify.configure(outputs);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated on initial load
    const checkAuth = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
        setUser(currentUser);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <CssBaseline />
      {/* Pass the authentication state and sign-out handler to the Header */}
      <Header isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
      <Container maxWidth="lg" sx={{ marginTop: 0 }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          
          {/* Profile is a protected page */}
          <Route
            path="/profile"
            element={isAuthenticated ? (
              <ProfilePage user={user} onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Login Route */}
          <Route
          path="/login"
          element={
            <div>

              <LoginPage/> {/* Correctly render the LoginPage component */}
              </div>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
