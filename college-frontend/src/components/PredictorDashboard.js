import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Divider,
  FormControl,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import API_BASE_URL from '../config';

const engineeringBranches = [
  'CSE',
  'Mechanical',
  'Civil',
  'Electrical',
  'Electronics',
  'Production',
  'Chemical',
  'Instrumentation',
  'IT',
  'Aerospace',
  'Biotechnology',
  'Automobile',
];

const examTypes = [
  'JEE',
  'MHT-CET',
  'NEET',
  'BOARD',
];

const categories = [
  'GENERAL',
  'OBC',
  'SC',
  'ST',
];

const states = [
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Delhi',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh',
  'West Bengal',
];

const collegeTypes = [
  'Government',
  'Private',
  'Deemed',
  'Autonomous',
];

const PredictorDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    examType: 'JEE',
    category: 'GENERAL',
    state: 'Maharashtra',
    preferredBranch: 'CSE',
    preferredCollegeType: 'Government',
    gender: '',
    location: '',
    yearSession: '2025',
    tenthPercentage: '',
    twelfthPercentage: '',
    jeeScore: '',
    mhtCetPercentile: '',
    twelfthPCM: '',
    neetScore: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name || 'Student',
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        examType: formData.examType,
        category: formData.category,
        state: formData.state,
        preferredBranch: formData.preferredBranch,
        preferredCollegeType: formData.preferredCollegeType,
        gender: formData.gender,
        location: formData.location,
        yearSession: formData.yearSession,
        tenthPercentage: parseFloat(formData.tenthPercentage) || null,
        twelfthPercentage: parseFloat(formData.twelfthPercentage) || null,
        jeeScore: parseFloat(formData.jeeScore) || null,
        mhtCetPercentile: parseFloat(formData.mhtCetPercentile) || null,
        twelfthPCM: parseFloat(formData.twelfthPCM) || null,
        neetScore: parseFloat(formData.neetScore) || null,
      };

      // Save last payload so Results page can re-run it if needed
      try {
        localStorage.setItem('lastPredictionPayload', JSON.stringify(payload));
      } catch (e) {
        // ignore storage errors
      }

      const res = await axios.post(`${API_BASE_URL}/api/predict`, payload);
      const data = res.data || [];
      try { localStorage.setItem('predictions', JSON.stringify(data)); } catch {}
      navigate('/results', { state: { predictions: data } });
    } catch (err) {
      console.error('Predictor error', err);
      alert('Prediction failed: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const renderExamSpecificFields = () => {
    switch (formData.examType) {
      case 'JEE':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                JEE Score (0-360):
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="jeeScore"
                value={formData.jeeScore}
                onChange={handleChange}
                inputProps={{ min: 0, max: 360 }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 1,
                    backgroundColor: '#f0f4ff',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                12th Percentage:
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="twelfthPercentage"
                value={formData.twelfthPercentage}
                onChange={handleChange}
                inputProps={{ min: 0, max: 100 }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 1,
                    backgroundColor: '#f0f4ff',
                  },
                }}
              />
            </Grid>
          </>
        );
      case 'MHT-CET':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                MHT-CET Percentile (0-100):
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="mhtCetPercentile"
                value={formData.mhtCetPercentile}
                onChange={handleChange}
                inputProps={{ min: 0, max: 100 }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 1,
                    backgroundColor: '#f0f4ff',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                12th PCM Percentage (0-100):
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="twelfthPCM"
                value={formData.twelfthPCM}
                onChange={handleChange}
                inputProps={{ min: 0, max: 100 }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 1,
                    backgroundColor: '#f0f4ff',
                  },
                }}
              />
            </Grid>
          </>
        );
      case 'NEET':
        return (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
              NEET Score (0-720):
            </Typography>
            <TextField
              fullWidth
              type="number"
              name="neetScore"
              value={formData.neetScore}
              onChange={handleChange}
              inputProps={{ min: 0, max: 720 }}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 1,
                  backgroundColor: '#f0f4ff',
                },
              }}
            />
          </Grid>
        );
      case 'BOARD':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                10th Percentage:
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="tenthPercentage"
                value={formData.tenthPercentage}
                onChange={handleChange}
                inputProps={{ min: 0, max: 100 }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 1,
                    backgroundColor: '#f0f4ff',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                12th Percentage:
              </Typography>
              <TextField
                fullWidth
                type="number"
                name="twelfthPercentage"
                value={formData.twelfthPercentage}
                onChange={handleChange}
                inputProps={{ min: 0, max: 100 }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 1,
                    backgroundColor: '#f0f4ff',
                  },
                }}
              />
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', py: 6 }}>
        <Container maxWidth="md">
          <Paper elevation={10} sx={{ p: 5, borderRadius: 3, bgcolor: 'white' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 0.5, textAlign: 'center' }}>
              College Prediction Form
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}>
              Get accurate college predictions based on your exam scores and preferences
            </Typography>
            <Divider sx={{ my: 3 }} />

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Full Name:
                  </Typography>
                  <TextField
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Email:
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Phone Number:
                  </Typography>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Exam Type:
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="examType"
                      value={formData.examType}
                      onChange={handleChange}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      {examTypes.map((exam) => (
                        <MenuItem key={exam} value={exam}>{exam}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Exam Specific Fields */}
                {renderExamSpecificFields()}

                {/* Preferences */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Category:
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Preferred Branch:
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="preferredBranch"
                      value={formData.preferredBranch}
                      onChange={handleChange}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      {engineeringBranches.map((branch) => (
                        <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Preferred College Type:
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="preferredCollegeType"
                      value={formData.preferredCollegeType}
                      onChange={handleChange}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      {collegeTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    State:
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      {states.map((state) => (
                        <MenuItem key={state} value={state}>{state}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Gender:
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      <MenuItem value="">Not specified</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#333' }}>
                    Preferred Location:
                  </Typography>
                  <TextField
                    fullWidth
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City or State"
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: 1,
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    opacity: 0.9,
                  },
                }}
              >
                {loading ? 'Predicting...' : 'Get College Predictions'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PredictorDashboard;
