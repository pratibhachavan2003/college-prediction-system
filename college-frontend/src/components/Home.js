import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ListIcon from '@mui/icons-material/List';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StorageIcon from '@mui/icons-material/Storage';
import FilterListIcon from '@mui/icons-material/FilterList';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SchoolIcon from '@mui/icons-material/School';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();

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
    {
      title: 'Comprehensive Database',
      description: 'Access information about 1000+ engineering colleges across India with updated cutoffs, fees, and placement details.',
      icon: StorageIcon,
      color: '#38f9d7',
      link: '/predictor',
    },
    {
      title: 'Smart Filtering',
      description: 'Filter colleges by location, branch, fees, cutoff range, and more to find colleges that match your specific requirements.',
      icon: FilterListIcon,
      color: '#fa709a',
      link: '/predictor',
    },
    {
      title: 'Branch Guide',
      description: 'Explore detailed information about all engineering branches available in Maharashtra. Learn about career prospects, salary ranges, and future scope.',
      icon: EngineeringIcon,
      color: '#a8edea',
      link: '/branch-guide',
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
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 10,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              }}
            >
              Predict Your Dream Engineering College
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              }}
            >
              Get accurate college predictions based on your JEE/CET rank. Discover the best engineering colleges that match your profile and preferences with our advanced AI-powered platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/predictor')}
              sx={{
                bgcolor: 'white',
                color: '#667eea',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                },
              }}
            >
              Start Prediction
            </Button>
          </Container>
        </Box>

        {/* Stats Section */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: 'white',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      color: '#667eea',
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Why Choose Us Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
              color: '#1a1a1a',
            }}
          >
            WHY CHOOSE US
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
            }}
          >
            Everything You Need for College Selection
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 6,
              maxWidth: 600,
              mx: 'auto',
              color: 'text.secondary',
            }}
          >
            Our platform combines cutting-edge technology with comprehensive data to give you the best college recommendations.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                    onClick={() => navigate(feature.link)}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box
                        sx={{
                          bgcolor: feature.color,
                          borderRadius: '50%',
                          width: 60,
                          height: 60,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <IconComponent sx={{ color: 'white', fontSize: 30 }} />
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 'bold',
                          mb: 2,
                          color: '#1a1a1a',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: '#2c3e50', color: 'white', py: 6, mt: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  CollegePredictor
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Find your dream college with data-driven predictions and insights.
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  Made by an Ex-JEE Aspirant
                </Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  QUICK LINKS
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button color="inherit" onClick={() => navigate('/')} sx={{ justifyContent: 'flex-start', p: 0, minHeight: 'auto' }}>
                    Home
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/predictor')} sx={{ justifyContent: 'flex-start', p: 0, minHeight: 'auto' }}>
                    Predict
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/about')} sx={{ justifyContent: 'flex-start', p: 0, minHeight: 'auto' }}>
                    About Us
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/contact')} sx={{ justifyContent: 'flex-start', p: 0, minHeight: 'auto' }}>
                    Contact
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  LEGAL
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button color="inherit" component="a" href="/privacy" sx={{ justifyContent: 'flex-start', p: 0, minHeight: 'auto' }}>
                    Privacy Policy
                  </Button>
                  <Button color="inherit" component="a" href="/terms" sx={{ justifyContent: 'flex-start', p: 0, minHeight: 'auto' }}>
                    Terms of Service
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button color="inherit" component="a" href="https://www.linkedin.com/company/collegepredictor" target="_blank" sx={{ minWidth: 'auto', p: 1 }}>
                    LinkedIn
                  </Button>
                  <Button color="inherit" component="a" href="https://www.instagram.com/collegepredictor" target="_blank" sx={{ minWidth: 'auto', p: 1 }}>
                    Instagram
                  </Button>
                  <Button color="inherit" component="a" href="https://www.youtube.com/@collegepredictor" target="_blank" sx={{ minWidth: 'auto', p: 1 }}>
                    YouTube
                  </Button>
                  <Button color="inherit" component="a" href="https://www.facebook.com/collegepredictor" target="_blank" sx={{ minWidth: 'auto', p: 1 }}>
                    Facebook
                  </Button>
                  <Button color="inherit" component="a" href="https://twitter.com/collegepredictor" target="_blank" sx={{ minWidth: 'auto', p: 1 }}>
                    Twitter
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  © 2025 CollegePredictor. All rights reserved.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Home;