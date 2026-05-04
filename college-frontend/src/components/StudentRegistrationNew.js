import React, { useState } from 'react';
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
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../auth/AuthContext';
import API_BASE_URL from '../config';

const StudentRegistrationNew = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms & Privacy Policy');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };
      const response = await axios.post(`${API_BASE_URL}/api/students/register`, payload);
      if (response.data) {
        setSuccess(true);
        try {
          await login(formData.email, formData.password);
          navigate('/predictor');
        } catch (loginError) {
          setError('Account created, but automatic login failed. Please sign in manually.');
          console.error('Auto-login failed after registration:', loginError);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            Create Your Account
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            Join us and find your future college.
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="success.main" sx={{ mb: 2, textAlign: 'center' }}>
              Registration successful! Redirecting to predictor...
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              helperText="A strong password is required"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
              }
              label="I agree to the Terms & Privacy Policy"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  opacity: 0.9,
                },
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
              Already have an account?{' '}
              <Link href="#" onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default StudentRegistrationNew;
