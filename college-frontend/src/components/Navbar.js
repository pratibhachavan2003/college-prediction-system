import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ background: '#2c3e50', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 45,
            height: 45,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            <SchoolIcon sx={{ fontSize: 24 }} />
          </Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            CollegePredictor
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button color="inherit" onClick={() => navigate('/')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/predictor')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Predict
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            About Us
          </Button>
          <Button color="inherit" onClick={() => navigate('/branch-guide')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Branch Guide
          </Button>
          <Button color="inherit" onClick={() => navigate('/ai-counselling')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            AI Counselling
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Contact
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: '#667eea',
              '&:hover': { bgcolor: '#5a67d8' },
              fontWeight: 500
            }}
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

