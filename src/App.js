import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WinCleaner from './pages/WinCleaner';
import Browser from './pages/Browser';
import Contact from './pages/Contact';
import SplineBackground from './components/SplineBackground';
import NewsTicker from './components/NewsTicker';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          position: 'relative',
          background: 'transparent',
          pointerEvents: 'auto'
        }}>
          <SplineBackground />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wincleaner" element={<WinCleaner />} />
              <Route path="/browser" element={<Browser />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
          <NewsTicker />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 