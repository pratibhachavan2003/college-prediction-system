import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import Navbar from './Navbar';
import API_BASE_URL from '../config';
import InfoIcon from '@mui/icons-material/Info';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const About = () => {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/api/cutoff/statistics`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.statistics) setStats(data.statistics);
      })
      .catch((err) => console.error('Failed to load stats', err));
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              color: '#1a1a1a',
            }}
          >
            About College Predictor
          </Typography>

          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              mb: 6, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              College Predictor is dedicated to helping Maharashtra students make informed decisions about their engineering education.
              We combine advanced algorithms with comprehensive MHT-CET data to provide accurate college predictions based on
              exam scores, preferences, and historical trends.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Founded by engineering aspirants, we understand the challenges students face in choosing the right college.
              Our platform aims to simplify this process and ensure every student finds their dream engineering college in Maharashtra.
            </Typography>
          </Paper>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              color: '#1a1a1a',
            }}
          >
            What Sets Us Apart
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <Card 
                sx={{ 
                  height: 240,
                  width: 240,
                  borderRadius: 2, 
                  boxShadow: 2, 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                  border: '1px solid #667eea20'
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <AnalyticsIcon sx={{ fontSize: 48, color: '#667eea', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1.5, color: '#667eea', fontSize: '0.9rem' }}>
                      Data-Driven Predictions
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4, fontSize: '0.75rem' }}>
                    Based on years of historical cutoff data and advanced statistical models.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <Card 
                sx={{ 
                  height: 240,
                  width: 240,
                  borderRadius: 2, 
                  boxShadow: 2, 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                  border: '1px solid #764ba220'
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <EngineeringIcon sx={{ fontSize: 48, color: '#764ba2', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1.5, color: '#764ba2', fontSize: '0.9rem' }}>
                      Maharashtra Focus
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4, fontSize: '0.75rem' }}>
                    Exclusively for Maharashtra engineering colleges with MHT-CET cutoffs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <Card 
                sx={{ 
                  height: 240,
                  width: 240,
                  borderRadius: 2, 
                  boxShadow: 2, 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                  border: '1px solid #f093fb20'
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <InfoIcon sx={{ fontSize: 48, color: '#f093fb', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1.5, color: '#f093fb', fontSize: '0.9rem' }}>
                      Comprehensive Database
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4, fontSize: '0.75rem' }}>
                    160+ colleges with updated MHT-CET cutoffs and details.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Key Statistics Section */}
          <Box sx={{ mt: 8, mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 4,
                color: '#1a1a1a',
              }}
            >
              By the Numbers
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stats?.collegesCount ?? '160+'}
                  </Typography>
                  <Typography variant="body2">
                    Maharashtra Colleges
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stats?.branchesAvailable?.length ?? '5'}
                  </Typography>
                  <Typography variant="body2">
                    Engineering Branches
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stats?.yearsAvailable?.length ?? '4'}
                  </Typography>
                  <Typography variant="body2">
                    Years of Data
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    95%
                  </Typography>
                  <Typography variant="body2">
                    Prediction Accuracy
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              mt: 6, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Started by a group of MHT-CET aspirants who faced the challenges of college selection in Maharashtra,
              CollegePredictor was born out of the need for a reliable, data-driven approach to
              engineering college admissions. We believe that every student deserves access to
              accurate information and personalized guidance in their educational journey.
            </Typography>
          </Paper>

          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', mt: 6, p: 4, bgcolor: '#f8f9fa', borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1a1a1a' }}>
              Ready to Find Your Dream College?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Start your journey to the perfect engineering college in Maharashtra. Get accurate predictions based on your MHT-CET score.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Typography 
                component="a" 
                href="/predictor" 
                sx={{ 
                  px: 4, 
                  py: 2, 
                  bgcolor: '#667eea', 
                  color: 'white', 
                  borderRadius: 2, 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: '#5a67d8',
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                Start Prediction
              </Typography>
              <Typography 
                component="a" 
                href="/branch-guide" 
                sx={{ 
                  px: 4, 
                  py: 2, 
                  border: '2px solid #667eea', 
                  color: '#667eea', 
                  borderRadius: 2, 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: '#667eea',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                Explore Branches
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default About;