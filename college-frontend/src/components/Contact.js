import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import Navbar from './Navbar';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ 
        background: '#ffffff',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: '#1a1a1a',
                textShadow: 'none',
                lineHeight: 1.1,
              }}
            >
              Get In Touch
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3,
                opacity: 0.95,
                fontWeight: 300,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                color: '#64748b',
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.4,
              }}
            >
              Have questions about college predictions or need guidance? Our expert team is here to help you succeed.
            </Typography>
            <Box sx={{ 
              width: 80, 
              height: 4, 
              bgcolor: '#ffffff', 
              borderRadius: 2, 
              mx: 'auto',
              opacity: 0.8,
            }} />
          </Box>

          <Grid container spacing={6}>
            {/* Contact Information Card */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 5, 
                  borderRadius: '24px', 
                  height: '100%',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 35px 70px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 4, 
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: '1.8rem',
                  }}
                >
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '12px',
                    bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <EmailIcon sx={{ fontSize: 24, color: 'white' }} />
                  </Box>
                  Contact Information
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    p: 3,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                      transform: 'translateX(8px)',
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                    }
                  }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                    }}>
                      <EmailIcon sx={{ color: 'white', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500, mb: 0.5 }}>
                        EMAIL ADDRESS
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                        support@collegepredictor.com
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    p: 3,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                      transform: 'translateX(8px)',
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                    }
                  }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                    }}>
                      <PhoneIcon sx={{ color: 'white', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500, mb: 0.5 }}>
                        PHONE NUMBER
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                        +91 98765 43210
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 3,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                      transform: 'translateX(8px)',
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                    }
                  }}>
                    <Box sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                    }}>
                      <LocationOnIcon sx={{ color: 'white', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500, mb: 0.5 }}>
                        OFFICE LOCATION
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                        Mumbai, Maharashtra, India
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                  Have questions about college predictions, need help with your application,
                  or want to provide feedback? We're here to help! Reach out to us through
                  the contact form or the information provided above.
                </Typography>
              </Paper>
            </Grid>

            {/* Contact Form Card */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 5, 
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 35px 70px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 4, 
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: '1.8rem',
                  }}
                >
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '12px',
                    bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <EmailIcon sx={{ fontSize: 24, color: 'white' }} />
                  </Box>
                  Send us a Message
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={{
                      mb: 3,
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
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{
                      mb: 3,
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
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    sx={{
                      mb: 3,
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
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                    sx={{
                      mb: 4,
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
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Footer Note */}
          <Typography
            variant="body1"
            sx={{ 
              textAlign: 'center', 
              mt: 8, 
              color: '#64748b',
              fontStyle: 'italic',
              fontSize: '1.1rem',
            }}
          >
            💬 We typically respond within 24 hours. For urgent queries, please call us directly.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Contact;