import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Card,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import API_BASE_URL from '../config';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = ['Personal Info', 'Exam & Scores', 'Preferences', 'Review & Register'];

const StudentRegistrationNew = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    tenthPercentage: '',
    twelfthPercentage: '',
    jeeScore: '',
    examType: 'JEE',
    category: 'GENERAL',
    preferredBranch: '',
    preferredCollegeType: 'All',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.name || !formData.email || !formData.phoneNumber) {
        setError('Please fill all personal information');
        return false;
      }
    } else if (activeStep === 1) {
      if (!formData.tenthPercentage || !formData.twelfthPercentage) {
        setError('Please enter 10th and 12th percentages');
        return false;
      }
      if (formData.examType === 'JEE' && !formData.jeeScore) {
        setError('Please enter JEE score');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        tenthPercentage: parseFloat(formData.tenthPercentage) || 0,
        twelfthPercentage: parseFloat(formData.twelfthPercentage) || 0,
        jeeScore: parseFloat(formData.jeeScore) || 0,
      };

      const response = await axios.post(`${API_BASE_URL}/api/students/register`, payload);
      console.log('Registration response:', response);

      if (response.data) {
        setSuccess(true);
        localStorage.setItem('studentData', JSON.stringify(response.data));
        setTimeout(() => {
          navigate('/predictor');
        }, 1500);
      }
    } catch (err) {
      console.error('Registration error:', err);
      const status = err.response?.status;
      const data = err.response?.data;
      const message = err.message || 'Unknown error';
      setError('Registration failed. Status: ' + (status ?? 'N/A') + '\nMessage: ' + (data?.message || data || message));
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Ashish Patil"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                  variant="outlined"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Exam & Scores
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Exam Type"
                  name="examType"
                  value={formData.examType}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  <MenuItem value="JEE">JEE Main</MenuItem>
                  <MenuItem value="MHT-CET">MHT-CET</MenuItem>
                  <MenuItem value="NEET">NEET</MenuItem>
                  <MenuItem value="BOARD">Board Exam</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  <MenuItem value="GENERAL">General</MenuItem>
                  <MenuItem value="OBC">OBC</MenuItem>
                  <MenuItem value="SC">SC</MenuItem>
                  <MenuItem value="ST">ST</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="10th Percentage"
                  name="tenthPercentage"
                  type="number"
                  value={formData.tenthPercentage}
                  onChange={handleChange}
                  placeholder="e.g., 85.5"
                  variant="outlined"
                  inputProps={{ step: '0.01', min: '0', max: '100' }}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="12th Percentage"
                  name="twelfthPercentage"
                  type="number"
                  value={formData.twelfthPercentage}
                  onChange={handleChange}
                  placeholder="e.g., 88.0"
                  variant="outlined"
                  inputProps={{ step: '0.01', min: '0', max: '100' }}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                />
              </Grid>
              {formData.examType === 'JEE' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="JEE Score (out of 360)"
                    name="jeeScore"
                    type="number"
                    value={formData.jeeScore}
                    onChange={handleChange}
                    placeholder="e.g., 200"
                    variant="outlined"
                    inputProps={{ step: '1', min: '0', max: '360' }}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1.5,
                        backgroundColor: '#f8f9fa',
                      },
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              College Preferences (Optional)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Preferred Branch"
                  name="preferredBranch"
                  value={formData.preferredBranch}
                  onChange={handleChange}
                  placeholder="e.g., CSE, ECE, Mechanical"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="College Type"
                  name="preferredCollegeType"
                  value={formData.preferredCollegeType}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  <MenuItem value="All">All Types</MenuItem>
                  <MenuItem value="Government">Government</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                  <MenuItem value="Deemed">Deemed</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Alert severity="info" sx={{ mt: 3 }}>
              These preferences will help us give you more personalized college suggestions.
            </Alert>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon sx={{ color: '#4caf50' }} /> Review Your Information
            </Typography>
            <Card sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formData.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formData.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formData.phoneNumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Exam Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formData.examType}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">10th Percentage</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formData.tenthPercentage}%</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">12th Percentage</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formData.twelfthPercentage}%</Typography>
                </Grid>
              </Grid>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f8f9fa',
          }}
        >
          <Container maxWidth="sm">
            <Paper
              elevation={10}
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 80, mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Registration Successful!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Welcome {formData.name}! Redirecting to predictor...
              </Typography>
            </Paper>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={10} sx={{ p: 5, borderRadius: 3, background: 'white' }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <PersonAddIcon sx={{ fontSize: 50, color: '#667eea', mb: 1 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1a1a2e', mb: 1 }}>
                Student Registration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complete registration to start predicting colleges
              </Typography>
            </Box>

            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Step Content */}
            <Box sx={{ minHeight: '300px', mb: 4 }}>
              {renderStepContent()}
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{ px: 4 }}
              >
                Back
              </Button>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                      px: 4,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    {loading ? 'Registering...' : 'Complete Registration'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      px: 4,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default StudentRegistrationNew;
