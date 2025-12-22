import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import Navbar from './Navbar';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    // Submit logic here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: '#f8f9fa',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 3,
              color: '#333',
            }}
          >
            Student Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Thank you! Your message has been submitted successfully.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Enter your name:
            </Typography>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              variant="outlined"
              sx={{ mb: 2.5 }}
              disabled={submitted}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Phone:
            </Typography>
            <TextField
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              variant="outlined"
              sx={{ mb: 2.5 }}
              disabled={submitted}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Email:
            </Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              variant="outlined"
              sx={{ mb: 2.5 }}
              disabled={submitted}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Message:
            </Typography>
            <TextField
              fullWidth
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 3 }}
              disabled={submitted}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: '#667eea',
                '&:hover': {
                  backgroundColor: '#5568d3',
                },
              }}
              disabled={submitted}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default StudentLogin;
