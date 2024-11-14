import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline, Button } from '@mui/material';
import * as Auth from '@aws-amplify/auth';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { withAuthenticator } from '@aws-amplify/ui-react'; // HOC to add authentication

function App() {
  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      window.location.reload(); // Reload to reset the app state after sign-out
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: 0 }}>
        <Button variant="outlined" color="primary" onClick={handleSignOut}>
          Sign Out
        </Button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/profile"
            element={
              // Ensure that the user is authenticated before accessing the profile page
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

// PrivateRoute component to restrict access to authenticated users
const PrivateRoute = ({ children }) => {
  const user = Auth.currentAuthenticatedUser()
    .then((user) => user)
    .catch(() => null);

  return user ? children : <Navigate to="/" />;
};

// Wrap the App component with withAuthenticator to handle sign-in, sign-up, and sign-out flow
export default withAuthenticator(App);
