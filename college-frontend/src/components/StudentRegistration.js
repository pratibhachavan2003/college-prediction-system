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
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', py: 4 }}>
        <Container maxWidth="md">
          <Paper
            elevation={10}
            sx={{
              p: 5,
              borderRadius: 3,
              background: 'white',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  bgcolor: '#667eea',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <PersonAddIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea' }}>
                Student Registration
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Register your details to get started with college predictions
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    margin="normal"
                    required
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
                    margin="normal"
                    required
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
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
                    margin="normal"
                    required
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
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
                    margin="normal"
                    required
                    inputProps={{ min: "0", max: "360" }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
                  },
                }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default StudentRegistration;
