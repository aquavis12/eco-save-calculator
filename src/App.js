import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
 return (
<Router>
<CssBaseline />
<Header />
<Container maxWidth="lg" sx={{ marginTop: 0 }}>
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/calculator" element={<CalculatorPage />} />
<Route path="/About" element={<AboutPage />} />
<Route path="/profile" element={<ProfilePage />} />
</Routes>
</Container>
<Footer />
</Router>
 );
}
export default App;


