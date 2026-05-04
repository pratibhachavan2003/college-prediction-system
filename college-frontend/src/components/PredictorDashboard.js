import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  InputAdornment,
  Alert,
  Card,
  CardContent,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Chip,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { 
  Person, School, Calculate, LocationOn, Business, 
  EmojiEvents, CheckCircle, ArrowForward, ArrowBack,
  Email, Phone, Wc
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { useAuth } from '../auth/AuthContext';
import API_BASE_URL from '../config';

// Static data
const genders = ['Male', 'Female', 'Other'];
const domiciles = ['Yes', 'No'];
const attempts = ['1st Attempt', '2nd Attempt'];
const capRounds = ['Round 1', 'Round 2', 'All Rounds'];
const years = ['2024', '2025', '2026'];

const fallbackBranches = [
  'Computer Science & Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering'
];
const fallbackCategories = ['GENERAL', 'OBC', 'SC', 'ST'];
const fallbackLocations = ['All', 'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 'Other'];
const fallbackCollegeTypes = ['All', 'Government', 'Private'];

const PredictorDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [engineeringBranches, setEngineeringBranches] = useState(fallbackBranches);
  const [categories, setCategories] = useState(fallbackCategories);
  const [locations, setLocations] = useState(fallbackLocations);
  const [collegeTypes, setCollegeTypes] = useState(fallbackCollegeTypes);
  const [dataLoading, setDataLoading] = useState(true);
  
  // Modal state for account creation prompt
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    preferredBranch: fallbackBranches[0],
    preferredCollegeType: 'All',
    combinedMarks: '',
    jeeScore: '',
    cetScore: '',
    category: fallbackCategories[0],
    gender: 'Female',
    domicile: 'Yes',
    cetRank: '',
    yearSession: '2024',
    attempt: '1st Attempt',
    capRound: 'Round 1',
    location: fallbackLocations[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setDataLoading(true);
        const [branchRes, categoriesRes, locationsRes, collegeTypesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/cutoff/branches`),
          axios.get(`${API_BASE_URL}/api/cutoff/categories`),
          axios.get(`${API_BASE_URL}/api/cutoff/locations`),
          axios.get(`${API_BASE_URL}/api/cutoff/college-types`),
        ]);

        if (branchRes.data?.data && branchRes.data.data.length > 0) {
          setEngineeringBranches(branchRes.data.data);
          setFormData(prev => ({ ...prev, preferredBranch: branchRes.data.data[0] }));
        }
        if (categoriesRes.data?.data && categoriesRes.data.data.length > 0) {
          setCategories(categoriesRes.data.data);
          setFormData(prev => ({ ...prev, category: categoriesRes.data.data[0] }));
        }
        if (locationsRes.data?.data && locationsRes.data.data.length > 0) {
          const locs = ['All', ...locationsRes.data.data.filter(l => l !== 'All')];
          setLocations(locs);
          setFormData(prev => ({ ...prev, location: locs[0] }));
        }
        if (collegeTypesRes.data?.data && collegeTypesRes.data.data.length > 0) {
          const types = ['All', ...collegeTypesRes.data.data.filter(t => t !== 'All')];
          setCollegeTypes(types);
          setFormData(prev => ({ ...prev, preferredCollegeType: types[0] }));
        }
      } catch (err) {
        console.warn('Failed to fetch dropdown data from API, using fallback values', err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchDropdownData();
  }, []);

  // Check authentication and show modal if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !hasSeenModal) {
      // Small delay to ensure component is fully rendered
      const timer = setTimeout(() => {
        setShowAccountModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isAuthenticated) {
      // Close modal if user becomes authenticated
      setShowAccountModal(false);
    }
  }, [isAuthenticated, hasSeenModal]);

  const steps = ['Student Details', 'Academic Details', 'College Preferences'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    let validationError = '';
    if (activeStep === 0) {
      if (!formData.name.trim()) validationError = 'Please fill in your Full Name';
    }
    if (activeStep === 1) {
      if (!formData.cetScore || formData.cetScore === '') validationError = 'Please enter your CET Percentile';
      else if (!formData.cetRank || formData.cetRank === '') validationError = 'Please enter your CET Rank (numeric)';
    }
    if (activeStep === 2) {
      if (!formData.preferredBranch || formData.preferredBranch === '') validationError = 'Please select your Preferred Branch';
      else if (!formData.location || formData.location === '') validationError = 'Please select your Preferred Location';
    }
    if (validationError) {
      setError(validationError);
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
    setError('');
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { setError('Please fill in your Full Name'); return; }
    if (!formData.cetScore || formData.cetScore === '') { setError('Please enter your CET Percentile'); return; }
    if (!formData.cetRank || formData.cetRank === '') { setError('Please enter your CET Rank (numeric)'); return; }
    if (!formData.preferredBranch || formData.preferredBranch === '') { setError('Please select your Preferred Branch'); return; }
    if (!formData.location || formData.location === '') { setError('Please select your Preferred Location'); return; }

    setLoading(true);
    setError('');
    try {
      const payload = {
        name: formData.name || 'Student',
        email: formData.email || 'student@example.com',
        phoneNumber: formData.phoneNumber || '0000000000',
        examType: formData.examType,
        category: formData.category,
        state: 'Maharashtra',
        preferredBranch: formData.preferredBranch,
        preferredCollegeType: formData.preferredCollegeType,
        gender: formData.gender,
        location: formData.location,
        yearSession: formData.yearSession,
        domicile: formData.domicile,
        cetRank: formData.cetRank ? parseInt(formData.cetRank, 10) : null,
        attempt: formData.attempt,
        capRound: formData.capRound,
        physicsMarks: (formData.combinedMarks !== '' ? parseFloat(formData.combinedMarks) : null),
        chemistryMarks: (formData.combinedMarks !== '' ? parseFloat(formData.combinedMarks) : null),
        mathematicsMarks: (formData.combinedMarks !== '' ? parseFloat(formData.combinedMarks) : null),
        jeeScore: parseFloat(formData.jeeScore) || null,
        cetScore: parseFloat(formData.cetScore) || null,
        mhtCetPercentile: parseFloat(formData.cetScore) || null,
        neetScore: parseFloat(formData.neetScore) || null,
      };
      try { localStorage.setItem('lastPredictionPayload', JSON.stringify(payload)); } catch (e) {}
      const res = await axios.post(`${API_BASE_URL}/api/predict`, payload);
      const data = res.data || [];
      try { localStorage.setItem('predictions', JSON.stringify(data)); } catch {}
      navigate('/results', { state: { predictions: data } });
    } catch (err) {
      console.error('Predictor error', err);
      setError('Prediction failed: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const handleCreateAccount = () => {
    setShowAccountModal(false);
    setHasSeenModal(true);
    navigate('/register');
  };

  const handleContinueAsGuest = () => {
    setShowAccountModal(false);
    setHasSeenModal(true);
  };

  return (
    <>
      {/* Account Creation Modal */}
      <Dialog
        open={showAccountModal}
        onClose={handleContinueAsGuest}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#1a365d',
          pb: 1
        }}>
          🎓 Welcome to College Prediction System
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            mt: 2
          }}>
            <School sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <DialogContentText sx={{
            fontSize: '1.1rem',
            color: '#4a5568',
            mb: 2,
            lineHeight: 1.6
          }}>
            Create a free account to save your predictions, track your progress, and get personalized recommendations!
          </DialogContentText>
          <Typography variant="body2" sx={{ color: '#718096', fontStyle: 'italic' }}>
            You can continue without an account, but your data won't be saved.
          </Typography>
        </DialogContent>
        <DialogActions sx={{
          justifyContent: 'center',
          gap: 2,
          pb: 3,
          px: 3
        }}>
          <Button
            onClick={handleContinueAsGuest}
            variant="outlined"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              borderColor: '#cbd5e1',
              color: '#64748b',
              '&:hover': {
                borderColor: '#a0aec0',
                backgroundColor: 'rgba(160, 174, 192, 0.1)',
              }
            }}
          >
            Continue as Guest
          </Button>
          <Button
            onClick={handleCreateAccount}
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6b3d93 100%)',
                boxShadow: '0 12px 32px rgba(102, 126, 234, 0.45)',
              }
            }}
          >
            Create Account
          </Button>
        </DialogActions>
      </Dialog>

      <Navbar />
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        py: 6,
        px: 3,
        mb: 4,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" sx={{
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(90deg, #fff 0%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                🎓 College Prediction System
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                Get accurate predictions for engineering colleges based on your MHT-CET performance
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<Calculate sx={{ color: '#a5b4fc !important' }} />}
                  label="AI-Powered"
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <Chip
                  icon={<School sx={{ color: '#a5b4fc !important' }} />}
                  label={formData.preferredBranch}
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <Chip
                  icon={<LocationOn sx={{ color: '#a5b4fc !important' }} />}
                  label={formData.location}
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <School sx={{ fontSize: 120, color: 'rgba(255,255,255,0.15)' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
          </Fade>
        )}

        {/* Main Form Card */}
        <Card sx={{
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          overflow: 'hidden',
          mb: 4,
        }}>
          {dataLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8, gap: 2 }}>
              <CircularProgress />
              <Typography>Loading form options...</Typography>
            </Box>
          )}

          {!dataLoading && (
            <>
              {/* Stepper */}
              <Box sx={{
                bgcolor: '#f8f9fa',
                p: 3,
                borderBottom: '1px solid #e9ecef'
              }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={label} completed={activeStep > index}>
                      <StepLabel>
                        <Typography variant="subtitle1" sx={{ fontWeight: activeStep === index ? 700 : 500 }}>
                          {label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <CardContent sx={{ p: 4 }}>
                {/* Step 1: Student Details */}
                {activeStep === 0 && (
                  <Fade in>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mr: 2,
                        }}>
                          <Person />
                        </Box>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                            Student Details
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tell us about yourself
                          </Typography>
                        </Box>
                      </Box>
                      <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Full Name"
                              placeholder="Enter your full name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Person sx={{ color: '#667eea' }} />
                                  </InputAdornment>
                                )
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: '#ffffff',
                                  borderRadius: 1.5,
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Email"
                              placeholder="Enter your email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Email sx={{ color: '#667eea' }} />
                                  </InputAdornment>
                                )
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: '#ffffff',
                                  borderRadius: 1.5,
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Phone Number"
                              placeholder="Enter your phone number"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Phone sx={{ color: '#667eea' }} />
                                  </InputAdornment>
                                )
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: '#ffffff',
                                  borderRadius: 1.5,
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#2d3748' }}>
                              Gender <span style={{ color: '#e53e3e' }}>*</span>
                            </Typography>
                            <Select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              fullWidth
                              sx={{ bgcolor: '#ffffff', borderRadius: 1.5 }}
                            >
                              {genders.map((g) => (
                                <MenuItem key={g} value={g}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Wc sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
                                    {g}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#2d3748' }}>
                              Domicile <span style={{ color: '#e53e3e' }}>*</span>
                            </Typography>
                            <Select
                              name="domicile"
                              value={formData.domicile}
                              onChange={handleChange}
                              fullWidth
                              sx={{ bgcolor: '#ffffff', borderRadius: 1.5 }}
                            >
                              {domiciles.map((d) => (
                                <MenuItem key={d} value={d}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationOn sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
                                    {d}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  </Fade>
                )}
                {/* ...existing code... */}
                {activeStep === 1 && (
                  <Fade in>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5a4ff 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mr: 2,
                        }}>
                          <EmojiEvents />
                        </Box>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                            Academic Details
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Enter your exam scores
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="CET Percentile"
                              placeholder="Enter percentile (0-100)"
                              type="number"
                              name="cetScore"
                              value={formData.cetScore}
                              onChange={handleChange}
                              inputProps={{ min: 0, max: 100 }}
                              InputProps={{ 
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmojiEvents sx={{ color: '#667eea' }} />
                                  </InputAdornment>
                                ),
                                endAdornment: <InputAdornment position="end">%</InputAdornment>
                              }}
                              sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                  backgroundColor: '#ffffff',
                                  borderRadius: 1.5,
                                } 
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="CET Rank"
                              placeholder="e.g. 12345"
                              helperText="Lower rank = better chances"
                              type="number"
                              name="cetRank"
                              value={formData.cetRank}
                              onChange={handleChange}
                              sx={{ 
                                '& .MuiOutlinedInput-root': { 
                                  backgroundColor: '#ffffff',
                                  borderRadius: 1.5,
                                } 
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#2d3748' }}>
                              Year of Admission <span style={{ color: '#e53e3e' }}>*</span>
                            </Typography>
                            <Select
                              name="yearSession"
                              value={formData.yearSession}
                              onChange={handleChange}
                              fullWidth
                              sx={{ bgcolor: '#ffffff', borderRadius: 1.5 }}
                            >
                              {years.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                            </Select>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#2d3748' }}>
                              Attempt <span style={{ color: '#e53e3e' }}>*</span>
                            </Typography>
                            <Select
                              name="attempt"
                              value={formData.attempt}
                              onChange={handleChange}
                              fullWidth
                              sx={{ bgcolor: '#ffffff', borderRadius: 1.5 }}
                            >
                              {attempts.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                            </Select>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#2d3748' }}>
                              CAP Round <span style={{ color: '#e53e3e' }}>*</span>
                            </Typography>
                            <Select
                              name="capRound"
                              value={formData.capRound}
                              onChange={handleChange}
                              fullWidth
                              sx={{ bgcolor: '#ffffff', borderRadius: 1.5 }}
                            >
                              {capRounds.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                            </Select>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  </Fade>
                )}

                {/* Step 3: College Preferences */}
                {activeStep === 2 && (
                  <Fade in>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mr: 2,
                        }}>
                          <Business />
                        </Box>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                            College Preferences
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Select your preferred college criteria
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Paper sx={{ p: 3, borderRadius: 2, bgcolor: '#f8f9fa' }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                              <InputLabel>Preferred Branch <span style={{ color: '#e53e3e' }}>*</span></InputLabel>
                              <Select
                                value={formData.preferredBranch}
                                onChange={(e) => setFormData({ ...formData, preferredBranch: e.target.value })}
                                label="Preferred Branch *"
                              >
                                {engineeringBranches.map((branch) => (
                                  <MenuItem key={branch} value={branch}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <School sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
                                      {branch}
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#2d3748' }}>
                              Preferred Location <span style={{ color: '#e53e3e' }}>*</span>
                            </Typography>
                            <Select
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              fullWidth
                              sx={{ bgcolor: '#ffffff', borderRadius: 1.5 }}
                            >
                              {locations.map((l) => (
                                <MenuItem key={l} value={l}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationOn sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
                                    {l}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                            <Typography variant="caption" color="text.secondary">
                              Select 'All' to include every city
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#2d3748' }}>
                              College Type <span style={{ color: '#e53e3e' }}>*</span>
                            </Typography>
                            <Select
                              name="preferredCollegeType"
                              value={formData.preferredCollegeType}
                              onChange={handleChange}
                              fullWidth
                              sx={{ bgcolor: '#ffffff', borderRadius: 1.5 }}
                            >
                              {collegeTypes.map((ct) => (
                                <MenuItem key={ct} value={ct}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Business sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
                                    {ct}
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                            <Typography variant="caption" color="text.secondary">
                              Choose 'All' to ignore type filter
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  </Fade>
                )}

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontWeight: 600,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      borderColor: '#667eea',
                      color: '#667eea',
                    }}
                  >
                    Back
                  </Button>

                {activeStep === 2 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      py: 1.5,
                      px: 5,
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.6)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        opacity: 0.7,
                        boxShadow: 'none',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? 'Processing...' : 'Submit & Predict'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      py: 1.5,
                      px: 5,
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        boxShadow: '0 15px 40px rgba(102, 126, 234, 0.6)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Next →
                  </Button>
				)}
			</Box>
		</CardContent>
            </>
          )}
      </Card>
    </Container>
  </>);
}

export default PredictorDashboard;