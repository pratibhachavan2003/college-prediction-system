import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  // Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ListIcon from '@mui/icons-material/List';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SmartToyIcon from '@mui/icons-material/SmartToy';
// import StorageIcon from '@mui/icons-material/Storage';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import EngineeringIcon from '@mui/icons-material/Engineering';
import SchoolIcon from '@mui/icons-material/School';
import Navbar from './Navbar';
import college1 from '../assets/college1.jpg';
import college2 from '../assets/college2.jpeg';
import college3 from '../assets/college3.jpg';

const Home = () => {
  const navigate = useNavigate();

  const images = [college1, college2, college3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const features = [
    {
      title: 'Accurate Predictions',
      description: 'Get precise college predictions based on your rank and preferences using historical cutoff data and advanced algorithms.',
      icon: AnalyticsIcon,
      color: '#667eea',
      link: '/predictor',
    },
    {
      title: 'Historical Cutoff Analysis',
      description: 'Access years of previous cutoff data to understand admission trends and make informed decisions about your college choices.',
      icon: SchoolIcon,
      color: '#764ba2',
      link: '/predictor',
    },
    {
      title: 'My List Management',
      description: 'Save your preferred colleges in a personalized list. Your list is stored securely and accessible anytime from your dashboard.',
      icon: ListIcon,
      color: '#f093fb',
      link: '/results',
    },
    {
      title: 'Drag & Drop Ranking',
      description: 'Easily reorder your saved colleges by dragging and dropping to prioritize your preferences and organize your choices.',
      icon: DragIndicatorIcon,
      color: '#4facfe',
      link: '/results',
    },
    {
      title: 'Export to PDF/Excel',
      description: 'Download your college list in PDF or Excel format for offline access, sharing with family, or printing for reference.',
      icon: PictureAsPdfIcon,
      color: '#00f2fe',
      link: '/results',
    },
    {
      title: 'AI Career Counselling',
      description: 'Get personalized guidance from our AI-powered counsellor. Ask questions about colleges, branches, and career paths.',
      icon: SmartToyIcon,
      color: '#43e97b',
      link: '/ai-counselling',
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Students Helped' },
    { number: '1,000+', label: 'Colleges Listed' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 3s ease-in-out',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%)',
              zIndex: 1,
            },
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem', lg: '6rem' },
                lineHeight: 1.1,
                color: '#ffffff',
                textShadow: '2px 2px 8px rgba(0,0,0,0.45)',
              }}
            >
              Visualize Your Engineering Future
            </Typography>
            {/* <Typography
              variant="h4"
              sx={{
                mb: 6,
                opacity: 0.95,
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                fontWeight: 300,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.4,
                color: '#ffffff',
              }}
            > */}
            <Typography
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '1.1rem',
                fontWeight: 400,
                fontStyle: 'italic',   // ✅ ITALIC
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                lineHeight: 1.7,
                maxWidth: 750,
                margin: '0 auto',
              }}
            >
              Get accurate college predictions based on your MHT-CET percentile using advanced algorithms and historical cutoff data.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/predictor')}
                sx={{
                  bgcolor: '#ffffff',
                  color: '#1a1a1a',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#f8f8f8',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                  },
                }}
              >
                Start Prediction
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/about')}
                sx={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#ffffff',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 6,
                color: '#1a1a1a',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Trusted by Thousands of Students
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      borderRadius: '20px',
                      bgcolor: 'white',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 'bold',
                        color: '#2563eb',
                        mb: 2,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#64748b',
                        fontWeight: 500,
                        fontSize: { xs: '0.9rem', md: '1rem' },
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 3,
              color: '#1a1a1a',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Why Choose CollegePredictor?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 8,
              color: '#64748b',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Advanced tools and insights to help you make informed decisions about your engineering career
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: '240px',
                    width: '240px',
                    margin: '0 auto',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e2e8f0',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                    },
                  }}
                  onClick={() => navigate(feature.link)}
                >
                  <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '10px',
                          bgcolor: `${feature.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          flexShrink: 0,
                        }}
                      >
                        <feature.icon
                          sx={{
                            fontSize: 24,
                            color: feature.color,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: '#1a1a1a',
                          fontSize: '0.9rem',
                          lineHeight: 1.2,
                        }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#64748b',
                        lineHeight: 1.4,
                        fontSize: '0.8rem',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 10,
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              zIndex: 1,
            },
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Ready to Find Your Perfect College?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                opacity: 0.9,
                fontWeight: 300,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.4,
              }}
            >
              Join thousands of students who have found their dream engineering colleges using our advanced prediction system. Start your journey today.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: 'white',
                color: '#667eea',
                px: 6,
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#f8f9fa',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                },
              }}
            >
              Get Started Now
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 3 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1.5,
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}
                >
                  CollegePredictor
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    color: '#a0aec0',
                    lineHeight: 1.4,
                    fontSize: '0.85rem',
                  }}
                >
                  Your trusted partner in engineering college admissions. Get accurate predictions and make informed decisions about your future with our advanced AI-powered system.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* Social media icons could go here */}
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                  }}
                >
                  Platform
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/predictor')}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: '#a0aec0',
                      fontSize: '0.85rem',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    College Predictor
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/results')}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: '#a0aec0',
                      fontSize: '0.85rem',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    My Lists
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/ai-counselling')}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: '#a0aec0',
                      fontSize: '0.85rem',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    AI Counselling
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                  }}
                >
                  Company
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/about')}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: '#a0aec0',
                      fontSize: '0.85rem',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    About Us
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/contact')}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: '#a0aec0',
                      fontSize: '0.85rem',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    Contact
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1.5,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                  }}
                >
                  Support
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/privacy')}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: '#a0aec0',
                      fontSize: '0.85rem',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    Privacy Policy
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/terms')}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: '#a0aec0',
                      fontSize: '0.85rem',
                      '&:hover': {
                        color: '#ffffff',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    Terms of Service
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ borderTop: '1px solid #374151', mt: 4, pt: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#9ca3af',
                    fontSize: '0.8rem',
                  }}
                >
                  © 2025 CollegePredictor. All rights reserved.
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#9ca3af',
                    fontSize: '0.8rem',
                  }}
                >
                  Made with ❤️ for engineering aspirants
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Home;
