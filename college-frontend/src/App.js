import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Import components
import Home from './components/Home';
import Login from './components/Login';
import Results from './components/Results';
import PredictorDashboard from './components/PredictorDashboard';
import AdminDashboard from './components/AdminDashboard';
import CutoffAnalytics from './components/CutoffAnalytics';
import About from './components/About';
import Contact from './components/Contact';
import BranchGuide from './components/BranchGuide';
import AICounselling from './components/AICounselling';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import StudentRegistrationNew from './components/StudentRegistrationNew';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

// Create modern theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5568d3',
    },
    secondary: {
      main: '#f093fb',
      light: '#f5a4ff',
      dark: '#dc7ce8',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Public Routes */}
            <Route path="/register" element={<StudentRegistrationNew />} />
            <Route 
              path="/predictor" 
              element={<PredictorDashboard />}
            />
            <Route 
              path="/results" 
              element={<Results />}
            />
            <Route 
              path="/cutoff-analytics" 
              element={<CutoffAnalytics />}
            />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Public Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/branch-guide" element={<BranchGuide />} />
            <Route path="/ai-counselling" element={<AICounselling />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
