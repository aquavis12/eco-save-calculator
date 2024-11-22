import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import AboutPage from './pages/AboutPage';
import NavigatePage  from './pages/NavigatePage.jsx'
import CO2ProgressPage from './pages/CO2ProgressPage.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import devices from './data/devicesData.js';
import ThanksPage from './pages/Thankspage';

const App = () => {
  const [quantities, setQuantities] = useState(
    devices.reduce((acc, device) => {
      acc[device.Name] = 0;
      return acc;
    }, {})
  );

  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container maxWidth={false}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Non-protected routes */}
          <Route
            path="/calculator"
            element={<CalculatorPage quantities={quantities} setQuantities={setQuantities} />}
          />
          
          <Route
            path="/CO2Progress"
            element={<CO2ProgressPage quantities={quantities} />}
          />
          <Route path="/E-Points" element={<NavigatePage />}/>
          <Route path="/thanks" element={<ThanksPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
