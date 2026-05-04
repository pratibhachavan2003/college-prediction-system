import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, checkBackendHealth } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // ✅ MISSING STATES (FIXED)
  const [backendStatus, setBackendStatus] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setBackendStatus(isHealthy);
    };
    checkHealth();
  }, [checkBackendHealth]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Check backend health before attempting login
    const isHealthy = await checkBackendHealth();
    setBackendStatus(isHealthy);
    if (!isHealthy) {
      setError('Backend server is not running. Please start the backend server first.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/predictor');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 4,
      }}>
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(30px)',
              borderRadius: '28px',
              p: { xs: 4, md: 6 },
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 35px 100px rgba(0, 0, 0, 0.2)',
              }
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#1a365d',
                  mb: 1,
                  fontSize: { xs: '1.8rem', md: '2.2rem' }
                }}
              >
                Sign In
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#64748b',
                  fontWeight: 400,
                  fontSize: '0.95rem'
                }}
              >
                Enter your credentials to access your account.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#475569',
                  fontWeight: 500,
                  mt: 1,
                  fontSize: '0.9rem'
                }}
              >
                New students should create an account first, then sign in to use the predictor.
              </Typography>
            </Box>

            {error && (
              <Box sx={{
                mb: 3,
                p: 3,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
                border: '1.5px solid rgba(239, 68, 68, 0.3)',
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{
                  color: '#dc2626',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  ✗ {error}
                </Typography>
              </Box>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your-email@example.com"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: '#f8fafc',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
                        borderWidth: '1.5px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#cbd5e1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                        borderWidth: '2px',
                        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#64748b',
                      fontWeight: 600,
                      '&.Mui-focused': {
                        color: '#667eea',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      fontWeight: 500,
                      color: '#1a365d',
                      '&::placeholder': {
                        color: '#cbd5e1',
                        opacity: 0.7,
                      }
                    }
                  }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: '#f8fafc',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
                        borderWidth: '1.5px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#cbd5e1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                        borderWidth: '2px',
                        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#64748b',
                      fontWeight: 600,
                      '&.Mui-focused': {
                        color: '#667eea',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      fontWeight: 500,
                      color: '#1a365d',
                      '&::placeholder': {
                        color: '#cbd5e1',
                        opacity: 0.7,
                      }
                    }
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 0.5 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      sx={{
                        color: '#cbd5e1',
                        '&.Mui-checked': {
                          color: '#667eea',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                      Remember me
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Link href="#" sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#667eea',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#764ba2',
                      textDecoration: 'underline',
                    },
                  }}>
                    Forgot password?
                  </Link>
                  <Link href="/register" sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#333f67',
                    fontSize: '0.82rem',
                    mt: 1,
                    '&:hover': {
                      color: '#667eea',
                      textDecoration: 'underline',
                    },
                  }}>
                    New student? Create an account
                  </Link>
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || backendStatus === false}
                sx={{
                  mt: 1.5,
                  py: 1.6,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6b3d93 100%)',
                    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.45)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  '&:disabled': {
                    background: 'rgba(156, 163, 175, 0.4)',
                    boxShadow: 'none',
                    transform: 'none',
                  },
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                    <span>Signing In...</span>
                  </Box>
                ) : (
                  'Sign In'
                )}
              </Button>

              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => navigate('/register')}
                sx={{
                  mt: 1,
                  py: 1.6,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: '12px',
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderColor: '#5568d3',
                  },
                }}
              >
                Create a new account
              </Button>
            </Box>

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
