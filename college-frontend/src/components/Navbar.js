import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

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
            College Predictor
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Button color="inherit" onClick={() => navigate('/')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            About Us
          </Button>
          <Button color="inherit" onClick={() => navigate('/predictor')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Predict
          </Button>
          <Button color="inherit" onClick={() => navigate('/cutoff-analytics')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            📊 Cutoffs
          </Button>

          {isAuthenticated && user?.role === 'admin' && (
            <Button color="inherit" onClick={() => navigate('/admin-dashboard')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
              📊 Admin
            </Button>
          )}
          
          <Button color="inherit" onClick={() => navigate('/branch-guide')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Branch Guide
          </Button>
          <Button color="inherit" onClick={() => navigate('/ai-counselling')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            AI Counselling
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')} sx={{ fontWeight: 500, '&:hover': { color: '#667eea' } }}>
            Contact
          </Button>

          {/* User Profile / Logout Section */}
          {isAuthenticated ? (
            <>
              <Button
                onClick={handleMenuOpen}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: '4px 8px',
                  borderRadius: '8px',
                  '&:hover': { background: 'rgba(255,255,255,0.1)' }
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: user?.role === 'admin' ? '#ef4444' : '#667eea',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}
                >
                  {user?.email?.[0]?.toUpperCase()}
                </Avatar>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {user?.email}
                  </Typography>
                </MenuItem>
                <MenuItem disabled>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    Role: <strong>{user?.role === 'admin' ? 'Administrator' : 'Student'}</strong>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: '#667eea',
                '&:hover': { bgcolor: '#5a67d8' },
                fontWeight: 500
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

