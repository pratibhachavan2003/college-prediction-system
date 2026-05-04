import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import API_BASE_URL from '../config';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    tenthPercentage: '',
    twelfthPercentage: '',
    jeeScore: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/students/register`, formData);
      console.log('Registration response:', response);
      if (response.data) {
        alert('Registration successful!');
        localStorage.setItem('studentData', JSON.stringify(response.data));
        navigate('/predict');
      }
    } catch (error) {
      // log full error for debugging in browser console
      console.error('Registration error:', error);
      const status = error.response?.status;
      const data = error.response?.data;
      const message = error.message || 'Unknown error';
      // show more helpful message to the user
      alert('Registration failed. Status: ' + (status ?? 'N/A') + '\nMessage: ' + (data?.message || data || message));
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
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Paper elevation={0} sx={{
            p: 6,
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 35px 70px rgba(0,0,0,0.2)',
            }
          }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '20px',
                  bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                }}
              >
                <PersonAddIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h4" component="h1" sx={{
                mb: 2,
                fontWeight: 'bold',
                color: '#1a1a1a',
                fontSize: '2rem'
              }}>
                Create Your Account
              </Typography>
              <Typography variant="body1" sx={{
                color: '#64748b',
                fontSize: '1.1rem'
              }}>
                Join us to discover your perfect college match
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="10th Percentage"
                    name="tenthPercentage"
                    type="number"
                    value={formData.tenthPercentage}
                    onChange={handleChange}
                    required
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="12th Percentage"
                    name="twelfthPercentage"
                    type="number"
                    value={formData.twelfthPercentage}
                    onChange={handleChange}
                    required
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="JEE Score"
                    name="jeeScore"
                    type="number"
                    value={formData.jeeScore}
                    onChange={handleChange}
                    required
                    inputProps={{ min: "0", max: "360" }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(59, 130, 246, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Create Account
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default StudentRegistration;
